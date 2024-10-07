'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { POSTS_TAG } from '../../utils/constants/tags';
import { DeletePostParams as Params } from './delete-post.props';
import { getPosts } from './delete-post.server';

export async function deletePostAction({ id, page }: Params) {
  if (!id) {
    return { error: 'No Post was selected' };
  }

  const res = await getPosts(id);

  if (res.success) {
    revalidateTag(POSTS_TAG);
    redirect(`/?page=${page}`);
  }

  return { error: 'Failed to delete post' };
}
