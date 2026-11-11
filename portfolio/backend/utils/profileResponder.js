const profileData = {
  name: "Varshith",
  role: "Full-stack and AI developer",
  intro: "I'm an IT graduate from Visakhapatnam. I build web apps with React and Python, and AI pipelines that answer questions from real documents.",
  location: "Visakhapatnam, India",
  relocation: "Open to relocating",
  email: "varshith6066@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/venkata-varshith-82b2542a5",
    github: "https://github.com/varshith125",
  },
  projects: [
    "CryptoPrompt (React, Vite, Django REST Framework, Gemini API, Solidity, AES-256-GCM)",
    "AI-Powered RAG Assistant (n8n, Supabase, pgvector, OpenAI API)",
    "FinTrack (React, TypeScript, Zustand, Recharts, Tailwind CSS)",
    "Passport and ID scanner (FastAPI, OpenCV, Pillow, RapidOCR, React, TypeScript)"
  ],
  skills: [
    "Frontend: React, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Vite, Zustand, Recharts, Axios",
    "Backend: Python, Django REST Framework, SimpleJWT, Firebase Authentication, OAuth, Express, Node.js",
    "Data & AI: SQL, PostgreSQL, Supabase, pgvector, OpenAI API, Gemini API, n8n",
    "Tools: Git, Solidity, Linux basics"
  ],
  experience: "Frontend Developer Intern at Bluphlux (Nov 2025 to Apr 2026). Built and maintained interface components in React with hooks, JavaScript, HTML5 and CSS3, working through Git with the team.",
  education: "B.Tech in Information Technology from Anil Neerukonda Institute of Technology and Sciences, Visakhapatnam (CGPA: 7.60)."
};

function getFallbackResponse(question) {
  const q = (question || "").toLowerCase();
  const has = (...words) => words.some((w) => q.includes(w));

  if (has("built", "project", "work", "made", "portfolio")) {
    return `He has built ${profileData.projects.join("; ")}. Scroll to the work section for more details.`;
  }
  if (has("stack", "skill", "tech", "language", "tools", "know")) {
    return profileData.skills.join(". ") + ".";
  }
  if (has("relocat", "location", "where", "based", "hyderabad", "city", "live")) {
    return `He is based in ${profileData.location}. ${profileData.relocation}.`;
  }
  if (has("experience", "intern", "job", "bluphlux", "worked", "company")) {
    return profileData.experience;
  }
  if (has("education", "degree", "college", "study", "cgpa", "graduat", "school")) {
    return profileData.education;
  }
  if (has("contact", "email", "reach", "hire", "linkedin", "github", "message")) {
    return `You can email him at ${profileData.email}, or reach out via LinkedIn (${profileData.links.linkedin}) or GitHub (${profileData.links.github}).`;
  }

  return `${profileData.intro} Feel free to ask about his projects, technical stack, experience, education, or relocation status!`;
}

module.exports = { getFallbackResponse };

