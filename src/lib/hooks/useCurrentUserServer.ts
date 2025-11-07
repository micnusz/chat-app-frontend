import { cookies } from "next/headers";

export async function getCurrentUserServer() {
  const cookieStore = cookies();
  const cookie = (await cookieStore).get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    headers: {
      Cookie: `access_token=${cookie}`,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
