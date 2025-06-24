import { AppSidebar } from "@/components/app-sidebar";
import NotSetUpOnboarding from "@/components/onboarding/not-set-up-onboarding";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GuidedOnboardingProvider } from "@/contexts/onboarding/onboarding-context";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";

export default async function PageLayout({ children, modal }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="max-w-[100vw] bg-background">
        <SidebarProvider defaultOpen={defaultOpen}>
          <GuidedOnboardingProvider>
            <div className="flex layout-div w-full bg-background">
              <div className="layout-sidebar flex">
                <AppSidebar />
              </div>
              <main className="layout-children w-full bg-background">
                {children}
              </main>
            </div>
            {/* <GuidedOnboardingPopover stepIndex={2} />
            <GuidedOnboardingPopover stepIndex={3} />
            <GuidedOnboardingPopover stepIndex={4} /> */}
      <NotSetUpOnboarding />

          </GuidedOnboardingProvider>
        </SidebarProvider>
        {modal}
      </div>
    </ThemeProvider>
  );
}
