"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import MockChatPreview from "./MockChatPreview";

export default function HomePageClient() {
  return (
    <div className="px-fluid py-fluid w-full h-fit  flex flex-col items-center justify-center space-y-18">
      <div className="flex flex-col items-center text-center space-y-2 ">
        <h1 className="responsive-h1 text-foreground font-semibold">
          One platform for all your chats
        </h1>
        <h3 className="responsive-h3 text-muted-foreground font-light">
          Text with anyone, anywhere. Free forever.
        </h3>
        <Link href="/chatrooms">
          <Button
            size={"lg"}
            variant="default"
            className="text-background w-[15rem] text-md bg-chart-3 hover:bg-chart-3/80"
          >
            Go to Chatrooms
          </Button>
        </Link>
      </div>
      <div>
        <MockChatPreview />
      </div>
      <div className="flex flex-col gap-y-2 items-center text-center rounded-2xl bg-card dark:bg-card ">
        <h3 className="responsive-h2 text-foreground font-light">
          Get started
        </h3>
        <div className="flex flex-col items-center md:flex-row gap-x-1">
          <span className="text-muted-foreground ">
            Already have an account?
          </span>
          <Link href="/signin">
            <Button variant="link" className="text-foreground" size={"sm"}>
              Sign In
            </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-x-1 items-center">
          <span className="text-muted-foreground ">New here?</span>
          <Link href="/signup">
            <Button variant="link" className="text-foreground" size={"sm"}>
              Register
            </Button>
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}
