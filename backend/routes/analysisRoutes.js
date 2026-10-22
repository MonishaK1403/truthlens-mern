const express = require("express");
const Analysis = require("../models/Analysis");
const { protect } = require("../middleware/authMiddleware");
const { runHeuristicPipeline } = require("../utils/analyzer");

const router = express.Router();
router.use(protect);

// @route POST /api/analyze  -> run a new analysis (text / url / file-extracted text)
router.post("/", async (req, res) => {
  try {
    const { content, inputType, sourceLabel, language } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Please provide content to analyze" });
    }
    if (content.length > 5000) {
      return res.status(400).json({ message: "Content exceeds the 5000 character limit" });
    }

    const analysisResult = runHeuristicPipeline(content);

    const analysis = await Analysis.create({
      user: req.user._id,
      inputType: inputType || "text",
      sourceLabel: sourceLabel || "Manual text",
      content,
      language: language || "auto",
      ...analysisResult,
    });

    res.status(201).json({ analysis });
  } catch (err) {
    res.status(500).json({ message: "Analysis failed", error: err.message });
  }
});

// @route GET /api/analyze/history?page=1&limit=10
router.get("/history", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = { user: req.user._id };
    if (req.query.result) filter.result = req.query.result;

    const [items, total] = await Promise.all([
      Analysis.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Analysis.countDocuments(filter),
    ]);

    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history", error: err.message });
  }
});

// @route GET /api/analyze/saved
router.get("/saved", async (req, res) => {
  try {
    const items = await Analysis.find({ user: req.user._id, saved: true }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch saved articles", error: err.message });
  }
});

// @route GET /api/analyze/:id
router.get("/:id", async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id });
    if (!analysis) return res.status(404).json({ message: "Analysis not found" });
    res.json({ analysis });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analysis", error: err.message });
  }
});

// @route PATCH /api/analyze/:id  -> toggle save / report
router.patch("/:id", async (req, res) => {
  try {
    const { saved, reported } = req.body;
    const update = {};
    if (typeof saved === "boolean") update.saved = saved;
    if (typeof reported === "boolean") update.reported = reported;

    const analysis = await Analysis.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      update,
      { new: true }
    );
    if (!analysis) return res.status(404).json({ message: "Analysis not found" });
    res.json({ analysis });
  } catch (err) {
    res.status(500).json({ message: "Failed to update analysis", error: err.message });
  }
});

// @route DELETE /api/analyze/:id
router.delete("/:id", async (req, res) => {
  try {
    const analysis = await Analysis.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!analysis) return res.status(404).json({ message: "Analysis not found" });
    res.json({ message: "Analysis deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete analysis", error: err.message });
  }
});

module.exports = router;
