import axios from "axios";
import { useUserStore } from "@/lib/stores/UserStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const clearAuth = useUserStore.getState().clearAuth;

    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        await api.post("/api/users/refresh");
        return api(error.config);
      } catch {
        clearAuth();
        console.warn("Session expired. User logged out.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
