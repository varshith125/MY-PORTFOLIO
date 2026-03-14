import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GitHubSection from "./components/GitHubSection";
import Chatbot from "./components/Chatbot";
import FloatingChatWidget from "./components/FloatingChatWidget";
import Contact from "./components/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import useAnalytics from "./analytics/useAnalytics";

const Workspace3D = lazy(() => import("./components/Workspace3D"));
const ResumeSection = lazy(() => import("./components/ResumeSection"));

function SectionLoader({ label }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="panel-card p-8 text-slate-400">{label}</div>
    </div>
  );
}

export default function App() {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  useAnalytics([
    "hero",
    "about",
    "skills",
    "projects",
    "github",
    "chatbot",
    "resume",
    "analytics",
    "contact",
  ]);

  useEffect(() => {
    document.documentElement.style.opacity = "1";
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = workspaceOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [workspaceOpen]);

  const openWorkspace = () => setWorkspaceOpen(true);
  const closeWorkspace = () => setWorkspaceOpen(false);
  const navigateToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="site-shell relative min-h-screen overflow-hidden">
      <Navbar />
      <Suspense fallback={null}>
        <Workspace3D
          open={workspaceOpen}
          onClose={closeWorkspace}
          onNavigate={navigateToSection}
        />
      </Suspense>

      <main className="relative z-10">
        <Hero onLaunch3D={openWorkspace} />
        <About />
        <Skills />
        <Projects />
        <GitHubSection />
        <Chatbot />
        <Suspense fallback={<SectionLoader label="Loading resume module..." />}>
          <ResumeSection />
        </Suspense>
        <AdminDashboard />

        <Contact />
      </main>
      <FloatingChatWidget />
    </div>
  );
}
