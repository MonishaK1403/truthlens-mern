import React from "react";
import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopBar({ title, subtitle }) {
  const { user } = useAuth();
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100">
          <Bell size={20} className="text-slate-500" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-sm">
            {initial}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-slate-800">{user?.name || "User"}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role || "member"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
