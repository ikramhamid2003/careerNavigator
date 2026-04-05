import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Compass, LogOut, User, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import api from "../services/api";
import toast from "react-hot-toast";

const NAV_PUBLIC = [
  { to: "/careers-india", label: "Careers"      },
  { to: "/exams",         label: "Exams"         },
  { to: "/colleges",      label: "Colleges"      },
  { to: "/scholarships",  label: "Scholarships"  },
  { to: "/chat",          label: "AI Counselor"  },
];

const NAV_AUTH = [
  { to: "/dashboard",  label: "Dashboard"  },
  { to: "/assessment", label: "Assessment" },
  { to: "/roadmap",    label: "Roadmap"    },
];

export default function Navbar() {
  const [isOpen,       setIsOpen]   = useState(false);
  const [scrolled,     setScrolled] = useState(false);
  const [userMenuOpen, setUserMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleLogout = async () => {
    try { await api.post('/auth/logout/', {}) } catch {}
    logout();
    toast.success("Logged out successfully");
    navigate("/");
    setUserMenu(false);
  };

  const linkClass = (isActive) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "backdrop-blur-xl border-b shadow-xl" : "bg-transparent"
    }`}
      style={scrolled ? { background: "rgba(6,8,15,0.92)", borderBottomColor: "rgba(255,255,255,0.06)" } : {}}>
      <nav className="page-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #ff7f0e, #14b8a6)", boxShadow: "0 0 16px rgba(255,127,14,0.3)" }}>
              <Compass size={17} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Career Navigator
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_PUBLIC.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => linkClass(isActive)}>
                {l.label}
              </NavLink>
            ))}
            {isAuthenticated && NAV_AUTH.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => linkClass(isActive)}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/[0.06] transition-all">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-display font-bold"
                    style={{ background: "linear-gradient(135deg, #ff7f0e, #ff9d37)" }}>
                    {user?.first_name?.[0] || user?.username?.[0] || "U"}
                  </div>
                  <span className="text-sm text-slate-300 font-medium max-w-20 truncate">
                    {user?.first_name || user?.username}
                  </span>
                  <ChevronDown size={13} className={`text-slate-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden animate-fade-up"
                    style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Link to="/profile" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors">
                      <User size={14} /> My Profile
                    </Link>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-white/[0.04] transition-colors">
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm py-2 px-4">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden rounded-2xl mb-4 p-4 animate-fade-up"
            style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex flex-col gap-1">
              {NAV_PUBLIC.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? "text-white bg-white/[0.07]" : "text-slate-400"}`}>
                  {l.label}
                </NavLink>
              ))}
              {isAuthenticated && NAV_AUTH.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-medium ${isActive ? "text-white bg-white/[0.07]" : "text-slate-400"}`}>
                  {l.label}
                </NavLink>
              ))}
              <div className="pt-2 border-t flex flex-col gap-2 mt-1" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="btn-ghost w-full justify-start">
                    <LogOut size={15} /> Sign Out
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn-ghost">Sign In</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}