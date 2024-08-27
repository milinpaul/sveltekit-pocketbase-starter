import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { ClientResponseError } from 'pocketbase';

const registerSchema = z
	.object({
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

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		return redirect(302, '/home');
	}
	return {
		title: 'Register'
	};
};

export const actions: Actions = {
	register: async ({ request, locals }) => {
		const pb = locals.pb;
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			const result = registerSchema.parse(data);

			const { email, password, confirmPassword: passwordConfirm } = result;
			const userData = {
				email,
				emailVisibility: true,
				password,
				passwordConfirm
			};

			// Create user in pocketbase db.
			await pb.collection('users').create(userData);

			// if (record.id) {
			// 	// Send user verification email from pocketbase.
			// 	await pb.collection('users').requestVerification(email);
			// }
		} catch (err) {
			const { password, confirmPassword, ...rest } = data;

			if (err instanceof z.ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return fail(422, {
					data: rest,
					errors
				});
			}

			if (err instanceof ClientResponseError) {
				return fail(422, {
					data: rest,
					message: err?.response?.data?.email?.message
				});
			}
		}
		throw redirect(303, '/login');
	}
};
