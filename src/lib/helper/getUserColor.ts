"use client";

export default function getUserColor(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "oklch(0.72 0.09 250)",
    "oklch(0.75 0.09 310)",
    "oklch(0.78 0.09 120)",
    "oklch(0.68 0.09 40)",
    "oklch(0.74 0.08 200)",
    "oklch(0.77 0.07 150)",
    "oklch(0.73 0.08 20)",
    "oklch(0.76 0.09 340)",
  ];

  return colors[Math.abs(hash) % colors.length];
}
