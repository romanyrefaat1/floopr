
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Index from '@/src/pages/Index';

interface HomeProps {
  lastUpdated: string;
}

const Home: NextPage<HomeProps> = ({ lastUpdated }) => {
  return (
    <>
      <Head>
        <title>Floopr - Collect and manage feedback effortlessly</title>
        <meta name="description" content="The all-in-one platform to collect, organize, and act on user feedback. Join our waitlist today!" />
        <meta name="keywords" content="user feedback, product feedback, feedback management, customer feedback, feature requests" />
        <meta name="author" content="Floopr" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://floopr.io/" />
        <meta property="og:title" content="Floopr - User Feedback Management Platform" />
        <meta property="og:description" content="The all-in-one platform to collect, organize, and act on user feedback" />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://floopr.io/" />
        <meta property="twitter:title" content="Floopr - User Feedback Management Platform" />
        <meta property="twitter:description" content="The all-in-one platform to collect, organize, and act on user feedback" />
        <meta property="twitter:image" content="/og-image.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://floopr.io/" />
      </Head>
      <Index lastUpdated={lastUpdated} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // This allows us to revalidate the page periodically
  return {
    props: {
      lastUpdated: new Date().toISOString(),
    },
    // Revalidate every 24 hours
    revalidate: 86400,
  };
};

export default Home;
