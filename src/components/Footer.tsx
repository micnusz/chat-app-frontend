"use client";

import { ArrowLeft, FileSymlink, LinkIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-background border-t-2 p-6 lg:p-20 flex flex-col md:grid md:grid-cols-3 gap-y-10 h-fit">
      <div className="p-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance text-foreground">
          CHAT APP
        </h1>
        <p className="text-lg leading-7 [&:not(:first-child)]:mt-4 text-muted-foreground max-w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          modi nemo velit quas provident, voluptates sint error recusandae hic
          dolore excepturi veritatis.
        </p>
      </div>

      <div className="p-4">
        <p className="text-lg leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          NAVIGATION
        </p>
        <ul className="text-lg flex flex-col gap-y-2 [&:not(:first-child)]:mt-2 ">
          <li className="flex flex-row gap-x-1 items-center hover:text-chart-5 transition duration-200">
            <ArrowLeft className="text-muted-foreground" />
            <Link href="/chatrooms">Chatrooms</Link>
          </li>
          <li className="flex flex-row gap-x-1 items-center hover:text-chart-5 transition duration-200">
            <ArrowLeft className="text-muted-foreground" />
            <Link href="/signin">Sign In</Link>
          </li>
          <li className="flex flex-row gap-x-1 items-center hover:text-chart-5 transition duration-200">
            <ArrowLeft className="text-muted-foreground" />
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>

      <div className="p-4">
        <p className="text-lg leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          INFO
        </p>
        <ul className="text-lg flex flex-col gap-y-2 [&:not(:first-child)]:mt-2 ">
          <li>
            <span className="text-muted-foreground flex flex-row gap-x-2 items-center scroll-m-20 text-lg font-semibold tracking-tight">
              Website by:{" "}
              <h1 className="text-foreground">Michał Nuszkiewicz</h1>
            </span>
          </li>
          <li>
            <span className="text-muted-foreground flex flex-row gap-x-2 items-center scroll-m-20 text-lg font-semibold tracking-tight">
              Github:
              <a
                href="https://github.com/micnusz/chat-app-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-x-1 items-center hover:text-chart-4 transition duration-200"
              >
                <LinkIcon />
                <p className="text-foreground transition duration-200 hover:underline">
                  Link
                </p>
              </a>
            </span>
          </li>
          <li>
            <span className="text-muted-foreground flex flex-row gap-x-2 items-center scroll-m-20 text-lg font-semibold tracking-tight">
              Resume:
              <a
                href="/Jan-Kowalski-Resume.pdf"
                download
                className="flex flex-row gap-x-1 items-center hover:text-chart-4 transition duration-200"
              >
                <FileSymlink />
                <p className="text-foreground transition duration-200 hover:underline">
                  Download
                </p>
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
