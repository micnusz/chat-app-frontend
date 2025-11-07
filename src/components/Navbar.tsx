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
import { ModeToggle } from "./ModeToggle";
import { useLogoutUser } from "@/lib/hooks/useLogoutUser";

export default function Navbar() {
  const router = useRouter();
  const logoutMutation = useLogoutUser();
  const { user, clearAuth } = useUserStore();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAuth();
        router.push("/signin");
      },
      onError: () => {
        clearAuth();
        router.push("/signin");
      },
    });
  };
  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <div className="px-fluid flex flex-row items-center justify-between h-[4.5rem] bg-background border-b-2">
      <Link href={"/"} className="transition duration-200 hover:text-secondary">
        <div className="flex flex-row gap-x-1 items-center">
          <MessagesSquare className="w-5 h-5" />
          <h1 className="responsive-h4 font-medium">Chat App</h1>
        </div>
      </Link>

      <div className="flex flex-row gap-x-6">
        <div className="flex items-center gap-x-2 ">
          <div className="flex flex-row items-center gap-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="flex flex-row gap-x-1">
                  <Button variant="outline" className="text-foreground">
                    <User />
                    <span className="font-medium">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" onClick={handleSignIn}>
                Sign in
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
