const express = require("express");
const Analysis = require("../models/Analysis");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

// @route GET /api/dashboard/summary
router.get("/summary", async (req, res) => {
  try {
    const userId = req.user._id;

    const [total, reliable, misinformation, uncertain] = await Promise.all([
      Analysis.countDocuments({ user: userId }),
      Analysis.countDocuments({ user: userId, result: "Reliable" }),
      Analysis.countDocuments({ user: userId, result: "Potential Misinformation" }),
      Analysis.countDocuments({ user: userId, result: "Uncertain" }),
    ]);

    // Last 30 days trend, grouped by day
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const trendRaw = await Analysis.aggregate([
      { $match: { user: userId, createdAt: { $gte: since } } },
      {
        $group: {
          _id: { day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, result: "$result" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.day": 1 } },
    ]);

    const trendMap = {};
    trendRaw.forEach((row) => {
      const day = row._id.day;
      if (!trendMap[day]) trendMap[day] = { date: day, Reliable: 0, "Potential Misinformation": 0, Uncertain: 0 };
      trendMap[day][row._id.result] = row.count;
    });
    const trend = Object.values(trendMap);

    // Content source breakdown (by inputType, mapped to display labels)
    const sourceRaw = await Analysis.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$inputType", count: { $sum: 1 } } },
    ]);
    const sourceLabels = { text: "Manual Text", url: "URL / Articles", file: "Uploaded Files" };
    const sources = sourceRaw.map((s) => ({ label: sourceLabels[s._id] || s._id, count: s.count }));

    res.json({
      totals: { total, reliable, misinformation, uncertain },
      trend,
      sources,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load dashboard summary", error: err.message });
  }
});

module.exports = router;
