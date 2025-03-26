"use client";

import { ThemeToggle } from "./theme-toggle";
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
import {
  Calendar,
  Home,
  Plus,
  ProjectorIcon,
  Search,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Separator } from "./ui/separator";

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
    <Sidebar collapsible="icon" variant="sidebar" className="bg-background">
      <SidebarContent  className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel className="my-5">
            {theme === `dark` ? (
              <Image
                src={`/floopr-logo-no-bg-white-svg.svg`}
                width={52}
                height={12}
                alt="floopr logo"
              />
            ) : (
              <Image
                src={`/floopr-logo-no-bg-svg.svg`}
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
      </SidebarContent>
    </Sidebar>
  );
}
