
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ScanText,
  History,
  Bookmark,
  LineChart,
  User,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analyze", label: "Analyze Text", icon: ScanText },
  { to: "/history", label: "History", icon: History },
  { to: "/saved", label: "Saved Articles", icon: Bookmark },
  { to: "/insights", label: "Insights", icon: LineChart },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-[#111827] text-white h-screen sticky top-0">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-7">
        <div className="bg-teal-500/15 p-2.5 rounded-xl">
          <ShieldCheck className="text-teal-400" size={27} />
        </div>

        <div>
          <span className="font-bold text-xl tracking-tight text-white">
            TruthLens
          </span>
          <p className="text-xs text-slate-400 mt-0.5">
            AI News Verification
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">

        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 px-3 mb-4">
          Main Menu
        </p>

        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-teal-500/15 text-teal-300 border border-teal-400/20 shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">

        <div className="flex items-center gap-3 px-3 py-3 mb-3 rounded-xl bg-white/5">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 flex items-center justify-center">
            <ShieldCheck size={18} className="text-teal-400" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">
              TruthLens
            </p>
            <p className="text-xs text-slate-500">
              Stay informed. Stay verified.
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </aside>
  );
}
