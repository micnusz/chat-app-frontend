"use client";

import { useUserStore } from "@/lib/stores/UserStore";

export default function Navbar() {
  const { user } = useUserStore();
  return (
    <div className="h-16 p-4 bg-accent">
      <h1>logged in as: {user?.username}</h1>
    </div>
  );
}
