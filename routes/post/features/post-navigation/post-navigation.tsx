'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { IS_DELETE_SEARCH_KEY } from '@utils/constants';
import { ActionIcon, Box, Flex, rem, useMantineTheme } from '@mantine/core';

export const PostNavigation = () => {
  const theme = useMantineTheme();

  const { page, id } = useParams<{ page: string; id: string }>();

  const searchParams = useSearchParams();

  const router = useRouter();

  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);

    params.set(IS_DELETE_SEARCH_KEY, id);

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box aria-label="Delete Button" component="nav">
      <Box component="header">
        <Flex mb="xl" align="center" pt="xl">
          <ActionIcon
            component={Link}
            href={`/?page=${page}`}
            variant="default"
            size="xl"
            mr="auto"
          >
            <IconArrowLeft style={{ width: rem(32), height: rem(32) }} aria-label="Back to Posts" />
          </ActionIcon>
          <ActionIcon variant="default" size="xl" onClick={handleClick}>
            <IconTrash
              style={{ width: rem(32), height: rem(32) }}
              color={theme.colors.red[6]}
              size="lg"
              aria-label="Delete Post"
            />
          </ActionIcon>
        </Flex>
      </Box>
    </Box>
  );
};
