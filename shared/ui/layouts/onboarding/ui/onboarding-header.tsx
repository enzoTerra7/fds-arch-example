"use client";

import { SidebarTrigger } from "@/shared/ui/components/sidebar";

export function OnboardingHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
    </header>
  );
}
