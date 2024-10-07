'use client';

import { useMemo } from 'react';
import { Editor } from '@components/rich-editor';
import { Page } from '@containers/page';
import { useServerAction } from '@hooks/use-server-action';
import { zodResolver } from 'mantine-form-zod-resolver';
import { Box, Button, Center, TagsInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { postFormAction } from './post-form.action';
import { PostFormProps as Props } from './post-form.props';
import { postFormSchema } from './post-form.schema';

export const PostForm = (props: Props) => {
  const { post, page } = props;

  const isEdit = useMemo(() => Boolean(typeof post !== 'undefined'), [post]);

  const initialValues = {
    title: post?.title || '',
    description: post?.description || '',
    author: post?.author || '',
    tags: post?.tags || [],
    content: post?.content || '',
  };

  const form = useForm({
    // Note: should be uncontrolled for better performance but having issues with Editor for now
    mode: 'controlled',
    initialValues,

    validate: zodResolver(postFormSchema),
  });

  const isDirty = () => Object.keys(form.values).some((key) => form.isDirty(key));

  const isFormValid = () => Object.keys(form.values).every((key) => form.isValid(key));

  const isDisabled = useMemo(() => !isDirty() || !isFormValid(), [form]);

  const createPostActionWithId = postFormAction.bind(null, {
    page,
    post: isEdit ? { ...post, ...form.getValues() } : form.getValues(),
    isEdit,
  });

  const [createPost, isCreatingPost] = useServerAction(createPostActionWithId);

  return (
    <Page className="create-post-page">
      <Box>
        <Box component="section">
          <Box component="header" mb="xl">
            <Center>
              <Title order={1}>{isEdit ? 'Edit A Post' : 'Create A Post'}</Title>
            </Center>
          </Box>
        </Box>
        <Box component="section">
          <Box
            component="form"
            action={async () => {
              const res = await createPost();

              if (res?.error) {
                if (res?.error) {
                  notifications.show({
                    title: 'Error',
                    message: res.error,
                    color: 'red',
                  });
                }
              }
            }}
          >
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Enter title of Post"
              mb="lg"
              key={form.key('title')}
              {...form.getInputProps('title')}
            />
            <TextInput
              withAsterisk
              label="Description"
              placeholder="Enter a short description of Post"
              mb="lg"
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
            <TextInput
              withAsterisk
              label="Author"
              placeholder="Enter name of Author"
              mb="lg"
              key={form.key('author')}
              {...form.getInputProps('author')}
            />

            <TagsInput
              withAsterisk
              label="Tags"
              placeholder="Enter tags at least a tag for Post"
              mb="lg"
              key={form.key('tags')}
              {...form.getInputProps('tags')}
            />

            <Editor
              label="Post Content"
              key={form.key('content')}
              {...form.getInputProps('content')}
            />
            <Box pt="xl">
              <Button fullWidth type="submit" disabled={isDisabled} loading={isCreatingPost}>
                {isEdit ? 'Edit Post' : 'Create Post'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};
