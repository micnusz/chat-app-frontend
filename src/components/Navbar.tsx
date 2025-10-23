"use client";

import { useUserStore } from "@/lib/stores/UserStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { MessagesSquare, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";

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
      <Link href={"/"} className="transition duration-200 hover:text-chart-3">
        <div className="flex flex-row gap-x-1 items-center">
          <span>
            <MessagesSquare className="w-5 h-5 " />
          </span>
          <h1 className="font-bold">Chat App</h1>
        </div>
      </Link>

      <div className="flex flex-row gap-x-6">
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
      </div>
    </div>
  );
}
