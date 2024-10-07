import { PostForm } from '@features/post-form';
import { getPost } from '@routes/post/post.server';
import { EditPageProps as Props } from './edit.props';

export const EditPostMetadata = {
  title: 'Edit a Post',
  description: 'Create a Post for blog',
};

export const EditPostPage: Props = async (props) => {
  const post = await getPost(props.params.id);

  return <PostForm post={post} page={props.params.page} />;
};
