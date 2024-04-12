import { z } from 'zod';

export const loginValidator = z.object({
	email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
	password: z.string({ required_error: 'Password is required' }),
});
export const recoverPasswordValidator = z.object({
	email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
});
export const resetPasswordValidator = z.object({
	newPassword: z.string({ required_error: 'New password is required' }).min(6).max(16),
});
export type LoginDTO = z.infer<typeof loginValidator>;
export type RecoverPasswordDTO = z.infer<typeof recoverPasswordValidator>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordValidator>;
