import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "AI Assistant", href: "#chatbot" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollToSection = (href) => (event) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
    >
      <div className={`modern-nav ${scrolled ? "modern-nav-scrolled" : ""}`}>
        <a href="#hero" onClick={scrollToSection("#hero")} className="modern-brand">
          <span className="modern-brand-dot" />
          <div>
            <p className="modern-brand-title">Venkata Varshith</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={scrollToSection(link.href)} className="modern-nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://github.com/varshith125" target="_blank" rel="noreferrer" className="modern-button modern-button-secondary">
            GitHub
          </a>
          <a href="#resume" onClick={scrollToSection("#resume")} className="modern-button modern-button-primary">
            Resume
          </a>
        </div>

        <button type="button" className="modern-icon-button md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="modern-mobile-menu md:hidden"
          >
            {links.map((link) => (
              <a key={link.label} href={link.href} className="modern-mobile-link" onClick={scrollToSection(link.href)}>
                {link.label}
              </a>
            ))}
            <a href="#resume" className="modern-mobile-link" onClick={scrollToSection("#resume")}>
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
