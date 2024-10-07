import { NextPage } from 'next';

export type EditPageProps = NextPage<{
  params: {
    page: string;
    id: string;
  };
}>;
