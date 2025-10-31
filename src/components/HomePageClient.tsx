"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-15">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to Chat App</h1>
        <p className="text-lg text-foreground">Jump into the conversation</p>
        <Link href="/chatrooms">
          <Button variant="chart5" className="text-foreground">
            Go to Chatrooms
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-3 text-sm">
        <div className="flex items-center flex-row gap-x-2">
          <span className="text-foreground">Already have an account?</span>
          <Link href="/signin">
            <Button variant="default" className="text-foreground" size={"sm"}>
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="text-foreground">New here?</span>
          <Link href="/signup">
            <Button variant="secondary" className="text-foreground" size={"sm"}>
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
