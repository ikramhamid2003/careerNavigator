import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Building2, ChevronRight, X, ArrowLeft } from "lucide-react";
import { TOP_COLLEGES, NEP_STREAMS } from "../store/india";

const TYPE_COLORS = {
  "IIT": "#0ca1e8", "NLU": "#8b5cf6", "AIIMS": "#ef4444", "IIM": "#10b981",
  "NID": "#ec4899", "Deemed": "#f59e0b", "IIT Design": "#ec4899",
  "Agricultural University": "#84cc16", "Training Academy": "#6b7280",
  "Government": "#3b82f6", "Autonomous": "#f59e0b", "State University": "#a855f7",
  "Self-Financing": "#64748b", "Government-Aided": "#06b6d4",
  "Private": "#f97316", "Private-Aided": "#10b981",
};

const COLLEGE_DETAILS = {
  "IIT Madras":      { exam: "JEE Advanced", cutoff: "~99.8 percentile JEE Main", hostel: "Yes — all students", placement: "₹20L–1Cr+", known: "CS, Ocean Engg, Management — India's #1" },
  "IIT Bombay":      { exam: "JEE Advanced", cutoff: "~99.5 percentile JEE Main", hostel: "Yes — all students", placement: "₹20L–1Cr+", known: "CS, Aerospace, Chem Engg" },
  "AIIMS Delhi":     { exam: "NEET UG", cutoff: "700+/720 in NEET", hostel: "Yes — all students", placement: "MD/MS + Residency", known: "Medicine, Research, Nursing" },
  "NLSIU Bangalore": { exam: "CLAT", cutoff: "Top 80 AIR CLAT", hostel: "Yes", placement: "₹6–22 LPA", known: "Top NLU — BA LLB, LLM, PhD" },
};

export default function CollegesPage() {
  const [search, setSearch]         = useState("");
  const [activeStream, setStream]   = useState("all");
  const [selected, setSelected]     = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = useMemo(() => {
    let list = TOP_COLLEGES;
    if (activeStream !== "all") list = list.filter((c) => c.stream === activeStream);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeStream]);

  const handleSelect = (college) => { setSelected(college); setShowDetail(true); };

  const streamInfo = NEP_STREAMS.find((s) => s.id === selected?.stream);
  const typeColor  = TYPE_COLORS[selected?.type] || "#ff7f0e";
  const details    = selected ? COLLEGE_DETAILS[selected.name] : null;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container">
        <div className="mb-8 animate-fade-up">
          <div className="badge-teal inline-flex mb-4">Colleges</div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Top Colleges & Universities</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-5 animate-fade-up animation-delay-100">
          {["all", ...NEP_STREAMS.map((s) => s.id)].map((sid) => {
            const s     = NEP_STREAMS.find((st) => st.id === sid);
            const count = sid === "all" ? TOP_COLLEGES.length : TOP_COLLEGES.filter((c) => c.stream === sid).length;
            if (sid !== "all" && !count) return null;
            return (
              <button key={sid} onClick={() => setStream(sid)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all
                  ${activeStream === sid ? "text-white" : "border-white/[0.08] text-slate-400 hover:text-slate-200"}`}
                style={activeStream === sid ? { background: (s?.color || "#ff7f0e") + "20", borderColor: (s?.color || "#ff7f0e") + "40", color: s?.color || "#ff9d37" } : {}}>
                {sid === "all" ? `All (${count})` : `${s?.name.split(" ")[0]} (${count})`}
              </button>
            );
          })}
        </div>

        <div className="relative mb-6 max-w-md animate-fade-up animation-delay-200">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input className="input pl-10 h-10 text-sm w-full" placeholder="Search Colleges" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up animation-delay-300">
          <div className={`lg:col-span-1 space-y-2 lg:max-h-[680px] lg:overflow-y-auto pr-1 ${showDetail ? "hidden lg:block" : "block"}`}>
            {filtered.map((college, i) => {
              const tc = TYPE_COLORS[college.type] || "#ff7f0e";
              const isSelected = selected?.name === college.name;
              return (
                <button key={i} onClick={() => handleSelect(college)}
                  className={`w-full text-left card p-4 transition-all ${!isSelected ? "hover:border-white/[0.12]" : ""}`}
                  style={isSelected ? { borderColor: tc + "40", background: tc + "05" } : {}}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-white font-bold text-sm leading-tight">{college.name}</span>
                    {college.nirf && <span className="badge-gold text-xs flex-shrink-0">NIRF #{college.nirf}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                    <MapPin size={10} />
                    <span>{college.city}{college.state ? `, ${college.state}` : ""}</span>
                    <span className="text-xs font-medium" style={{ color: tc }}>{college.type}</span>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Colleges No Found</p>}
          </div>

          {selected && (
            <div className="hidden lg:block lg:col-span-2 space-y-5">
              <DetailCard selected={selected} typeColor={typeColor} streamInfo={streamInfo} details={details} />
              <div className="flex gap-3">
                <Link to="/exams" className="btn-primary flex-1 justify-center">
                  Colleges Entry Req <ChevronRight size={15} />
                </Link>
                <Link to="/scholarships" className="btn-ghost flex-1 justify-center">
                  Colleges See Scholarships
                </Link>
              </div>
            </div>
          )}
        </div>

        {showDetail && selected && (
          <div className="fixed inset-0 z-50 bg-[#0a0a0f] overflow-y-auto lg:hidden">
            <div className="sticky top-0 z-10 bg-[#0a0a0f]/95 backdrop-blur border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
              <button onClick={() => setShowDetail(false)} className="p-2 rounded-xl hover:bg-white/[0.06] text-slate-400 transition-colors flex-shrink-0">
                <ArrowLeft size={18} />
              </button>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">{selected.name}</p>
                <p className="text-slate-500 text-xs">{selected.city}</p>
              </div>
            </div>
            <div className="p-4 space-y-5">
              <DetailCard selected={selected} typeColor={typeColor} streamInfo={streamInfo} details={details} />
              <div className="flex gap-3">
                <Link to="/exams" className="btn-primary flex-1 justify-center" onClick={() => setShowDetail(false)}>
                  Colleges Entry Req <ChevronRight size={15} />
                </Link>
                <Link to="/scholarships" className="btn-ghost flex-1 justify-center" onClick={() => setShowDetail(false)}>
                  Colleges See Scholarships
                </Link>
              </div>
              <div className="h-6" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailCard({ selected, typeColor, streamInfo, details }) {
  return (
    <div className="card" style={{ borderColor: typeColor + "25", background: typeColor + "04" }}>
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: typeColor + "18" }}>
          <Building2 size={22} style={{ color: typeColor }} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">{selected.name}</h2>
            {selected.nirf && <span className="badge-gold text-xs flex-shrink-0">NIRF #{selected.nirf}</span>}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
            <MapPin size={12} />
            <span>{selected.city}{selected.state ? `, ${selected.state}` : ""}</span>
            <span className="font-medium" style={{ color: typeColor }}>{selected.type}</span>
            {selected.founded && <span>Est. {selected.founded}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {[
          { label: "Colleges Annual Intake", val: selected.intake },
          { label: "Colleges Known For",     val: selected.known   },
          { label: "Colleges Stream",         val: streamInfo?.name },
        ].filter((item) => item.val).map((item, i) => (
          <div key={i} className="glass rounded-xl p-3">
            <div className="text-slate-500 text-xs mb-1">{item.label}</div>
            <div className="text-white text-xs font-semibold leading-snug">{item.val}</div>
          </div>
        ))}
      </div>

      {details && (
        <div className="space-y-2">
          <h4 className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">Colleges Key Facts</h4>
          {Object.entries(details).map(([k, v]) => (
            <div key={k} className="flex items-start gap-3 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              <span className="text-slate-500 text-xs capitalize w-24 flex-shrink-0">{k.replace(/([A-Z])/g, " $1")}</span>
              <span className="text-slate-200 text-xs leading-snug">{v}</span>
            </div>
          ))}
        </div>
      )}

      {!details && selected.known && (
        <div className="glass rounded-xl p-4">
          <p className="text-slate-300 text-sm leading-relaxed">{selected.known}</p>
        </div>
      )}
    </div>
  );
}