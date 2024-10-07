import React from 'react';

import '@testing-library/jest-dom';

import { render, screen } from '@utils/test';
import { Posts } from './posts';
import { getPosts } from './posts.server';

// Mock the getPosts function
jest.mock('./posts.server', () => ({
  getPosts: jest.fn(),
}));

const mockPosts = [
  { id: 1, title: 'Post 1', content: 'Content 1' },
  { id: 2, title: 'Post 2', content: 'Content 2' },
];

describe('Posts Component', () => {
  it('should render "No posts available" when there are no posts', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce({ data: [], pages: 0 });

    render(<Posts currentPage={1} />);

    const noPostsMessage = await screen.findByText('No posts available');
    expect(noPostsMessage).toBeInTheDocument();
  });

  it('should render posts when there are posts', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce({ data: mockPosts, pages: 1 });

    render(<Posts currentPage={1} />);

    const post1 = await screen.findByText('Post 1');
    const post2 = await screen.findByText('Post 2');

    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });

  it('should render the pagination component', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce({ data: mockPosts, pages: 2 });

    render(<Posts currentPage={1} />);

    const pagination = await screen.findByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  it('should render the create post button', async () => {
    (getPosts as jest.Mock).mockResolvedValueOnce({ data: mockPosts, pages: 1 });

    render(<Posts currentPage={1} />);

    const createPostButton = await screen.findByLabelText('Create Post');
    expect(createPostButton).toBeInTheDocument();
  });
});
