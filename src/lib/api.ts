import api from "./apiClient";
import { AuthResponse, UserRequestDTO } from "./types";

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
