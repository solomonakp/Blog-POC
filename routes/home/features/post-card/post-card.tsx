'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DeletePost } from '@features/delete-post';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PAGE_SEARCH_KEY } from '@utils/constants';
import { generateRandomIntBetween } from '@utils/functions';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Card,
  CardSection,
  Flex,
  Group,
  Image,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { PostCardProps as Props } from './post-card.props';
import classes from './post-card.module.css';

export const PostCard = (props: Props) => {
  const theme = useMantineTheme();
  const searchParams = useSearchParams();

  const isDelete = searchParams.get('is_delete');
  const page = searchParams.get(PAGE_SEARCH_KEY) || '1';

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    if (isDelete) {
      params.delete('is_delete');
    } else {
      params.set('is_delete', props.id);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Card withBorder radius="md" className={classes['post-card']} data-testId="post-card">
      <CardSection>
        <Link
          className={classes['post-card__image-action']}
          href={`/post/${props.id}?page=${page}`}
          data-testid="post-card__image-action"
        >
          <Image
            component={NextImage}
            /* Had to insert image link directly due to config issues with image component */
            src={`https://picsum.photos/id/${generateRandomIntBetween(1, 100)}/800/720`}
            height={180}
            width={200}
            alt={props.title}
            className={classes['post-card__image']}
            quality={100}
          />
        </Link>
      </CardSection>
      <Box component="header" pt="sm">
        <Anchor
          href={`/post/${props.id}?page=${page}`}
          underline="never"
          component={Link}
          className={classes['post-card__anchor']}
          data-testid="post-card__title-action"
        >
          <Text className={classes['post-card__title']}>
            {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
          </Text>
        </Anchor>
      </Box>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {props.description}
      </Text>

      <Group justify="space-between" className={classes['post-card__footer']}>
        <Flex>
          <Avatar
            src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${generateRandomIntBetween(1, 10)}.png`}
            size={24}
            radius="xl"
            mr="xs"
            alt={props.author}
          />
          <Text fz="sm" lineClamp={1} className={classes['post-card__author']}>
            {props.author}
          </Text>
        </Flex>

        <Group gap={8} mr={0}>
          <ActionIcon
            className={classes['post-card__action']}
            aria-label="Delete Button"
            onClick={handleClick}
          >
            <IconTrash style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon
            className={classes['post-card__action']}
            component={Link}
            href={`post/edit/${props.id}/${page}?page=${page}`}
            aria-label="Edit Button"
          >
            <IconEdit style={{ width: rem(16), height: rem(16) }} color={theme.colors.yellow[7]} />
          </ActionIcon>
        </Group>
      </Group>
      <DeletePost id={props.id} />
    </Card>
  );
};
