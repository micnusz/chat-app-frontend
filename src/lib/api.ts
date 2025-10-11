import api from "./apiClient";
import { UserRequestDTO, UserResponseDTO } from "./types";

export interface AuthResponse {
  user: UserResponseDTO;
  token: string;
}

export async function loginUser(
  payload: UserRequestDTO
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/users/login", payload);
  return data;
}

export async function registerUser(
  payload: UserRequestDTO
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/users/register", payload);
  return data;
}

export async function getProtectedData() {
  const { data } = await api.get("/api/secure/data");
  return data;
}
