import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";

export default async function PageLayout({ children, modal }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="max-w-[100vw] bg-background">
        <SidebarProvider defaultOpen={defaultOpen}>
          <div className="flex layout-div w-full bg-background">
            <div className="layout-sidebar flex">
              <AppSidebar />
            </div>
            <main className="layout-children w-full bg-background">
              {children}
            </main>
          </div>
          {/* Render modal content if available */}
        </SidebarProvider>
        {modal}
      </div>
    </ThemeProvider>
  );
}
