import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import { PropsWithChildren } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { IconBrandBlogger, IconBrandGithub } from '@tabler/icons-react';
import NextTopLoader from 'nextjs-toploader';
import {
  ActionIcon,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Center,
  ColorSchemeScript,
  Container,
  Flex,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import classes from './root-layout.module.css';

export const RootMetadata = {
  title: 'Blog POC',
  description: 'A Simple blog POC',
};

export const RootLayout = ({ children }: PropsWithChildren<NextPage<{}>>) => (
  <html lang="en">
    <head>
      <ColorSchemeScript />
      <link rel="shortcut icon" href="/favicon.png" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
    </head>
    <body>
      <MantineProvider theme={theme}>
        <Notifications limit={3} position="top-right" />

        <NextTopLoader showSpinner={false} />
        <AppShell className="app-shell">
          <AppShellHeader className={classes['app-shell__header']}>
            <Container>
              <Flex>
                <Link href="/">
                  <IconBrandBlogger />
                </Link>
              </Flex>
            </Container>
          </AppShellHeader>
          <AppShellMain>{children}</AppShellMain>
          <AppShellFooter className={classes['app-shell__footer']}>
            <Container>
              <Center>
                <ActionIcon
                  variant="default"
                  component={Link}
                  href="https://github.com/solomonakp"
                  radius="sm"
                  target="_blank"
                >
                  <IconBrandGithub />
                </ActionIcon>
              </Center>
            </Container>
          </AppShellFooter>
        </AppShell>
      </MantineProvider>
    </body>
  </html>
);
