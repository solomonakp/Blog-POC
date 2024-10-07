import { NextPage } from 'next';

export type HomeBaseProps = {
  searchParams?: {
    page?: string;
  };
};
export type HomePageProps = NextPage<HomeBaseProps>;
