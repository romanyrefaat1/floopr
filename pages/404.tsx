
import type { NextPage } from 'next';
import Head from 'next/head';
import NotFound from '@/src/pages/NotFound';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Floopr</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Floopr - The all-in-one platform to collect, organize, and act on user feedback." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
