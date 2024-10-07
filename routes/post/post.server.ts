import { END_POINTS, POST_TAG } from '@utils/constants';

import 'server-only';

import { Post } from '@utils/types';

const revalidate = 60;

/**
 * Creates  get post endpoint url
 *
 * @returns {string}
 */

const createGetPostUrl = (id: string) => `${END_POINTS.POSTS}/${id}`;

export const getPost = async (id: string) => {
  const res = await fetch(createGetPostUrl(id), {
    method: 'GET',
    next: {
      tags: [POST_TAG],
      revalidate,
    },
  });

  const data = (await res.json()) as Post;

  return data;
};
