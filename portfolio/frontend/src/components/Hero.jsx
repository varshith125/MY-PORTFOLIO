import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/profile.js";
gsap.registerPlugin(ScrollTrigger);
export default function Hero() {
  const root = useRef(null);
  useEffect(() => {
    const element = root.current;
    let visible = false;
    const sync = () => element.classList.toggle('motion-paused', !visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-reveal", { y: 32, opacity: 0, duration: 1, stagger: .12, ease: "power3.out" });
    });
    mm.add("(min-width: 1025px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(".orbit-art", { rotation: 15, y: -35, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
    });
    return () => mm.revert();
  }, []);
  return <section className="hero" id="top" ref={root}><div className="wrap">
    <div className="hero__eyebrow hero-reveal"><span className="status-dot" /> FULL-STACK & AI DEVELOPER <span className="hero__location">VISAKHAPATNAM, INDIA</span></div>
    <div className="hero__grid"><div className="hero__copy">
      <p className="hero__hello hero-reveal">Hi, I'm</p>
      <h1 className="hero__identity hero-reveal"><span>Gummadi Venkata</span><span className="hero__highlight">Varshith.</span></h1><p className="hero__tagline hero-reveal">Thoughtful code. Useful experiences.</p>
      <p className="hero__intro hero-reveal">{profile.intro}</p>
      <div className="hero__actions hero-reveal"><a className="btn btn--gold" href="#work">Explore my work <span aria-hidden="true">&#8599;</span></a><a className="btn btn--resume" href="/resume.html" target="_blank" rel="noopener noreferrer">View Resume <span aria-hidden="true">&#8599;</span></a></div>
    </div><div className="hero__visual hero-reveal" aria-hidden="true"><div className="orbit-art"><div className="orbit orbit--one"/><div className="orbit orbit--two"/><div className="orbit orbit--three"/><div className="orbit-core">V<span>.</span></div><span className="orbit-label orbit-label--top">PYTHON / REACT</span><span className="orbit-label orbit-label--bottom">IDEA &#8594; INTERFACE</span><div className="orbit-spark">&#10035;</div></div></div></div>
    <div className="hero__bottom"><span>WEB DEVELOPMENT <b>+</b> APPLIED AI <b>+</b> USER EXPERIENCE</span><a href="#work">SCROLL TO EXPLORE &#8595;</a></div>
  </div></section>;
}

