import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import FlooprFloatingFeedbackButton from "@/packages/floopr-feedback/float-button/src/floating-feedback-button";
import { FlooprFloatButtonScript } from "@/src/components/providers";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";

// app/[id]/layout.js
export default async function PageLayout({ children, modal }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="max-w-[100vw]">
        <SidebarProvider defaultOpen={defaultOpen}>
          <div className="flex layout-div w-full">
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
      <FlooprFloatButtonScript
        apiKey={process.env.PA_FLOAT_BUTTON_FLOOPR_API_KEY}
        productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
        componentId={`6e5b7f46-0488-4a85-8564-3f323338471f`}
      />
      {/* Test :
      <FlooprFloatingFeedbackButton
        apiKey={process.env.PA_FLOAT_BUTTON_FLOOPR_API_KEY}
        productId={`31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
        componentId={`6e5b7f46-0488-4a85-8564-3f323338471f`}
      /> */}
    </ThemeProvider>
  );
}
