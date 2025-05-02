"use client";

import { Button } from "./ui/button";
import { FeedbackNote } from "@/components/feedback-note";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  // const { userId } = useAuth();
  const userId = null
  return (
    <section className="pt-[4rem] min-h-screen pb-16 md:pb-20 bg-white">
      {/* <div className="relative hidden lg:block w-full h-fit">
        <FeedbackNote
          title="Improve UI"
          content="Make your UI more colorful. Uhmm I would say, maybe add an accent color like: Orange. And increase your font size a bit to match the boldness of your product"
          positionX="right"
          positionY="top-24"
          size="md"
        />
      </div> */}
      <div className="relative w-full h-full">
        <div className="absolute bottom-[-190px] w-full">
          <FeedbackNote
            title="Improve UI"
            content="Make your UI more colorful. Uhmm I would say, maybe add an accent color like: Orange. And increase your font size a bit to match the boldness of your product"
            positionX="left"
          />
        </div>
      </div>

      <div className="section-container">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block bg-floopr-purple/10 text-floopr-purple px-4 py-2 rounded-full text-sm font-medium mb-4">
            Beta Version
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-6 animate-on-scroll">
            <br />a Into Business Plan
          </h1>

          <p
            className="text-lg md:text-xl text-gray-600 mb-8 animate-on-scroll max-w-2xl mx-auto"
            style={{ animationDelay: "100ms" }}
          >
            Harness the power of AI to transform user feedback into actionable
            business strategies. Organize, analyze, and execute with precision.
          </p>

          <div
            className="flex justify-center align-center items-center gap-4 animate-on-scroll"
            style={{ animationDelay: "200ms" }}
          >
            <Link href="#demo">
              <Button variant={`link`}>Watch Demo</Button>
            </Link>
            <Link href="/home">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-lg bg-floopr-purple hover:bg-floopr-purple-dark text-white"
              >
                {userId ? `Get Feedback Now` : `Get Started`}
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="relative mt-16 animate-on-scroll blur-on-scroll"
          style={{ animationDelay: "400ms" }}
        >
          <div className="aspect-[16/9] max-w-5xl mx-auto">
            <div className="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200">
              <Link
                href={`https://floopr.vercel.app/31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
              >
                <Image
                  src="/images/land/dashboard-preview.png"
                  alt="Floopr Dashboard Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </Link>
            </div>
          </div>

          <div className="absolute -inset-x-4 -bottom-4 bg-gradient-to-t from-white via-white/50 to-transparent h-20 md:h-60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
