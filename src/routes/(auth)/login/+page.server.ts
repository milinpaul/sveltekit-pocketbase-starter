import { z } from 'zod';
import { fail } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';

const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email must be a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim()
});

export const load: PageServerLoad = async () => {
	return {
		title: 'Login'
	};
};

export const actions = {
	login: async ({ request }) => {
		const formData = Object.fromEntries([...(await request.formData())]);

		try {
			const result = loginSchema.parse(formData);
			console.log('result', result);
		} catch (error) {
			console.log('error', error);
			const { password, ...rest } = formData;

			if (error instanceof z.ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return fail(422, {
					data: rest,
					errors
				});
			}
		}
	}
} satisfies Actions;
