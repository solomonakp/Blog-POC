import { Suspense } from 'react';
import { Page } from '@containers/page';
import { LoadingOverlay } from '@mantine/core';
import { Posts } from './features';
import { HomePageProps as Props } from './home.props';

export const HomeMetadata = {
  title: 'Blog Posts',
  description: 'A List of Blog Posts',
};

export const HomePage: Props = async ({ searchParams }) => {
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Page className="home-page">
      <Suspense
        fallback={<LoadingOverlay overlayProps={{ opacity: 1, center: true }} />}
        key={currentPage}
      >
        <Posts currentPage={currentPage} />
      </Suspense>
    </Page>
  );
};
