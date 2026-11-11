import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { path } from "../data/profile.js";

export default function Path() {
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section className="path" id="path">
      <div className="wrap path__grid">
        <h2 className="title">How I got here</h2>

        <div className="path__track" ref={list}>
          <motion.span className="path__line" style={{ scaleY: grow }} aria-hidden="true" />
          <ol>
            {path.map((step) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                <p className="path__when">{step.when}</p>
                <h3>{step.title}</h3>
                <p className="path__place">{step.place}</p>
                <p>{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
