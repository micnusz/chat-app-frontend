import axios from "axios";
import { useUserStore } from "@/lib/stores/UserStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const clearAuth = useUserStore.getState().clearAuth;

    if (error.response?.status === 401) {
      clearAuth();
      console.warn("Session expired. User logged out.");
    }

    return Promise.reject(error);
  }
);

export default api;
