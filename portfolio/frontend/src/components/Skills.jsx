import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    label: "Languages",
    color: "cyan",
    items: ["Python", "JavaScript", "Java", "C++"],
  },
  {
    label: "Web & Frameworks",
    color: "violet",
    items: ["HTML", "CSS", "Bootstrap", "Django", "React"],
  },
  {
    label: "Data & Tools",
    color: "lime",
    items: ["MS Excel", "SQL", "Git", "GitHub", "VS Code"],
  },
  {
    label: "Core Skills",
    color: "orange",
    items: ["Problem Solving", "Team Collaboration"],
  },
];

const colorMap = {
  cyan: {
    bg: "rgba(34,211,238,0.06)",
    border: "rgba(34,211,238,0.2)",
    text: "#22d3ee",
    glow: "rgba(34,211,238,0.2)",
  },
  violet: {
    bg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.2)",
    text: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
  },
  lime: {
    bg: "rgba(163,230,53,0.06)",
    border: "rgba(163,230,53,0.2)",
    text: "#a3e635",
    glow: "rgba(163,230,53,0.2)",
  },
  orange: {
    bg: "rgba(251,146,60,0.06)",
    border: "rgba(251,146,60,0.2)",
    text: "#fb923c",
    glow: "rgba(251,146,60,0.2)",
  },
};

const stats = [
  { value: "7.60", label: "CGPA" },
  { value: "2+", label: "Projects Built" },
  { value: "5+", label: "Technologies" },
  { value: "2026", label: "Graduating" },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">02 / skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8e8f0]">
            Technical Arsenal
          </h2>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="panel-card p-6 text-center"
            >
              <div className="font-display text-3xl font-bold text-cyan-400 mb-1">
                {s.value}
              </div>
              <div className="font-mono text-xs text-[#4a4a6a] uppercase tracking-wider">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => {
            const c = colorMap[group.color];
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * gi + 0.4 }}
                className="panel-card p-6"
              >
                <div
                  className="font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                  style={{ color: c.text }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: c.text, boxShadow: `0 0 8px ${c.text}` }}
                  />
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="text-xs px-3 py-1.5 rounded font-mono cursor-default"
                      style={{
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        color: c.text,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 panel-card p-6"
        >
          <p className="section-label mb-4">certifications</p>
          <div className="flex flex-wrap gap-3">
            {[
              "APSSDC – Web Development using Django",
              "edX – Introduction to HTML, CSS & JavaScript",
            ].map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 bg-[#0d0d14] border border-[#1e1e32] rounded px-4 py-2"
              >
                <span className="text-lime-400 text-xs">✓</span>
                <span className="font-body text-sm text-[#9090b0]">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
