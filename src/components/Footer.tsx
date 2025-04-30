"use client";

import { Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative mt-32">
      {/* Gradient transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-floopr-purple/5 pointer-events-none" />

      <div className="section-container relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                src="/floopr-logo-no-bg.png"
                alt="Floopr Logo"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              The all-in-one platform to collect, organize, and act on user
              feedback. Help your team make better product decisions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-floopr-purple transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#benefits"
                  className="text-gray-600 hover:text-floopr-purple transition-colors"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="#cta"
                  className="text-gray-600 hover:text-floopr-purple transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://x.com/floopr_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-floopr-purple transition-colors inline-flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/RomanyU1662160/floopr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-floopr-purple transition-colors inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Floopr. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
