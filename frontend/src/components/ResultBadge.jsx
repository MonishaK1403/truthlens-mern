import React from "react";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

export default function ResultBadge({ result }) {
  const config = {
    Reliable: { icon: CheckCircle2, cls: "bg-emerald-50 text-emerald-700" },
    "Potential Misinformation": { icon: AlertTriangle, cls: "bg-rose-50 text-rose-700" },
    Uncertain: { icon: HelpCircle, cls: "bg-amber-50 text-amber-700" },
  };
  const { icon: Icon, cls } = config[result] || config.Uncertain;
  return (
    <span className={`badge ${cls}`}>
      <Icon size={13} />
      {result}
    </span>
  );
}
