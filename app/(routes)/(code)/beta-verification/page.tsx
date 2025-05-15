"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";

export default function BetaVerification() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const [verificationCode, setVerificationCode] = useState(code || '');
    const [loading, setLoading] = useState(false);

    const verifyBetaCode = async (e: React.FormEvent) => {
        if (e){e.preventDefault();}
        setLoading(true);

        try {
            if (!verificationCode) {
                toast.error('Please enter your verification code');
                return;
            }

            const betaEmailsRef = collection(db, 'beta-emails');
            const q = query(betaEmailsRef, where('betaCode', '==', verificationCode));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.error('Invalid verification code');
                return;
            }

            const docRef = doc(db, 'beta-emails', querySnapshot.docs[0].id);
            await updateDoc(docRef, { isVerifiedBeta: true });

            toast.success('Beta access granted successfully!');
            RedirectToSignIn({ redirectUrl: '/home' })
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-floopr-purple-bg to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
                    <p className="text-gray-600">Enter the verification code sent to your email</p>
                </div>

                <form onSubmit={verifyBetaCode} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Type the verification code sent to your email"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full bg-white/90 border-floopr-purple/20 focus:border-floopr-purple focus:ring-floopr-purple"
                        disabled={loading}
                        required
                    />
                    <Button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-floopr-purple hover:bg-floopr-purple-dark text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Verify Email
                    </Button>
                </form>
            </div>
        </div>
    );
}