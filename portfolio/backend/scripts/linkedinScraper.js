/**
 * LinkedIn Profile Scraper using Apify
 * Run: node scripts/linkedinScraper.js
 * Updates data/profile.json with latest LinkedIn data
 */

const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;
const LINKEDIN_URL = process.env.LINKEDIN_PROFILE_URL;

async function scrapeLinkedIn() {
  if (!APIFY_API_TOKEN) throw new Error("APIFY_API_TOKEN not set in .env");
  if (!LINKEDIN_URL) throw new Error("LINKEDIN_PROFILE_URL not set in .env");

  console.log("Starting LinkedIn scrape via Apify...");

  // Start the Apify actor run
  const startResponse = await axios.post(
    `https://api.apify.com/v2/acts/anchor~linkedin-profile-scraper/runs?token=${APIFY_API_TOKEN}`,
    {
      startUrls: [{ url: LINKEDIN_URL }],
    }
  );

  const runId = startResponse.data.data.id;
  console.log(`Apify run started: ${runId}`);

  // Poll for completion
  let status = "RUNNING";
  while (status === "RUNNING" || status === "READY") {
    await new Promise((r) => setTimeout(r, 3000));
    const statusRes = await axios.get(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_API_TOKEN}`
    );
    status = statusRes.data.data.status;
    console.log(`Run status: ${status}`);
  }

  if (status !== "SUCCEEDED") {
    throw new Error(`Apify run failed with status: ${status}`);
  }

  // Fetch results
  const datasetId = (
    await axios.get(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_API_TOKEN}`
    )
  ).data.data.defaultDatasetId;

  const resultsRes = await axios.get(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_API_TOKEN}`
  );
  const items = resultsRes.data;

  if (!items || items.length === 0) {
    throw new Error("No LinkedIn data returned from Apify");
  }

  const profile = items[0];

  // Map LinkedIn data to our profile schema
  const linkedinData = {
    name: profile.fullName || profile.name || "",
    title: profile.headline || "",
    contact: {
      location: profile.location || "",
      linkedin: LINKEDIN_URL,
    },
    summary: profile.summary || profile.about || "",
    education: (profile.education || []).map((edu) => ({
      degree: edu.fieldOfStudy
        ? `${edu.degreeName} – ${edu.fieldOfStudy}`
        : edu.degreeName || "",
      institution: edu.schoolName || "",
      location: "",
      year: edu.timePeriod
        ? `${edu.timePeriod.startDate?.year || ""}–${edu.timePeriod.endDate?.year || "Present"}`
        : "",
      cgpa: "",
    })),
    skills: {
      programmingLanguages: [],
      dataTools: [],
      coreSkills: (profile.skills || []).map((s) => s.name || s),
      web: [],
      frameworks: [],
      tools: [],
    },
    experience: (profile.experience || []).map((exp) => ({
      role: exp.title || "",
      company: exp.companyName || "",
      description: exp.description || "",
    })),
    projects: (profile.projects || []).map((proj) => ({
      name: proj.title || "",
      description: proj.description || "",
      tech: [],
    })),
    certifications: (profile.certifications || []).map(
      (cert) => `${cert.name}${cert.authority ? " – " + cert.authority : ""}`
    ),
  };

  // Merge with existing profile (preserve fields not in LinkedIn)
  const existingProfilePath = path.join(__dirname, "../data/profile.json");
  let existingProfile = {};
  if (fs.existsSync(existingProfilePath)) {
    existingProfile = JSON.parse(fs.readFileSync(existingProfilePath, "utf-8"));
  }

  const merged = {
    ...existingProfile,
    ...linkedinData,
    contact: { ...existingProfile.contact, ...linkedinData.contact },
    skills: {
      ...existingProfile.skills,
      coreSkills: [
        ...new Set([
          ...(existingProfile.skills?.coreSkills || []),
          ...linkedinData.skills.coreSkills,
        ]),
      ],
    },
    lastUpdated: new Date().toISOString(),
  };

  fs.writeFileSync(existingProfilePath, JSON.stringify(merged, null, 2));
  console.log("✅ LinkedIn data merged and saved to data/profile.json");
  return merged;
}

scrapeLinkedIn()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("LinkedIn scrape failed:", err.message);
    process.exit(1);
  });
