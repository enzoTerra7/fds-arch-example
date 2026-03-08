import { RegisterForm } from "@/features/auth/register";
import Link from "next/link";

export function RegisterPage() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl @md:text-2xl font-semibold leading-none">
          Let register
        </h1>
        <p>Provide basic information about yourself and get your account!</p>
      </div>
      <RegisterForm />
      <Link
        href={"/auth/login"}
        prefetch
        className="block w-full mx-auto text-center justify-center hover:underline underline-offset-2 hover:text-primary"
      >
        Already have an account? Log in!
      </Link>
    </>
  );
}
