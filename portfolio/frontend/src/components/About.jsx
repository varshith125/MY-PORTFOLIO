import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="section-label mb-3">01 / about</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8e8f0]">
            The Human Behind the Code
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4 mb-8">
              {[
                "I'm a final-year Information Technology student at ANITS, Visakhapatnam — someone who believes code should solve real problems, not just pass tests.",
                "My work spans AI chatbots, IoT safety systems, and full-stack web apps. I'm drawn to the intersection of hardware and software — making intelligent systems that interact with the physical world.",
                "Beyond the keyboard, I'm interested in data-driven decision making and building tools that make teams more effective. I approach every problem with analytical rigor and creative curiosity.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="font-body text-[#9090b0] leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Location & status */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#4a4a6a]">
                <MapPin size={13} className="text-cyan-400" />
                Visakhapatnam, India
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-lime-400">Open to opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            id="education"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            {/* Education */}
            <div className="panel-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-cyan-400" />
                </div>
                <div>
                  <p className="font-mono text-xs text-[#4a4a6a] mb-1">2022 — 2026</p>
                  <h3 className="font-display font-semibold text-[#e8e8f0] mb-0.5">
                    B.Tech – Information Technology
                  </h3>
                  <p className="font-body text-sm text-[#9090b0]">
                    ANITS, Visakhapatnam
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-mono text-xs text-cyan-400">CGPA: 7.60</span>
                    <span className="text-[#1e1e32]">·</span>
                    <span className="font-mono text-xs text-[#4a4a6a]">Expected 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Internship */}
            <div className="panel-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="font-mono text-xs text-[#4a4a6a] mb-1">Internship</p>
                  <h3 className="font-display font-semibold text-[#e8e8f0] mb-0.5">
                    Front-End Developer
                  </h3>
                  <p className="font-body text-sm text-[#9090b0]">
                    Cognify Technologies
                  </p>
                  <p className="font-body text-xs text-[#4a4a6a] mt-2 leading-relaxed">
                    Engineered responsive interfaces using HTML, CSS, JavaScript, and Bootstrap.
                    Resolved cross-browser usability issues collaboratively.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Upload widget */}
            <div className="panel-card p-5">
              <p className="font-mono text-xs text-[#4a4a6a] mb-3">
                // Admin: update profile from resume
              </p>
              <a
                href="#resume-upload"
                className="font-mono text-xs text-cyan-400 hover:underline"
              >
                Upload new resume to sync AI chatbot →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
