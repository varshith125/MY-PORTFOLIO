import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Download, Github } from "lucide-react";
import { analyticsAPI } from "../utils/api";

const metrics = [
  { value: "2+", label: "Featured Projects" },
  { value: "8+", label: "Core Technologies" },
  { value: "2026", label: "Graduation Year" },
];

export default function Hero({ onLaunch3D }) {
  const scrollToSection = (selector) => (event) => {
    event.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResumeDownload = () => {
    analyticsAPI.track({ category: "resume_download", target: "resume", page: "#resume" }).catch(() => {});
    window.dispatchEvent(new CustomEvent("resume:download"));
    document.getElementById("resume")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="modern-hero">
      <div className="modern-hero-bg" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="grid gap-14 items-center lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="modern-hero-title"
            >
              Hi, I&apos;m Venkata Varshith
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="modern-hero-subtitle"
            >
              Aspiring Software Engineer
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="modern-typing"
            >
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  1800,
                  "Java Developer",
                  1800,
                  "Python Developer",
                  1800,
                ]}
                wrapper="span"
                speed={44}
                repeat={Infinity}
              />
              <span className="modern-caret">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="modern-hero-copy"
            >
              I build reliable web applications, developer-focused tools, and AI-powered
              experiences with an emphasis on clarity, performance, and thoughtful product design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#projects" onClick={scrollToSection("#projects")} className="modern-button modern-button-primary">
                View Projects
                <ArrowRight size={16} />
              </a>
              <a
                href="https://github.com/varshith125"
                target="_blank"
                rel="noreferrer"
                className="modern-button modern-button-secondary"
                onClick={() => analyticsAPI.track({ category: "external_click", target: "github", page: "#hero" }).catch(() => {})}
              >
                <Github size={16} />
                GitHub
              </a>
              <button type="button" onClick={handleResumeDownload} className="modern-button modern-button-secondary">
                <Download size={16} />
                Download Resume
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <div className="modern-showcase-card">
              <div className="modern-showcase-screen">
                <div className="modern-showcase-window" />
                <div className="modern-showcase-bars">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="modern-showcase-orb modern-showcase-orb-a" />
                <div className="modern-showcase-orb modern-showcase-orb-b" />
              </div>
              <div className="modern-showcase-footer">
                <p>Product-minded engineering for portfolio, AI, and full-stack systems.</p>
                <button type="button" onClick={onLaunch3D} className="modern-inline-link">
                  Explore 3D Mode
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  className="panel-card p-5"
                >
                  <p className="modern-stat-value">{item.value}</p>
                  <p className="modern-stat-label">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
