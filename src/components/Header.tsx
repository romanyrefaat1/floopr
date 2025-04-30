"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
              <Link
                href="#features"
                className="text-gray-600 hover:text-floopr-purple transition-colors"
              >
                Features
              </Link>
              <Link
                href="#benefits"
                className="text-gray-600 hover:text-floopr-purple transition-colors"
              >
                Benefits
              </Link>
              <a
                href="https://github.com/RomanyU1662160/floopr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-floopr-purple transition-colors inline-flex items-center gap-2"
              >
                <Github className="h-5 w-5" />
                <span className="hidden lg:inline">GitHub</span>
              </a>
            </nav>

            <Button
              variant="default"
              className="bg-floopr-purple hover:bg-floopr-purple-dark text-white shadow-md hover:shadow-lg transition-all"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
