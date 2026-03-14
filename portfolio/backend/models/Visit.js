const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    ip: { type: String, default: "unknown" },
    country: { type: String, default: "Unknown" },
    deviceType: { type: String, default: "desktop" },
    page: { type: String, default: "/" },
    project: { type: String, default: null },
    category: { type: String, default: "page_view" },
    target: { type: String, default: null },
    userAgent: { type: String, default: "" },
    visitedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.models.Visit || mongoose.model("Visit", visitSchema);
