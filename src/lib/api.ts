import { UserRequestDTO, UserResponseDTO } from "./types";

const API_URL = "http://localhost:8080/api/users";

export async function registerUser(
  payload: UserRequestDTO
): Promise<UserResponseDTO> {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Nie udało się zarejestrować");
  }

  return res.json();
}

export async function loginUser(
  payload: UserRequestDTO
): Promise<UserResponseDTO> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Nie udało się zalogować");
  }

  return res.json();
}
