// app/page.tsx
import UserForm from "../components/UserForm";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Chat App</h1>
      <UserForm />
    </div>
  );
}
