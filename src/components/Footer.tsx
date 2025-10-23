"use client";

import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-row h-16 bg-background items-center justify-center border-t-2">
      <a
        href="https://github.com/micnusz/chat-app-backend"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div></div>
        <div className="flex items-center gap-2 hover:text-chart-3 transition duration-200 ">
          <Github className="w-5 h-5 " />
          <span>GitHub</span>
        </div>
      </a>
    </div>
  );
}
