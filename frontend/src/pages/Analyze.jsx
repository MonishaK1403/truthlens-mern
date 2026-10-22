import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Link2, Upload } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import api from "../api/axios";

const SAMPLES = [
  { label: "News headline", text: "Local council approves new recycling initiative starting next month." },
  { label: "Social media post", text: "SHARE THIS BEFORE IT GETS DELETED!! Doctors hate this one weird trick that completely cures diabetes overnight!!!" },
  { label: "Health claim", text: "Drinking lemon water can completely cure diabetes naturally without any medication." },
  { label: "Political statement", text: "According to a peer-reviewed study published by Reuters, the new policy may reduce emissions by 12% over five years." },
];

export default function Analyze() {
  const [tab, setTab] = useState("text");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("auto");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setError("");
    const payload =
      tab === "url"
        ? { content: url, inputType: "url", sourceLabel: url, language }
        : { content, inputType: "text", sourceLabel: "Manual text", language };

    if (!payload.content.trim()) {
      setError(tab === "url" ? "Please enter a URL to analyze" : "Please enter some text to analyze");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/analyze", payload);
      navigate(`/results/${data.analysis._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 max-w-4xl">
        <TopBar title="Analyze Content" subtitle="Paste text, enter a URL, or upload a file to detect potential misinformation." />

        <div className="card p-5">
          <div className="flex border-b border-slate-200 mb-4">
            {[
              { id: "text", label: "Text Input", icon: Search },
              { id: "url", label: "URL Analysis", icon: Link2 },
              { id: "file", label: "File Upload", icon: Upload },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px ${
                  tab === id ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500"
                }`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {error && <div className="mb-4 text-sm bg-rose-50 text-rose-700 px-3 py-2 rounded-lg">{error}</div>}

          {tab === "text" && (
            <textarea
              maxLength={5000}
              rows={7}
              placeholder="Enter or paste the text you want to analyze..."
              className="input resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
          {tab === "url" && (
            <input
              type="url"
              placeholder="https://example.com/article"
              className="input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          )}
          {tab === "file" && (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center text-sm text-slate-400">
              File upload requires a text-extraction service (e.g. PDF/OCR parsing) — paste the extracted text
              under "Text Input" for now.
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            {tab === "text" ? (
              <span className="text-xs text-slate-400">{content.length}/5000</span>
            ) : (
              <span />
            )}
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input w-auto text-sm py-1.5">
              <option value="auto">Auto-detect</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
            </select>
          </div>

          <button onClick={handleAnalyze} disabled={loading || tab === "file"} className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
            <Search size={16} /> {loading ? "Analyzing..." : "Analyze Now"}
          </button>

          <div className="mt-5">
            <p className="text-xs text-slate-500 mb-2">Try sample content:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    setTab("text");
                    setContent(s.text);
                  }}
                  className="text-xs bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full font-medium hover:bg-brand-100"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
