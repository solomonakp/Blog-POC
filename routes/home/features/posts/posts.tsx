import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';
import { ActionIcon, Affix, Box, Center, Flex, Grid, GridCol, Title } from '@mantine/core';
import { Pagination } from '../pagination';
import { PostCard } from '../post-card';
import { PostsProps } from './posts.props';
import { getPosts } from './posts.server';
import classes from './posts.module.css';

export const Posts = async (props: PostsProps) => {
  const { currentPage } = props;
  const postsData = await getPosts(currentPage);
  const posts = postsData.data;
  const totalPages = postsData.pages;

  const noPost = posts.length === 0;

  if (noPost) {
    return (
      <Flex
        component="section"
        className={classes['home-page___posts']}
        display="flex"
        align="center"
        justify="center"
      >
        <Center>
          <Title order={1}>No posts available</Title>
        </Center>
      </Flex>
    );
  }

  return (
    <Box component="section">
      <Box component="header" mb="xl">
        <Center>
          <Title order={1}>Posts</Title>
        </Center>
      </Box>
      <Grid
        type="container"
        breakpoints={{ xs: '', sm: '', md: '425px', lg: '768px', xl: '1140px' }}
        className={classes['home-page___posts']}
      >
        {posts.map((post) => (
          <GridCol span={{ base: 12, md: 6, lg: 4 }}>
            <PostCard key={post.id} {...post} />
          </GridCol>
        ))}
      </Grid>
      <Box my="xl">
        <Center>
          <Pagination total={totalPages} />
        </Center>
      </Box>
      <Affix position={{ bottom: 80, right: 60 }}>
        <ActionIcon
          color="blue"
          radius="xl"
          size={60}
          className={classes['home-page__floating-button']}
          aria-label="Create Post"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          variant="gradient"
          component={Link}
          href={`/post/create/${totalPages}?page=${currentPage}`}
        >
          <IconPlus stroke={3} size={30} />
        </ActionIcon>
      </Affix>
    </Box>
  );
};
