"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/UserStore";
import UserForm from "../components/UserForm";

export default function HomePage() {
  const router = useRouter();
  const { user, token } = useUserStore();

  useEffect(() => {
    if (user && token) {
      router.replace("/chatrooms");
    }
  }, [user, token, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Chat App</h1>
      <UserForm />
    </div>
  );
}
