import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import AskBox from "./components/AskBox.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import Skills from "./components/Skills.jsx";
import Path from "./components/Path.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#work">Skip to work</a>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Path />
        <section className="assistant-section" id="assistant"><div className="wrap assistant-grid"><div className="assistant-intro"><p className="eyebrow">04 / A QUICK INTRODUCTION</p><h2 className="title">Get to know<br /><em>the developer.</em></h2><p>Explore my background, the projects I have built, and the technologies I work with.</p></div><AskBox /></div></section>
      </main>
      <Contact />
    </MotionConfig>
  );
}

