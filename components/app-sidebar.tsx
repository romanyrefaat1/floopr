"use client";

import { ThemeToggle } from "./theme-toggle";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, Plus, ProjectorIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Add",
    url: "/new/step-one",
    icon: Plus,
  },
  {
    title: "Products",
    url: "/products",
    icon: ProjectorIcon,
  },
];

export function AppSidebar() {
  const { theme } = useTheme();
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="bg-background overflow-hidden">
      <SidebarContent className="bg-background relative">
        <SidebarGroup>
          <SidebarGroupLabel className="my-5">
            {theme === `dark` ? (
              <Image
                src={`/images/floopr-logo-no-bg-white-svg.svg`}
                width={52}
                height={12}
                alt="floopr logo"
              />
            ) : (
              <Image
                src={`/images/floopr-logo-no-bg-svg.svg`}
                width={52}
                height={12}
                alt="floopr logo"
              />
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator className="my-2" />
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <ThemeToggle />
                </SidebarMenuButton>
                <SidebarMenuButton asChild className="sm:hidden md:inline-flex">
                  <SidebarMenuButton>
                    <SidebarTrigger />
                  </SidebarMenuButton>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div
  className="absolute bottom-[2rem] left-[0rem] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(125,101,246,0.6)_0%,rgba(125,101,246,0.2)_1%,transparent_100%)] blur-3xl z-[1] pointer-events-none"
/>
      </SidebarContent>
    </Sidebar>
  );
}
