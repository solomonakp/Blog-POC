import { Post } from '@utils/types';
import { PostFormPayload } from './post-form.schema';

export type PostFormActionParams = {
  page: string;
  post: PostFormPayload;
  isEdit: boolean;
};

export type PostFormProps = {
  post?: Post;
  page: string;
};
