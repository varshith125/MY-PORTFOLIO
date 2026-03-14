import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import html2pdf from "html2pdf.js";
import { Download, FileText, LoaderCircle, Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { resumeAPI } from "../utils/api";
import fallbackProfile from "../data/profile.json";

function normalizeProfile(data) {
  if (!data) return fallbackProfile;
  return {
    ...fallbackProfile,
    ...data,
    contact: { ...fallbackProfile.contact, ...(data.contact || {}) },
    skills: { ...fallbackProfile.skills, ...(data.skills || {}) },
    education: data.education || fallbackProfile.education,
    projects: data.projects || fallbackProfile.projects,
    certifications: data.certifications || fallbackProfile.certifications,
  };
}

function ResumeDocument({ profile }) {
  const groupedSkills = useMemo(
    () => [
      ["Data Tools", profile.skills?.dataTools || []],
      ["Programming Languages", profile.skills?.programmingLanguages || []],
      ["Core Skills", profile.skills?.coreSkills || []],
      ["Web", profile.skills?.web || []],
      ["Frameworks", profile.skills?.frameworks || []],
      ["Tools", profile.skills?.tools || []],
    ],
    [profile]
  );

  return (
    <div className="resume-document" id="resume-document">
      <header className="resume-header">
        <div>
          <h1>{profile.name}</h1>
          <p className="resume-title">{profile.title}</p>
        </div>
        <div className="resume-contact">
          <span>{profile.contact?.email}</span>
          <span>{profile.contact?.phone}</span>
          <span>{profile.contact?.location}</span>
          <span>{profile.contact?.linkedin}</span>
          <span>{profile.contact?.github}</span>
        </div>
      </header>

      <section className="resume-block">
        <h2>Summary</h2>
        <p>{profile.summary}</p>
      </section>

      <section className="resume-block">
        <h2>Skills</h2>
        <div className="resume-skill-grid">
          {groupedSkills.map(([label, items]) => (
            <div key={label} className="resume-skill-group">
              <h3>{label}</h3>
              <p>{items.join(" • ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-block">
        <h2>Projects</h2>
        <div className="resume-list">
          {profile.projects?.map((project) => (
            <article key={project.name}>
              <div className="resume-row">
                <h3>{project.name}</h3>
                <span>{project.tech?.join(", ")}</span>
              </div>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-block">
        <h2>Education</h2>
        <div className="resume-list">
          {profile.education?.map((item) => (
            <article key={`${item.degree}-${item.year}`}>
              <div className="resume-row">
                <h3>{item.degree}</h3>
                <span>{item.year}</span>
              </div>
              <p>
                {item.institution} | {item.location}
              </p>
              {item.cgpa ? <p>CGPA: {item.cgpa}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="resume-block">
        <h2>Certifications</h2>
        <ul className="resume-bullets">
          {profile.certifications?.map((certification) => (
            <li key={certification}>{certification}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function ResumeSection() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const printRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleDownload = useCallback(async () => {
    if (!printRef.current || downloading) return;

    setDownloading(true);
    try {
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        })
        .from(printRef.current)
        .save();
    } finally {
      setDownloading(false);
    }
  }, [downloading, profile.name]);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const data = await resumeAPI.getProfile();
        if (!cancelled) {
          setProfile(normalizeProfile(data));
          setUsingFallback(false);
        }
      } catch {
        if (!cancelled) {
          setProfile(normalizeProfile(fallbackProfile));
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onDownload = () => {
      handleDownload();
    };

    window.addEventListener("resume:download", onDownload);
    return () => window.removeEventListener("resume:download", onDownload);
  }, [handleDownload]);

  const skillHighlights = [
    ...(profile.skills?.programmingLanguages || []),
    ...(profile.skills?.frameworks || []),
    ...(profile.skills?.tools || []),
  ].slice(0, 8);

  return (
    <section id="resume" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="section-label mb-3">Module / Resume</p>
            <h2 className="font-display text-4xl md:text-5xl text-slate-100">Dynamic Resume Generator</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handleDownload} disabled={downloading || loading} className="hud-button hud-button-primary">
              {downloading ? <LoaderCircle size={16} className="animate-spin" /> : <Download size={16} />}
              <span className="ml-2">Download Resume</span>
            </button>
            {usingFallback ? (
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-100/45">
                Using local profile data
              </span>
            ) : null}
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[0.76fr_1.24fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <div className="hud-panel p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label mb-3">Profile Snapshot</p>
                  <h3 className="font-display text-3xl text-cyan-300">{profile.name}</h3>
                  <p className="mt-2 text-cyan-50/70">{profile.title}</p>
                </div>
                <div className="resume-icon-shell">
                  <FileText size={22} />
                </div>
              </div>
              <p className="mt-5 text-cyan-50/65 leading-relaxed">{profile.summary}</p>
            </div>

            <div className="hud-panel p-6">
              <p className="section-label mb-4">Contact</p>
              <div className="space-y-3 text-cyan-50/72">
                <div className="resume-meta-item">
                  <Mail size={15} />
                  <span>{profile.contact?.email}</span>
                </div>
                <div className="resume-meta-item">
                  <Phone size={15} />
                  <span>{profile.contact?.phone}</span>
                </div>
                <div className="resume-meta-item">
                  <MapPin size={15} />
                  <span>{profile.contact?.location}</span>
                </div>
                <div className="resume-meta-item">
                  <LinkIcon size={15} />
                  <span>{profile.contact?.linkedin}</span>
                </div>
              </div>
            </div>

            <div className="hud-panel p-6">
              <p className="section-label mb-4">Key Skills</p>
              <div className="flex flex-wrap gap-2">
                {skillHighlights.map((skill) => (
                  <span key={skill} className="hud-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="resume-preview-shell"
          >
            {loading ? (
              <div className="hud-panel p-8 min-h-[320px] flex items-center justify-center text-cyan-100/55">
                Loading profile data...
              </div>
            ) : (
              <div className="resume-preview-frame">
                <div ref={printRef}>
                  <ResumeDocument profile={profile} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
