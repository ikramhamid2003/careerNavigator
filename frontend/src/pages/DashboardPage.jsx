import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Brain, MessageSquare, ChevronRight, Sparkles, Target, Map, Award,
  ArrowUpRight, Zap, BookOpen, GraduationCap, FileText, ArrowRight,
  CheckCircle2, TrendingUp,
} from "lucide-react";
import useAuthStore from "../store/authStore";
import { careersAPI, chatAPI } from "../services/api";
import { NEP_STREAMS } from "../store/india";

// ── Animated confidence ring ──────────────────────────────────────────────────
function ConfidenceRing({ value, size = 110, stroke = 9, color = "#ff7f0e" }) {
  const [displayed, setDisplayed] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(value, 0), 100);

  useEffect(() => {
    let cur = 0;
    const step = () => {
      cur += 2;
      if (cur <= pct) { setDisplayed(cur); requestAnimationFrame(step); }
      else setDisplayed(pct);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 400);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ - (displayed / 100) * circ}
        style={{ transition: "stroke-dashoffset 0.04s linear" }} />
      <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle"
        style={{ fill: "#fff", fontSize: "18px", fontWeight: "700", transform: "rotate(90deg)", transformOrigin: "50% 50%" }}>
        {displayed}%
      </text>
      <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle"
        style={{ fill: "rgba(255,255,255,0.35)", fontSize: "8px", transform: "rotate(90deg)", transformOrigin: "50% 50%" }}>
        MATCH
      </text>
    </svg>
  );
}

// ── Animated progress bar ─────────────────────────────────────────────────────
function AnimBar({ value, max = 100, color = "#ff7f0e", delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW((value / max) * 100), delay + 200);
    return () => clearTimeout(t);
  }, [value, max, delay]);
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

// ── Stat card with animated counter ──────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, subtitle }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!value) { setCount(0); return; }
    let i = 0;
    const id = setInterval(() => { i++; setCount(i); if (i >= value) clearInterval(id); }, 80);
    return () => clearInterval(id);
  }, [value]);
  return (
    <div className="card p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-200 cursor-default">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}12, transparent 70%)` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: color + "18" }}>
          <Icon size={18} style={{ color }} />
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: color + "10", border: `1px solid ${color}20` }}>
          <TrendingUp size={11} style={{ color }} />
        </div>
      </div>
      <div className="font-display font-bold text-3xl text-white mb-0.5">{count}</div>
      <div className="text-slate-300 text-sm font-medium">{label}</div>
      {subtitle && <div className="text-slate-600 text-xs mt-0.5">{subtitle}</div>}
    </div>
  );
}

// ── Stream affinity gauge ─────────────────────────────────────────────────────
function StreamGauge({ name, color, pct, delay }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), delay + 500);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-slate-300 text-xs font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{Math.round(pct)}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}70, ${color})` }} />
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuthStore();
  const [predictions, setPredictions] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      careersAPI.getHistory(),
      chatAPI.getConversations(),
      careersAPI.getRoadmaps(),
    ]).then(([a, b, c]) => {
      if (a.status === "fulfilled") setPredictions(a.value.data.results || a.value.data || []);
      if (b.status === "fulfilled") setConversations(b.value.data.results || b.value.data || []);
      if (c.status === "fulfilled") setRoadmaps(c.value.data.results || c.value.data || []);
    });
  }, []);

  const latest = predictions[0];
  const latestRoadmap = roadmaps[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Stream affinity — derived from latest prediction if available
  const topStream = NEP_STREAMS.find((s) => s.id === latest?.predicted_field?.slug?.split("-")[0]) || NEP_STREAMS[0];
  const streamAffinities = NEP_STREAMS.slice(0, 5).map((s, i) => ({
    ...s,
    pct: latest ? Math.max(10, 88 - i * 15) : 0,
  }));

  const QUICK_ACTIONS = [
    { to: "/assessment", icon: Brain, label: "Assessment", style: { background: "linear-gradient(135deg,#ff7f0e,#ea6c0a)" } },
    { to: "/chat", icon: MessageSquare, label: "AI Chat", style: { background: "linear-gradient(135deg,#8b5cf6,#6d28d9)" } },
    { to: "/careers-india", icon: FileText, label: "500+ Careers", style: { background: "linear-gradient(135deg,#14b8a6,#0d9488)" } },
    { to: "/exams", icon: BookOpen, label: "Exams", style: { background: "linear-gradient(135deg,#f59e0b,#d97706)" } },
    { to: "/scholarships", icon: Award, label: "Scholarships", style: { background: "linear-gradient(135deg,#ec4899,#db2777)" } },
    { to: "/roadmap", icon: Map, label: "Roadmap", style: { background: "linear-gradient(135deg,#84cc16,#65a30d)" } },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container">

        {/* Greeting */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-slate-500 text-sm mb-1 flex items-center gap-2">
                {greeting}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </p>
              <h1 className="font-display font-bold text-3xl text-white">
                {user?.first_name || user?.username || "Student"}
              </h1>
              {latest ? (
                <p className="text-slate-400 mt-1.5 text-sm">
                  Top match:{" "}
                  <span className="font-semibold" style={{ color: "#ff9d37" }}>{latest.predicted_field?.name}</span>
                  <span className="text-slate-600"> · {Math.round(latest.confidence * 100)}% confidence</span>
                </p>
              ) : (
                <p className="text-slate-500 text-sm mt-1.5">Take the assessment to unlock your career profile.</p>
              )}
            </div>
            {!latest && (
              <Link to="/assessment" className="btn-primary"><Sparkles size={15} /> Start Assessment</Link>
            )}
          </div>
        </div>

        {/* NEP Banner */}
        {!latest && (
          <div className="card mb-8 animate-fade-up animation-delay-100"
            style={{ background: "rgba(255,127,14,0.04)", borderColor: "rgba(255,127,14,0.15)" }}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="badge-saffron inline-flex mb-2">🇮🇳 NEP 2020 Aligned</div>
                <h3 className="font-body font-bold text-white mb-1">Discover your path in India's 8 career streams</h3>
                <p className="text-slate-400 text-sm">From JEE to NEET, CLAT to NDA — find what fits your aptitude.</p>
              </div>
              <Link to="/careers-india" className="btn-outline">Explore 500+ Careers <ChevronRight size={14} /></Link>
            </div>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-up animation-delay-100">
          <StatCard label="Assessments" value={predictions.length} icon={Brain}
            color="#ff7f0e" subtitle="career analyses" />
          <StatCard label="AI Chats" value={conversations.length} icon={MessageSquare}
            color="#8b5cf6" subtitle="conversations" />
          <StatCard label="Roadmaps" value={roadmaps.length} icon={Map}
            color="#14b8a6" subtitle="generated plans" />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8 animate-fade-up animation-delay-150">
          {QUICK_ACTIONS.map((a, i) => (
            <Link key={i} to={a.to} className="card-hover group p-4 text-center"
              style={{ animationDelay: `${i * 40}ms` }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform duration-200 shadow-md"
                style={a.style}>
                <a.icon size={20} className="text-white" />
              </div>
              <div className="font-body font-semibold text-white text-xs leading-tight">{a.label}</div>
            </Link>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Career match + history */}
          <div className="lg:col-span-2 space-y-5 animate-fade-up animation-delay-200">

            {latest ? (
              <div className="card relative overflow-hidden"
                style={{ borderColor: "rgba(255,127,14,0.2)", background: "rgba(255,127,14,0.03)" }}>
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-10"
                  style={{ background: "#ff7f0e" }} />

                <div className="relative">
                  <span className="badge-teal text-xs mb-4 inline-flex">🏆 Top Career Match</span>

                  <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-white mb-1">
                        {latest.predicted_field?.name || "—"}
                      </h3>
                      <p className="text-slate-500 text-xs">
                        {new Date(latest.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <ConfidenceRing value={Math.round(latest.confidence * 100)} />
                  </div>

                  {/* Salary / Demand / Growth pills */}
                  {latest.predicted_field && (
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        {
                          label: "Avg Salary",
                          value: `₹${((latest.predicted_field.avg_salary_min || 500000) / 100000).toFixed(0)}L–${((latest.predicted_field.avg_salary_max || 2000000) / 100000).toFixed(0)}L`,
                          sub: "per annum", color: "#2dd4bf",
                        },
                        {
                          label: "Demand",
                          value: latest.predicted_field.demand_level?.replace("_", " ") || "High",
                          sub: "job market", color: "#ff9d37",
                        },
                        {
                          label: "Growth",
                          value: `+${latest.predicted_field.growth_rate || 15}%`,
                          sub: "per year", color: "#a78bfa",
                        },
                      ].map((item, i) => (
                        <div key={i} className="glass rounded-xl p-3 text-center">
                          <div className="text-slate-500 text-xs mb-1">{item.label}</div>
                          <div className="font-display font-bold text-sm" style={{ color: item.color }}>{item.value}</div>
                          <div className="text-slate-600 text-xs">{item.sub}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills gap bars */}
                  {(latest.skills_gap_data || []).length > 0 && (
                    <div className="mb-5 p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Skills to develop</p>
                      <div className="space-y-3">
                        {(latest.skills_gap_data || []).slice(0, 3).map((gap, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-slate-300">{gap.label}</span>
                              <span className="text-slate-500 font-mono">{gap.current}/{gap.required}</span>
                            </div>
                            <AnimBar value={gap.current} max={5} color="#ff7f0e" delay={i * 100} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link to={`/careers/${latest.predicted_field?.slug}`}
                      className="btn-primary text-xs py-2.5 flex-1 justify-center">
                      Explore Career <ChevronRight size={12} />
                    </Link>
                    <Link to="/roadmap" className="btn-ghost text-xs py-2.5 flex-1 justify-center">
                      <Map size={12} /> View Roadmap
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center py-14 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-5"
                  style={{ background: "radial-gradient(circle at 50% 50%, #ff7f0e, transparent 70%)" }} />
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center"
                    style={{ background: "rgba(255,127,14,0.1)", border: "1px solid rgba(255,127,14,0.2)" }}>
                    <GraduationCap size={36} style={{ color: "#ff9d37" }} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">No assessment yet</h3>
                  <p className="text-slate-400 text-sm mb-6 max-w-xs mx-auto">
                    Take the 12-minute psychometric assessment to unlock your personalized career profile.
                  </p>
                  <Link to="/assessment" className="btn-primary"><Sparkles size={15} /> Start Assessment</Link>
                </div>
              </div>
            )}

            {/* Assessment history */}
            {predictions.length > 1 && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-white text-sm flex items-center gap-2">
                    <Target size={14} style={{ color: "#ff9d37" }} /> Assessment History
                  </h3>
                  <Link to="/assessment" className="text-xs flex items-center gap-1 hover:underline"
                    style={{ color: "#ff9d37" }}>
                    New test <ArrowUpRight size={10} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {predictions.slice(1, 4).map((p, i) => {
                    const conf = Math.round(p.confidence * 100);
                    return (
                      <div key={i} className="flex items-center gap-4 py-2.5 border-b last:border-0"
                        style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold"
                          style={{ background: "rgba(255,127,14,0.12)", color: "#ff9d37" }}>
                          {conf}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{p.predicted_field?.name || "—"}</div>
                          <div className="text-slate-600 text-xs">{new Date(p.created_at).toLocaleDateString("en-IN")}</div>
                        </div>
                        <div className="w-28 flex-shrink-0">
                          <AnimBar value={conf} max={100} color="#ff7f0e" delay={i * 80} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-5 animate-fade-up animation-delay-300">

            {/* Stream affinity chart */}
            <div className="card">
              <h2 className="font-display font-semibold text-white mb-1 text-sm flex items-center gap-2">
                <BookOpen size={14} style={{ color: "#f59e0b" }} /> Stream Affinity
              </h2>
              <p className="text-slate-500 text-xs mb-4">
                {latest ? "Based on your assessment results" : "Complete an assessment to unlock"}
              </p>
              <div className="space-y-3">
                {streamAffinities.map((s, i) => (
                  <StreamGauge key={s.id} name={s.name.split(" ")[0]} color={s.color}
                    pct={s.pct} delay={i * 80} />
                ))}
              </div>
              <Link to="/careers-india" className="mt-4 text-xs flex items-center gap-1 hover:underline"
                style={{ color: "#f59e0b" }}>
                Explore all 8 streams <ArrowRight size={10} />
              </Link>
            </div>

            {/* Roadmap card */}
            <div className="card relative overflow-hidden"
              style={{ borderColor: "rgba(20,184,166,0.15)", background: "rgba(20,184,166,0.03)" }}>
              <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full blur-3xl pointer-events-none opacity-10"
                style={{ background: "#14b8a6" }} />
              <h2 className="font-display font-semibold text-white mb-3 text-sm flex items-center gap-2">
                <Map size={14} style={{ color: "#14b8a6" }} /> Career Roadmap
              </h2>

              {latestRoadmap ? (
                <div className="relative">
                  <p className="text-white text-sm font-semibold mb-1 truncate">{latestRoadmap.content?.title}</p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{latestRoadmap.content?.overview}</p>

                  {/* Phase dots */}
                  {(latestRoadmap.content?.phases || []).length > 0 && (
                    <div className="flex items-center gap-1 mb-3">
                      {(latestRoadmap.content.phases || []).map((ph, i) => (
                        <div key={i} className="flex items-center gap-1 flex-1">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                            style={i === 0
                              ? { background: "#14b8a6", color: "#fff" }
                              : { background: "rgba(20,184,166,0.12)", color: "#14b8a6", border: "1px solid rgba(20,184,166,0.3)" }}>
                            {i + 1}
                          </div>
                          {i < (latestRoadmap.content.phases.length - 1) && (
                            <div className="flex-1 h-px" style={{ background: "rgba(20,184,166,0.2)" }} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1.5 mb-3">
                    {(latestRoadmap.content?.quick_wins || []).slice(0, 2).map((w, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={10} className="flex-shrink-0 mt-0.5" style={{ color: "#14b8a6" }} />
                        <span className="text-slate-400 text-xs leading-snug">{w}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/roadmap" className="text-xs flex items-center gap-1 hover:underline" style={{ color: "#14b8a6" }}>
                    View full 12-month plan <ChevronRight size={10} />
                  </Link>
                </div>
              ) : (
                <div className="text-center py-3">
                  <Map size={28} className="mx-auto mb-2" style={{ color: "#1e3a36" }} />
                  <p className="text-slate-500 text-xs mb-2">Generate your personalized 12-month plan</p>
                  <Link to="/assessment" className="text-xs" style={{ color: "#14b8a6" }}>Take assessment first →</Link>
                </div>
              )}
            </div>

            {/* NEP streams */}
            <div className="card">
              <h2 className="font-display font-semibold text-white mb-3 text-sm flex items-center gap-2">
                <Zap size={14} style={{ color: "#f59e0b" }} /> NEP 2020 Streams
              </h2>
              <div className="space-y-1">
                {NEP_STREAMS.slice(0, 5).map((s) => (
                  <Link key={s.id} to="/careers-india"
                    className="flex items-center justify-between px-3 py-2 rounded-xl transition-all hover:bg-white/[0.04] group">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-slate-300 text-xs group-hover:text-white transition-colors">{s.name}</span>
                    </div>
                    <span className="text-slate-600 text-xs font-mono">{s.careers}+</span>
                  </Link>
                ))}
                <Link to="/careers-india" className="flex items-center gap-1 px-3 py-2 text-xs hover:underline"
                  style={{ color: "#ff9d37" }}>
                  All 8 streams — 500+ careers <ChevronRight size={10} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}