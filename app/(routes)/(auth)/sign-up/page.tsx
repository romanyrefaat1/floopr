"use client";
import Link from "next/link";
import { SignUpForm } from "../_components/signup-form";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    //   <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow">
    //     <h1 className="text-center text-3xl font-bold text-gray-900">
    //       Create an Account
    //     </h1>
    //     <SignUpForm />
    //     <p className="mt-4 text-center text-sm text-gray-600">
    //       Already have an account?{" "}
    //       <Link
    //         href="/signin"
    //         className="font-medium text-blue-600 hover:underline"
    //       >
    //         Sign in
    //       </Link>
    //     </p>
    //   </div>
    // </div>
    <div className="flex justify-center items-center">
      <SignUp />
    </div>
  );
}
