import { END_POINTS } from '@utils/constants';

import 'server-only';

/**
 * creates delete url
 */

export const createDeleteUrl = (postId: string) => `${END_POINTS.POSTS}/${postId}`;

/**
 * deletes post
 */

export const getPosts = async (postId: string) => {
  const res = await fetch(createDeleteUrl(postId), {
    method: 'DELETE',
  });
  if (res.status === 200 && res.ok) {
    return { success: true };
  }

  return { success: false };
};
