import { useEffect } from "react";
import { analyticsAPI } from "../utils/api";

export default function useAnalytics(sections = []) {
  useEffect(() => {
    const visited = new Set();

    analyticsAPI.track({ page: window.location.pathname }).catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          if (!id || visited.has(id)) return;
          visited.add(id);
          analyticsAPI.track({ page: `#${id}` }).catch(() => {});
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);
}
