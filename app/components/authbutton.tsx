import { Button } from "@/components/ui/button";
import Link from "next/link";

type AuthButtonProps = {
  text: string;
  to: string;
  variant?: string | `default`;
};

const AuthButton = ({ text, to, variant }: AuthButtonProps) => {
  return (
    <Button variant={variant}>
      <Link href={to}>{text}</Link>
    </Button>
  );
};

export default AuthButton;
