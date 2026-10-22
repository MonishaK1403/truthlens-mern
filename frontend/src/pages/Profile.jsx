import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 max-w-xl">
        <TopBar title="Profile" subtitle="Your account details." />
        <div className="card p-6">
          <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-2xl mb-4">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Name</dt>
              <dd className="text-slate-800 font-medium">{user?.name}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Email</dt>
              <dd className="text-slate-800 font-medium">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Role</dt>
              <dd className="text-slate-800 font-medium capitalize">{user?.role}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
