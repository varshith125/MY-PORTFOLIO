import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic.jsx";
import { profile } from "../data/profile.js";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <motion.h2
          className="contact__title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        >
          Hiring an entry-level engineer? Write to me.
        </motion.h2>

        <div className="contact__actions">
          <Magnetic>
            <button type="button" className="btn btn--gold" onClick={copy}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "idle"}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {copied ? "Email copied" : "Copy email"}
                </motion.span>
              </AnimatePresence>
            </button>
          </Magnetic>
          <Magnetic>
            <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </Magnetic>
          <Magnetic>
            <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          </Magnetic>
        </div>

        <div className="contact__foot">
          <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
          <p>{profile.location}. {profile.relocation}.</p>
        </div>
      </div>
    </footer>
  );
}
