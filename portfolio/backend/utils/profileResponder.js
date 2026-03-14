const fs = require("fs");
const path = require("path");

function loadProfile() {
  const profilePath = path.join(__dirname, "../data/profile.json");
  return JSON.parse(fs.readFileSync(profilePath, "utf-8"));
}

function formatProjects(profile) {
  return profile.projects
    .map((project) => `${project.name}: ${project.description}`)
    .join(" ");
}

function formatSkills(profile) {
  return [
    ...(profile.skills.programmingLanguages || []),
    ...(profile.skills.frameworks || []),
    ...(profile.skills.tools || []),
    ...(profile.skills.web || []),
    ...(profile.skills.dataTools || []),
    ...(profile.skills.coreSkills || []),
  ].join(", ");
}

function getFallbackResponse(message) {
  const profile = loadProfile();
  const prompt = message.toLowerCase();

  if (prompt.includes("who is") || prompt.includes("about") || prompt.includes("yourself")) {
    return `${profile.name} is an ${profile.title}. ${profile.summary}`;
  }

  if (prompt.includes("skill") || prompt.includes("tech stack") || prompt.includes("technology")) {
    return `${profile.name}'s skills include ${formatSkills(profile)}.`;
  }

  if (prompt.includes("project") || prompt.includes("built") || prompt.includes("work")) {
    return formatProjects(profile);
  }

  if (prompt.includes("education") || prompt.includes("college") || prompt.includes("study")) {
    const education = profile.education
      .map((item) => `${item.degree} at ${item.institution} (${item.year}) with CGPA ${item.cgpa}.`)
      .join(" ");
    return education;
  }

  if (prompt.includes("certificate") || prompt.includes("certification")) {
    return `Certifications: ${profile.certifications.join(", ")}.`;
  }

  if (prompt.includes("contact") || prompt.includes("email") || prompt.includes("linkedin")) {
    return `You can contact ${profile.name} via email at ${profile.contact.email} or LinkedIn at ${profile.contact.linkedin}.`;
  }

  return `${profile.name} is an ${profile.title}. Skills include ${formatSkills(profile)}. Key projects include ${profile.projects
    .map((project) => project.name)
    .join(", ")}.`;
}

module.exports = { getFallbackResponse };
