import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, BookOpen, Linkedin, Github, Save, CheckCircle, ChevronDown, X, GraduationCap, MapPin, Map } from 'lucide-react'
import useAuthStore from '../store/authStore'
import api from '../services/api'
import toast from 'react-hot-toast'

// Comprehensive Indian colleges list
const INDIAN_COLLEGES = [
  // IITs
  'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kharagpur', 'IIT Kanpur',
  'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Indore', 'IIT Jodhpur',
  'IIT Mandi', 'IIT Patna', 'IIT Ropar', 'IIT Bhubaneswar', 'IIT Gandhinagar',
  'IIT Tirupati', 'IIT Dhanbad (ISM)', 'IIT Jammu', 'IIT Varanasi (BHU)',
  'IIT Palakkad', 'IIT Bhilai', 'IIT Goa', 'IIT Dharwad', 'IIT Kharagpur',
  // NITs
  'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'NIT Calicut', 'NIT Rourkela',
  'NIT Allahabad', 'NIT Jaipur', 'NIT Nagpur', 'NIT Kurukshetra', 'NIT Surat',
  'NIT Durgapur', 'NIT Silchar', 'NIT Hamirpur', 'NIT Jalandhar', 'NIT Patna',
  'NIT Bhopal', 'NIT Agartala', 'NIT Goa', 'NIT Delhi', 'NIT Manipur',
  // IIITs
  'IIIT Hyderabad', 'IIIT Bangalore', 'IIIT Delhi', 'IIIT Allahabad',
  'IIIT Gwalior', 'IIIT Pune', 'IIIT Bhopal', 'IIIT Kancheepuram',
  'IIIT Vadodara', 'IIIT Kota', 'IIIT Lucknow', 'IIIT Ranchi',
  // IIMs
  'IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow',
  'IIM Kozhikode', 'IIM Indore', 'IIM Shillong', 'IIM Rohtak',
  'IIM Raipur', 'IIM Ranchi', 'IIM Trichy', 'IIM Udaipur', 'IIM Kashipur',
  'IIM Nagpur', 'IIM Visakhapatnam', 'IIM Bodh Gaya', 'IIM Jammu', 'IIM Sambalpur',
  // AIIMS & Medical
  'AIIMS Delhi', 'AIIMS Bhopal', 'AIIMS Bhubaneswar', 'AIIMS Jodhpur',
  'AIIMS Patna', 'AIIMS Raipur', 'AIIMS Rishikesh', 'CMC Vellore',
  'JIPMER Puducherry', 'Kasturba Medical College', 'Sri Ramachandra Medical College',
  'Manipal College of Medical Sciences', 'MAHE Manipal', 'KMC Manipal',
  // Top Universities
  'Delhi University', 'Mumbai University', 'Jadavpur University', 'BHU Varanasi',
  'Hyderabad University', 'Jawaharlal Nehru University (JNU)', 'Pune University',
  'Anna University', 'Osmania University', 'Calcutta University',
  'Madras University', 'Bangalore University', 'Kerala University',
  'Gujarat University', 'Rajasthan University', 'Lucknow University',
  'Amity University', 'Symbiosis University', 'BITS Pilani', 'BITS Goa',
  'BITS Hyderabad', 'VIT Vellore', 'VIT Chennai', 'SRM University',
  'Manipal University', 'Christ University Bangalore', 'Loyola College Chennai',
  'St. Xavier\'s College Mumbai', 'St. Stephen\'s College Delhi',
  'Lady Shri Ram College Delhi', 'Miranda House Delhi', 'Hindu College Delhi',
  'Presidency College Chennai', 'Presidency University Kolkata',
  // Engineering Colleges
  'PSG College of Technology', 'Coimbatore Institute of Technology',
  'SSN College of Engineering', 'Thiagarajar College of Engineering',
  'Sri Venkateswara College of Engineering', 'Rajalakshmi Engineering College',
  'Vellore Institute of Technology', 'KL University', 'LPU Jalandhar',
  'Chandigarh University', 'Thapar Institute of Engineering and Technology',
  'PES University Bangalore', 'RV College of Engineering', 'BMS College of Engineering',
  'MSRIT Bangalore', 'Dayananda Sagar College of Engineering',
  'National Institute of Engineering Mysore', 'JSS Academy of Technical Education',
  'College of Engineering Pune (COEP)', 'VJTI Mumbai', 'DBIT Mumbai',
  'Dwarkadas J. Sanghvi College of Engineering', 'K.J. Somaiya College of Engineering',
  'DJ Sanghvi Mumbai', 'SPIT Mumbai', 'ICT Mumbai',
  'Netaji Subhas University of Technology (NSUT)', 'Delhi Technological University (DTU)',
  'IGDTUW Delhi', 'Jamia Millia Islamia', 'Sharda University',
  'Amrita School of Engineering', 'SASTRA University', 'Karunya University',
  'Kongu Engineering College', 'Mepco Schlenk Engineering College',
  'Sri Krishna College of Engineering', 'Kumaraguru College of Technology',
  // Law Schools
  'National Law School of India University (NLSIU)', 'NALSAR Hyderabad',
  'NUJS Kolkata', 'NLU Delhi', 'NLU Jodhpur', 'NLU Bhopal', 'Symbiosis Law School',
  // Design / Arts
  'National Institute of Design (NID)', 'NID Ahmedabad', 'Pearl Academy',
  'NIFT Delhi', 'NIFT Mumbai', 'NIFT Chennai', 'Srishti Institute',
  'MIT Institute of Design', 'Unitedworld Institute of Design',
  // Other notable
  'Aligarh Muslim University (AMU)', 'Jamia Hamdard',
  'XLRI Jamshedpur', 'SPJIMR Mumbai', 'MDI Gurgaon', 'IIFT Delhi',
  'IMT Ghaziabad', 'NMIMS Mumbai', 'Great Lakes Chennai',
  'Aalim Muhammed Salegh College of Engineering',
].sort()

function CollegeAutocomplete({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value || '')
  const ref = useRef()

  useEffect(() => { setQuery(value || '') }, [value])

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const matches = query.length >= 2
    ? INDIAN_COLLEGES.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : []

  const select = (college) => { onChange(college); setQuery(college); setOpen(false) }
  const clear = () => { onChange(''); setQuery(''); setOpen(false) }

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Type to search colleges..."
          className="input pl-10 pr-10"
        />
        {query && (
          <button onClick={clear} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
            <X size={15} />
          </button>
        )}
      </div>

      {open && matches.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="max-h-60 overflow-y-auto py-1">
            {matches.map(college => (
              <button key={college} onClick={() => select(college)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/[0.05] ${college === value ? 'text-[#ff9d37] bg-[rgba(255,127,14,0.05)]' : 'text-slate-300'
                  }`}>
                {college}
              </button>
            ))}
            {query.length >= 2 && !INDIAN_COLLEGES.includes(query) && (
              <button onClick={() => select(query)}
                className="w-full text-left px-4 py-3 text-xs text-slate-400 hover:bg-white/[0.05] border-t border-white/[0.05] transition-colors">
                <span className="text-[#14b8a6]">Use custom:</span> "{query}"
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const { user, setUser } = useAuthStore()
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    college: user?.college || '',
    graduation_year: user?.graduation_year || '',
    current_gpa: user?.current_gpa || '',
    linkedin_url: user?.linkedin_url || '',
    github_url: user?.github_url || '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const save = async () => {
    setSaving(true)
    try {
      const res = await api.patch('/auth/me/', form)
      setUser(res.data)
      setSaved(true)
      toast.success('Profile updated successfully!')
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      toast.error(e.response?.data?.detail || 'Failed to save profile details.')
    } finally { setSaving(false) }
  }

  const PERSONAL_FIELDS = [
    { key: 'first_name', label: 'First Name', icon: User, type: 'text', placeholder: "John" },
    { key: 'last_name', label: 'Last Name', icon: User, type: 'text', placeholder: "Doe" },
    { key: 'phone', label: 'Phone', icon: Phone, type: 'tel', placeholder: "+91 99999 99999" },
  ]

  const ACADEMIC_FIELDS = [
    { key: 'graduation_year', label: 'Graduation Year', icon: GraduationCap, type: 'number', placeholder: "2025" },
    { key: 'current_gpa', label: 'CGPA (out of 10)', icon: BookOpen, type: 'number', placeholder: "8.5" },
  ]

  const SOCIAL_FIELDS = [
    { key: 'linkedin_url', label: 'LinkedIn Profile', icon: Linkedin, type: 'url', placeholder: "https://linkedin.com/in/username" },
    { key: 'github_url', label: 'GitHub Profile', icon: Github, type: 'url', placeholder: "https://github.com/username" },
  ]

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="page-container max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-up">
          <h1 className="font-display font-bold text-3xl text-white">Your Profile</h1>
          <p className="text-slate-400 mt-1">Manage your academic details, preferences, and public links.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Avatar & Summary Sticky Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card overflow-hidden text-center sticky top-28 p-0 animate-fade-up border-0" style={{ background: "rgba(17,24,39,0.7)", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
              {/* Card Header Gradient Banner */}
              <div className="h-28 w-full bg-gradient-to-br from-[#ff7f0e] to-[#fbbf24] opacity-80" />

              <div className="relative px-6 pb-8 -mt-14">
                {/* Avatar Badge */}
                <div className="w-28 h-28 mx-auto rounded-3xl mb-4 bg-gradient-to-br from-[#14b8a6] to-[#0d9488] shadow-2xl flex items-center justify-center text-white text-5xl font-display font-bold border-4 border-[#111827]">
                  {user?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>

                <h2 className="font-display text-2xl font-bold text-white mb-1">
                  {user?.first_name || "Guest User"} {user?.last_name || ""}
                </h2>
                <div className="text-slate-400 text-sm flex items-center justify-center gap-1.5 mb-4 font-medium">
                  <Mail size={13} className="text-slate-500" /> {user?.email}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/[0.06] text-left">
                  {form.college && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                        <BookOpen size={14} className="text-[#14b8a6]" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-0.5">Institution</p>
                        <p className="text-slate-200 text-sm font-medium leading-tight">{form.college}</p>
                      </div>
                    </div>
                  )}
                  {form.graduation_year && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={14} className="text-[#ff9d37]" />
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-0.5">Class of</p>
                        <p className="text-slate-200 text-sm font-medium">{form.graduation_year}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Elaborate Form Sections */}
          <div className="lg:col-span-2 space-y-6">

            {/* Personal Info */}
            <div className="card p-6 md:p-8 animate-fade-up animation-delay-100">
              <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2 pb-4 border-b border-white/[0.06]">
                <User size={18} className="text-[#ff9d37]" /> Personal Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                {PERSONAL_FIELDS.map(f => (
                  <div key={f.key}>
                    <label className="text-sm font-medium text-slate-400 mb-2 block">{f.label}</label>
                    <div className="relative group">
                      <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#ff9d37] transition-colors" />
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                        className="input pl-11 shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-400 mb-2 block">Tell us about yourself</label>
                <textarea rows={4} placeholder="I'm a sophomore extremely interested in Data Science and UI UX design..."
                  value={form.bio} onChange={e => set('bio', e.target.value)}
                  className="input py-4 shadow-sm resize-y" />
              </div>
            </div>

            {/* Academic Info */}
            <div className="card p-6 md:p-8 animate-fade-up animation-delay-200">
              <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2 pb-4 border-b border-white/[0.06]">
                <BookOpen size={18} className="text-[#14b8a6]" /> Academic Blueprint
              </h3>

              <div className="mb-5">
                <label className="text-sm font-medium text-slate-400 mb-2 block">College / University</label>
                <CollegeAutocomplete value={form.college} onChange={v => set('college', v)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {ACADEMIC_FIELDS.map(f => (
                  <div key={f.key}>
                    <label className="text-sm font-medium text-slate-400 mb-2 block">{f.label}</label>
                    <div className="relative group">
                      <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#14b8a6] transition-colors" />
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key]} step={f.key === 'current_gpa' ? '0.1' : '1'}
                        onChange={e => set(f.key, e.target.value)}
                        className="input pl-11 shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social & Digital Links */}
            <div className="card p-6 md:p-8 animate-fade-up animation-delay-300">
              <h3 className="font-display font-bold text-xl text-white mb-6 flex items-center gap-2 pb-4 border-b border-white/[0.06]">
                <Map size={18} className="text-[#3b82f6]" /> Digital Footprint
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SOCIAL_FIELDS.map(f => (
                  <div key={f.key}>
                    <label className="text-sm font-medium text-slate-400 mb-2 block">{f.label}</label>
                    <div className="relative group">
                      <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#3b82f6] transition-colors" />
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                        className="input pl-11 shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Actions */}
            <div className="flex items-center justify-end pt-4 animate-fade-up animation-delay-400">
              <button onClick={save} disabled={saving}
                className="btn-primary w-full md:w-auto px-10 py-4 shadow-lg text-sm rounded-xl">
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 inline-block align-middle" /> Updating...</>
                ) : saved ? (
                  <><CheckCircle className="w-4 h-4 inline-block align-middle mr-2" /> Saved Successfully!</>
                ) : (
                  <><Save className="w-4 h-4 inline-block align-middle mr-2" /> Save Profile</>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}