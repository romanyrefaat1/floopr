"use client";
import LoaderSpinner from "@/components/loader-spinner";
import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const {userId, isLoaded} = useAuth();
  if (!isLoaded) return <LoaderSpinner />;
  return (
    <nav className="flex justify-between">
      <h4 className="font-medium">Ideaboard</h4>
     
        {!userId && <ul className="flex gap-2"> <li>
          <SignInButton />
        </li> <li>
          <SignUpButton />
        </li> </ul>}
    </nav>
  );
};

export default Navbar;
