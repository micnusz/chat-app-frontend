"use client";

import { useUserStore } from "@/lib/stores/UserStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { EllipsisVertical, Github, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const { user, clearAuth } = useUserStore();

  const handleLogout = () => {
    clearAuth();
    router.push("/signin");
  };
  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <div className="flex flex-row items-center justify-between h-16 p-4 bg-background border-b-2 px-4">
      <div className="flex items-center gap-x-2 ">
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row gap-x-1">
                <User />
                <span className="font-medium">{user?.username}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="destructive" onClick={handleSignIn}>
              Sign in
            </Button>
          )}
        </div>
      </div>
      <div>
        <a
          href="https://github.com/micnusz/chat-app-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center gap-2 hover:text-chart-3 transition duration-200 ">
            <Github className="w-5 h-5 " />
            <span className="font-bold">GitHub</span>
          </div>
        </a>
      </div>
    </div>
  );
}
