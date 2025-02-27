import AuthButton from "@/components/ui/auth-button";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <h4 className="font-medium">Ideaboard</h4>
      <ul className="flex gap-2">
        <li>
          <AuthButton to={`signup`} text={`Sign Up`} variant={`link`}/>
        </li>
        <li>
          <AuthButton to={`sigin`} text={`Sign In`} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
