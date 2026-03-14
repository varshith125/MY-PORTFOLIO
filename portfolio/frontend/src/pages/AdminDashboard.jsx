import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Globe2, FolderGit2, Github, Linkedin, Download, MessageSquare } from "lucide-react";
import { analyticsAPI } from "../utils/api";

function HorizontalBars({ items, labelKey, valueKey, emptyText }) {
  const max = Math.max(...items.map((item) => item[valueKey]), 1);

  if (items.length === 0) {
    return <p className="text-slate-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item[labelKey]} className="analytics-bar-row">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-slate-200 truncate">{item[labelKey]}</span>
            <span className="text-blue-300 text-sm">{item[valueKey]}</span>
          </div>
          <div className="analytics-bar-track">
            <div className="analytics-bar-fill" style={{ width: `${(item[valueKey] / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    countries: [],
    projects: [],
    metrics: {
      githubClicks: 0,
      linkedinClicks: 0,
      resumeDownloads: 0,
      projectOpens: 0,
      chatbotMessages: 0,
    },
  });

  useEffect(() => {
    analyticsAPI.getStats().then(setStats).catch(() => {});
  }, []);

  return (
    <section id="analytics" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="section-label mb-3">Portfolio Analytics</p>
          <h2 className="font-display text-4xl md:text-5xl text-slate-100">Profile performance overview</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-8">
          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <BarChart3 size={18} />
              <span>Total Visitors</span>
            </div>
            <p className="modern-stat-value">{stats.totalVisits}</p>
          </div>

          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <Github size={18} />
              <span>GitHub Clicks</span>
            </div>
            <p className="modern-stat-value">{stats.metrics.githubClicks}</p>
          </div>

          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <Linkedin size={18} />
              <span>LinkedIn Clicks</span>
            </div>
            <p className="modern-stat-value">{stats.metrics.linkedinClicks}</p>
          </div>

          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <Download size={18} />
              <span>Resume Downloads</span>
            </div>
            <p className="modern-stat-value">{stats.metrics.resumeDownloads}</p>
          </div>

          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <FolderGit2 size={18} />
              <span>Project Opens</span>
            </div>
            <p className="modern-stat-value">{stats.metrics.projectOpens}</p>
          </div>

          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <MessageSquare size={18} />
              <span>Chatbot Questions</span>
            </div>
            <p className="modern-stat-value">{stats.metrics.chatbotMessages}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <Globe2 size={18} />
              <span>Countries of Visitors</span>
            </div>
            <HorizontalBars
              items={stats.countries}
              labelKey="country"
              valueKey="count"
              emptyText="No analytics data yet."
            />
          </div>

          <div className="panel-card p-6">
            <div className="flex items-center gap-3 text-slate-300 mb-4">
              <FolderGit2 size={18} />
              <span>Most Viewed Projects</span>
            </div>
            <HorizontalBars
              items={stats.projects}
              labelKey="project"
              valueKey="count"
              emptyText="Project analytics will appear once visitors open project links."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
