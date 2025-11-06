"use client";

export default function getUserColor(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    "oklch(0.4 0.0556 250)",
    "oklch(0.42 0.05 95)",
    "oklch(0.38 0.045 150)",
    "oklch(0.39 0.07 30)",
    "oklch(0.43 0.03 312)",
    "oklch(0.77 0.07 150)",
    "oklch(0.73 0.08 20)",
    "oklch(0.76 0.09 340)",
  ];

  return colors[Math.abs(hash) % colors.length];
}
