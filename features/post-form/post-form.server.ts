import 'server-only';

import { END_POINTS, POST_TAG } from '@utils/constants';
import { generateRandomIntBetween } from '@utils/functions';
import { Post } from '@utils/types';

/**
 * generates random image url
 */

const createPostFormImageUrl = () =>
  `https://picsum.photos/id/${generateRandomIntBetween(1, 100)}/800/720`;

const createPostFormUrl = (isEdit: boolean, post: Partial<Post>) =>
  isEdit ? `${END_POINTS.POSTS}/${post?.id}` : END_POINTS.POSTS;

/**
 * create or updates a post
 */

export const postForm = async (post: Partial<Post>, isEdit: boolean) => {
  let body = '';

  if (isEdit) {
    body = JSON.stringify({
      ...post,
      upDatedAt: new Date().toISOString(),
    });
  } else {
    body = JSON.stringify({
      ...post,
      createdAt: isEdit ? null : new Date().toISOString(),
      imgUrl: createPostFormImageUrl(),
    });
  }

  const res = await fetch(createPostFormUrl(isEdit, post), {
    method: isEdit ? 'PATCH' : 'POST',
    body,
    next: {
      tags: [POST_TAG],
    },
  });

  if ((res.status === 201 && res.ok) || (res.status === 200 && res.ok)) {
    return { success: true };
  }

  return { success: false };
};
