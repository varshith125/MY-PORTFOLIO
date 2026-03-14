/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Fira Code'", "monospace"],
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        void: "#050508",
        carbon: "#0d0d14",
        slate: "#12121e",
        panel: "#161625",
        border: "#1e1e32",
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          glow: "#22d3ee",
        },
        lime: {
          400: "#a3e635",
          glow: "#84cc16",
        },
        violet: {
          500: "#8b5cf6",
          glow: "#7c3aed",
        },
        muted: "#4a4a6a",
        ghost: "#2a2a45",
      },
      animation: {
        "cursor-blink": "blink 1s step-end infinite",
        "slide-up": "slideUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34,211,238,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(34,211,238,0.7)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(34,211,238,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        "cyan-glow": "0 0 30px rgba(34,211,238,0.25)",
        "cyan-glow-sm": "0 0 15px rgba(34,211,238,0.2)",
        "violet-glow": "0 0 30px rgba(139,92,246,0.25)",
        panel: "0 4px 30px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
