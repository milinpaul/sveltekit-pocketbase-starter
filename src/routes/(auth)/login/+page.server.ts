import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { ClientResponseError } from 'pocketbase';

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

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		return redirect(302, '/home');
	}

	return {
		title: 'Login'
	};
};

export const actions = {
	login: async ({ request, locals }) => {
		const formData = Object.fromEntries([...(await request.formData())]) as {
			email: string;
			password: string;
		};

		try {
			loginSchema.parse(formData);
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
		} catch (error) {
			const { password, ...rest } = formData;

			if (error instanceof z.ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return fail(422, {
					data: rest,
					errors
				});
			}

			if (error instanceof ClientResponseError) {
				return fail(422, {
					data: rest,
					message: error?.response?.message
				});
			}
		}
		throw redirect(303, '/home');
	}
} satisfies Actions;
