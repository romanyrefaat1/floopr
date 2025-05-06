import Image from "next/image";
import React from "react";

const Demo = () => {
  return (
    <section
      className="p-8 rounded-lg shadow-lg my-8 flex justify-center flex-col"
      id="demo"
    >
      <h2 className="text-5xl text-center font-semibold tracking-tight flex items-center justify-center gap-[4px] mb-2">
        See{" "}
        <span className="inline-block align-middle">
          <Image
            src="/images/floopr-logo-no-bg-svg.svg"
            alt="Floopr Logo"
            width={150}
            height={150}
            className="inline h-10 mx-0 align-middle"
            style={{ display: "inline" }}
            priority
          />
        </span>
        in Action
      </h2>
      <span className="size-4 text-center w-full mb-[30px]">
        (It&apos;s at 1.5x)
      </span>
      <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/25kCLLdwVHk"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Demo Video"
        />
      </div>
    </section>
  );
};

export default Demo;
