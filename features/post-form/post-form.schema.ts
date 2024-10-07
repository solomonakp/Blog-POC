import { z } from 'zod';
import { POST_FORM_ERROR_MAPPER } from './post-form.const';

export const postFormSchema = z.object({
  title: z
    .string({ message: POST_FORM_ERROR_MAPPER.title.require })
    .min(2, { message: POST_FORM_ERROR_MAPPER.title.minLength }),
  description: z
    .string({ message: POST_FORM_ERROR_MAPPER.description.require })
    .min(2, { message: POST_FORM_ERROR_MAPPER.description.minLength })
    .max(300, { message: POST_FORM_ERROR_MAPPER.description.maxLength }),
  author: z
    .string({ message: POST_FORM_ERROR_MAPPER.author.require })
    .min(2, { message: POST_FORM_ERROR_MAPPER.author.minLength }),
  tags: z.string({ message: POST_FORM_ERROR_MAPPER.tags.require }).array(),
  content: z
    .string({ message: POST_FORM_ERROR_MAPPER.content.require })
    .min(2, { message: POST_FORM_ERROR_MAPPER.content.minLength }),
});

export type PostFormPayload = z.infer<typeof postFormSchema>;
