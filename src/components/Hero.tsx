"use client";

import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import JoinBetaForm from "./JoinBetaForm";

const Hero = () => {
  const { userId } = useAuth();

  // useEffect(() => {
  //   const sendEmail = async () => {
  //     const res = await fetch("/api/send-email", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         to: "refaatromany641@gmail.com",
  //         subject: "Final Test",
  //         html: "<strong>It works!</strong>",
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   };

  //   sendEmail();
  // }, []);

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
      {/* <div className="relative w-full h-full">
        <div className="absolute bottom-[-190px] w-full">
          <FeedbackNote
            title="Improve UI"
            content="Make your UI more colorful. Uhmm I would say, maybe add an accent color like: Orange. And increase your font size a bit to match the boldness of your product"
            positionX="left"
          />
        </div>
      </div> */}

      <div className="section-container flex flex-col lg:flex-row lg:justify-between lg:items-center lg:gap-8 px-4 md:px-6 lg:px-8">
        <div className="relative z-10 text-center lg:text-left max-w-3xl mx-auto lg:mx-0 lg:w-1/2">
          <span className="inline-block bg-floopr-purple/10 text-floopr-purple px-4 py-2 rounded-full text-sm font-medium mb-4">
            Beta Version
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-3 mx-auto lg:mx-0 animate-on-scroll">
            Collect, Analyze, and Manage Feedback Effortlessly
          </h1>

          <p
            className="text-md md:text-lg text-gray-600 mb-8 animate-on-scroll max-w-2xl mx-auto"
            style={{ animationDelay: "100ms" }}
          >
            Transform customer feedback into actionable business strategies. Organize,
            analyze, and execute with precision.
          </p>

          <div
            className="flex justify-center lg:justify-start items-center gap-4 animate-on-scroll px-6 lg:px-0"
            style={{ animationDelay: "200ms" }}
          >
            {userId ? (
              <>
                <Link href="#demo">
                  <Button variant={`link`}>Watch Demo</Button>
                </Link>
                <Link href="/home">
                  <Button className="bg-floopr-purple hover:bg-floopr-purple-dark text-white shadow-md hover:shadow-lg transition-all">
                    Get Feedback Now
                  </Button>
                </Link>
              </>
            ) : (
              <JoinBetaForm />
            )}
          </div>
        </div>

        <div
          className="relative mt-16 lg:mt-0 animate-on-scroll blur-on-scroll lg:w-1/2"
          style={{ animationDelay: "400ms" }}
        >
          <span className="block text-center lg:text-right mb-2 text-gray-600 italic">to make it clear this is what you will get</span>
          <div className="aspect-[16/9] max-w-5xl mx-auto lg:ml-auto group">
            <div className="w-full h-full relative rounded-2xl overflow-hidden border border-gray-200">
              <Link
                href={`https://floopr.vercel.app/31a4fd3d-615a-409c-97ee-bda48bbbb8e2`}
              >
                <Image
                  // src="/images/land/dashboard-preview.png"
                  src="/images/land/hero/test-test.png"
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
