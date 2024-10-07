// import { unstable_cache } from 'next/cache';
import { END_POINTS } from '@utils/constants';

import 'server-only';

import { Post } from '@utils/types';

/**
 * creates delete url
 */

export const createGetPostUrl = (postId: string) => `${END_POINTS.POSTS}/${postId}`;

/**
 * gets post data
 */

export const getPost = async (postId: string) => {
  const res = await fetch(createGetPostUrl(postId));
  const data = (await res.json()) as Post;

  return data;
};
