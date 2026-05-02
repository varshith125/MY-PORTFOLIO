import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Cpu, BarChart2 } from "lucide-react";
import { analyticsAPI } from "../utils/api";

const projects = [
  {
    id: 1,
    name: "CryptoPrompt",
    tagline: "AI Prompt Management Platform",
    description:
      "Full-stack AI platform using Gemini API to enhance prompt generation and user workflows. Hybrid Web2 + Web3 architecture (SQLite + Ethereum) with AES-256 encryption and JWT authentication.",
    tech: ["React", "Django REST", "Ethereum", "Gemini API", "Solidity", "web3.py"],
    image:
      "linear-gradient(135deg, rgba(59,130,246,0.42), rgba(99,102,241,0.15)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.32), transparent 35%), #0f172a",
    icon: Cpu,
    github: "https://github.com/varshith125/_ai-prompt-manager_",
  },
  {
    id: 2,
    name: "FinTrack",
    tagline: "Personal Finance Dashboard",
    description:
      "Dashboard handling 500+ records with optimized filtering achieving sub-100ms response time. Global state management with Zustand, interactive Recharts visualizations, and responsive dark/light mode.",
    tech: ["React", "TypeScript", "Zustand", "Recharts"],
    image:
      "linear-gradient(135deg, rgba(14,165,233,0.38), rgba(30,41,59,0.2)), radial-gradient(circle at 78% 24%, rgba(255,255,255,0.24), transparent 28%), #0f172a",
    icon: BarChart2,
    github: "https://github.com/varshith125/finance-dashboard-ui",
  },
];


function ProjectCard({ project, index, inView }) {
  const Icon = project.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.12 * index + 0.18 }}
      whileHover={{ y: -10 }}
      className="modern-project-card"
    >
      <div className="modern-project-image" style={{ background: project.image }}>
        <div className="modern-project-image-content">
          <div className="modern-project-badge">
            <Icon size={16} />
            Featured Project
          </div>
          <div className="modern-project-screen" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-2xl text-slate-100">{project.name}</h3>
            {project.tagline && (
              <p className="font-mono text-xs text-cyan-400 mt-1">{project.tagline}</p>
            )}
            <p className="modern-project-copy mt-3">{project.description}</p>
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="modern-icon-button shrink-0"
            aria-label={`${project.name} GitHub`}
            onClick={() =>
              analyticsAPI
                .track({ category: "project_click", page: "#projects", project: project.name, target: project.name })
                .catch(() => {})
            }
          >
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span key={item} className="modern-tag">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="section-label mb-3">Featured Projects</p>
            <h2 className="font-display text-4xl md:text-5xl text-slate-100">Selected work with practical impact</h2>
          </div>
          <p className="max-w-xl text-slate-400 leading-relaxed">
            A curated set of projects across AI, full-stack development, and embedded systems,
            presented with a cleaner product-style interface and motion-driven hover states.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
