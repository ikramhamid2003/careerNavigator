import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen pt-6 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dots bg-dots-lg opacity-100" />
      <div className="absolute inset-0 bg-radial-saffron opacity-60" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-fade-up">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6" />
          <h1 className="font-display font-bold text-2xl text-white mb-1">{title}</h1>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>
        <div className="rounded-2xl p-7 animate-fade-up animation-delay-100"
          style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}>
          {children}
        </div>
        <div className="mt-5 animate-fade-up animation-delay-200">{footer}</div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Login Sub"
      footer={
        <p className="text-slate-500 text-sm text-center">
          Login First Time{" "}
          <Link to="/register" style={{ color: "#ff9d37" }} className="font-semibold hover:underline">
            Login Create Account
          </Link>
        </p>
      }>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Login Email</label>
          <input type="email" className="input" placeholder="you@example.com"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Login Password</label>
          <div className="relative">
            <input type={showPwd ? "text" : "password"} className="input pr-12"
              placeholder="••••••••" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="button" onClick={() => setShow(!showPwd)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 mt-1">
          {isLoading
            ? <><Loader2 size={16} className="animate-spin" /> Logging In</>
            : <>Login Sign In <ArrowRight size={16} /></>}
        </button>
      </form>
    </AuthShell>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    email: "", username: "", first_name: "", last_name: "",
    password: "", password2: "", education_level: "high_school", role: "student",
  });
  const [showPwd, setShow] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) { toast.error("Passwords don't match"); return; }
    const result = await register({ ...form, role });
    if (result.success) {
      toast.success("🎉 Welcome! Let's find your ideal career.");
      navigate(role === "student" ? "/assessment" : "/dashboard");
    } else {
      toast.error(result.error);
    }
  };

  const EDUCATION_BY_ROLE = {
    student: [
      { value: "class_8_9", label: "Class 8–9" },
      { value: "class_10", label: "Class 10 (SSC/SSLC)" },
      { value: "class_11_12", label: "Class 11–12" },
      { value: "undergraduate", label: "Undergraduate (UG)" },
      { value: "graduate", label: "Graduate / Postgraduate" },
    ],
  };

  return (
    <AuthShell title="Create your account" subtitle="Register Sub"
      footer={
        <p className="text-slate-500 text-sm text-center">
          Register Have Account{" "}
          <Link to="/login" style={{ color: "#ff9d37" }} className="font-semibold hover:underline">Register Sign In</Link>
        </p>
      }>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Register First Name</label>
            <input className="input" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Register Last Name</label>
            <input className="input" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} required />
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Login Email</label>
          <input type="email" className="input" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Register Username</label>
          <input className="input" value={form.username} onChange={(e) => update("username", e.target.value)} required />
        </div>
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Register Education</label>
          <select className="input cursor-pointer text-xs font-body" value={form.education_level}
            onChange={(e) => update("education_level", e.target.value)}>
            {(EDUCATION_BY_ROLE[role] || EDUCATION_BY_ROLE.student).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Register Password</label>
          <div className="relative">
            <input type={showPwd ? "text" : "password"} className="input pr-12"
              value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} />
            <button type="button" onClick={() => setShow(!showPwd)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-400 font-medium mb-1.5 uppercase tracking-wide">Register Confirm Pwd</label>
          <input type="password" className="input" value={form.password2} onChange={(e) => update("password2", e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 mt-1">
          {isLoading
            ? <><Loader2 size={16} className="animate-spin" /> Register Creating</>
            : <>Register Cta <ArrowRight size={16} /></>}
        </button>
      </form>
    </AuthShell>
  );
}

export default LoginPage;