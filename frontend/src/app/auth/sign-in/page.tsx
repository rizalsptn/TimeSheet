import LoginForm from "@/components/Auth/SigninWithPassword";

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm />
    </main>
  );
}