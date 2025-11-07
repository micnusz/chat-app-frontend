import { cookies } from "next/headers";

export async function getCurrentUserServer() {
  const cookie = cookies().toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/users/me`, {
    headers: { Cookie: cookie },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
