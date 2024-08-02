import { z } from 'zod';
import { fail } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

const registerSchema = z
	.object({
		username: z
			.string({ required_error: 'User name is required' })
			.min(1, { message: 'User name is required' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.min(1, { message: 'Email is required' })
			.email({ message: 'Email must be a valid email address' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim(),
		confirmPassword: z
			.string({ required_error: 'Password is required' })
			.min(6, { message: 'Password must be at least 6 characters' })
			.max(32, { message: 'Password must be less than 32 characters' })
			.trim()
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: 'custom',
				message: 'Password and Confirm Password must match',
				path: ['confirmPassword']
			});
		}
	});

// type FormErrors = z.inferFlattenedErrors<typeof registerSchema>;

export const load: PageServerLoad = async () => {
	return {
		title: 'Register'
	};
};

export const actions: Actions = {
	register: async ({ request }) => {
		const formData = await request.formData();

		const data = Object.fromEntries([...formData]);
		console.log(data);
		try {
			const result = registerSchema.parse(data);
			console.log('SUCCESS');
			console.log(result);
		} catch (err: unknown) {
			const { fieldErrors: errors } = err.flatten();
			const { password, confirmPassword, ...rest } = data;
			console.log('errors', errors);
			return fail(422, {
				data: rest,
				errors
			});
		}
	}
};
