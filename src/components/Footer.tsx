"use client";

import {
  ArrowLeft,
  FileSymlink,
  Github,
  Linkedin,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-fluid py-fluid bg-background border-t flex flex-col gap-[4vw]">
      <div className="grid gap-[3rem] w-full md:grid-cols-3">
        <div className="flex flex-col max-w-[45ch]">
          <p className="responsive-h4 text-muted-foreground">Website by:</p>
          <div className="flex flex-row gap-x-2 ">
            <span className="responsive-h2 font-bold">Michał Nuszkiewicz</span>
            <span className="flex flex-row gap-x-2">
              <a
                href="https://github.com/micnusz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-foreground transition hover:text-chart-2 body-text"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/micha%C5%82-nuszkiewicz-686241373/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-foreground transition hover:text-chart-2 body-text"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[1.2rem]">
          <p className="responsive-h4 text-muted-foreground">NAVIGATION</p>
          <ul className="flex flex-col gap-[0.75rem]">
            <li className="flex items-center gap-[0.5rem] hover:text-chart-3 transition w-fit">
              <ArrowLeft className="text-muted-foreground" />
              <Link href="/chatrooms" className="body-text">
                Chatrooms
              </Link>
            </li>
            <li className="flex items-center gap-[0.5rem] hover:text-chart-3 transition w-fit">
              <ArrowLeft className="text-muted-foreground" />
              <Link href="/signin" className="body-text">
                Sign In
              </Link>
            </li>
            <li className="flex items-center gap-[0.5rem] hover:text-chart-3 transition w-fit">
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
              Resume:
              <a
                href="/resume/CV Michał Nuszkiewicz.pdf"
                download
                className="flex items-center gap-[0.35rem] text-foreground transition hover:text-chart-4 body-text"
              >
                <FileSymlink className="w-5 h-5" />
                <span className="hover:underline body-text">Download</span>
              </a>
            </li>
            <li className="flex items-center gap-[0.5rem] text-muted-foreground body-text">
              Github (Back-end):
              <a
                href="https://github.com/micnusz/chat-app-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[0.35rem] text-foreground transition hover:text-chart-4 body-text"
              >
                <LinkIcon className="w-5 h-5" />
                <p className="hover:underline body-text">Link</p>
              </a>
            </li>

            <li className="flex items-center gap-[0.5rem] text-muted-foreground body-text">
              Github (Front-end):
              <a
                href="https://github.com/micnusz/chat-app-frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[0.35rem] text-foreground transition hover:text-chart-4 body-text"
              >
                <LinkIcon className="w-5 h-5" />
                <p className="hover:underline body-text">Link</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
