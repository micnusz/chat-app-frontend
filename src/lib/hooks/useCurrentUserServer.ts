import { cookies } from "next/headers";
import type { UserResponseDTO } from "@/lib/types";

export async function getCurrentUserServer(): Promise<UserResponseDTO | null> {
  const cookieStore = cookies();

  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
