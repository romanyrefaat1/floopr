import SyncUser from "../(routes)/(code)/(need sidebar)/home/sync-user";
import Navbar from "./_components/navbar";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  const links = [
    { name: "home", to: "/home" },
    { name: "current", to: "/" },
    { name: "sign-in", to: "/sign-in" },
    { name: "sign-up", to: "/sign-up" },
    { name: "products", to: "/products" },
    { name: "new product", to: "/new" },
  ];

  return (
    <>
      {/* Manage the document head */}
      <Head>
        <title>Floopr Feedback Test</title>
      </Head>

      {/* Your main app content */}
      <div>
        <SyncUser />
        <header>
          <Navbar />
          <ul className="flex flex-col justify-center w-full items-center">
            {links.map((item, index) => (
              <span key={item.to}>
                {index + 1}. <Link href={item.to}>{item.name}</Link>
              </span>
            ))}
          </ul>
        </header>

        {/* Container where the feedback component will mount */}
        <div id="feedback-container"></div>
      </div>
    </>
  );
}
