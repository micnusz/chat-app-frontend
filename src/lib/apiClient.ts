// lib/apiClient.ts
"use client";

import axios from "axios";
import { useUserStore } from "@/lib/stores/UserStore";

const api = axios.create({
  baseURL: "http://localhost:8080",
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

    // Extract message from ErrorResponseDTO
    const message = error.response?.data?.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export default api;
