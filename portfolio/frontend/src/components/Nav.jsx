import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "path", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === "top" ? null : e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) seen.observe(el);
    });
    return () => seen.disconnect();
  }, []);

  return (
    <motion.header
      className="nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 18 }}
    >
      <a className="nav__home" href="#top" aria-label="Gummadi Venkata Varshith, back to top">v.</a>
      <nav aria-label="Sections">
        <ul>
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav__pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span>{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

