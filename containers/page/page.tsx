import { Container } from '@mantine/core';
import { PageProps as Props } from './page.props';
import classes from './page.module.css';

export const Page = ({ children, isError }: Props) => {
  const className = isError ? classes['page--error'] : classes.page;

  return <Container className={className}>{children}</Container>;
};
