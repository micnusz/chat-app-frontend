"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-15">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="scroll-m-20 border-b pb-2 text-4xl font-bold tracking-tight first:mt-0 text-foreground">
          Welcome to Chat App
        </h1>
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
          Jump into the conversation
        </h2>
        <Link href="/chatrooms">
          <Button variant="chart5" className="text-foreground">
            Go to Chatrooms
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-3 text-sm">
        <div className="flex items-center flex-row gap-x-2">
          <span className="text-muted-foreground text-md">
            Already have an account?
          </span>
          <Link href="/signin">
            <Button variant="default" className="text-foreground" size={"sm"}>
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="text-muted-foreground text-">New here?</span>
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
