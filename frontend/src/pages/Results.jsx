import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Bookmark, Flag, AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ResultBadge from "../components/ResultBadge";
import api from "../api/axios";

const TABS = ["Key Insights", "Linguistic Analysis", "Source Check"];

export default function Results() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [tab, setTab] = useState(TABS[0]);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/analyze/${id}`).then(({ data }) => setAnalysis(data.analysis));
  }, [id]);

  const toggleSave = async () => {
    setBusy(true);
    const { data } = await api.patch(`/analyze/${id}`, { saved: !analysis.saved });
    setAnalysis(data.analysis);
    setBusy(false);
  };

  const report = async () => {
    setBusy(true);
    const { data } = await api.patch(`/analyze/${id}`, { reported: true });
    setAnalysis(data.analysis);
    setBusy(false);
  };

  if (!analysis) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 text-slate-400 text-sm">Loading result...</main>
      </div>
    );
  }

  const resultIcon = {
    Reliable: <CheckCircle2 className="text-emerald-500" size={28} />,
    "Potential Misinformation": <AlertTriangle className="text-rose-500" size={28} />,
    Uncertain: <HelpCircle className="text-amber-500" size={28} />,
  }[analysis.result];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">
        <div className="flex items-center justify-between mb-2">
          <TopBar title="Analysis Results" subtitle="Here's the analysis of your content." />
        </div>
        <button onClick={() => navigate("/analyze")} className="btn-secondary text-sm inline-flex items-center gap-2 mb-4 -mt-4">
          <ArrowLeft size={15} /> Back to Analyze
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              {resultIcon}
              <div>
                <p className="font-bold text-slate-800">{analysis.result}</p>
                <p className="text-xs text-slate-500">Confidence Score: {analysis.confidence}%</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-500 mb-1">Submitted Text</p>
              <p className="text-sm bg-slate-50 rounded-lg p-3 text-slate-700">"{analysis.content}"</p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-slate-500 mb-1">Analysis Summary</p>
              <p className="text-sm text-slate-600">{analysis.summary}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={toggleSave} disabled={busy} className="btn-secondary text-sm inline-flex items-center gap-2">
                <Bookmark size={15} className={analysis.saved ? "fill-brand-600 text-brand-600" : ""} />
                {analysis.saved ? "Saved" : "Save Result"}
              </button>
              <button onClick={report} disabled={busy || analysis.reported} className="btn-secondary text-sm inline-flex items-center gap-2">
                <Flag size={15} />
                {analysis.reported ? "Reported" : "Report Content"}
              </button>
            </div>
          </div>

          <div className="card p-5">
            <p className="font-semibold text-sm text-slate-800 mb-3">Detailed Analysis</p>
            <div className="flex border-b border-slate-200 mb-4">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px ${
                    tab === t ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "Key Insights" && (
              <div className="space-y-4">
                <InsightRow label="Claim Type" value={analysis.claimType} />
                <InsightRow label="Suspicious Language" value={analysis.suspiciousLanguage.join("; ")} />
                <InsightRow label="Sentiment" value={analysis.sentiment} />
                <InsightRow label="Evidence Check" value={analysis.evidenceCheck} />
                <InsightRow label="Recommendation" value={analysis.recommendation} />
              </div>
            )}
            {tab === "Linguistic Analysis" && (
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                {analysis.suspiciousLanguage.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
                <li>Overall tone: {analysis.sentiment}</li>
              </ul>
            )}
            {tab === "Source Check" && (
              <div className="text-sm text-slate-600 space-y-2">
                <p>{analysis.evidenceCheck}</p>
                <p className="text-xs text-slate-400">
                  Tip: cross-check claims against fact-checking organizations such as WHO, CDC, Reuters Fact Check,
                  or PolitiFact before sharing.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-sm">
          <Link to="/history" className="text-brand-600 font-medium">View all past analyses →</Link>
        </div>
      </main>
    </div>
  );
}

function InsightRow({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="text-sm text-slate-700 mt-0.5">{value}</p>
    </div>
  );
}
