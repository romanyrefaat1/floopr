"use client";
import LoaderSpinner from "@/components/loader-spinner";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignInButton, SignOutButton, SignUpButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const {userId, isLoaded} = useAuth();
  return (
    <nav className="flex justify-between">
      <h4 className="font-medium">floopr</h4>

        {!isLoaded && <LoaderSpinner />}
        {isLoaded && !userId && <ul className="flex gap-2"> <li>
          <SignInButton />
        </li> <li>
          <SignUpButton />
        </li> <li>
        </li> </ul>}
        <div className="flex gap-2">
          {isLoaded && userId && <SignOutButton />}
          <ThemeToggle />
          </div>
        
    </nav>
  );
};

export default Navbar;
