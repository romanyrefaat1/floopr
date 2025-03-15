
import type { NextPage } from 'next';
import Head from 'next/head';
import NotFound from '@/src/pages/NotFound';

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Floopr</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
