const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

  // Strip markdown code fences if present
  const cleaned = responseText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned);
  parsed.lastUpdated = new Date().toISOString();
  return parsed;
}

async function processAndSaveResume(filePath) {
  console.log("Extracting text from PDF...");
  const rawText = await extractTextFromPDF(filePath);

  console.log("Parsing resume with Gemini...");
  const structured = await parseResumeWithGemini(rawText);

  const outputPath = path.join(__dirname, "../data/profile.json");
  fs.writeFileSync(outputPath, JSON.stringify(structured, null, 2));
  console.log("Profile saved to data/profile.json");

  // Cleanup uploaded file
  fs.unlinkSync(filePath);

  return structured;
}

module.exports = { processAndSaveResume, extractTextFromPDF };
