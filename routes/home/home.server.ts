import { END_POINTS } from '@utils/constants';

import 'server-only';

import { Posts } from '@utils/types';

/**
 * gets post data
 */

export const getPosts = async () => {
  const res = await fetch(END_POINTS.POSTS);
  const data = (await res.json()) as Posts;

  return data;
};
