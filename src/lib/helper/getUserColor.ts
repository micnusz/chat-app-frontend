"use client";

export default function getUserColor(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "oklch(0.5235 0.1755 15.87)",
    "oklch(0.9385 0.1609 83.34)",
    "oklch(0.6707 0.1925 39.04)",
    "oklch(0.6406 0.2365 8.07)",
    "oklch(0.5458 0.2278 295.88)",
    "oklch(0.6371 0.1753 259.51)",
    "oklch(0.73 0.08 20)",
    "oklch(0.76 0.09 340)",
    "oklch(0.76 0.1307 217.06)",
    "oklch(0.76 0.1529 130.24)",
  ];

  return colors[Math.abs(hash) % colors.length];
}
