import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ExternalLink, Award, Calendar, IndianRupee, Users, ChevronRight } from "lucide-react";
import { SCHOLARSHIPS, NEP_STREAMS } from "../store/india";

export default function ScholarshipsPage() {
  const [search, setSearch]       = useState("");
  const [activeStream, setStream] = useState("all");
  const [selected, setSelected]   = useState(SCHOLARSHIPS[0]);

  const filtered = useMemo(() => {
    let list = SCHOLARSHIPS;
    if (activeStream !== "all") list = list.filter((s) => s.stream === "all" || s.stream === activeStream);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeStream]);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container">
        <div className="mb-8 animate-fade-up">
          <div className="badge-gold inline-flex mb-4">🎓 Scholarships</div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Scholarship Finder</h1>
          <p className="text-slate-400 max-w-2xl">
            Government scholarships, state schemes, and private fellowships — filtered by stream, income, caste category, and state.
            Most are listed on the <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#ff9d37" }}>Schol Nsp</a>.
          </p>
        </div>

        <div className="card p-4 mb-6 animate-fade-up animation-delay-100 flex items-start gap-3"
          style={{ background: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}>
          <IndianRupee size={18} style={{ color: "#fbbf24" }} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm" style={{ color: "#fde68a" }}>
            <strong>Pro Tip:</strong> Register on the <a href="https://Scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="underline">Scholarship Nsp</a> — one application for multiple central government SCHOLARSHIPS. Aadhaar linking is mandatory.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-5 animate-fade-up animation-delay-200">
          {["all", ...NEP_STREAMS.map((s) => s.id)].map((sid) => {
            const s = NEP_STREAMS.find((st) => st.id === sid);
            const count = sid === "all" ? SCHOLARSHIPS.length : SCHOLARSHIPS.filter((sc) => sc.stream === "all" || sc.stream === sid).length;
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
          <input className="input pl-10 h-10 text-sm" placeholder="Search SCHOLARSHIPS" value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up animation-delay-300">
          <div className="lg:col-span-1 space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filtered.map((sch, i) => (
              <button key={i} onClick={() => setSelected(sch)}
                className={`w-full text-left card p-4 transition-all ${selected?.name === sch.name ? "" : "hover:border-white/[0.12]"}`}
                style={selected?.name === sch.name ? { borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.04)" } : {}}>
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)" }}>
                    <Award size={13} style={{ color: "#fbbf24" }} />
                  </div>
                  <span className="text-white font-semibold text-xs leading-tight">{sch.name}</span>
                </div>
                <div className="text-slate-500 text-xs mb-1">{sch.provider}</div>
                <div className="font-mono text-xs font-bold" style={{ color: "#2dd4bf" }}>{sch.amount}</div>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-slate-500 text-sm text-center py-8">Scholarshiparship No Found</p>}
          </div>

          {selected && (
            <div className="lg:col-span-2 space-y-5">
              <div className="card" style={{ borderColor: "rgba(245,158,11,0.15)", background: "rgba(245,158,11,0.03)" }}>
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <h2 className="font-display font-bold text-xl text-white mb-1">{selected.name}</h2>
                    <p className="text-slate-400 text-sm">{selected.provider}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-2xl" style={{ color: "#2dd4bf" }}>{selected.amount}</div>
                    <div className="text-slate-500 text-xs">Scholarshiparship Per Year</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="glass rounded-xl p-4">
                    <div className="text-slate-500 text-xs mb-1.5 flex items-center gap-1">
                      <Users size={11} /> Scholarship Eligibility
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed">{selected.eligibility}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="text-slate-500 text-xs mb-1.5 flex items-center gap-1">
                      <Calendar size={11} /> Scholarship Deadline
                    </div>
                    <p className="text-white font-semibold text-sm">{selected.deadline}</p>
                    <p className="text-slate-500 text-xs mt-1">Scholarship Deadline Sub</p>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  {selected.link ? (
                    <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn-teal text-sm">
                      Scholarship Apply Nsp <ExternalLink size={13} />
                    </a>
                  ) : (
                    <a href="https://SCHOLARSHIPS.gov.in" target="_blank" rel="noopener noreferrer" className="btn-teal text-sm">
                      Scholarship Nsp <ExternalLink size={13} />
                    </a>
                  )}
                  <Link to="/chat" className="btn-ghost text-sm"> Ask Ai</Link>
                </div>
              </div>

              <div className="card">
                <h3 className="font-body font-bold text-white mb-4 flex items-center gap-2">
                  📋 Scholarship Checklist Title
                </h3>
                <div className="space-y-2.5">
                  {[
                    "Aadhaar card (mandatory for NSP)",
                    "Income certificate from Tehsildar/SDM (< 1 month old)",
                    "Class 10 & 12 marksheets",
                    "Caste/community certificate (if applicable)",
                    "Bank account in student's name (linked to Aadhaar)",
                    "Bonafide certificate from your current institution",
                    "Passport-size photograph (JPEG, < 200KB)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: "rgba(255,127,14,0.3)", background: "rgba(255,127,14,0.08)" }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ff9d37" }} />
                      </div>
                      <span className="text-slate-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}