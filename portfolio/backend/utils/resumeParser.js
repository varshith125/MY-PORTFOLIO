const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "mock_key");

async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

async function parseResumeWithGemini(rawText) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are a resume parser. Extract structured information from the following resume text and return ONLY valid JSON.

Resume text:
"""
${rawText}
"""

Return a JSON object with this exact structure:
{
  "name": "",
  "title": "",
  "contact": {
    "phone": "",
    "email": "",
    "location": "",
    "linkedin": "",
    "github": ""
  },
  "summary": "",
  "education": [
    {
      "degree": "",
      "institution": "",
      "location": "",
      "year": "",
      "cgpa": ""
    }
  ],
  "skills": {
    "dataTools": [],
    "programmingLanguages": [],
    "coreSkills": [],
    "web": [],
    "frameworks": [],
    "tools": []
  },
  "experience": [
    {
      "role": "",
      "company": "",
      "description": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "tech": []
    }
  ],
  "certifications": [],
  "softSkills": []
}

Return ONLY the JSON object, no markdown, no explanation.
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text().trim();

  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to extract JSON from Gemini response.");

  const parsed = JSON.parse(jsonMatch[0]);
  parsed.lastUpdated = new Date().toISOString();
  parsed.parsedBy = "gemini";
  return parsed;
}

// Fallback: regex-based parser when Gemini quota is exceeded
function parseResumeWithRegex(rawText) {
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);

  const emailMatch = rawText.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = rawText.match(/(\+?\d[\d\s\-().]{8,14}\d)/);
  const linkedinMatch = rawText.match(/linkedin\.com\/in\/[\w-]+/i);
  const githubMatch = rawText.match(/github\.com\/[\w-]+/i);
  const cgpaMatch = rawText.match(/(?:cgpa|gpa|score)[:\s]*([0-9.]+)/i);

  const name = lines[0] || "";
  const title = lines[1] || "Software Engineer";
  const allText = rawText.toLowerCase();

  const programmingLanguages = ["Python", "JavaScript", "Java", "C++", "C", "TypeScript", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "R"]
    .filter((s) => allText.includes(s.toLowerCase()));
  const web = ["HTML", "CSS", "React", "Vue", "Angular", "Bootstrap", "Tailwind", "Next.js", "Node.js", "Express"]
    .filter((s) => allText.includes(s.toLowerCase()));
  const frameworks = ["Django", "Flask", "Spring", "Laravel", "FastAPI", "NestJS", "Redux"]
    .filter((s) => allText.includes(s.toLowerCase()));
  const tools = ["Git", "GitHub", "Docker", "Kubernetes", "VS Code", "Postman", "Figma", "Linux", "AWS", "MongoDB", "MySQL", "PostgreSQL"]
    .filter((s) => allText.includes(s.toLowerCase()));
  const dataTools = ["Excel", "SQL", "Power BI", "Tableau", "Pandas", "NumPy", "TensorFlow", "PyTorch"]
    .filter((s) => allText.includes(s.toLowerCase()));

  const educationMatch = rawText.match(/(b\.?tech|bachelor|master|m\.?tech|b\.?e|mba|bsc|msc)[^\n]*/gi) || [];
  const institutionMatch = rawText.match(/(university|institute|college|school)[^\n]*/gi) || [];

  const projectLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^project/i.test(lines[i]) && lines[i + 1]) {
      projectLines.push({ name: lines[i + 1], description: lines[i + 2] || "", tech: [] });
    }
  }

  const certLines = lines.filter((l) => /certif|course|udemy|coursera|nptel|edx/i.test(l));

  return {
    name,
    title,
    contact: {
      phone: phoneMatch ? phoneMatch[1].trim() : "",
      email: emailMatch ? emailMatch[0] : "",
      location: "",
      linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : "",
      github: githubMatch ? `https://${githubMatch[0]}` : "",
    },
    summary: `${name} is a ${title} with expertise in ${[...programmingLanguages, ...frameworks].slice(0, 4).join(", ")}.`,
    education: educationMatch.length
      ? [{ degree: educationMatch[0], institution: institutionMatch[0] || "", location: "", year: "", cgpa: cgpaMatch ? cgpaMatch[1] : "" }]
      : [],
    skills: {
      programmingLanguages,
      web,
      frameworks,
      tools,
      dataTools,
      coreSkills: ["Problem Solving", "Team Collaboration"],
    },
    experience: [],
    projects: projectLines.length ? projectLines : [],
    certifications: certLines.slice(0, 5),
    softSkills: ["Communication", "Team Collaboration", "Adaptability"],
    lastUpdated: new Date().toISOString(),
    parsedBy: "fallback-regex",
  };
}

async function processAndSaveResume(filePath) {
  console.log("Extracting text from PDF...");
  const rawText = await extractTextFromPDF(filePath);

  let structured;
  try {
    console.log("Parsing resume with Gemini AI...");
    structured = await parseResumeWithGemini(rawText);
    console.log("Gemini parsing successful.");
  } catch (geminiError) {
    console.warn("Gemini unavailable, using fallback regex parser:", geminiError.message);
    structured = parseResumeWithRegex(rawText);
    console.log("Fallback regex parsing complete.");
  }

  const outputPath = path.join(__dirname, "../data/profile.json");
  fs.writeFileSync(outputPath, JSON.stringify(structured, null, 2));
  console.log("Profile saved to data/profile.json");

  fs.unlinkSync(filePath);
  return structured;
}

module.exports = { processAndSaveResume, extractTextFromPDF };
