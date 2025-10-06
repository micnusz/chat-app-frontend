"use client";

import UserForm from "@/components/UserForm";
import { useState } from "react";

export default function HomePage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div>
      <h1>{mode === "login" ? "Logowanie" : "Rejestracja"}</h1>
      <UserForm mode={mode} />
      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        Przełącz na {mode === "login" ? "Rejestrację" : "Logowanie"}
      </button>
    </div>
  );
}
