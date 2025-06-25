"use client";

import getUserProducts from "@/actions/user/get-user-products";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  Plus,
  ProjectorIcon,
  ChevronDown,
  Flame,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@clerk/nextjs";

const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Add", url: "/new", icon: Plus },
];

export function AppSidebar() {
  const { theme } = useTheme();
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const { userId, isLoaded } = useAuth();
  const [hotProducts, setHotProducts] = useState([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || fetchedRef.current) return;

    const fetchUserProducts = async () => {
      const userProducts = await getUserProducts(userId);
      setHotProducts(
        userProducts.map((product) => ({
          title: product.name,
          url: `/products/${product.docId}`,
        }))
      );
      fetchedRef.current = true;
    };

    fetchUserProducts();
  }, [isLoaded, userId]);

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="bg-background overflow-x-hidden">
      <SidebarContent className="bg-background relative max-w-full overflow-x-hidden">
        <SidebarGroup className="max-w-full overflow-x-hidden">
          <SidebarGroupLabel className="my-5">
            {theme === "dark" ? (
              <Image src="/images/floopr-logo-no-bg-white-svg.svg" width={52} height={12} alt="floopr logo" />
            ) : (
              <Image src="/images/floopr-logo-no-bg-svg.svg" width={52} height={12} alt="floopr logo" />
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem
                onMouseEnter={() => setIsProductsHovered(true)}
                onMouseLeave={() => setIsProductsHovered(false)}
                className="relative"
              >
                <SidebarMenuButton asChild>
                  <Link href="/products" className="group/products">
                    <ProjectorIcon />
                    <span>Products</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-300 ease-in-out ${
                        isProductsHovered ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Link>
                </SidebarMenuButton>

                {hotProducts.length > 0 && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isProductsHovered ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <SidebarMenuSub className="mt-1">
                      {hotProducts.map((product, index) => (
                        <SidebarMenuSubItem
                          key={product.title}
                          className={`transform transition-all duration-300 ease-in-out ${
                            isProductsHovered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                          }`}
                          style={{
                            transitionDelay: isProductsHovered ? `${index * 50}ms` : "0ms",
                          }}
                        >
                          <SidebarMenuSubButton asChild>
                            <Link
                              href={product.url}
                              className="group/sub-item hover:scale-105 transition-transform"
                            >
                              <span className="group-hover/sub-item:text-orange-500 transition-colors">
                                {product.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                      {/* <SidebarMenuSubItem
                        className={`transform transition-all duration-300 ease-in-out ${
                          isProductsHovered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                        }`}
                        style={{
                          transitionDelay: isProductsHovered ? `${hotProducts.length * 50}ms` : "0ms",
                        }}
                      >
                        <SidebarMenuSubButton asChild>
                          <Link
                            href="/products"
                            className="group/sub-item hover:scale-105 transition-transform"
                          >
                            <ProjectorIcon className="group-hover/sub-item:text-blue-500 transition-colors" />
                            <span className="group-hover/sub-item:text-blue-500 transition-colors">
                              All Products
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem> */}
                    </SidebarMenuSub>
                  </div>
                )}
              </SidebarMenuItem>

              <Separator className="my-2" />
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <ThemeToggle />
                </SidebarMenuButton>
                <SidebarMenuButton asChild className="sm:hidden md:block">
                    <SidebarTrigger className="w-fit"/>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="absolute bottom-[2rem] left-[0rem] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(125,101,246,0.6)_0%,rgba(125,101,246,0.2)_1%,transparent_100%)] blur-3xl z-[1] pointer-events-none" />
      </SidebarContent>
    </Sidebar>
  );
}