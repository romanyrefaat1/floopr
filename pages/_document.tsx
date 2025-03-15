
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#7C65F6" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Floopr - The all-in-one platform to collect, organize, and act on user feedback" />
        <meta property="og:title" content="Floopr - User Feedback Management" />
        <meta property="og:description" content="The all-in-one platform to collect, organize, and act on user feedback" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
