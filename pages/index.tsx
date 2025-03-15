
import type { NextPage } from 'next';
import Head from 'next/head';
import Index from '@/src/pages/Index';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Floopr - Collect and manage feedback effortlessly</title>
        <meta name="description" content="The all-in-one platform to collect, organize, and act on user feedback" />
      </Head>
      <Index />
    </>
  );
};

export default Home;
