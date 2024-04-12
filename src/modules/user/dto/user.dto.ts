import { UserRole } from '@/common/enums/user.enum';
import { z } from 'zod';

export const registerValidator = z.object({
	display_name: z.string({ required_error: 'Display name is required' }),
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
	password: z.string({ required_error: 'Password is required' }),
	address: z.string({ required_error: 'Address is required' }),
});

export type RegisterDTO = z.infer<typeof registerValidator>;
