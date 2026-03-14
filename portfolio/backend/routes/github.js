const express = require("express");
const router = express.Router();
const axios = require("axios");

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "varshith125";
const GITHUB_API_BASE = "https://api.github.com";

// GET /api/github/repos
router.get("/repos", async (req, res) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos`,
      {
        params: {
          sort: "updated",
          per_page: 20,
          type: "public",
        },
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "varshith-portfolio",
        },
      }
    );

    const repos = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "No description provided",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      url: repo.html_url,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      isForked: repo.fork,
    }));

    // Filter out forks for cleaner display, allow toggle via query param
    const includeForked = req.query.forks === "true";
    const filtered = includeForked
      ? repos
      : repos.filter((r) => !r.isForked);

    return res.json({ repos: filtered, username: GITHUB_USERNAME });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: "GitHub user not found" });
    }
    if (error.response?.status === 403) {
      return res.status(429).json({ error: "GitHub API rate limit exceeded" });
    }
    console.error("GitHub API error:", error.message);
    return res.status(500).json({ error: "Failed to fetch GitHub repos" });
  }
});

// GET /api/github/user
router.get("/user", async (req, res) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "varshith-portfolio",
        },
      }
    );

    const { public_repos, followers, following, avatar_url, bio, blog } =
      response.data;

    return res.json({
      username: GITHUB_USERNAME,
      publicRepos: public_repos,
      followers,
      following,
      avatarUrl: avatar_url,
      bio,
      blog,
    });
  } catch (error) {
    console.error("GitHub user API error:", error.message);
    return res.status(500).json({ error: "Failed to fetch GitHub user data" });
  }
});

module.exports = router;
