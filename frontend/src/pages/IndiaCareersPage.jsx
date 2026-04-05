import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, ArrowRight } from "lucide-react";
import { CAREER_CARDS_500, NEP_STREAMS } from "../store/india";

const DEMAND_STYLE = {
  very_high: { badge: "badge-teal",    label: "Very High",  bar: "#14b8a6" },
  high:      { badge: "badge-saffron", label: "High",       bar: "#ff7f0e" },
  medium:    { badge: "badge-gold",    label: "Medium",     bar: "#f59e0b" },
  low:       { badge: "badge-slate",   label: "Low",        bar: "#64748b" },
};

export default function IndiaCareersPage() {  
  const [search, setSearch]       = useState("");
  const [activeStream, setStream] = useState("all");
  const [sortBy, setSort]         = useState("demand");
  const [page, setPage]           = useState(1);
  const PER_PAGE = 30;

  const DEMAND_ORDER = { very_high: 4, high: 3, medium: 2, low: 1 };

  const filtered = useMemo(() => {
    let list = CAREER_CARDS_500;
    if (activeStream !== "all") list = list.filter((c) => c.stream === activeStream);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.subfield.toLowerCase().includes(q));
    }
    if (sortBy === "demand") list = [...list].sort((a, b) => (DEMAND_ORDER[b.demand] || 0) - (DEMAND_ORDER[a.demand] || 0));
    if (sortBy === "growth") list = [...list].sort((a, b) => b.growth - a.growth);
    if (sortBy === "alpha")  list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [search, activeStream, sortBy]);

  const paged    = filtered.slice(0, page * PER_PAGE);
  const hasMore  = paged.length < filtered.length;
  const streamData = NEP_STREAMS.find((s) => s.id === activeStream);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container">
        <div className="mb-10 animate-fade-up">
          <div className="badge-saffron inline-flex mb-4">📋 Careers</div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">India 500+ Career Cards</h1>
          <p className="text-slate-400 max-w-2xl">
            Based on Ministry of Education's Career Guidance Book. Covers all 8 NEP 2020 streams.
            <span className="ml-2 text-slate-500">Currently showing {filtered.length} careers.</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 animate-fade-up animation-delay-100">
          <button onClick={() => { setStream("all"); setPage(1); }}
            className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all
              ${activeStream === "all" ? "text-white border-transparent" : "border-white/[0.08] text-slate-400 hover:text-slate-200"}`}
            style={activeStream === "all" ? { background: "rgba(255,127,14,0.2)", borderColor: "rgba(255,127,14,0.4)", color: "#ffc070" } : {}}>
            All Streams ({CAREER_CARDS_500.length})
          </button>
          {NEP_STREAMS.map((s) => (
            <button key={s.id} onClick={() => { setStream(s.id); setPage(1); }}
              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all
                ${activeStream === s.id ? "text-white border-transparent" : "border-white/[0.08] text-slate-400 hover:text-slate-200"}`}
              style={activeStream === s.id ? { background: s.color + "20", borderColor: s.color + "40", color: s.color } : {}}>
              {s.name} ({CAREER_CARDS_500.filter((c) => c.stream === s.id).length})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-8 animate-fade-up animation-delay-200">
          <div className="relative flex-1 min-w-48 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="input pl-10 h-10 text-sm" placeholder="Search careers..." value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select value={sortBy} onChange={(e) => setSort(e.target.value)} className="input h-10 text-sm min-w-40 cursor-pointer">
            <option value="demand">Sort by Demand</option>
            <option value="growth">Sort by Growth</option>
            <option value="alpha">Sort A-Z</option>
          </select>
          {(search || activeStream !== "all") && (
            <button onClick={() => { setSearch(""); setStream("all"); setPage(1); }}
              className="text-xs text-slate-500 hover:text-slate-300 px-3 transition-colors">
              Clear
            </button>
          )}
        </div>

        {streamData && (
          <div className="card mb-8 animate-fade-up p-5" style={{ borderColor: streamData.color + "25", background: streamData.color + "05" }}>
            <div className="flex items-start gap-4 flex-wrap">
              <div className="flex-1">
                <h3 className="font-body font-bold text-white mb-1">{streamData.name}</h3>
                <p className="text-slate-400 text-sm">{streamData.desc}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {streamData.exams.map((e) => <span key={e} className="badge-saffron text-xs">{e}</span>)}
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">No careers found. Try different search terms.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paged.map((career, i) => {
                const ds = DEMAND_STYLE[career.demand] || DEMAND_STYLE.medium;
                const stream = NEP_STREAMS.find((s) => s.id === career.stream);
                return (
                  <div key={career.id} className="card-hover group p-5 animate-fade-up" style={{ animationDelay: `${(i % 6) * 40}ms` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {stream && (
                            <span className="badge text-xs" style={{ background: stream.color + "15", color: stream.color, border: `1px solid ${stream.color}25` }}>
                              {stream.name.split(" ")[0]}
                            </span>
                          )}
                          <span className="text-slate-500 text-xs">{career.subfield}</span>
                        </div>
                        <h3 className="font-body font-bold text-white text-sm leading-snug">{career.name}</h3>
                      </div>
                      <span className={`${ds.badge} text-xs flex-shrink-0 ml-2`}>{ds.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div>
                        <span className="text-slate-600">Min Qualification</span>
                        <div className="text-slate-300 font-medium truncate">{career.minQual}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Avg Salary</span>
                        <div className="font-semibold" style={{ color: "#2dd4bf" }}>{career.avgSalary}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span>Market growth</span>
                        <span className="font-mono" style={{ color: ds.bar }}>+{career.growth}%/yr</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(career.growth * 2.5, 100)}%`, background: ds.bar, opacity: 0.7 }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {hasMore && (
              <div className="text-center mt-8">
                <button onClick={() => setPage((p) => p + 1)} className="btn-ghost">
                  Load More ({filtered.length - paged.length} remaining)
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-12 card text-center p-8" style={{ background: "rgba(255,127,14,0.04)", borderColor: "rgba(255,127,14,0.15)" }}>
          <h3 className="font-display font-bold text-xl text-white mb-2">Find which of these careers suits you best</h3>
          <p className="text-slate-400 text-sm mb-5">Take our psychometric assessment to get personalized career recommendations.</p>
          <Link to="/assessment" className="btn-primary">Start Free Assessment <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  );
}