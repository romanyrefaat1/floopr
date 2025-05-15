import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function JoinBetaForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const saveBetaEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const toastLoader = toast.loading('Joining beta...');

        try {
            if (email.length === 0 || !email.includes('@')) {
                toast.error('Please enter a valid email');
                return;
            }

            const collectionRef = collection(db, `beta-emails`);
            await addDoc(collectionRef, { email, createdAt: new Date() });

            setEmail('');
            toast.dismiss(toastLoader);
            toast.success('Thanks for joining! We\'ll notify you when your access is approved.');
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
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