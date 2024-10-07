export const POST_FORM_ERROR_MAPPER = {
  title: {
    minLength: 'Title should be at least 2 characters long',
    require: 'Title is required',
  },
  description: {
    minLength: 'Description should be at least 2 characters long',
    maxLength: 'Description should be at most 300 characters long',
    require: 'Description is required',
  },
  author: {
    minLength: 'Author should be at least 2 characters long',
    require: 'Author is required',
  },
  tags: {
    require: 'Tags is required',
    nonEmpty: 'Tags should not be empty',
  },
  content: {
    minLength: 'Content should be at least 2 characters long',
    require: 'Content is required',
  },
};
