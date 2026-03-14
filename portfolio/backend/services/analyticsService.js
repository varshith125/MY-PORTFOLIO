const axios = require("axios");
const UAParser = require("ua-parser-js");
const Visit = require("../models/Visit");

const fallbackStore = [];

function resolveClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
}

async function resolveCountry(ip) {
  if (!ip || ip === "unknown" || ip === "::1" || ip === "127.0.0.1") {
    return "Local";
  }

  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 2500,
      headers: { "User-Agent": "varshith-portfolio" },
    });
    return response.data?.country_name || "Unknown";
  } catch {
    return "Unknown";
  }
}

function parseDeviceType(userAgent) {
  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type;
  return deviceType || "desktop";
}

async function recordVisit(req, payload = {}) {
  const ip = resolveClientIp(req);
  const country = await resolveCountry(ip);
  const userAgent = req.headers["user-agent"] || "";
  const visit = {
    ip,
    country,
    deviceType: parseDeviceType(userAgent),
    page: payload.page || "/",
    project: payload.project || null,
    category: payload.category || "page_view",
    target: payload.target || null,
    userAgent,
    visitedAt: new Date(),
  };

  try {
    await Visit.create(visit);
  } catch {
    fallbackStore.push(visit);
  }

  return visit;
}

async function getStats() {
  try {
    const [totalVisits, countries, projects, eventCounts] = await Promise.all([
      Visit.countDocuments(),
      Visit.aggregate([
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      Visit.aggregate([
        { $match: { project: { $ne: null } } },
        { $group: { _id: "$project", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
      Visit.aggregate([
        { $group: { _id: { category: "$category", target: "$target" }, count: { $sum: 1 } } },
      ]),
    ]);

    const metrics = {
      githubClicks: 0,
      linkedinClicks: 0,
      resumeDownloads: 0,
      projectOpens: 0,
      chatbotMessages: 0,
    };

    eventCounts.forEach((item) => {
      const key = `${item._id.category}:${item._id.target || ""}`;
      if (key === "external_click:github") metrics.githubClicks = item.count;
      if (key === "external_click:linkedin") metrics.linkedinClicks = item.count;
      if (key === "resume_download:resume") metrics.resumeDownloads = item.count;
      if (item._id.category === "project_click") metrics.projectOpens += item.count;
      if (item._id.category === "chat_message") metrics.chatbotMessages += item.count;
    });

    return {
      totalVisits,
      metrics,
      countries: countries.map((item) => ({ country: item._id || "Unknown", count: item.count })),
      projects: projects.map((item) => ({ project: item._id, count: item.count })),
    };
  } catch {
    const countriesMap = new Map();
    const projectMap = new Map();
    const metrics = {
      githubClicks: 0,
      linkedinClicks: 0,
      resumeDownloads: 0,
      projectOpens: 0,
      chatbotMessages: 0,
    };

    fallbackStore.forEach((item) => {
      countriesMap.set(item.country, (countriesMap.get(item.country) || 0) + 1);
      if (item.project) {
        projectMap.set(item.project, (projectMap.get(item.project) || 0) + 1);
      }
      if (item.category === "external_click" && item.target === "github") metrics.githubClicks += 1;
      if (item.category === "external_click" && item.target === "linkedin") metrics.linkedinClicks += 1;
      if (item.category === "resume_download") metrics.resumeDownloads += 1;
      if (item.category === "project_click") metrics.projectOpens += 1;
      if (item.category === "chat_message") metrics.chatbotMessages += 1;
    });

    return {
      totalVisits: fallbackStore.length,
      metrics,
      countries: [...countriesMap.entries()].map(([country, count]) => ({ country, count })),
      projects: [...projectMap.entries()].map(([project, count]) => ({ project, count })),
    };
  }
}

module.exports = { recordVisit, getStats };
