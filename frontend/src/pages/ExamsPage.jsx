import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ExternalLink, Calendar, Users, Target, ChevronRight, AlertCircle } from "lucide-react";
import { ENTRANCE_EXAMS, NEP_STREAMS } from "../store/india";

const IMP_STYLE = {
  critical: { badge: "badge-rose",    label: "Critical",  color: "#fb7185" },
  high:     { badge: "badge-saffron", label: "High",      color: "#ff9d37" },
  medium:   { badge: "badge-gold",    label: "Medium",    color: "#fbbf24" },
};

export default function ExamsPage() {
  const [search, setSearch]       = useState("");
  const [activeStream, setStream] = useState("all");
  const [selected, setSelected]   = useState(ENTRANCE_EXAMS[0]);

  const filtered = useMemo(() => {
    let list = ENTRANCE_EXAMS;
    if (activeStream !== "all") list = list.filter((e) => e.stream === activeStream);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q) || e.full.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeStream]);

  const PREP_TIPS = {
    "jee-main":    ["Master NCERT Class 11-12 PCM first", "Practice previous 10 years' papers", "Join a test series (Allen, Resonance, Fiitjee)", "Focus on weak topics daily", "Attempt full mocks weekly from Nov"],
    "neet-ug":     ["Biology is 50% of NEET — master every NCERT diagram", "Physics and Chemistry from NCERT + HC Verma", "Solve 3000+ MCQs before the exam", "Target 550+ in mocks", "NCERT is the Bible — read 3+ times"],
    "upsc-cse":    ["Read The Hindu + Indian Express daily", "NCERT Class 6-12 for basics", "Laxmikanth for Polity, Bipin Chandra for History", "Current Affairs from PIB, PRS", "Answer writing practice from Day 1"],
    "clat":        ["Read 2 newspapers daily for comprehension", "Strong fundamentals in Legal Reasoning", "Elementary Math and Quantitative Aptitude", "Current GK — focus on legal news", "Mock tests from CLAT Consortium"],
    "ca-foundation":["ICAI Study Material is primary", "Practice Problems to Solutions ratio 70:30", "Join a CA coaching class (face-to-face or online)", "Mock tests from ICAI"],
  };

  const tips = PREP_TIPS[selected?.id] || [
    "Read official notification thoroughly",
    "Follow official syllabus strictly",
    "Practice with previous years' papers",
    "Join online communities and study groups",
    "Attempt mock tests regularly",
  ];

  const streamInfo = NEP_STREAMS.find((s) => s.id === selected?.stream);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container">
        <div className="mb-8 animate-fade-up">
          <div className="badge-teal inline-flex mb-4">📋 Exams</div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">India's Major Entrance Exams</h1>
          <p className="text-slate-400 max-w-2xl">
            Complete guide to 20+ national entrance exams — dates, eligibility, seat count, preparation tips, and official links.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 animate-fade-up animation-delay-100">
          <button onClick={() => setStream("all")}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all
              ${activeStream === "all" ? "text-white" : "border-white/[0.08] text-slate-400 hover:text-slate-200"}`}
            style={activeStream === "all" ? { background: "rgba(255,127,14,0.2)", borderColor: "rgba(255,127,14,0.4)" } : {}}>
            Exams All ({ENTRANCE_EXAMS.length})
          </button>
          {NEP_STREAMS.map((s) => {
            const count = ENTRANCE_EXAMS.filter((e) => e.stream === s.id).length;
            if (!count) return null;
            return (
              <button key={s.id} onClick={() => setStream(s.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all
                  ${activeStream === s.id ? "text-white" : "border-white/[0.08] text-slate-400 hover:text-slate-200"}`}
                style={activeStream === s.id ? { background: s.color + "20", borderColor: s.color + "40", color: s.color } : {}}>
                {s.name.split(" ")[0]} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative mb-6 max-w-md animate-fade-up animation-delay-200">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input className="input pl-10 h-10 text-sm" placeholder="Search Exams" value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up animation-delay-300">
          <div className="lg:col-span-1 space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filtered.map((exam) => {
              const imp = IMP_STYLE[exam.importance] || IMP_STYLE.medium;
              return (
                <button key={exam.id} onClick={() => setSelected(exam)}
                  className={`w-full text-left card p-4 transition-all ${selected?.id === exam.id ? "border-saffron-500/30" : "hover:border-white/[0.12]"}`}
                  style={selected?.id === exam.id ? { borderColor: "rgba(255,127,14,0.3)", background: "rgba(255,127,14,0.04)" } : {}}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-white font-bold text-sm">{exam.name}</span>
                    <span className={`${imp.badge} text-xs flex-shrink-0`}>{imp.label}</span>
                  </div>
                  <div className="text-slate-500 text-xs line-clamp-1 mb-2">{exam.full}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {exam.month}</span>
                    {exam.seats && <span className="flex items-center gap-1"><Users size={10} /> {exam.seats}</span>}
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Exams No Found</p>}
          </div>

          {selected && (
            <div className="lg:col-span-2 space-y-5">
              <div className="card" style={{ borderColor: "rgba(255,127,14,0.15)", background: "rgba(255,127,14,0.03)" }}>
                <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-display font-bold text-2xl text-white">{selected.name}</h2>
                      <span className={`${(IMP_STYLE[selected.importance] || IMP_STYLE.medium).badge} text-xs`}>
                        {(IMP_STYLE[selected.importance] || IMP_STYLE.medium).label}
                      </span>
                      {streamInfo && (
                        <span className="badge text-xs" style={{ background: streamInfo.color + "15", color: streamInfo.color, border: `1px solid ${streamInfo.color}25` }}>
                          {streamInfo.name.split(" ")[0]}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm font-medium">{selected.full}</p>
                  </div>
                  {selected.official && (
                    <a href={selected.official} target="_blank" rel="noopener noreferrer" className="btn-teal text-xs py-2 px-4 flex-shrink-0">
                      Exams Official Site <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-5">{selected.desc}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Exams Conducted", val: selected.conducted },
                    { label: "Exams Level",     val: selected.level?.replace("_"," ") || "National" },
                    { label: "Exams Month",     val: selected.month },
                    { label: "Exams Seats",     val: selected.seats || "Varies" },
                  ].map((item, i) => (
                    <div key={i} className="glass rounded-xl p-3">
                      <div className="text-slate-500 text-xs mb-1">{item.label}</div>
                      <div className="text-white text-sm font-semibold capitalize">{item.val}</div>
                    </div>
                  ))}
                </div>

                {selected.importance === "critical" && (
                  <div className="flex items-start gap-2 p-3 rounded-xl mb-4" style={{ background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.2)" }}>
                    <AlertCircle size={14} className="text-rose-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm" style={{ color: "#fda4af" }}>Exams Critical Warning</p>
                  </div>
                )}
              </div>

              <div className="card">
                <h3 className="font-body font-bold text-white mb-4 flex items-center gap-2">
                  <Target size={16} style={{ color: "#ff9d37" }} /> Exams Prep Strategy
                </h3>
                <ul className="space-y-2.5">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-xs font-bold"
                        style={{ background: "rgba(255,127,14,0.15)", color: "#ff9d37" }}>{i + 1}</div>
                      <span className="text-slate-300 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Link to="/chat" className="btn-primary flex-1 justify-center">
                  Exams Ask Ai {selected.name} <ChevronRight size={15} />
                </Link>
                <Link to="/assessment" className="btn-ghost flex-1 justify-center">
                  Exams Find Careers
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}