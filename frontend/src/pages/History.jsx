import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ResultBadge from "../components/ResultBadge";
import api from "../api/axios";

export default function History() {
  const [data, setData] = useState({ items: [], page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const load = (p = page, f = filter) => {
    api.get("/analyze/history", { params: { page: p, limit: 8, result: f || undefined } }).then(({ data }) => setData(data));
  };

  useEffect(() => {
    load(page, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  const remove = async (id) => {
    await api.delete(`/analyze/${id}`);
    load();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        <TopBar title="Analysis History" subtitle="View and manage your past analyses." />

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <p className="text-sm text-slate-500">{data.total || data.items.length} results</p>
            <select
              value={filter}
              onChange={(e) => {
                setPage(1);
                setFilter(e.target.value);
              }}
              className="input w-auto text-sm py-1.5"
            >
              <option value="">All results</option>
              <option value="Reliable">Reliable</option>
              <option value="Potential Misinformation">Potential Misinformation</option>
              <option value="Uncertain">Uncertain</option>
            </select>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 text-xs uppercase border-b border-slate-100">
                <th className="p-3 font-medium">#</th>
                <th className="p-3 font-medium">Content Preview</th>
                <th className="p-3 font-medium">Result</th>
                <th className="p-3 font-medium">Confidence</th>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400">
                    No analyses yet.
                  </td>
                </tr>
              )}
              {data.items.map((item, i) => (
                <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="p-3 text-slate-500">{(page - 1) * 8 + i + 1}</td>
                  <td className="p-3 max-w-xs truncate text-slate-700">"{item.content}"</td>
                  <td className="p-3"><ResultBadge result={item.result} /></td>
                  <td className="p-3 text-slate-600">{item.confidence}%</td>
                  <td className="p-3 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/results/${item._id}`)} className="p-1.5 rounded hover:bg-slate-200 text-slate-500">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => remove(item._id)} className="p-1.5 rounded hover:bg-rose-50 text-rose-500">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.pages > 1 && (
            <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-100">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm ${p === page ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
