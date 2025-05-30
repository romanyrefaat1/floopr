"use client";

import ButtonAddFeedback from "@/components/button-add-feedback";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
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
  const { isSignedIn, isLoaded } = useAuth();

  const isActive = (path: string) => {
    return pathname === path ? "text-foreground" : "text-muted-foreground";
  };

  return (
    <nav className="md:sticky top-0 z-50">
      <div className="max-w-7xl mx-auto ">
        <div className="flex h-8 items-center justify-between gap-[5rem] ">
          <div className="flex items-center gap-8">
            <Link
              href={`/${productId}`}
              className="font-semibold hover:text-primary transition-colors"
            >
              {productName}
            </Link>
            {/* Links */}
            {/* <div className="hidden md:flex items-center gap-6">
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
            </div> */}
          </div>
          <div className="flex items-center gap-4">
            {isLoaded && !isSignedIn ? (
              <Button variant="outline" size={`sm`}>
                Sign In
              </Button>
            ) : !isLoaded ? (
              <Skeleton className="h-8 w-24" />
            ) : null}
            <ButtonAddFeedback rounded={`full`} />
          </div>
        </div>
      </div>
    </nav>
  );
}
