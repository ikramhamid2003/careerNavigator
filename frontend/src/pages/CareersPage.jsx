import { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Search, Loader2, TrendingUp, DollarSign, MapPin,
  BookOpen, Briefcase, ArrowLeft, ExternalLink, ChevronRight,
  Filter, Wifi, BarChart2, Sparkles, Map, Zap,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { careersAPI } from "../services/api";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const DEMAND_BADGE = {
  very_high: "badge-green", high: "badge-blue", medium: "badge-orange",
  low: "text-slate-500 bg-slate-500/10 border border-slate-500/20",
};

function CareerIcon({ name, className }) {
  const Icon = LucideIcons[name] || LucideIcons.Briefcase;
  return <Icon className={className} />;
}

export function CareersPage() {
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState("");
  const [demandFilter, setDemandFilter] = useState("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    careersAPI.getFields()
      .then(({ data }) => setFields(data.results || data))
      .catch(() => toast.error("Failed to load careers"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return fields.filter((f) => {
      const q = search.toLowerCase();
      const matchSearch = !q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q);
      const matchDemand = demandFilter === "all" || f.demand_level === demandFilter;
      const matchRemote = !remoteOnly || f.remote_friendly;
      return matchSearch && matchDemand && matchRemote;
    });
  }, [fields, search, demandFilter, remoteOnly]);

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container">
        <div className="mb-10 animate-fade-up">
          <span className="badge-blue inline-flex mb-4"><TrendingUp size={12} /> Career Fields</span>
          <h1 className="section-title mb-3">Explore Career Paths</h1>
          <p className="section-subtitle">
            {fields.length} in-demand career fields with salary data, growth rates, required skills, and curated learning paths.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 animate-fade-up animation-delay-100">
          <div className="relative flex-1 min-w-48 max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input className="input pl-10 h-10 text-sm" placeholder="Search careers..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={demandFilter} onChange={(e) => setDemandFilter(e.target.value)}
            className="input h-10 text-sm pr-8 min-w-36 cursor-pointer">
            <option value="all">All Demand</option>
            <option value="very_high">Very High</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
          <button onClick={() => setRemoteOnly(!remoteOnly)}
            className={`flex items-center gap-2 px-4 h-10 rounded-xl border text-sm font-medium transition-all
              ${remoteOnly ? "bg-brand-500/20 text-brand-300 border-brand-500/30" : "border-white/[0.08] text-slate-500 hover:text-slate-300"}`}>
            <Wifi size={14} /> Remote Friendly
          </button>
          {(search || demandFilter !== "all" || remoteOnly) && (
            <button onClick={() => { setSearch(""); setDemandFilter("all"); setRemoteOnly(false); }}
              className="text-xs text-slate-500 hover:text-slate-300 px-3 transition-colors">
              Clear filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="w-7 h-7 text-brand-400 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500">No careers match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((field, i) => (
              <Link key={field.id} to={`/careers/${field.slug}`}
                className="card-hover group animate-fade-up"
                style={{ animationDelay: `${(i % 6) * 60}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <CareerIcon name={field.icon} className="w-5 h-5 text-brand-400" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`badge ${DEMAND_BADGE[field.demand_level] || "badge-blue"} text-xs`}>
                      {field.demand_level?.replace("_", " ")}
                    </span>
                    {field.remote_friendly && (
                      <span className="text-xs text-slate-500 flex items-center gap-0.5"><Wifi size={10} /> Remote</span>
                    )}
                  </div>
                </div>
                <h3 className="font-display font-semibold text-white mb-1 group-hover:text-brand-300 transition-colors">{field.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{field.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                  <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                    <DollarSign size={13} />
                    ${(field.avg_salary_min / 1000).toFixed(0)}k – ${(field.avg_salary_max / 1000).toFixed(0)}k
                  </div>
                  {field.growth_rate > 0 && (
                    <span className="text-xs text-brand-300 flex items-center gap-0.5">
                      <TrendingUp size={11} /> +{field.growth_rate}%
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CareerDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);

  useEffect(() => {
    careersAPI.getField(slug)
      .then(({ data }) => setField(data))
      .catch(() => toast.error("Career not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleGenerateRoadmap = async () => {
    if (!isAuthenticated) { toast.error("Sign in to generate your roadmap"); navigate("/login"); return; }
    setGeneratingRoadmap(true);
    try {
      await careersAPI.generateRoadmap(slug, null, {});
      toast.success("Roadmap generated! View it in your Dashboard.");
      navigate("/dashboard");
    } catch {
      toast.error("Roadmap generation failed");
    } finally { setGeneratingRoadmap(false); }
  };

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <Loader2 className="w-7 h-7 text-brand-400 animate-spin" />
    </div>
  );
  if (!field) return null;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container max-w-5xl">
        <Link to="/careers" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors">
          <ArrowLeft size={15} /> All Careers
        </Link>

        {/* Hero */}
        <div className="card mb-8 animate-fade-up">
          <div className="flex items-start justify-between flex-wrap gap-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                <CareerIcon name={field.icon} className="w-7 h-7 text-brand-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="font-display font-bold text-2xl text-white">{field.name}</h1>
                  <span className={`badge ${DEMAND_BADGE[field.demand_level] || "badge-blue"}`}>
                    {field.demand_level?.replace("_", " ")} demand
                  </span>
                  {field.remote_friendly && <span className="badge text-xs bg-white/[0.04] text-slate-400 border border-white/[0.08] flex items-center gap-1"><Wifi size={10} /> Remote</span>}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{field.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="text-emerald-400 font-display font-bold text-xl">
                ${field.avg_salary_min?.toLocaleString()} – ${field.avg_salary_max?.toLocaleString()}
              </div>
              <div className="text-slate-500 text-xs">Annual salary (USD)</div>
              {field.growth_rate > 0 && (
                <div className="text-brand-300 text-sm flex items-center gap-1">
                  <TrendingUp size={14} /> +{field.growth_rate}% growth / yr
                </div>
              )}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-white/[0.06]">
            <Link to="/assessment" className="btn-primary">
              <BarChart2 size={15} /> Take Assessment
            </Link>
            <button onClick={handleGenerateRoadmap} disabled={generatingRoadmap}
              className="btn-outline flex items-center gap-2">
              {generatingRoadmap ? <Loader2 size={14} className="animate-spin" /> : <Map size={14} />}
              Generate My Roadmap
            </button>
            <Link to="/chat" className="btn-ghost">
              <Sparkles size={14} /> Ask CareerAI
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Job Roles */}
            {field.job_roles?.length > 0 && (
              <div className="animate-fade-up animation-delay-200">
                <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <Briefcase size={17} className="text-brand-400" /> Job Roles
                </h2>
                <div className="space-y-4">
                  {field.job_roles.map((role) => (
                    <div key={role.id} className="card">
                      <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                        <div>
                          <h3 className="font-display font-semibold text-white">{role.title}</h3>
                          <p className="text-slate-400 text-sm mt-1">{role.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-emerald-400 font-medium text-sm">
                            ${role.salary_min?.toLocaleString()} – ${role.salary_max?.toLocaleString()}
                          </div>
                          <span className="badge badge-blue mt-1 capitalize">{role.experience_level?.replace("_", " ")}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(role.required_skills || []).map((s) => (
                          <span key={s} className="badge text-xs bg-white/[0.04] text-slate-400 border border-white/[0.08]">{s}</span>
                        ))}
                      </div>
                      {role.locations?.length > 0 && (
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                          <MapPin size={11} /> {role.locations.slice(0, 4).join(" · ")}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Courses */}
          <div className="animate-fade-up animation-delay-300">
            <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen size={17} className="text-brand-400" /> Learning Path
            </h2>
            <div className="space-y-3">
              {field.courses?.map((course) => (
                <a key={course.id} href={course.url} target="_blank" rel="noopener noreferrer"
                  className="card-hover block p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-white text-sm leading-snug flex-1">{course.title}</h4>
                    <ExternalLink size={12} className="text-slate-600 flex-shrink-0 mt-0.5" />
                  </div>
                  <div className="text-slate-500 text-xs mb-2">{course.provider}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge text-xs ${course.is_free ? "badge-green" : "badge-orange"}`}>
                      {course.is_free ? "Free" : "Paid"}
                    </span>
                    <span className="badge text-xs bg-white/[0.04] text-slate-500 border border-white/[0.08] capitalize">{course.level}</span>
                    {course.duration_hours > 0 && <span className="text-slate-600 text-xs">{course.duration_hours}h</span>}
                  </div>
                </a>
              ))}
            </div>
            <div className="card mt-4 text-center bg-brand-500/[0.04] border-brand-500/15 p-5">
              <Map size={24} className="text-brand-400 mx-auto mb-2" />
              <p className="text-slate-400 text-sm mb-3">Want a personalized step-by-step plan?</p>
              <button onClick={handleGenerateRoadmap} disabled={generatingRoadmap}
                className="btn-primary w-full justify-center text-sm py-2.5">
                {generatingRoadmap ? <><Loader2 size={13} className="animate-spin" /> Generating...</> : <><Zap size={13} /> Generate My Roadmap</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareersPage;
