"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl font-bold">Welcome to Chat App</h1>

      <div className="flex flex-col items-center space-y-2">
        <p className="text-lg text-foreground">Jump into the conversation</p>
        <Link
          href="/chatrooms"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Chatrooms
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center flex-row gap-x-1">
          <span className="text-foreground">Already have an account?</span>
          <Link href="/signin">
            <Button variant="link" className="text-chart-3">
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex flex-row gap-x-1 items-center">
          <span className="text-foreground">New here?</span>
          <Link href="/signup">
            <Button variant="link" className="text-chart-2">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
