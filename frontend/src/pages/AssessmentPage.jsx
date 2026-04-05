import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../services/api'
import { Brain, ChevronRight, ChevronLeft, Zap, Info } from 'lucide-react'

// ── 43 features across 4 sections ────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'cognitive', title: 'Cognitive Aptitude', emoji: '🧠', color: '#6C63FF',
    desc: 'Rate your natural ability in each area — be honest for best results',
    hint: '0% = very weak · 50% = average · 100% = exceptional',
    fields: [
      { key: 'technical_aptitude',  label: 'Technical Aptitude',   desc: 'Interest & ability in technical / engineering subjects' },
      { key: 'analytical_thinking', label: 'Analytical Thinking',  desc: 'Breaking down complex problems into logical steps' },
      { key: 'numerical_ability',   label: 'Numerical Ability',    desc: 'Working with numbers, calculations and quantitative data' },
      { key: 'verbal_reasoning',    label: 'Verbal Reasoning',     desc: 'Understanding and reasoning through language and text' },
      { key: 'spatial_reasoning',   label: 'Spatial Reasoning',    desc: 'Visualising objects, maps and structures in 3D' },
      { key: 'memory_retention',    label: 'Memory & Retention',   desc: 'Ability to learn, recall and retain information' },
      { key: 'problem_solving',     label: 'Problem Solving',      desc: 'Finding efficient solutions under constraints' },
      { key: 'logical_reasoning',   label: 'Logical Reasoning',    desc: 'Applying rules and patterns to draw valid conclusions' },
    ],
  },
  {
    id: 'riasec', title: 'RIASEC Personality Profile', emoji: '🎭', color: '#FF9F43',
    desc: 'Holland\'s RIASEC model — rate how strongly each type describes you',
    hint: 'Based on Holland\'s Career Theory — used in NEP 2020 psychometric framework',
    fields: [
      { key: 'riasec_realistic',     label: 'Realistic (Doer)',       desc: 'I enjoy hands-on work, tools, machines and outdoor activities' },
      { key: 'riasec_investigative', label: 'Investigative (Thinker)',desc: 'I enjoy research, analysis, scientific thinking and solving puzzles' },
      { key: 'riasec_artistic',      label: 'Artistic (Creator)',     desc: 'I enjoy creative expression, design, music and imaginative work' },
      { key: 'riasec_social',        label: 'Social (Helper)',        desc: 'I enjoy helping, teaching, counselling and working with people' },
      { key: 'riasec_enterprising',  label: 'Enterprising (Leader)',  desc: 'I enjoy leading, persuading, selling and taking business risks' },
      { key: 'riasec_conventional',  label: 'Conventional (Organiser)',desc: 'I enjoy structure, rules, data organisation and systematic work' },
    ],
  },
  {
    id: 'skills', title: 'Skills & Domain Knowledge', emoji: '📚', color: '#00F5A0',
    desc: 'Rate your proficiency — covers every stream from Tech to Medicine to Law',
    hint: '0% = no exposure · 50% = basic understanding · 100% = expert level',
    fields: [
      { key: 'communication',       label: 'Communication',          desc: 'Written and verbal expression skills' },
      { key: 'leadership',          label: 'Leadership',             desc: 'Motivating teams and taking initiative' },
      { key: 'teamwork',            label: 'Teamwork',               desc: 'Collaborating effectively with diverse groups' },
      { key: 'empathy',             label: 'Empathy',                desc: 'Understanding and sharing others\' feelings' },
      { key: 'creativity',          label: 'Creativity',             desc: 'Generating novel ideas and original solutions' },
      { key: 'research_ability',    label: 'Research Ability',       desc: 'Gathering, evaluating and synthesising information' },
      { key: 'attention_to_detail', label: 'Attention to Detail',   desc: 'Accuracy, thoroughness and precision in work' },
      { key: 'programming',         label: 'Programming / Coding',   desc: 'Writing and understanding code (any language)' },
      { key: 'mathematics',         label: 'Mathematics',            desc: 'Algebra, calculus, statistics, discrete math' },
      { key: 'biology_medicine',    label: 'Biology / Medicine',     desc: 'Life sciences, anatomy, physiology, pharmacology' },
      { key: 'law_studies',         label: 'Law & Legal Studies',    desc: 'Legal concepts, acts, contracts, jurisprudence' },
      { key: 'design_arts',         label: 'Design & Arts',          desc: 'Visual design, illustration, aesthetics, Figma/Adobe' },
      { key: 'data_analysis',       label: 'Data Analysis',          desc: 'Working with data, charts, Excel, SQL, Python' },
      { key: 'writing_language',    label: 'Writing & Language',     desc: 'Content writing, journalism, academic writing' },
      { key: 'finance_economics',   label: 'Finance & Economics',    desc: 'Accounting, valuation, markets, taxation' },
      { key: 'science_lab',         label: 'Science & Lab Work',     desc: 'Physics, Chemistry, lab experiments, research' },
      { key: 'engineering_core',    label: 'Core Engineering',       desc: 'Mechanical, civil, electronics, structural concepts' },
      { key: 'teaching_mentoring',  label: 'Teaching & Mentoring',   desc: 'Explaining concepts, coaching, curriculum design' },
      { key: 'public_speaking',     label: 'Public Speaking',        desc: 'Presentations, debates, talks, oratory' },
      { key: 'social_skills',       label: 'Social & Interpersonal', desc: 'Networking, community work, relationship building' },
      { key: 'business_acumen',     label: 'Business Acumen',        desc: 'Understanding markets, economics and strategy' },

    ],
  },
  {
    id: 'academic', title: 'Academic Profile & Experience', emoji: '🎓', color: '#FF6B9D',
    desc: 'Enter your real numbers — these significantly improve prediction accuracy',
    hint: 'CGPA ÷ 10 → slide to that %. E.g. CGPA 8.5 = 85%. Projects/internships = actual count.',
    fields: [
      { key: 'gpa',               label: 'CGPA / GPA (÷10)',      desc: 'Divide by 10: CGPA 8.5 → slide to 85%' },
      { key: 'projects_count',    label: 'Projects Completed',    desc: 'Personal + academic + freelance projects', isCount: true, max: 20 },
      { key: 'internships',       label: 'Internships Done',      desc: 'Paid or unpaid, any duration',             isCount: true, max: 5  },
      { key: 'certifications',    label: 'Certifications',        desc: 'Online (Coursera/NPTEL/AWS) + offline',    isCount: true, max: 15 },
      { key: 'extracurriculars',  label: 'Extracurriculars',      desc: 'Clubs, sports, NSS, NCC, cultural events', isCount: true, max: 10 },
      { key: 'competitive_exams', label: 'Competitive Exams',     desc: 'JEE/NEET/CAT/UPSC/GATE/CLAT attempted',   isCount: true, max: 5  },
      { key: 'publications',      label: 'Publications',          desc: 'Research papers, articles, blog posts',    isCount: true, max: 10 },
      { key: 'work_experience',   label: 'Work Experience (yrs)', desc: 'Full-time or part-time years',             isCount: true, max: 5  },
    ],
  },
]

const DEFAULTS = {
  // Cognitive
  technical_aptitude:0.5, analytical_thinking:0.5, numerical_ability:0.5,
  verbal_reasoning:0.5, spatial_reasoning:0.4, memory_retention:0.5,
  problem_solving:0.5, logical_reasoning:0.5,
  // RIASEC
  riasec_realistic:0.4, riasec_investigative:0.5, riasec_artistic:0.4,
  riasec_social:0.5, riasec_enterprising:0.4, riasec_conventional:0.4,
  // Skills
  communication:0.5, leadership:0.5, teamwork:0.6, empathy:0.5,
  creativity:0.5, research_ability:0.4, attention_to_detail:0.5,
  programming:0.5, mathematics:0.5, biology_medicine:0.2, law_studies:0.2,
  design_arts:0.3, data_analysis:0.4, writing_language:0.4,
  finance_economics:0.3, science_lab:0.3, engineering_core:0.4,
  teaching_mentoring:0.3, public_speaking:0.4, social_skills:0.5,
  business_acumen:0.4, physical_stamina:0.4,
  // Academic
  gpa:0.75, projects_count:2, internships:0, certifications:1,
  extracurriculars:2, competitive_exams:0, publications:0, work_experience:0,
}

// Validate we have exactly 43 keys
const TOTAL_FEATURES = Object.keys(DEFAULTS).length
console.assert(TOTAL_FEATURES === 43, 'Expected 43 features, got ' + TOTAL_FEATURES)

function color(pct) {
  if (pct < 30) return '#FF6B6B'
  if (pct < 60) return '#FFB347'
  return '#00F5A0'
}

function Slider({ field, value, onChange }) {
  const isCount = !!field.isCount
  const maxVal  = isCount ? (field.max || 10) : 100
  const pct     = isCount ? Math.round((value / maxVal) * 100) : Math.round(value * 100)
  const c       = color(pct)
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-3">
          <p className="text-sm font-medium text-white">{field.label}</p>
          <p className="text-xs text-slate-500 leading-snug">{field.desc}</p>
        </div>
        <span className="font-mono text-sm font-bold flex-shrink-0" style={{ color: c }}>
          {isCount ? value : `${pct}%`}
        </span>
      </div>
      <input type="range" min={0} max={maxVal} step={1}
        value={isCount ? value : Math.round(value * 100)}
        onChange={e => { const v = Number(e.target.value); onChange(isCount ? v : v / 100) }}
        className="w-full h-2 rounded-full cursor-pointer appearance-none"
        style={{ accentColor: c, background: `linear-gradient(to right, ${c} ${pct}%, rgba(42,42,74,0.8) ${pct}%)` }}
      />
    </div>
  )
}

const STREAM_BADGES = [
  '💻 Tech','🏥 Medical','💼 Business','⚖️ Law','🎨 Arts',
  '📖 Education','🔬 Science','🏛️ Government','📡 Media','⚙️ Engineering',
  '🌾 Agriculture','🏗️ Architecture','🏨 Hospitality','💰 Finance','🏋️ Sports',
]

export default function AssessmentPage() {
  const navigate  = useNavigate()
  const [step, setStep]       = useState(0)
  const [loading, setLoading] = useState(false)
  const [values, setValues]   = useState({ ...DEFAULTS })

  const section  = SECTIONS[step]
  const progress = ((step) / SECTIONS.length) * 100
  const totalQ   = SECTIONS.reduce((a, s) => a + s.fields.length, 0)
  const answeredQ = SECTIONS.slice(0, step).reduce((a, s) => a + s.fields.length, 0)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await api.post('/ml/predict/', { features: values })
      sessionStorage.setItem('assessment_results', JSON.stringify({
        predictions: res.data.predictions, features: values
      }))
      toast.success('Assessment complete! 🎯')
      navigate('/results')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Prediction failed — is the backend running?')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(108,99,255,0.15)", border: "1px solid rgba(108,99,255,0.3)" }}>
            <Brain size={18} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Psychometric Assessment</h1>
            <p className="text-slate-500 text-xs">
              {totalQ} questions · 105 careers · 15 streams · NEP 2020 aligned
            </p>
          </div>
        </div>

        {/* Stream badges */}
        <div className="flex gap-1 flex-wrap mb-4 mt-3">
          {STREAM_BADGES.map(b => (
            <span key={b} className="text-xs px-2 py-0.5 rounded-full text-slate-500"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {b}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Section {step + 1} / {SECTIONS.length} — {section.title}</span>
            <span>{answeredQ}/{totalQ} questions</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(42,42,74,0.8)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6C63FF, #00F5A0)" }}
              animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
          {/* Section tabs */}
          <div className="flex gap-1 mt-2">
            {SECTIONS.map((s, i) => (
              <div key={s.id} className="flex-1 h-1 rounded-full transition-all"
                style={{ background: i <= step ? s.color : "rgba(42,42,74,0.6)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Section card */}
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
          exit={{ opacity:0, x:-40 }} transition={{ duration:0.25 }}
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Section header */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{section.emoji}</span>
            <div>
              <h2 className="font-display text-xl font-bold text-white">{section.title}</h2>
              <p className="text-xs text-slate-500">{section.desc}</p>
            </div>
          </div>

          {/* Hint */}
          <div className="flex items-start gap-2 rounded-xl p-3 mb-6 text-xs text-slate-400"
            style={{ background: `${section.color}08`, border: `1px solid ${section.color}20` }}>
            <Info size={13} style={{ color: section.color }} className="flex-shrink-0 mt-0.5" />
            <span>{section.hint}</span>
          </div>

          {/* Fields */}
          <div className="space-y-5">
            {section.fields.map(f => (
              <Slider key={f.key} field={f} value={values[f.key]}
                onChange={v => setValues(prev => ({ ...prev, [f.key]: v }))} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            <ChevronLeft size={16} /> Back
          </button>
        )}
        {step < SECTIONS.length - 1 ? (
          <button onClick={() => setStep(s => s + 1)}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition-all hover:scale-[1.02]"
            style={{ background: section.color }}>
            Next Section <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition-all hover:scale-[1.02] disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00F5A0)' }}>
            {loading
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Predicting across 105 careers…</>
              : <><Zap size={16} /> Get My Career Matches</>}
          </button>
        )}
      </div>

      {/* Question counter */}
      <p className="text-center text-xs text-slate-600 mt-4">
        {section.fields.length} questions in this section · {SECTIONS.slice(step + 1).reduce((a,s) => a + s.fields.length, 0)} remaining
      </p>
    </div>
  )
}