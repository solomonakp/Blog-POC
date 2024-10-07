import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import '@testing-library/jest-dom';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { render } from '@utils/test';
import { PostCard } from './post-card';
import { PostCardProps } from './post-card.props';

expect.extend(toHaveNoViolations);
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUsePathname = usePathname as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

describe('PostCard', () => {
  const props: PostCardProps = {
    id: '1',
    title: 'Test Post',
    description: 'This is a test post description',
    author: 'John Doe',
    content: 'This is a test post content',
    createdAt: '2021-09-01T00:00:00.000Z',
    imgUrl: 'https://via.placeholder.com/150',
    updatedAt: '2021-09-01T00:00:00.000Z',
    tags: ['test', 'post'],
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      replace: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/posts');
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  it('renders post card with correct title, description, and author', () => {
    render(<PostCard {...props} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post description')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('navigates to post detail page when image or title is clicked', () => {
    render(<PostCard {...props} />);

    const linkElements = [
      screen.getByTestId('post-card__image-action'),
      screen.getByTestId('post-card__title-action'),
    ];
    linkElements.forEach((link) => {
      expect(link).toHaveAttribute('href', `/post/${props.id}?page=1`);
    });
  });

  it('toggles delete state when delete button is clicked', () => {
    const replaceMock = jest.fn();
    mockUseRouter.mockReturnValue({
      replace: replaceMock,
    });

    render(<PostCard {...props} />);

    const deleteButton = screen.getByLabelText('Delete Button');
    fireEvent.click(deleteButton);

    expect(replaceMock).toHaveBeenCalledWith('/posts?is_delete=1');
  });

  it('navigates to edit page when edit button is clicked', () => {
    const replaceMock = jest.fn();
    mockUseRouter.mockReturnValue({
      replace: replaceMock,
    });

    render(<PostCard {...props} />);

    const editButton = screen.getByLabelText('Edit Button');

    expect(editButton).toHaveAttribute('href', `post/edit/${props.id}/1?page=1`);
  });
  it('should not have any accessibility violations', async () => {
    const replaceMock = jest.fn();
    mockUseRouter.mockReturnValue({
      replace: replaceMock,
    });

    const { container } = render(<PostCard {...props} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
