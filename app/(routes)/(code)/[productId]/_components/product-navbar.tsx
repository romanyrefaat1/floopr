"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProductNavbarProps {
  productId: string;
  productName: string;
}

export default function ProductNavbar({
  productId,
  productName,
}: ProductNavbarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-foreground" : "text-muted-foreground";
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link
              href={`/${productId}`}
              className="font-semibold hover:text-primary transition-colors"
            >
              {productName}
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href={`/${productId}`}
                className={`text-sm font-medium hover:text-foreground transition-colors ${isActive(
                  `/${productId}`
                )}`}
              >
                Home
              </Link>
              <Link
                href={`/${productId}/roadmap`}
                className={`text-sm font-medium hover:text-foreground transition-colors ${isActive(
                  `/${productId}/roadmap`
                )}`}
              >
                Roadmap
              </Link>
              <Link
                href={`/${productId}/changelog`}
                className={`text-sm font-medium hover:text-foreground transition-colors ${isActive(
                  `/${productId}/changelog`
                )}`}
              >
                Changelog
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size={`sm`}>
              Sign In
            </Button>
            <Button>Submit Feedback</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
