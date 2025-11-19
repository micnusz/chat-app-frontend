"use server";

import SignUpUserForm from "@/components/SignUpUserForm";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Chat App - Register",
    description: "App created by Michał Nuszkiewicz as a portfolio project.",
  };
};

export default async function SignUpPage() {
  return (
    <div className="h-screen">
      <SignUpUserForm />
    </div>
  );
}
