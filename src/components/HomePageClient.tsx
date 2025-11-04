"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageClient() {
  return (
    <div className="px-fluid py-fluid w-full h-fit  flex flex-col items-center justify-center space-y-14">
      <div className="flex flex-col items-center text-center space-y-2 ">
        <h1 className="responsive-h1 text-foreground font-semibold">
          One platform for all your chats
        </h1>
        <h3 className="responsive-h3 text-muted-foreground font-light">
          Text with anyone, anywhere. Free forever.
        </h3>
      </div>
      <div>
        <div className="w-full max-w-150 h-50 bg-red-200">photo</div>
      </div>
      <div className="flex flex-col gap-y-2 items-center text-center">
        <h2 className="responsive-h2 text-foreground">
          Jump into the conversation
        </h2>
        <Link href="/chatrooms">
          <Button
            size={"lg"}
            variant="chart2"
            className="text-foreground w-[15rem] text-md"
          >
            Go to Chatrooms
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-y-2 items-center">
        <div className="flex items-center flex-row gap-x-2">
          <span className="text-muted-foreground small">
            Already have an account?
          </span>
          <Link href="/signin">
            <Button variant="chart5" className="text-foreground" size={"sm"}>
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="text-muted-foreground small">New here?</span>
          <Link href="/signup">
            <Button variant="chart4" className="text-foreground" size={"sm"}>
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
