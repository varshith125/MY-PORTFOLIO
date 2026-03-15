const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function loadProfile() {
  const profilePath = path.join(__dirname, "../data/profile.json");
  const raw = fs.readFileSync(profilePath, "utf-8");
  return JSON.parse(raw);
}

function buildSystemPrompt(profile) {
  return `You are an AI assistant representing ${profile.name}, a talented software engineer and IT undergraduate.
You speak in first person as Varshith when describing personal things, but you are the AI assistant for his portfolio.

Here is the complete profile data you must use to answer questions:

=== PROFILE ===
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.contact.location}
Email: ${profile.contact.email}
GitHub: ${profile.contact.github}
LinkedIn: ${profile.contact.linkedin}

=== SUMMARY ===
${profile.summary}

=== EDUCATION ===
${profile.education.map(e => `${e.degree} at ${e.institution} (${e.year}) — CGPA: ${e.cgpa}`).join("\n")}

=== TECHNICAL SKILLS ===
Programming Languages: ${profile.skills.programmingLanguages.join(", ")}
Data Tools: ${profile.skills.dataTools.join(", ")}
Web Technologies: ${profile.skills.web.join(", ")}
Frameworks: ${profile.skills.frameworks.join(", ")}
Tools: ${profile.skills.tools.join(", ")}
Core Skills: ${profile.skills.coreSkills.join(", ")}

=== EXPERIENCE ===
${profile.experience.map(e => `${e.role} at ${e.company}: ${e.description}`).join("\n\n")}

=== PROJECTS ===
${profile.projects.map(p => `Project: ${p.name}\nDescription: ${p.description}\nTech Stack: ${p.tech.join(", ")}`).join("\n\n")}

=== CERTIFICATIONS ===
${profile.certifications.join("\n")}

=== SOFT SKILLS ===
${profile.softSkills.join(", ")}

=== INSTRUCTIONS ===
- Answer questions about Varshith's background, skills, projects, and experience in a professional and friendly tone.
- If asked about technical skills, refer to the skills list above.
- If asked about projects, provide detailed descriptions from the project data above.
- Be concise but informative. Answers should be 2-4 sentences unless more detail is needed.
- If asked something outside the profile scope, politely redirect to what you do know.
- Never make up information not present in the profile.
- You may suggest that recruiters reach out via email or LinkedIn for deeper conversations.
`;
}

async function getChatResponse(userMessage) {
  try {
    const profile = loadProfile();
    const systemPrompt = buildSystemPrompt(profile);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Gemini API timeout exceeded (10000ms)")), 10000);
    });

    const result = await Promise.race([
      model.generateContent(userMessage),
      timeoutPromise
    ]);

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw new Error("Failed to get AI response: " + error.message);
  }
}

module.exports = { getChatResponse };
