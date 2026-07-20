import axios from "axios";

// Use relative /api so the Vite dev-server proxy forwards to the backend
// (no cross-origin request, no CORS required in development).
// For production builds, set VITE_API_URL to the deployed backend URL.
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cc_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;