import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGroups } from "../data/profile.js";

const tabs = [{ id: "all", label: "Everything" }, ...skillGroups.map((g) => ({ id: g.id, label: g.label }))];
const all = skillGroups.flatMap((g) => g.items.map((name) => ({ name, group: g.id })));

export default function Skills() {
  const [tab, setTab] = useState("all");

  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <h2 className="title">What I work with</h2>

        <div className="tabs" role="group" aria-label="Filter skills">
          {tabs.map((t) => (
            <button key={t.id} type="button" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
              {tab === t.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="tabs__pill"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <ul className="skills__list">
          <AnimatePresence mode="popLayout" initial={false}>
            {all.filter((s) => tab === "all" || tab === s.group).map((s, i) => (
              <motion.li
                key={s.name}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 380, damping: 32, delay: Math.min(i * 0.012, 0.12) }}
              >
                {s.name}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
