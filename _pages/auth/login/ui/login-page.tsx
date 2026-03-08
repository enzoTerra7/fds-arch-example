import { LoginForm } from "@/features/auth/login";
import Link from "next/link";

export function LoginPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl @md:text-2xl font-semibold leading-none">
          Welcome back
        </h1>
        <p>Type or credentials and log in your account!</p>
      </div>
      <LoginForm />
      <Link
        href={"/auth/register"}
        prefetch
        className="block w-full mx-auto text-center justify-center hover:underline underline-offset-2 hover:text-primary"
      >
        Don&apos;t have an account? Register right now!
      </Link>
    </>
  );
}
