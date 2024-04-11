import { z } from 'zod';

export const createPostValidator = z.object({
	title: z.string({ required_error: 'Title is required' }),
	description: z.string({ required_error: 'Description is required' }),
	content: z.string({ required_error: 'Content is required' }),
});
export const updatePostValidator = createPostValidator.partial();

export type CreatePostDTO = z.infer<typeof createPostValidator>;
export type UpdatePostDTO = z.infer<typeof updatePostValidator>;
