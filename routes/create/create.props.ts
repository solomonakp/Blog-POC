import { NextPage } from 'next';

export type CreatePageProps = NextPage<{
  params: {
    page: string;
  };
}>;
