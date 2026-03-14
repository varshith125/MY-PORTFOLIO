import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, GitFork, ExternalLink, Github, RefreshCw } from "lucide-react";
import { analyticsAPI, githubAPI } from "../utils/api";

const langColors = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TypeScript: "#2b7489",
  Shell: "#89e051",
};

function RepoCard({ repo, index, inView }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        analyticsAPI
          .track({ category: "project_click", page: "#github", project: repo.name, target: repo.name })
          .catch(() => {})
      }
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07 + 0.2 }}
      whileHover={{ y: -4, borderColor: "rgba(34,211,238,0.35)" }}
      className="panel-card p-5 flex flex-col gap-3 group block"
      style={{ textDecoration: "none" }}
    >
      {/* Repo name */}
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm font-semibold text-[#e8e8f0] group-hover:text-cyan-400 transition-colors truncate">
          {repo.name}
        </h3>
        <ExternalLink size={13} className="text-[#4a4a6a] group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-2" />
      </div>

      {/* Description */}
      <p className="font-body text-xs text-[#9090b0] leading-relaxed line-clamp-2 flex-grow">
        {repo.description}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {repo.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/5 border border-cyan-400/10 text-cyan-400/60"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 pt-2 border-t border-[#1e1e32]">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: langColors[repo.language] || "#8b8b8b" }}
            />
            <span className="font-mono text-[11px] text-[#4a4a6a]">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-[#4a4a6a]">
          <Star size={11} />
          <span className="font-mono text-[11px]">{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1 text-[#4a4a6a]">
          <GitFork size={11} />
          <span className="font-mono text-[11px]">{repo.forks}</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function GitHubSection() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await githubAPI.getRepos();
      setRepos(data.repos || []);
    } catch (err) {
      setError("Could not load GitHub repos. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="section-label mb-3">04 / github</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#e8e8f0]">
              Open Source
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchRepos}
              disabled={loading}
              className="text-[#4a4a6a] hover:text-cyan-400 transition-colors disabled:opacity-40"
              title="Refresh repos"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <a
              href="https://github.com/varshith125"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analyticsAPI.track({ category: "external_click", target: "github", page: "#github" }).catch(() => {})}
              className="flex items-center gap-2 font-mono text-xs text-[#4a4a6a] hover:text-cyan-400 transition-colors"
            >
              <Github size={14} />
              varshith125
            </a>
          </div>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="panel-card p-5 animate-pulse">
                <div className="h-4 bg-[#1e1e32] rounded mb-3 w-2/3" />
                <div className="h-3 bg-[#1e1e32] rounded mb-1.5 w-full" />
                <div className="h-3 bg-[#1e1e32] rounded mb-4 w-4/5" />
                <div className="h-3 bg-[#1e1e32] rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="panel-card p-8 text-center border-red-500/20"
          >
            <p className="font-mono text-sm text-red-400 mb-3">{error}</p>
            <button
              onClick={fetchRepos}
              className="font-mono text-xs text-cyan-400 hover:underline"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Repos grid */}
        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.slice(0, 9).map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} inView={inView} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center panel-card p-12">
            <Github size={32} className="text-[#4a4a6a] mx-auto mb-4" />
            <p className="font-body text-[#9090b0]">No public repositories found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
