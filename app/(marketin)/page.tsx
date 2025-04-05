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

      {/* Load React dependencies first */}
      <Script
        src="https://unpkg.com/react@18/umd/react.production.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
        strategy="beforeInteractive"
      />

      {/* Then load your component */}
      <Script src="/scripts/floopr-feedback.js" strategy="afterInteractive" />

      {/* Initialize after everything is loaded */}
      <Script id="feedback-init" strategy="afterInteractive">
        {`
          window.addEventListener('load', function() {
            const container = document.getElementById('feedback-container');
            if (container && window.FlooprFeedback) {
              window.FlooprFeedback.mount(container, {
                apiKey: 'your-api-key',
                productId: 'your-product-id',
                componentId: 'your-component-id',
                apiBaseUrl: 'https://your-api-base-url',
                ImageComponent: 'img',
                LinkComponent: 'a'
              });
            }
          });
        `}
      </Script>

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
