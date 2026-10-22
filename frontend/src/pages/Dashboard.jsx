
import React, { useEffect, useState } from "react";
import {
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import api from "../api/axios";

const COLORS = ["#14b8a6", "#f43f5e", "#f59e0b", "#8b5cf6"];

const LINE_COLORS = {
  Reliable: "#10b981",
  "Potential Misinformation": "#f43f5e",
  Uncertain: "#f59e0b",
};

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatTick(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function buildLast30Days(trend = []) {
  return trend
    .map((item) => ({
      date: item.date,
      Reliable: Number(item.Reliable) || 0,
      "Potential Misinformation":
        Number(item["Potential Misinformation"]) || 0,
      Uncertain: Number(item.Uncertain) || 0,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30);
}
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
      <p className="mb-3 text-sm font-semibold text-slate-800">
        {formatTick(label)}
      </p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="mb-2 flex items-center justify-between gap-5 text-sm"
        >
          <span className="flex items-center gap-2 text-slate-600">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.dataKey}
          </span>

          <span className="font-semibold text-slate-800">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    api
      .get("/dashboard/summary")
      .then(({ data }) => {
        if (mounted) {
          setSummary(data);
          setError("");
        }
      })
      .catch((err) => {
        console.error("Dashboard loading failed:", err);

        if (mounted) {
          setError("Unable to load dashboard data. Please try again.");
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const totals = summary?.totals || {
    total: 0,
    reliable: 0,
    misinformation: 0,
    uncertain: 0,
  };

  const chartData = buildLast30Days(summary?.trend || []);

  const pieData = (summary?.sources || [])
    .map((source) => ({
      name: source.label,
      value: Number(source.count) || 0,
    }))
    .filter((source) => source.value > 0);

  const hasTrend = chartData.some(
    (item) =>
      item.Reliable > 0 ||
      item["Potential Misinformation"] > 0 ||
      item.Uncertain > 0
  );

  const maxCount = Math.max(
    1,
    ...chartData.map((item) =>
      Math.max(
        item.Reliable,
        item["Potential Misinformation"],
        item.Uncertain
      )
    )
  );

  const yMax = Math.max(2, Math.ceil(maxCount / 2) * 2);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-w-0 flex-1 p-4 md:p-8">
        <TopBar
          title="Dashboard"
          subtitle="An overview of your activity and recent analyses."
        />

        {/* Statistics cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={BarChart2}
            label="Analyses Done"
            value={totals.total}
            tone="brand"
          />

          <StatCard
            icon={CheckCircle2}
            label="Reliable Content"
            value={totals.reliable}
            tone="green"
          />

          <StatCard
            icon={AlertTriangle}
            label="Potential Misinformation"
            value={totals.misinformation}
            tone="red"
          />

          <StatCard
            icon={HelpCircle}
            label="Uncertain"
            value={totals.uncertain}
            tone="amber"
          />
        </div>

        {/* Dashboard charts */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          
{/* Analysis Summary: Date and Information Type */}
<section className="card min-w-0 p-5 md:p-6 xl:col-span-2">
  <div className="mb-5">
    <h2 className="text-base font-semibold text-slate-800">
      Analysis Summary
    </h2>
    <p className="mt-1 text-sm text-slate-500">
      Daily analysis by information type
    </p>
  </div>

  {loading ? (
    <div className="flex h-80 items-center justify-center text-sm text-slate-400">
      Loading chart...
    </div>
  ) : error ? (
    <div className="flex h-80 items-center justify-center text-center text-sm text-red-500">
      {error}
    </div>
  ) : !hasTrend ? (
    <div className="flex h-80 flex-col items-center justify-center text-center">
      <BarChart2 size={38} className="mb-3 text-slate-300" />
      <p className="font-medium text-slate-600">
        No analysis data available
      </p>
      <p className="mt-1 text-sm text-slate-400">
        Analyze some content to see daily results.
      </p>
    </div>
  ) : (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={formatTick}
            tick={{ fontSize: 10 }}
            interval={4}
          />

          <YAxis
            allowDecimals={false}
            domain={[0, yMax]}
            tick={{ fontSize: 11 }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend />

          <Bar
            dataKey="Reliable"
            fill="#10b981"
            radius={[3, 3, 0, 0]}
          />

          <Bar
            dataKey="Potential Misinformation"
            fill="#f43f5e"
            radius={[3, 3, 0, 0]}
          />

          <Bar
            dataKey="Uncertain"
            fill="#f59e0b"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
</section>



          {/* Content Sources */}
          <section className="card min-w-0 p-5 md:p-6">
            <h2 className="text-base font-semibold text-slate-800">
              Content Sources
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sources of analyzed content
            </p>

            {loading ? (
              <div className="flex h-80 items-center justify-center text-sm text-slate-400">
                Loading chart...
              </div>
            ) : pieData.length === 0 ? (
              <div className="flex h-80 items-center justify-center text-center text-sm text-slate-400">
                No source data available.
              </div>
            ) : (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="55%"
                      outerRadius="75%"
                      paddingAngle={3}
                      stroke="#ffffff"
                      strokeWidth={3}
                    >
                      {pieData.map((item, index) => (
                        <Cell
                          key={item.name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />

                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      iconType="circle"
                      iconSize={9}
                      wrapperStyle={{
                        paddingTop: "15px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
