import { requireUnauth } from "@/shared/auth/utils";
import React from "react";

export async function AuthLayout({ children }: { children: React.ReactNode }) {
  await requireUnauth();
  return (
    <div className="h-dvh bg-radial from-slate-700/50 to-indigo-300/50">
      <div className="@container h-full w-full place-content-center">
        <main className="@lg:max-w-lg w-full mx-auto p-4 space-y-4 border rounded-2xl drop-shadow-2xl bg-card">
          {children}
        </main>
      </div>
    </div>
  );
}
