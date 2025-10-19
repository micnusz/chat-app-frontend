"use client";

import { useUserStore } from "@/lib/stores/UserStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { user, clearAuth } = useUserStore();

  const handleLogout = () => {
    clearAuth();
    router.push("/signin");
  };

  return (
    <div className="h-16 p-4 bg-accent flex flex-row gap-x-4 items-center">
      <h1>logged in as: {user?.username}</h1>
      {user != null && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
}
