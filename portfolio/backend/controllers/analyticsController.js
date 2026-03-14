const { recordVisit, getStats } = require("../services/analyticsService");

async function trackVisit(req, res) {
  try {
    const visit = await recordVisit(req, req.body || {});
    res.status(201).json({ success: true, visit });
  } catch (error) {
    res.status(500).json({ error: "Failed to record visit" });
  }
}

async function getAnalyticsStats(req, res) {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to load analytics" });
  }
}

module.exports = { trackVisit, getAnalyticsStats };
