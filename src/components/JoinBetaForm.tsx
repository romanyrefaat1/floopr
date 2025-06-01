import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";

const emailMess = (newVerificationCode: string) => {
  return `
  <div>
    <p>Hi there,</p>

    <p>Thank you for joining our beta program!</p>

    <p>Your email has been verified, and you’re now approved to use our beta version.
        And you will get special discounts.
    </p>

    <p>
      <a href="https://www.floopr.app/beta-verification?code=${newVerificationCode}" target="_blank" rel="noopener">
        Click here and click "Verify" to access your beta dashboard
      </a>
    </p>

    <p>Best regards,<br/>
    — Founder, Romany</p>
  </div>
`;
};

export default function JoinBetaForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendEmail(newVerificationCode: string) {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "You have been approved to use Floopr Beta",
        html: emailMess(newVerificationCode),
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  const saveBetaEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastLoader = toast.loading("Joining beta...");

    try {
      if (email.length === 0 || !email.includes("@")) {
        toast.error("Please enter a valid email");
        return;
      }

      const newVerificationCode = crypto.randomUUID();

      const collectionRef = collection(db, `beta-emails`);
      // check if email already exists
      const q = query(collectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error("Email already exists");
        return;
      }
      await addDoc(collectionRef, {
        email,
        createdAt: new Date(),
        betaCode: newVerificationCode,
        isVerifiedBeta: false,
      });

      setEmail("");
      await sendEmail(newVerificationCode);
      toast.dismiss(toastLoader);
      toast.success(
        "Thanks for joining! We'll notify you when your access is approved."
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-">
      <form onSubmit={saveBetaEmail} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/90 border-floopr-purple/80 focus:border-floopr-purple focus:ring-floopr-purple"
          disabled={loading}
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="bg-floopr-purple hover:bg-floopr-purple-dark text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
        >
          Get Access
        </Button>
      </form>
    </div>
  );
}
