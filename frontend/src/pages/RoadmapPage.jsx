import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, Loader2, Zap, BookOpen, Award, Target, Clock, CheckCircle2, Sparkles, ChevronRight, TrendingUp } from "lucide-react";
import { careersAPI } from "../services/api";
import toast from "react-hot-toast";

const PHASE_CONFIGS = [
  {
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
    ring: "ring-sky-500/30",
    bar: "bg-sky-500",
    dot: "bg-sky-400",
    glow: "shadow-sky-500/20",
  },
  {
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
    ring: "ring-violet-500/30",
    bar: "bg-violet-500",
    dot: "bg-violet-400",
    glow: "shadow-violet-500/20",
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    ring: "ring-emerald-500/30",
    bar: "bg-emerald-500",
    dot: "bg-emerald-400",
    glow: "shadow-emerald-500/20",
  },
  {
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
    ring: "ring-orange-500/30",
    bar: "bg-orange-500",
    dot: "bg-orange-400",
    glow: "shadow-orange-500/20",
  },
];

function PhaseProgressBar({ phases }) {
  return (
    <div className="relative flex items-center gap-0 mb-10">
      {phases.map((phase, i) => {
        const cfg = PHASE_CONFIGS[i % PHASE_CONFIGS.length];
        const isLast = i === phases.length - 1;
        return (
          <div key={i} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-lg ${cfg.glow} ring-2 ${cfg.ring}`}
              >
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </div>
              <span className={`text-[10px] font-medium ${cfg.text} whitespace-nowrap max-w-[60px] text-center leading-tight`}>
                {phase.duration || `Phase ${i + 1}`}
              </span>
            </div>
            {!isLast && (
              <div className="flex-1 h-[2px] mx-1 bg-white/[0.06] relative overflow-hidden rounded-full">
                <div className={`absolute inset-y-0 left-0 w-1/2 ${cfg.bar} opacity-40 rounded-full`} />
                <ChevronRight size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatBadge({ icon: Icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.07]`}>
      <Icon size={13} className={color} />
      <div>
        <p className="text-[10px] text-slate-500 leading-none mb-0.5">{label}</p>
        <p className="text-xs font-semibold text-slate-200 leading-none">{value}</p>
      </div>
    </div>
  );
}

function QuickWinCard({ win, index }) {
  return (
    <div
      className="group relative flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/10 hover:border-emerald-500/25 hover:bg-emerald-500/[0.09] transition-all duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-500/30 transition-colors">
        <CheckCircle2 size={13} className="text-emerald-400" />
      </div>
      <span className="text-slate-300 text-sm leading-relaxed">{win}</span>
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400/60 transition-colors" />
    </div>
  );
}

function PhaseCard({ phase, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const cfg = PHASE_CONFIGS[index % PHASE_CONFIGS.length];
  const totalItems =
    (Array.isArray(phase.milestones) ? phase.milestones.length : 0) +
    (Array.isArray(phase.resources) ? phase.resources.length : 0);

  return (
    <div
      className={`relative rounded-2xl border ${expanded ? cfg.border : "border-white/[0.08]"} bg-white/[0.025] overflow-hidden transition-all duration-300 hover:border-white/[0.14]`}
    >
      {/* Accent left bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${cfg.gradient} opacity-80`} />

      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start gap-4 p-5 pl-6 text-left"
      >
        {/* Phase number badge */}
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center flex-shrink-0 shadow-lg ${cfg.glow}`}
        >
          <span className="font-bold text-white text-lg">{phase.phase ?? index + 1}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h4 className="font-semibold text-white text-[15px] leading-tight">{phase.title}</h4>
              {phase.focus && (
                <p className={`text-sm mt-1 ${cfg.text} opacity-80`}>{phase.focus}</p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
              {phase.duration && (
                <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                  <Clock size={10} /> {phase.duration}
                </span>
              )}
              {phase.weekly_hours && (
                <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                  <Sparkles size={10} /> {phase.weekly_hours}h/wk
                </span>
              )}
              {totalItems > 0 && (
                <span className="text-[11px] text-slate-600 px-1.5">
                  {totalItems} items
                </span>
              )}
              <ChevronRight
                size={15}
                className={`text-slate-600 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Expandable body */}
      {expanded && (
        <div className="px-6 pb-5 pl-6 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {Array.isArray(phase.milestones) && phase.milestones.length > 0 && (
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-widest mb-3 ${cfg.text}`}>
                  Milestones
                </p>
                <ul className="space-y-2.5">
                  {phase.milestones.map((m, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0 mt-1.5 opacity-80`} />
                      <span className="text-slate-300 text-sm leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(phase.resources) && phase.resources.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-3 text-slate-600">
                  Resources
                </p>
                <ul className="space-y-2.5">
                  {phase.resources.map((res, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookOpen size={11} className="text-slate-500" />
                      </div>
                      <span className="text-slate-400 text-sm leading-relaxed">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RoadmapPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    careersAPI.getRoadmaps()
      .then(({ data }) => {
        const list = Array.isArray(data) ? data
          : Array.isArray(data.results) ? data.results
            : Array.isArray(data.data) ? data.data
              : Array.isArray(data.roadmaps) ? data.roadmaps
                : Array.isArray(data.items) ? data.items
                  : Object.values(data).find((v) => Array.isArray(v)) ?? [];
        setRoadmaps(list);
        if (list.length > 0) setActive(list[0]);
      })
      .catch(() => toast.error("Failed to load roadmaps"))
      .finally(() => setLoading(false));
  }, []);

  const getRoadmapContent = (item) => {
    if (!item) return null;
    const raw = item.content && typeof item.content === "object" ? item.content : item;
    return {
      title: raw.title || "Your Career Journey",
      overview: raw.overview || "",
      quick_wins: Array.isArray(raw.quick_wins) ? raw.quick_wins : [],
      phases: Array.isArray(raw.phases) ? raw.phases : [],
      certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
      job_titles_to_target: Array.isArray(raw.job_titles_to_target) ? raw.job_titles_to_target : [],
    };
  };

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center">
            <Map size={22} className="text-sky-400" />
          </div>
          <Loader2 className="absolute -inset-1 w-14 h-14 text-sky-500/30 animate-spin" />
        </div>
        <p className="text-slate-500 text-sm">Loading your roadmap…</p>
      </div>
    </div>
  );

  if (roadmaps.length === 0) return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container max-w-2xl text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-500/20">
          <Map size={36} className="text-emerald-400" />
        </div>
        <h1 className="font-display font-bold text-3xl text-white mb-3">No roadmap yet</h1>
        <p className="text-slate-400 mb-6">Complete the assessment to generate your personalized career roadmap.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/assessment" className="btn-primary">Take Assessment</Link>
          <Link to="/careers" className="btn-outline">Browse Careers</Link>
        </div>
      </div>
    </div>
  );

  const r = getRoadmapContent(active);
  const totalPhases = r.phases.length;
  const totalWeeks = r.phases.reduce((acc, p) => {
    const match = (p.duration || "").match(/(\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);
  const totalHours = r.phases.reduce((acc, p) => acc + (p.weekly_hours || 0), 0);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container max-w-4xl">

        {/* ── Hero header ── */}
        <div className="relative mb-8 animate-fade-up">
          {/* Background glow blob */}
          <div className="absolute -top-10 -left-10 w-64 h-40 bg-sky-500/[0.06] rounded-full blur-3xl pointer-events-none" />

          <span className="badge-green inline-flex mb-4 relative">
            <Map size={12} /> Career Roadmap
          </span>

          <div className="flex items-start justify-between gap-4 flex-wrap relative">
            <div>
              <h1 className="font-display font-bold text-3xl text-white mb-2 leading-tight">
                {r.title}
              </h1>
              {r.overview && (
                <p className="text-slate-400 max-w-2xl leading-relaxed">{r.overview}</p>
              )}
            </div>

            {/* Quick stats */}
            {totalPhases > 0 && (
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                <StatBadge icon={Target} label="Phases" value={`${totalPhases} phases`} color="text-sky-400" />
                {totalWeeks > 0 && (
                  <StatBadge icon={Clock} label="Timeline" value={`${totalWeeks} months`} color="text-violet-400" />
                )}
                {totalHours > 0 && (
                  <StatBadge icon={TrendingUp} label="Effort" value={`${totalHours}h/wk avg`} color="text-emerald-400" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Roadmap selector tabs ── */}
        {roadmaps.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-8">
            {roadmaps.map((rm) => (
              <button
                key={rm.id}
                onClick={() => setActive(rm)}
                className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                  active?.id === rm.id
                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
                    : "text-slate-500 border-white/[0.08] hover:text-slate-300"
                }`}
              >
                {rm.career_field?.name || rm.content?.title || "Roadmap"}
              </button>
            ))}
          </div>
        )}

        {/* ── Phase progress overview ── */}
        {r.phases.length > 0 && (
          <div className="card mb-8 border-white/[0.08] animate-fade-up animation-delay-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.03] to-transparent pointer-events-none" />
            <h3 className="font-display font-semibold text-white mb-6 flex items-center gap-2 relative">
              <div className="w-6 h-6 rounded-lg bg-sky-500/15 flex items-center justify-center">
                <Target size={13} className="text-sky-400" />
              </div>
              12-Month Journey
            </h3>
            <PhaseProgressBar phases={r.phases} />
          </div>
        )}

        {/* ── Quick wins ── */}
        {r.quick_wins.length > 0 && (
          <div className="mb-8 animate-fade-up animation-delay-100">
            <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Zap size={13} className="text-emerald-400" />
              </div>
              Quick Wins to Start Now
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {r.quick_wins.map((w, i) => (
                <QuickWinCard key={i} win={w} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Phase cards ── */}
        {r.phases.length > 0 && (
          <div className="space-y-3 animate-fade-up animation-delay-200">
            <h3 className="font-display font-semibold text-white flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <Target size={13} className="text-violet-400" />
              </div>
              Phase Breakdown
            </h3>
            {r.phases.map((phase, i) => (
              <PhaseCard key={i} phase={phase} index={i} />
            ))}
          </div>
        )}

        {/* ── Certifications & Job Titles ── */}
        {(r.certifications.length > 0 || r.job_titles_to_target.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8 animate-fade-up animation-delay-300">
            {r.certifications.length > 0 && (
              <div className="card border-orange-500/15 bg-orange-500/[0.03] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/[0.07] rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
                <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2 relative">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/15 flex items-center justify-center">
                    <Award size={13} className="text-orange-400" />
                  </div>
                  Certifications
                </h4>
                <ul className="space-y-2.5 relative">
                  {r.certifications.map((c, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={11} className="text-orange-400" />
                      </div>
                      <span className="text-slate-300 text-sm">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {r.job_titles_to_target.length > 0 && (
              <div className="card border-sky-500/15 bg-sky-500/[0.03] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/[0.07] rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
                <h4 className="font-display font-semibold text-white mb-4 flex items-center gap-2 relative">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/15 flex items-center justify-center">
                    <Target size={13} className="text-sky-400" />
                  </div>
                  Target Job Titles
                </h4>
                <div className="flex flex-wrap gap-2 relative">
                  {r.job_titles_to_target.map((title, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-300 border border-sky-500/20 hover:bg-sky-500/15 transition-colors"
                    >
                      <div className="w-1 h-1 rounded-full bg-sky-400" />
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CTA footer ── */}
        <div className="flex gap-3 mt-10 animate-fade-up animation-delay-300">
          <Link
            to="/chat"
            className="btn-primary flex-1 justify-center gap-2"
          >
            <Sparkles size={14} />
            Ask AI About This Roadmap
          </Link>
          <Link to="/assessment" className="btn-outline">
            Retake Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}