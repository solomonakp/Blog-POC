import { PostForm } from '@features/post-form';
import { CreatePageProps as Props } from './create.props';

export const CreatePostMetadata = {
  title: 'Create a Post',
  description: 'Create a Post for blog',
};

export const CreatePostPage: Props = async (props) => <PostForm page={props.params.page} />;
