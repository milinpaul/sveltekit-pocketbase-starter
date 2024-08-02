import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { ClientResponseError } from 'pocketbase';

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
	register: async ({ request, locals }) => {
		const pb = locals.pb;
		const formData = await request.formData();

		const data = Object.fromEntries([...formData]);
		console.log(data);
		try {
			const result = registerSchema.parse(data);
			console.log(result);

			const { username, email, password, confirmPassword: passwordConfirm } = result;
			const userData = {
				username,
				email,
				emailVisibility: true,
				password,
				passwordConfirm
			};

			//TODO: validate for user already exists.

			// Create user in pocketbase db.
			const record = await pb.collection('users').create(userData);
			console.log('record', record);

			if (record.id) {
				// Send user verification email from pocketbase.
				await pb.collection('users').requestVerification(email);
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.log('error', err);
			console.log('error', err?.response);
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
					message: err?.response?.message
				});
			}
		}
		throw redirect(303, '/login');
	}
};
