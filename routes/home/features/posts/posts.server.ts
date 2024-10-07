import { END_POINTS, POSTS_TAG } from '@utils/constants';

import 'server-only';

import { Posts } from '@utils/types';
import { PER_PAGE_COUNT } from './posts.const';
import { PostsProps as Params } from './posts.props';

const revalidate = 60;

/**
 * Creates posts endpoint
 *
 * @returns {string}
 */

const createPostsEndPoint = (currentPage: Params['currentPage']) =>
  `${END_POINTS.POSTS}?_page=${currentPage}&_per_page=${PER_PAGE_COUNT}`;

export const getPosts = async (currentPage: Params['currentPage']) => {
  const res = await fetch(createPostsEndPoint(currentPage), {
    next: {
      tags: [POSTS_TAG],
      revalidate,
    },
  });
  const data = (await res.json()) as Posts;

  return data;
};
