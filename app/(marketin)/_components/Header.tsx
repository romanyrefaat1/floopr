import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Lock body scroll when menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleWaitlistClick = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-5 
      ${
        isScrolled
          ? "bg-marketing-backgroun/80 backdrop-blur-sm"
          : "bg-marketing-backgroud backdrop-blur-sm"
      }`}
    >
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Image
                src={`/images/floopr-logo-no-bg-svg.svg`}
                width={70}
                height={60}
                alt={`floopr logo`}
              />
            </a>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-marketing-floopr-purple transition-colors"
            >
              Features
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium text-muted-foreground hover:text-marketing-floopr-purple transition-colors"
            >
              Benefits
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="default"
              className="bg-marketing-accent hover:bg-marketing-accent/90 text-marketing-accent-foreground rounded-lg"
              onClick={handleWaitlistClick}
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-marketing-floopr-purple transition-colors p-2 rounded-lg hover:bg-marketing-accent/10"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 inset-0 bg-marketing-background h-fit z-50 md:hidden">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-marketing-floopr-purple transition-colors p-2 rounded-lg hover:bg-marketing-accent/10"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col flex-grow items-center justify-center px-6">
            <nav className="flex flex-col space-y-8 w-full">
              <div className="flex justify-center items-center">
                <Link href="/" className="flex justify-center items-center">
                  <Image
                    src={`/images/floopr-logo-no-bg-svg.svg`}
                    width={60}
                    height={60}
                    alt={`floopr logo`}
                  />
                </Link>
              </div>
              <a
                href="#features"
                className="block text-center text-xl font-medium text-muted-foreground hover:text-marketing-floopr-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#benefits"
                className="block text-center text-xl font-medium text-muted-foreground hover:text-marketing-floopr-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Benefits
              </a>
            </nav>

            <div className="mt-12 w-full">
              <ThemeToggle />
              <Button
                variant="default"
                className="w-full bg-marketing-accent hover:bg-marketing-accent/90 text-marketing-accent-foreground rounded-lg py-4 h-auto"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleWaitlistClick();
                }}
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
