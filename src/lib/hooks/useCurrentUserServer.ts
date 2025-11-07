import { cookies } from "next/headers";
import type { UserResponseDTO } from "@/lib/types";

export async function getCurrentUserServer(): Promise<UserResponseDTO | null> {
  const cookieStore = cookies();
  console.log("SSR Cookies:", (await cookieStore).getAll());
  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/users/me`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.log("SSR /me failed with status:", res.status);
    return null;
  }
  return res.json();
}
