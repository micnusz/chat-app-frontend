"use client";

import { ArrowLeft, FileSymlink, LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-fluid py-fluid bg-background border-t flex flex-col gap-[4vw]">
      <div className="grid gap-[3rem] w-full md:grid-cols-3">
        <div className="flex flex-col max-w-[45ch]">
          <h1 className="responsive-h3 text-foreground">CHAT APP</h1>
          <p className="body-text text-muted-foreground">
            Free chat application that lets you text with others anytime,
            anywhere. Stay connected on any device. Fast, simple, and
            distraction-free messaging.
          </p>
        </div>
        <div className="flex flex-col gap-[1.2rem]">
          <p className="responsive-h4 text-muted-foreground">NAVIGATION</p>
          <ul className="flex flex-col gap-[0.75rem]">
            <li className="flex items-center gap-[0.5rem] hover:text-chart-3 transition">
              <ArrowLeft className="text-muted-foreground" />
              <Link href="/chatrooms" className="body-text">
                Chatrooms
              </Link>
            </li>
            <li className="flex items-center gap-[0.5rem] hover:text-chart-3 transition">
              <ArrowLeft className="text-muted-foreground" />
              <Link href="/signin" className="body-text">
                Sign In
              </Link>
            </li>
            <li className="flex items-center gap-[0.5rem] hover:text-chart-3 transition">
              <ArrowLeft className="text-muted-foreground" />
              <Link href="/signup" className="body-text">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[1.2rem]">
          <p className="responsive-h4 text-muted-foreground">INFO</p>
          <ul className="flex flex-col gap-[0.75rem]">
            <li className="flex items-center gap-[0.5rem] text-muted-foreground body-text">
              Website by:
              <span className="text-foreground font-semibold body-text">
                Michał Nuszkiewicz
              </span>
            </li>

            <li className="flex items-center gap-[0.5rem] text-muted-foreground body-text">
              Github:
              <a
                href="https://github.com/micnusz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[0.35rem] text-foreground transition hover:text-chart-4 body-text"
              >
                <LinkIcon className="w-5 h-5" />
                <span className="hover:underline body-text">Link</span>
              </a>
            </li>

            <li className="flex items-center gap-[0.5rem] text-muted-foreground body-text">
              Resume:
              <a
                href="/Jan-Kowalski-Resume.pdf"
                download
                className="flex items-center gap-[0.35rem] text-foreground transition hover:text-chart-4 body-text"
              >
                <FileSymlink className="w-5 h-5" />
                <span className="hover:underline body-text">Download</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
