export const profile = {
 name: "Varshith", fullName: "Gummadi Venkata Varshith", nameLines: ["Gummadi Venkata", "Varshith"],
 role: "Entry-level Software Engineer",
 intro: "I'm Gummadi Venkata Varshith, a 2026 IT graduate. I build web applications with React and Python, connect them through REST APIs, and explore practical applications of AI.",
 location: "Visakhapatnam, India", relocation: "Open to relocating to Hyderabad", email: "varshith6066@gmail.com",
 links: { linkedin: "https://www.linkedin.com/in/venkata-varshith-82b2542a5", github: "https://github.com/varshith125" }
};
export const projects = [
 {id:"doculens",name:"DocuLens",kind:"Document intelligence · In development",summary:"A local document OCR application that turns passport and ID images into structured fields. Built around image preparation, text recognition, and review of uncertain results.",points:["React interface for uploading, previewing, and cropping documents, with a FastAPI backend", "OpenCV and Pillow prepare images before local OCR; MRZ parsing supports field extraction", "Flags conflicting or uncertain readings rather than inventing missing values", "Designed for temporary in-memory processing without a permanent document database"],stack:["Python","FastAPI","React","OpenCV","Local OCR"],tone:"foam"},
 {id:"cryptoprompt",name:"CryptoPrompt",kind:"Full-stack · AI & blockchain",summary:"An AI prompt management platform combining a React interface, Django REST APIs, secure authentication, and encrypted blockchain storage.",points:["Firebase OAuth and Django SimpleJWT secure authentication and API workflows", "Gemini API supports prompt categorization and enhancement", "SQLite dashboard data plus AES-256-GCM encrypted records stored through Solidity contracts", "Unit, functional, and regression testing of features, authentication, and APIs"],stack:["React","Django REST Framework","Firebase OAuth","Gemini API","Solidity","SQLite","JWT"],tone:"ink"},
 {id:"fintrack",name:"FinTrack",kind:"Frontend · Personal finance",summary:"A finance dashboard for understanding income, expenses, and savings, with interactive charts, record filtering, and persistent local data.",points:["Reusable React and TypeScript components with interactive Recharts charts", "Zustand state management and LocalStorage persistence", "Responsive Tailwind CSS interface with dark and light modes", "Unit, functional, and regression testing of dashboard components and user-facing features"],stack:["React","TypeScript","Zustand","Recharts","Tailwind CSS","LocalStorage"],tone:"marigold"},
 {id:"rag",name:"AI-Powered RAG Assistant",kind:"AI · Workflow automation",summary:"A document assistant that retrieves relevant passages using semantic search and uses that context to answer natural-language questions.",points:["OpenAI API integrated with Supabase pgvector for semantic search and retrieval", "Multi-step n8n workflows handle document processing and vector embeddings", "PostgreSQL supports the retrieval-augmented generation pipeline"],stack:["n8n","OpenAI API","Supabase","PostgreSQL","pgvector"],tone:"tide"}
];
export const skillGroups = [
 {id:"frontend",label:"Frontend",items:["React","JavaScript","TypeScript","HTML5","CSS3","Tailwind CSS","Vite","Zustand","Recharts"]},
 {id:"backend",label:"Backend",items:["Python","Java","C","Django","Django REST Framework","REST APIs","Firebase Authentication","OAuth","JWT","Axios"]},
 {id:"data",label:"Data & AI",items:["PostgreSQL","MySQL","MongoDB","SQLite","Supabase","pgvector","OpenAI API","Gemini API","RAG","n8n"]},
 {id:"engineering",label:"Engineering",items:["Unit Testing","Functional Testing","Regression Testing","Debugging","SDLC","Git","GitHub","VS Code","Vercel","Render"]}
];
export const path = [
 {when:"Nov 2025 – Apr 2026",title:"Frontend Developer Intern",place:"Bluphlux",text:"Developed reusable React components for learning projects, refactored class components into functional components with React Hooks, and used Git and GitHub for version control."},
 {when:"2022 – 2026",title:"B.Tech in Information Technology",place:"Anil Neerukonda Institute of Technology & Sciences",text:"Graduated with a CGPA of 7.60 / 10.0."},
 {when:"Additional learning",title:"Certifications",place:"Web development & cloud computing",text:"Java Full Stack — Besant Technologies; Django Framework — APSSDC; HTML, CSS & JavaScript — IBM (edX); Cloud Computing — NPTEL."}
];
export const starterQuestions = ["Tell me about DocuLens", "What are his skills?", "What is his experience?"];
