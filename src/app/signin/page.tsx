"use server";

import SignInUserForm from "@/components/SignInUserForm";

export default async function SignInPage() {
  return (
    <div className="h-screen">
      <SignInUserForm />
    </div>
  );
}
