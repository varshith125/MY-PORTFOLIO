const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { processAndSaveResume } = require("../utils/resumeParser");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `resume_${Date.now()}.pdf`),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// POST /api/resume/upload
router.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No PDF file uploaded" });
  }

  try {
    console.log(`Processing uploaded resume: ${req.file.filename}`);
    const profile = await processAndSaveResume(req.file.path);

    return res.json({
      success: true,
      message: "Resume parsed and profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Resume processing error:", error.message);
    // Clean up file if processing failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({
      error: "Failed to parse resume: " + error.message,
    });
  }
});

// GET /api/resume/profile
router.get("/profile", (req, res) => {
  const profilePath = path.join(__dirname, "../data/profile.json");
  if (!fs.existsSync(profilePath)) {
    return res.status(404).json({ error: "Profile not found" });
  }
  const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
  return res.json(profile);
});

module.exports = router;
