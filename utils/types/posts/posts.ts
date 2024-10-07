export type Post = {
  id: string;
  title: string;
  author: string;
  tags: string[];
  content: string;
  description: string;
  createdAt: string;
  imgUrl: string;
  updatedAt: string | null;
};

export type Posts = {
  data: Post[];
  first: 1;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
};
