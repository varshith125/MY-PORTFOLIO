import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { analyticsAPI } from "../utils/api";

const links = [
  { icon: Mail, label: "varshith6066@gmail.com", href: "mailto:varshith6066@gmail.com" },
  { icon: Github, label: "github.com/varshith125", href: "https://github.com/varshith125" },
  {
    icon: Linkedin,
    label: "linkedin.com/in/venkata-varshith",
    href: "https://linkedin.com/in/venkata-varshith",
  },
  { icon: Phone, label: "+91-7993170792", href: "tel:+917993170792" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer id="contact" className="py-24 bg-[#050508] border-t border-[#1e1e32]">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}>
            <p className="section-label mb-4">06 / contact</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8e8f0] mb-5 leading-tight">
              Let&apos;s Build Something
              <br />
              <span className="text-cyan-400 glow-cyan">Together</span>
            </h2>
            <p className="font-body text-[#9090b0] leading-relaxed max-w-md mb-8">
              I&apos;m actively looking for internships, full-time roles, and interesting
              projects. Whether you&apos;re a recruiter, a founder, or a fellow builder, let&apos;s
              talk.
            </p>
            <a
              href="mailto:varshith6066@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400 text-[#050508] font-display font-semibold text-sm rounded hover:bg-cyan-400/90 hover:shadow-cyan-glow transition-all"
            >
              <Mail size={15} />
              Send a Message
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {links.map(({ icon: Icon, label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() =>
                  analyticsAPI
                    .track({
                      category: href.includes("github")
                        ? "external_click"
                        : href.includes("linkedin")
                          ? "external_click"
                          : "contact_click",
                      target: href.includes("github")
                        ? "github"
                        : href.includes("linkedin")
                          ? "linkedin"
                          : href.includes("mailto")
                            ? "email"
                            : "phone",
                      page: "#contact",
                    })
                    .catch(() => {})
                }
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex items-center gap-4 panel-card px-5 py-4 group block"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0d0d14] border border-[#1e1e32] flex items-center justify-center group-hover:border-cyan-400/30 transition-colors">
                  <Icon
                    size={15}
                    className="text-[#4a4a6a] group-hover:text-cyan-400 transition-colors"
                  />
                </div>
                <span className="font-mono text-sm text-[#9090b0] group-hover:text-cyan-400 transition-colors">
                  {label}
                </span>
              </motion.a>
            ))}

            <div className="flex items-center gap-2 px-5 py-3">
              <MapPin size={13} className="text-[#4a4a6a]" />
              <span className="font-mono text-xs text-[#4a4a6a]">
                Visakhapatnam, Andhra Pradesh, India
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-[#1e1e32] flex items-center justify-center"
        >
          <div className="font-mono text-xs text-[#2a2a45]">
            Copyright {new Date().getFullYear()} Gummadi Venkata Varshith. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
