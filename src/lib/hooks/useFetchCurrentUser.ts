import axios from "axios";
import { cookies } from "next/headers";

export async function fetchCurrentUser() {
  const cookieHeader = cookies().toString();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    withCredentials: true,
  });

  try {
    const res = await instance.get("/api/users/me");
    return res.data;
  } catch {
    return null;
  }
}
