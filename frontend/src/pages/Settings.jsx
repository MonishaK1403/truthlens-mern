import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 max-w-xl">
        <TopBar title="Settings" subtitle="Manage your preferences." />
        <div className="card p-6 space-y-5">
          <Toggle label="Email notifications for flagged content" checked={notifications} onChange={setNotifications} />
          <Toggle label="Dark mode (coming soon)" checked={darkMode} onChange={setDarkMode} disabled />
        </div>
      </main>
    </div>
  );
}

function Toggle({ label, checked, onChange, disabled }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-700">{label}</span>
      <button
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative disabled:opacity-40 ${checked ? "bg-brand-600" : "bg-slate-300"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}
