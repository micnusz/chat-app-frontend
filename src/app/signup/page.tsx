"use server";

import SignUpUserForm from "@/components/SignUpUserForm";

export default async function SignUpPage() {
  return (
    <div className="h-screen">
      <SignUpUserForm />
    </div>
  );
}
