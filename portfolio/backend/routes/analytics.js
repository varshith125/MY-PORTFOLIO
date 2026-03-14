const express = require("express");
const { trackVisit, getAnalyticsStats } = require("../controllers/analyticsController");

const router = express.Router();

router.post("/track", trackVisit);
router.get("/stats", getAnalyticsStats);

module.exports = router;
