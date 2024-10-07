'use client';

import { useRouter } from 'next/navigation';
import { Page } from '@containers/page';
import { Box, Button, Title } from '@mantine/core';

export const RootErrorPage = () => {
  const router = useRouter();
  return (
    <Page isError className="home-page--error">
      <Title order={1}>Something Went Wrong</Title>
      <Box mt="xl">
        <Button onClick={() => router.push('/')}>Try again</Button>
      </Box>
    </Page>
  );
};
