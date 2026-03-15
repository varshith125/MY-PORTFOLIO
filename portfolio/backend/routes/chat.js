const express = require("express");
const router = express.Router();
const { getChatResponse } = require("../utils/gemini");
const { getFallbackResponse } = require("../utils/profileResponder");

// POST /api/chat
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  if (message.length > 1000) {
    return res.status(400).json({ error: "Message too long (max 1000 chars)" });
  }

  try {
    const response = await getChatResponse(message.trim());
    return res.json({ reply: response });
  } catch (error) {
    console.error("Chat route error:", error.message);
    
    let finalFallbackReply = "Varshith is a talented software engineer. You can reach out to him via email or LinkedIn for more details.";
    try {
      finalFallbackReply = getFallbackResponse(message.trim());
    } catch (fallbackError) {
      console.error("Fallback generator error:", fallbackError.message);
    }
    
    return res.json({
      reply: finalFallbackReply,
      fallback: true,
      warning: "Gemini quota unavailable or timed out. Responding from resume profile data.",
    });
  }
});

module.exports = router;
