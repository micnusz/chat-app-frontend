"use server";

import SignInUserForm from "@/components/SignInUserForm";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Chat App - Sign in",
    description: "App created by Michał Nuszkiewicz as a portfolio project.",
  };
};

export default async function SignInPage() {
  return (
    <div className="h-screen">
      <SignInUserForm />
    </div>
  );
}
