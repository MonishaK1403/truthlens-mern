import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import api from "../api/axios";

export default function Insights() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("/dashboard/summary").then(({ data }) => setSummary(data));
  }, []);

  const barData = summary
    ? [
        { name: "Reliable", count: summary.totals.reliable },
        { name: "Misinformation", count: summary.totals.misinformation },
        { name: "Uncertain", count: summary.totals.uncertain },
      ]
    : [];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        <TopBar title="Insights" subtitle="Patterns across all of your analyses." />
        <div className="card p-5">
          <p className="font-semibold text-sm text-slate-800 mb-4">Results Breakdown</p>
          {summary ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#14a892" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-slate-400">Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}
