import { Link } from "react-router-dom";
import {
  ArrowRight, GraduationCap, BookOpen, FlaskConical, Shield,
  TrendingUp, Palette, Leaf, Wrench, Heart, Sparkles,
  Brain, Map, Users, Building2, Star, ChevronRight,
  Award, Globe, Zap, MessageSquare, FileText,
} from "lucide-react";
import { NEP_STREAMS, ENTRANCE_EXAMS } from "../store/india";

const ICON_MAP = { FlaskConical, Shield, TrendingUp, BookOpen, Palette, Heart, Leaf, Wrench, Brain, Building2, GraduationCap, Users };

const STATS = [
  { value: "500+",   labelKey: "stat_careers",     subKey: "stat_careers_sub"     },
  { value: "20+",    labelKey: "stat_exams",        subKey: "stat_exams_sub"       },
  { value: "1,000+", labelKey: "stat_colleges",     subKey: "stat_colleges_sub"    },
  { value: "22",     labelKey: "stat_langs",        subKey: "stat_langs_sub"       },
];

const FEATURES = [
  { icon: Brain,        titleKey: "feat_psych_title",    descKey: "feat_psych_desc",    badge: "Psychometric" },
  { icon: Map,          titleKey: "feat_roadmap_title",  descKey: "feat_roadmap_desc",  badge: "NEP 2020"     },
  { icon: FileText,     titleKey: "feat_500_title",      descKey: "feat_500_desc",      badge: "500+ Careers" },
  { icon: BookOpen,     titleKey: "feat_exam_title",     descKey: "feat_exam_desc",     badge: "All Exams"    },
  { icon: Building2,    titleKey: "feat_college_title",  descKey: "feat_college_desc",  badge: "NIRF Ranked"  },
  { icon: Award,        titleKey: "feat_schol_title",    descKey: "feat_schol_desc",    badge: "₹ Scholarships"},
  { icon: Users,        titleKey: "feat_multi_title",    descKey: "feat_multi_desc",    badge: "Multi-Role"   },
  { icon: Globe,        titleKey: "feat_lang_title",     descKey: "feat_lang_desc",     badge: "22 Languages" },
];

const HOW_STEPS = [
  { num: "01", icon: GraduationCap, titleKey: "how1_title", descKey: "how1_desc" },
  { num: "02", icon: Brain,          titleKey: "how2_title", descKey: "how2_desc" },
  { num: "03", icon: BookOpen,       titleKey: "how3_title", descKey: "how3_desc" },
  { num: "04", icon: Map,            titleKey: "how4_title", descKey: "how4_desc" },
];

const TESTIMONIALS = [
  { name: "Ananya S.", cls: "Class 12, Chennai", textKey: "testimonial1", lang: "Tamil",   avatar: "A" },
  { name: "Rohan K.",  cls: "Class 11, Jaipur",  textKey: "testimonial2", lang: "Hindi",   avatar: "R" },
  { name: "Priya M.",  cls: "Class 10, Pune",    textKey: "testimonial3", lang: "English", avatar: "P" },
];

export default function HomePage() {

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-grid-dots bg-dots-lg" />
        <div className="absolute inset-0 bg-radial-saffron" />
        <div className="absolute inset-0 bg-radial-teal" />
        {["🎓","⚗️","🏛️","🎨","⚖️","🚀","🩺","🌾"].map((e, i) => (
          <div key={i} className="absolute text-2xl opacity-10 animate-float hidden md:block select-none"
            style={{ top: `${15+i*10}%`, left: `${5+(i%4)*22}%`, animationDelay: `${i*0.8}s`, animationDuration: `${5+i*0.5}s` }}>
            {e}
          </div>
        ))}

        <div className="page-container relative z-10 py-24">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-warm text-sm font-medium"
                style={{ borderColor: "rgba(255,127,14,0.25)", color: "#ffc070" }}>
                <span>🇮🇳</span>
                <span>Aligned with National Education Policy 2020</span>
              </div>
            </div>

            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6 animate-fade-up animation-delay-100">
              "Find Your Path in India's New Education Era"
            </h1>
            <p className="text-slate-400 text-xl leading-relaxed mb-4 max-w-3xl animate-fade-up animation-delay-200">
              "Aligned with NEP 2020 · 500+ Career Cards · Entrance Exam Guide · Scholarship Finder"
            </p>
            <p className="text-slate-500 text-base mb-10 max-w-2xl animate-fade-up animation-delay-200">
              "From Class 8 career exploration to college admissions — your complete guide."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up animation-delay-300">
              <Link to="/assessment" className="btn-primary text-base px-8 py-4 group">
                "Start Free Assessment"
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/careers-india" className="btn-ghost text-base px-8 py-4">
                <BookOpen size={18} /> "Explore 500+ Careers"
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 border-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i*80}ms` }}>
                <div className="font-display font-bold text-4xl gradient-text mb-1">{s.value}</div>
                <div className="text-white text-sm font-medium">{s.labelKey || s.labelKey.replace("stat_","").replace("_"," ")}</div>
                <div className="text-slate-600 text-xs mt-0.5">{s.subKey || ""}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEP STREAMS ── */}
      <section className="py-24">
        <div className="page-container">
          <div className="text-center mb-14">
            <div className="badge-saffron inline-flex mb-4">🇮🇳 NEP 2020 Streams</div>
            <h2 className="section-title mb-4">"Explore all 8 Career Streams"</h2>
            <p className="section-subtitle mx-auto text-center">
              Based on India's National Education Policy 2020 — covering 500+ career options.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NEP_STREAMS.map((stream, i) => {
              const Icon = ICON_MAP[stream.icon] || BookOpen;
              return (
                <Link key={stream.id} to={`/careers-india`}
                  className="card-hover group animate-fade-up p-5"
                  style={{ animationDelay: `${(i%4)*60}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: stream.color+"18" }}>
                      <Icon size={18} style={{ color: stream.color }} />
                    </div>
                    <span className="text-xs font-mono font-medium" style={{ color: stream.color }}>
                      {stream.careers}+
                    </span>
                  </div>
                  <h3 className="font-body font-bold text-white text-sm mb-0.5">{stream.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">{stream.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {stream.exams.slice(0,2).map((e) => (
                      <span key={e} className="badge-slate text-xs">{e}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/careers-india" className="btn-outline">
              "Explore All Careers" <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8 FEATURES ── */}
      <section className="py-24" style={{ background: "rgba(255,127,14,0.025)" }}>
        <div className="page-container">
          <div className="text-center mb-14">
            <div className="badge-teal inline-flex mb-4"><Zap size={12} /> Platform Features</div>
            <h2 className="section-title mb-4">"Complete guidance under one roof"</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="card-hover group animate-fade-up p-5"
                style={{ animationDelay: `${(i%4)*60}ms` }}>
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: "rgba(255,127,14,0.12)" }}>
                  <f.icon size={18} style={{ color: "#ff9d37" }} />
                </div>
                <h3 className="font-body font-bold text-white text-sm leading-snug mb-2">
                  {f.titleKey || f.badge}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">
                  {f.descKey || ""}
                </p>
                <span className="badge-saffron text-xs">{f.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-saffron opacity-40" />
        <div className="page-container relative z-10">
          <div className="text-center mb-14">
            <div className="badge-gold inline-flex mb-4">✦ Process</div>
            <h2 className="section-title mb-4">"From confusion to clarity — in 4 steps"</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_STEPS.map((s, i) => (
              <div key={i} className="card h-full text-center">
                <div className="font-display font-bold text-7xl mb-2 select-none leading-none"
                  style={{ color: "rgba(255,127,14,0.06)" }}>{s.num}</div>
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "rgba(255,127,14,0.1)", border: "1px solid rgba(255,127,14,0.2)" }}>
                  <s.icon size={22} style={{ color: "#ff9d37" }} />
                </div>
                <h3 className="font-body font-bold text-white text-sm mb-2">
                  {s.titleKey || s.titleKey}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {s.descKey || ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAM PREVIEW ── */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="badge-teal inline-flex mb-5">📋 "Exams"</div>
              <h2 className="section-title mb-5">"Know every exam that matters"</h2>
              <div className="flex gap-3 mb-6">
                <Link to="/exams" className="btn-teal">"View All Exams" <ChevronRight size={15} /></Link>
                <Link to="/chat"  className="btn-ghost">"Ask AI Counselor" <MessageSquare size={15} /></Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {["JEE Main","NEET","CLAT","UPSC","NDA","CA Foundation","NATA","CUET"].map((e) => (
                  <span key={e} className="badge-saffron text-xs">{e}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2.5">
              {ENTRANCE_EXAMS.slice(0,6).map((exam, i) => (
                <div key={exam.id} className="card p-4 animate-fade-up" style={{ animationDelay: `${i*60}ms` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white font-bold text-sm">{exam.name}</span>
                        <span className={`badge text-xs ${exam.importance==="critical" ? "badge-rose" : "badge-gold"}`}>
                          {exam.importance}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs line-clamp-1">{exam.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-slate-400 text-xs">{exam.month}</div>
                      {exam.seats && <div className="text-teal-400 text-xs font-mono mt-0.5">{exam.seats}</div>}
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/exams" className="block text-center text-sm pt-2 hover:underline"
                style={{ color: "#ff9d37" }}>
                "View All Exams" →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <div className="badge-gold inline-flex mb-4"><Star size={11} /> Student Voices</div>
            <h2 className="section-title">"Real students. Real journeys."</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="card animate-fade-up" style={{ animationDelay: `${i*120}ms` }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #ff7f0e, #14b8a6)" }}>
                    {item.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.name}</div>
                    <div className="text-slate-500 text-xs">{item.cls}</div>
                    <span className="badge-teal text-xs mt-1 inline-flex">{item.lang}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  "{item.textKey || item.textKey}"
                </p>
                <div className="flex gap-0.5 mt-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={11} className="fill-current" style={{ color: "#f59e0b" }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="page-container">
          <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(255,127,14,0.08), rgba(20,184,166,0.06))", border: "1px solid rgba(255,127,14,0.15)" }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,127,14,0.5), transparent)" }} />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="section-title mb-4 max-w-2xl mx-auto">"Your ideal career is one assessment away"</h2>
              <p className="section-subtitle mx-auto mb-10 text-center">
                Join thousands of students across India using VidyaPath to discover their ideal career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn-primary text-base px-10 py-4 group">
                  "Create Free Account"
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/careers-india" className="btn-ghost text-base px-10 py-4">
                  "Explore 500+ Careers"
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}