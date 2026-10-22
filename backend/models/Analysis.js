const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    inputType: { type: String, enum: ["text", "url", "file"], default: "text" },
    sourceLabel: { type: String, default: "Manual text" },
    content: { type: String, required: true },
    language: { type: String, default: "auto" },
    result: {
      type: String,
      enum: ["Reliable", "Potential Misinformation", "Uncertain"],
      required: true,
    },
    confidence: { type: Number, required: true },
    claimType: { type: String, default: "General statement" },
    suspiciousLanguage: [{ type: String }],
    sentiment: { type: String, default: "Neutral" },
    evidenceCheck: { type: String, default: "No strong evidence found from trusted sources" },
    recommendation: { type: String, default: "Verify with credible, cited sources" },
    summary: { type: String, default: "" },
    saved: { type: Boolean, default: false },
    reported: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);
