import dayjs from 'dayjs';
import { Metadata, NextPage } from 'next';
import NextImage from 'next/image';
import { RICH_EDITOR_EXTENSIONS_SERVER } from '@components/rich-editor';
import { Page } from '@containers/page';
import { DeletePost } from '@features/delete-post';
import { generateHTML } from '@tiptap/html';
import { generateRandomIntBetween } from '@utils/functions';
import { Avatar, Box, Flex, Image, Text, Title } from '@mantine/core';
import { PostNavigation } from './features';
import { PostDetailsPageProps as Props } from './post.props';
import { getPost } from './post.server';
import classes from './post.module.css';

export async function generatePostDetailsMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { id } = params;

  // fetch data
  const post = await getPost(id);

  return {
    title: `Edit ${post.title}`,
    description: post.description,
    publisher: post.author,
    openGraph: {
      images: [post.imgUrl],
    },
  };
}

export const PostDetailsPage: NextPage<Props> = async (props) => {
  const post = await getPost(props.params.id);

  const isUpdatedPost = post.updatedAt !== null;

  const __html = generateHTML(JSON.parse(post.content), RICH_EDITOR_EXTENSIONS_SERVER);

  return (
    <Page className="post-details-page">
      <PostNavigation />
      <Box mb="xl">
        <Image
          component={NextImage}
          alt={post.title}
          width={500}
          height={480}
          src={`https://picsum.photos/id/${generateRandomIntBetween(1, 100)}/800/720`}
          radius="md"
        />
      </Box>
      <Box component="header">
        <Title order={1} className={classes['post-details-page__heading']} mb="lg">
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </Title>
      </Box>
      <Box component="section" mb="xl">
        <Flex>
          {/* avatar component goes here */}
          <Avatar
            src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${generateRandomIntBetween(1, 10)}.png`}
            size={48}
            radius="xl"
            mr="xs"
          />
          <Box className={classes['post-details-page__author-date']}>
            <Text fz="md" inline className={classes['post-details-page__author']}>
              {post.author}
            </Text>

            <Box component="time">
              {isUpdatedPost
                ? dayjs(post.updatedAt).format('MMMM D, YYYY')
                : dayjs(post.createdAt).format('MMMM D, YYYY')}
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box component="section" mb="xl">
        <Box component="article" mb="xl" dangerouslySetInnerHTML={{ __html }} />
      </Box>
      <PostNavigation />
      <DeletePost id={props.params.id} />
    </Page>
  );
};
