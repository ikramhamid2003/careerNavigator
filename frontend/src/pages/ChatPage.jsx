import { useState, useEffect, useRef, useCallback } from "react";
import {
  Send, Bot, User, Loader2, Sparkles, MessageSquare,
  Plus, Trash2, ChevronRight, Zap, Copy, Check,
  Mic, MicOff, RefreshCw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { chatAPI } from "../services/api";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const SUGGESTED_PROMPTS = [
  { label: "After Class 12", text: "I just finished Class 12 with PCM. What are my best career options besides engineering?" },
  { label: "JEE vs NEET", text: "I'm interested in both engineering and medicine. How do I decide between JEE and NEET?" },
  { label: "UPSC Guidance", text: "I want to become an IAS officer. What's the best strategy to start preparing for UPSC?" },
  { label: "Salary in India", text: "What are the highest paying careers in India for a 2025 graduate?" },
  { label: "Study Abroad", text: "I want to do MS abroad after BTech. How do I prepare for GRE and choose universities?" },
  { label: "Scholarship Help", text: "What scholarships are available for Class 12 students from Tamil Nadu?" },
];

function useSpeechRecognition(onResult) {
  const [listening, setListening] = useState(false);
  const recRef = useRef(null);

  const toggle = useCallback(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.error("Voice input not supported in this browser");
      return;
    }
    if (listening) {
      recRef.current?.stop();
      setListening(false);
    } else {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (e) => onResult(e.results[0][0].transcript);
      rec.onend = () => setListening(false);
      rec.onerror = () => { setListening(false); toast.error("Voice error"); };
      recRef.current = rec;
      rec.start();
      setListening(true);
    }
  }, [listening, onResult]);

  return { listening, toggle };
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (isAuthenticated) loadConversations(); }, [isAuthenticated]);

  const loadConversations = async () => {
    try { const { data } = await chatAPI.getConversations(); setConversations(data.results || data); } catch { }
  };

  const loadConversation = async (id) => {
    try {
      const { data } = await chatAPI.getConversation(id);
      setConversationId(id);
      setMessages(data.messages.map((m) => ({ role: m.role, content: m.content, id: m.id })));
      setSidebarOpen(false);
    } catch { toast.error("Failed to load conversation"); }
  };

  const newChat = () => { setMessages([]); setConversationId(null); setSidebarOpen(false); inputRef.current?.focus(); };

  const deleteConversation = async (id, e) => {
    e.stopPropagation();
    try {
      await chatAPI.deleteConversation(id);
      setConversations((p) => p.filter((c) => c.id !== id));
      if (conversationId === id) newChat();
    } catch { toast.error("Delete failed"); }
  };

  const sendMessage = async (text = input.trim()) => {
    if (!text || streaming) return;
    const userMsg = { role: "user", content: text, id: Date.now() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setStreaming(true);

    // Add placeholder for streaming response
    const placeholderId = Date.now() + 1;
    setMessages((p) => [...p, { role: "assistant", content: "", id: placeholderId, streaming: true }]);

    try {
      const token = chatAPI.getStreamToken();
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch(`${chatAPI.streamBaseUrl}/chat/stream/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: text, conversation_id: conversationId }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error("Stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let convId = conversationId;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const ev = JSON.parse(line.slice(6));
            if (ev.type === "meta") { convId = ev.conversation_id; setConversationId(ev.conversation_id); }
            if (ev.type === "chunk") {
              fullText += ev.text;
              setMessages((p) => p.map((m) => m.id === placeholderId ? { ...m, content: fullText } : m));
            }
            if (ev.type === "done") {
              setMessages((p) => p.map((m) => m.id === placeholderId ? { ...m, id: ev.message_id, streaming: false } : m));
            }
          } catch { }
        }
      }
      if (isAuthenticated) loadConversations();
    } catch (err) {
      if (err.name !== "AbortError") {
        // Fallback to non-streaming
        try {
          const { data } = await chatAPI.sendMessage(text, conversationId);
          setConversationId(data.conversation_id);
          setMessages((p) => p.map((m) => m.id === placeholderId
            ? { role: "assistant", content: data.message.content, id: data.message.id, streaming: false }
            : m
          ));
          if (isAuthenticated) loadConversations();
        } catch {
          setMessages((p) => p.map((m) => m.id === placeholderId
            ? { ...m, content: "Sorry, I'm having trouble right now. Please try again.", error: true, streaming: false }
            : m
          ));
        }
      }
    } finally {
      setStreaming(false);
    }
  };

  const stopStreaming = () => { abortRef.current?.abort(); setStreaming(false); };

  const copyMessage = async (content, id) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const { listening, toggle: toggleVoice } = useSpeechRecognition((text) => {
    setInput((p) => p + (p ? " " : "") + text);
  });

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="pt-16 h-screen flex overflow-hidden bg-[#0a0a0f]">
      {/* Sidebar */}
      {isAuthenticated && (
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
            fixed lg:relative z-30 w-72 h-full flex flex-col
            border-r border-white/[0.06] bg-[#0d0d14] transition-transform duration-300`}>
            <div className="p-4 border-b border-white/[0.06]">
              <button onClick={newChat} className="btn-primary w-full text-sm py-2.5">
                <Plus size={15} /> New Conversation
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {conversations.length === 0 ? (
                <p className="text-slate-600 text-xs text-center py-8">No conversations yet</p>
              ) : conversations.map((c) => (
                <button key={c.id} onClick={() => loadConversation(c.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all group flex justify-between gap-2
                    ${c.id === conversationId ? "bg-brand-500/10 text-white border border-brand-500/20" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{c.title || "New conversation"}</div>
                    <div className="text-slate-600 mt-0.5 truncate">{c.message_count} messages</div>
                  </div>
                  <div role="button" onClick={(e) => deleteConversation(c.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all flex-shrink-0 mt-0.5 cursor-pointer">
                    <Trash2 size={11} />
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/[0.06] bg-[#0d0d14]/80 backdrop-blur flex items-center gap-3">
          {isAuthenticated && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 transition-colors">
              <MessageSquare size={17} />
            </button>
          )}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center shadow-glow-sm">
            <Bot size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="font-display font-semibold text-white text-sm leading-none">CareerAI</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>AI Career Counselor · Streaming live</span>
            </div>
          </div>
          {streaming && (
            <button onClick={stopStreaming}
              className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              Stop
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10 animate-fade-up">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center mx-auto mb-5 shadow-glow">
                  <Sparkles size={32} className="text-white" />
                </div>
                <h2 className="font-display font-bold text-2xl text-white mb-2">Hello! I'm CareerAI</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Your AI career counselor for Indian students — careers, exams, colleges, and scholarships.
                  Ask me anything about career paths, skills, salaries, or interviews.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 animate-fade-up animation-delay-100">
                {SUGGESTED_PROMPTS.map((p, i) => (
                  <button key={i} onClick={() => sendMessage(p.text)}
                    className="card-hover text-left p-3.5 group">
                    <div className="badge-blue text-xs mb-2 inline-flex">{p.label}</div>
                    <p className="text-slate-400 text-xs group-hover:text-slate-200 transition-colors leading-relaxed line-clamp-3">
                      {p.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-5">
              {messages.map((msg, i) => (
                <div key={msg.id || i} className={`flex gap-3 animate-fade-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5
                    ${msg.role === "user" ? "bg-brand-500/20" : "bg-gradient-to-br from-brand-400 to-violet-500"}`}>
                    {msg.role === "user"
                      ? <User size={14} className="text-brand-300" />
                      : <Bot size={14} className="text-white" />}
                  </div>
                  <div className={`max-w-[82%] group relative ${msg.role === "user" ? "items-end flex flex-col" : ""}`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm
                      ${msg.role === "user"
                        ? "bg-brand-500/15 border border-brand-500/20 text-slate-200"
                        : msg.error ? "bg-red-500/10 border border-red-500/20 text-red-300"
                          : "glass border border-white/[0.06]"}`}>
                      {msg.role === "assistant" ? (
                        <>
                          <div className="prose-ai">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                          {msg.streaming && (
                            <span className="inline-block w-1.5 h-4 bg-brand-400 ml-0.5 animate-pulse rounded-sm align-middle" />
                          )}
                        </>
                      ) : (
                        <p className="leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                    {msg.role === "assistant" && !msg.streaming && msg.content && (
                      <button
                        onClick={() => copyMessage(msg.content, msg.id)}
                        className="absolute -bottom-5 right-0 opacity-0 group-hover:opacity-100 transition-opacity
                          text-xs text-slate-600 hover:text-slate-400 flex items-center gap-1">
                        {copiedId === msg.id ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {streaming && messages[messages.length - 1]?.content === "" && (
                <div className="flex gap-3 animate-fade-up">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="glass rounded-2xl px-4 py-3 border border-white/[0.06]">
                    <div className="flex gap-1 items-center h-5">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-4 border-t border-white/[0.06] bg-[#0d0d14]/80 backdrop-blur">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 glass rounded-2xl p-2 border border-white/[0.06]
              focus-within:border-brand-500/30 focus-within:ring-1 focus-within:ring-brand-500/15 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about careers, skills, salaries, interviews..."
                rows={1}
                className="flex-1 bg-transparent resize-none text-sm text-slate-200 placeholder-slate-600 focus:outline-none py-2 px-2 leading-relaxed"
                style={{ minHeight: "40px", maxHeight: "128px" }}
              />
              <div className="flex items-end gap-1.5 pb-1">
                <button onClick={toggleVoice}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                    ${listening ? "bg-red-500/20 text-red-400" : "hover:bg-white/[0.06] text-slate-500 hover:text-slate-300"}`}>
                  {listening ? <MicOff size={15} /> : <Mic size={15} />}
                </button>
                <button onClick={() => sendMessage()} disabled={!input.trim() || streaming}
                  className="w-9 h-9 rounded-xl bg-brand-500 hover:bg-brand-600 flex items-center justify-center
                    transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-glow-sm">
                  {streaming ? <Loader2 size={15} className="text-white animate-spin" /> : <Send size={15} className="text-white" />}
                </button>
              </div>
            </div>
            <p className="text-slate-700 text-xs text-center mt-2">
              Enter to send · Shift+Enter for newline · <Zap size={9} className="inline" /> Streaming live
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}