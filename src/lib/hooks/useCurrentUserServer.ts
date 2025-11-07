import { cookies } from "next/headers";

export async function getCurrentUserServer() {
  const cookieStore = cookies();

  console.log("SSR Cookies:", (await cookieStore).getAll());

  const cookie = (await cookieStore).get("accessToken")?.value;

  if (!cookie) {
    console.log("Brak accessToken w SSR");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
    headers: {
      Cookie: `accessToken=${cookie};`,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("SSR /me failed with status:", res.status);
    return null;
  }

  return res.json();
}
