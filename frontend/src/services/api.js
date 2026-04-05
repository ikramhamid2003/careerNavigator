import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
let isRefreshing = false;
let queue = [];
const processQueue = (err, token = null) => {
  queue.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
  queue = [];
};

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => queue.push({ resolve, reject }))
          .then((token) => { orig.headers.Authorization = `Bearer ${token}`; return api(orig); });
      }
      orig._retry = true;
      isRefreshing = true;
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) { isRefreshing = false; window.location.href = "/login"; return Promise.reject(error); }
      try {
        const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh });
        localStorage.setItem("access_token", data.access);
        api.defaults.headers.common.Authorization = `Bearer ${data.access}`;
        processQueue(null, data.access);
        return api(orig);
      } catch (e) {
        processQueue(e, null);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(e);
      } finally { isRefreshing = false; }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (d) => api.post("/auth/register/", d),
  login: (d) => api.post("/auth/login/", d),
  logout: (refresh) => api.post("/auth/logout/", { refresh }),
  profile: () => api.get("/auth/profile/"),
  updateProfile: (d) => api.patch("/auth/profile/", d),
  changePassword: (d) => api.post("/auth/change-password/", d),
};

export const careersAPI = {
  getFields: () => api.get("/careers/fields/"),
  getField: (slug) => api.get(`/careers/fields/${slug}/`),
  getFeatures: () => api.get("/careers/assessment/features/"),
  predict: (responses) => api.post("/careers/predict/", { responses }),
  getHistory: () => api.get("/careers/predictions/history/"),
  skillsGap: (responses, career) => api.post("/careers/skills-gap/", { responses, career }),
  accuracyReport: () => api.get("/careers/accuracy/"),
  generateRoadmap: (career_slug, result_id, responses) =>
    api.post("/careers/roadmap/generate/", { career_slug, result_id, responses }),
  getRoadmaps: () => api.get("/careers/roadmap/"),
};

export const resumeAPI = {
  upload: (file) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post("/resume/upload/", fd, { headers: { "Content-Type": "multipart/form-data" } });
  },
  list: () => api.get("/resume/list/"),
};

export const chatAPI = {
  sendMessage: (message, conversationId = null) =>
    api.post("/chat/message/", { message, conversation_id: conversationId }),
  getConversations: () => api.get("/chat/conversations/"),
  getConversation: (id) => api.get(`/chat/conversations/${id}/`),
  deleteConversation: (id) => api.delete(`/chat/conversations/${id}/`),
  getStreamToken: () => localStorage.getItem("access_token"),
  streamBaseUrl: API_URL,
};


export default api;
