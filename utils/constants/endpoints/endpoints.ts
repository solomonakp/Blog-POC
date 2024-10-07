const BASE_URL = process.env.API_BASE_URL;

const POSTS = '/posts';

export const END_POINTS = {
  POSTS: `${BASE_URL}${POSTS}`,
} as const;
