import { PropsWithChildren } from "react";
import { SidebarInset, SidebarProvider } from "../../components/sidebar";
import { DashboardSidebar } from "./ui/onboarding-sidebar";
import { OnboardingHeader } from "./ui/onboarding-header";

export function OnboardingLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-accent/20">
        <OnboardingHeader />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
