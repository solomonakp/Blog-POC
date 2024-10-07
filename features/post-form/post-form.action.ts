'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { POST_TAG, POSTS_TAG } from '@utils/constants';
import { PostFormActionParams as Params } from './post-form.props';
import { postFormSchema } from './post-form.schema';
import { postForm } from './post-form.server';

export async function postFormAction({ page, post, isEdit }: Params) {
  const validatePostFields = postFormSchema.safeParse(post);

  // Return early if the form data is invalid
  if (!validatePostFields.success) {
    return {
      errors: validatePostFields.error.flatten().fieldErrors,
    };
  }

  const res = await postForm(post, isEdit);

  if (res.success) {
    revalidateTag(POSTS_TAG);
    if (isEdit) {
      revalidateTag(POST_TAG);
    }
    redirect(`/?page=${page}`);
  }

  return { error: 'Failed to Create Post' };
}
