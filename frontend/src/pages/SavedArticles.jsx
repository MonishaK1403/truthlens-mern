import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ResultBadge from "../components/ResultBadge";
import api from "../api/axios";

export default function SavedArticles() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/analyze/saved").then(({ data }) => setItems(data.items));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        <TopBar title="Saved Articles" subtitle="Analyses you've bookmarked for later reference." />
        <div className="grid md:grid-cols-2 gap-4">
          {items.length === 0 && <p className="text-sm text-slate-400">No saved analyses yet.</p>}
          {items.map((item) => (
            <div key={item._id} className="card p-4 cursor-pointer hover:shadow-md" onClick={() => navigate(`/results/${item._id}`)}>
              <div className="flex items-center justify-between mb-2">
                <ResultBadge result={item.result} />
                <span className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-slate-700 line-clamp-3">"{item.content}"</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
