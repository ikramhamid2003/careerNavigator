import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="page-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          <div>
            <h4 className="font-body font-bold text-white text-sm mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/careers-india", label: "500+ Career Cards" },
                { to: "/exams",         label: "Entrance Exams"    },
                { to: "/colleges",      label: "Top Colleges"      },
                { to: "/scholarships",  label: "Scholarships"      },
              ].map((l) => (
                <li key={l.to}><Link to={l.to} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body font-bold text-white text-sm mb-4">Tools</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/assessment", label: "Psychometric Test" },
                { to: "/roadmap",    label: "Career Roadmap"    },
                { to: "/chat",       label: "AI Counselor"      },
                { to: "/dashboard",  label: "Dashboard"         },
              ].map((l) => (
                <li key={l.to}><Link to={l.to} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body font-bold text-white text-sm mb-4">Account</h4>
            <ul className="space-y-2.5">
              {[
                { to: "/login",    label: "Sign In"       },
                { to: "/register", label: "Get Started"   },
                { to: "/profile",  label: "My Profile"    },
              ].map((l) => (
                <li key={l.to}><Link to={l.to} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Career Navigator · Aalim Muhammed Salegh College of Engineering, Chennai · NEP 2020 Aligned
          </p>
          <p className="text-slate-600 text-xs">
            Ikram Hamid P.K. · Abdul Jaleel A · Abdul Rahim A · Anees Khan H
          </p>
        </div>
      </div>
    </footer>
  );
}