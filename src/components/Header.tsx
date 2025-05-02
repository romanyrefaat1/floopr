"use client";

import { Skeleton } from "./ui/skeleton";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-white/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/floopr-logo-no-bg.png"
              alt="Floopr Logo"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-8">
              {/* <Link
                href="#features"
                className="text-gray-600 hover:text-floopr-purple transition-colors"
              >
                Features
              </Link> */}
              {/* <Link
                href="#benefits"
                className="text-gray-600 hover:text-floopr-purple transition-colors"
              >
                Benefits
              </Link> */}

              {/* <Button
                variant={`outline`}
                size={`sm`}
                className="px-2 py-1 border"
              > */}

              {/* <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 border bg-transparent border-[#eee] text-[#7c7c7c] text-[10px] hover:bg-[#f5f5f5] hover:text-floopr-purple transition-colors">
                <span className="text-xs">⌘</span>K
              </kbd> */}
              {/* </Button> */}

              <Link
                href="/pricing"
                className="text-gray-600 hover:text-floopr-purple transition-colors"
              >
                Pricing
              </Link>
            </nav>

            {!isLoaded ? (
              <Skeleton className="h-8 w-24 bg-gray-200 rounded-md" />
            ) : (
              <Link href="/home">
                <Button
                  variant="default"
                  className="bg-floopr-purple hover:bg-floopr-purple-dark text-white shadow-md hover:shadow-lg transition-all"
                >
                  {!isSignedIn ? `Sign In now` : `Get Feedback Now`}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
