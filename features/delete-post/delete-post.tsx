'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useServerAction } from '@hooks/use-server-action';
import { IS_DELETE_SEARCH_KEY, PAGE_SEARCH_KEY } from '@utils/constants';
import { Box, Button, Center, Flex, Modal, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { deletePostAction } from './delete-post.action';
import { DeletePostProps as Props } from './delete-post.props';

export const DeletePost = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isDelete = searchParams.get(IS_DELETE_SEARCH_KEY);
  const isOpen = Boolean(isDelete);
  const page = searchParams.get(PAGE_SEARCH_KEY) || '1';

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(IS_DELETE_SEARCH_KEY);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const deletePostActionWithId = deletePostAction.bind(null, { id: props.id, page });

  const [deleteData, isDeleting] = useServerAction(deletePostActionWithId);
  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.1,
        blur: 3,
      }}
      opened={isOpen}
      onClose={handleClose}
      centered
      withCloseButton={false}
      trapFocus
      closeOnEscape
      closeOnClickOutside
    >
      <Box>
        <Center>
          <Text mt="xl">Are you sure you want to delete this post?</Text>
        </Center>
        <Box mt="lg">
          <Flex
            component="form"
            align="center"
            justify="center"
            pb="xl"
            action={async () => {
              const res = await deleteData();
              if (res?.error) {
                notifications.show({
                  title: 'Error',
                  message: res.error,
                  color: 'red',
                });
              }
            }}
          >
            <Button
              mr="50px"
              data-autofocus
              color="red"
              type="submit"
              disabled={isDeleting}
              loading={isDeleting}
            >
              Delete
            </Button>
            <Button variant="light" onClick={handleClose} disabled={isDeleting}>
              Cancel
            </Button>
          </Flex>
        </Box>
      </Box>
    </Modal>
  );
};
