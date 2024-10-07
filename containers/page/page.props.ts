import { PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren<{
  className: string;
  isError?: true;
}>;
