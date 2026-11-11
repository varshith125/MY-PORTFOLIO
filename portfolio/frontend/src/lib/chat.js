import { profile, projects, skillGroups, path } from "../data/profile.js";
// Local, deterministic profile lookup. Never calls an AI service or sends visitor text.
export function answerQuestion(question) {
 const q = question.toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();
 const matches = re => re.test(q);
 const selected = projects.filter(p => q.includes(p.name.toLowerCase()) || q.split(" ").includes(p.id) || (p.id === "doculens" && matches(/passport|ocr|scanner|document extraction/)) || (p.id === "rag" && matches(/\b(rag|retrieval)\b/)));
 if (selected.length) return selected.map(p=>`${p.name} — ${p.kind}. ${p.summary}\n\n${p.points.join(". ")}.\n\nBuilt with: ${p.stack.join(", ")}.`).join("\n\n");
 const answers=[];
 if(matches(/certificat|certified|courses/)) answers.push(path[2].text);
 if(matches(/testing|tests|debugging/)) answers.push("His resume includes unit, functional, and regression testing in CryptoPrompt and FinTrack, including authentication, API workflows, dashboard components, and checks after updates.");
 if(matches(/\b(projects?|built|build|made|portfolio)\b/)) answers.push(`His projects include ${projects.map(p=>p.name).join(", ")}. Ask about a project by name for its purpose, implementation, and technologies.`);
 if(matches(/\b(skills?|stack|technologies|technology|languages?|tools|python|react|backend|frontend)\b/)) answers.push(skillGroups.map(g=>`${g.label}: ${g.items.join(", ")}.`).join("\n"));
 if(matches(/relocat|location|where|based|hyderabad|city/)) answers.push(`Varshith is based in ${profile.location}. ${profile.relocation}.`);
 if(matches(/experience|intern|job|bluphlux|worked|work history/)) answers.push(`${path[0].title} at ${path[0].place}, ${path[0].when}. ${path[0].text}`);
 if(matches(/education|degree|college|study|cgpa|graduat|university/)) answers.push(`${path[1].title}, ${path[1].place}. ${path[1].text}`);
 if(matches(/contact|email|reach|hire|linkedin|github/)) answers.push(`Email: ${profile.email}\nLinkedIn: ${profile.links.linkedin}\nGitHub: ${profile.links.github}`);
 if(answers.length) return answers.join("\n\n");
 if(matches(/^(hi|hello|hey|thanks|thank you)$/)) return `Hi! I can help you explore Varshith's projects, skills, education, experience, and contact information. What would you like to know?`;
 if(matches(/about|who|introduce|yourself|summary/)) return `${profile.fullName} — ${profile.role}. ${profile.intro}`;
 return "That information isn't in Varshith's published profile, so I can't give a verified answer. Try asking about DocuLens, other projects, skills, education, experience, or contact details.";
}
export async function ask(question) { return { text: answerQuestion(question), offline: false }; }

