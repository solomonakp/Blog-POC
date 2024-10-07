'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PAGE_SEARCH_KEY } from '@utils/constants';
import { Pagination as PaginationComp } from '@mantine/core';
import { PaginationProps as Props } from './pagination.props';

export const Pagination = (props: Props) => {
  const { total, ...rest } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(PAGE_SEARCH_KEY)) || 1;
  const router = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_SEARCH_KEY, pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleChange = (pageNumber: number) => {
    const url = createPageURL(pageNumber);
    router.replace(url);
  };

  return <PaginationComp total={total} value={currentPage} onChange={handleChange} {...rest} />;
};
