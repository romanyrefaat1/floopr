"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-floopr flex items-center justify-between px-6 relative overflow-hidden">
      {/* Left content */}
      <div className="flex-1 text-center lg:text-left z-10 pl-4 lg:pl-12">
        <img
          src="https://illustrations.popsy.co/white/crashed-error.svg"
          alt="404 Illustration"
          className="w-[300px] mx-auto lg:mx-0 mb-8 animate-float"
        />

        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          Oops! Page Not Found
        </h2>

        <p className="text-secondary-foreground mb-8 max-w-md">
          The page you're looking for seems to have wandered off. Let's get you
          back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
          <Button
            variant="default"
            asChild
            className="bg-floopr-purple hover:bg-floopr-purple-light text-foreground"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="border-white text-white hover:bg-white/10"
          >
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Search Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Right content - Big 404 */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-bold text-floopr-purple-dark select-none hidden lg:block">
        404
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
