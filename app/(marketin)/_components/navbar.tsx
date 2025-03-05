"use client";
import AuthButton from "@/components/ui/auth-button";
import { useAuth } from "@/contexts/auth-context";

const Navbar = () => {
  const {isUserSignedIn} = useAuth();
  return (
    <nav className="flex justify-between">
      <h4 className="font-medium">Ideaboard</h4>
     
        {!isUserSignedIn && <ul className="flex gap-2"> <li>
          <AuthButton to={`signup`} text={`Sign Up`} variant={`link`}/>
        </li>
        <li>
          <AuthButton to={`signin`} text={`Sign In`} />
        </li>
      </ul>}
    </nav>
  );
};

export default Navbar;
