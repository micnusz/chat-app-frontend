"use client";

export default function getUserColor(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#fbbf24",
    "#34d399",
    "#60a5fa",
    "#f472b6",
    "#f87171",
    "#a78bfa",
  ];
  return colors[Math.abs(hash) % colors.length];
}
