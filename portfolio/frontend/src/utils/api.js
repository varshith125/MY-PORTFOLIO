import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

export const chatAPI = {
  sendMessage: (message) =>
    api.post("/chat", { message }).then((r) => r.data),
};

export const githubAPI = {
  getRepos: () => api.get("/github/repos").then((r) => r.data),
  getUser: () => api.get("/github/user").then((r) => r.data),
};

export const resumeAPI = {
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    return api.post("/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((r) => r.data);
  },
  getProfile: () => api.get("/resume/profile").then((r) => r.data),
};

export const analyticsAPI = {
  track: (payload) => api.post("/analytics/track", payload).then((r) => r.data),
  getStats: () => api.get("/analytics/stats").then((r) => r.data),
};

export default api;
