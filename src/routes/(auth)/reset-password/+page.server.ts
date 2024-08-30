import { z } from 'zod';

import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { ClientResponseError } from 'pocketbase';

const resetPasswordSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email must be a valid email address' })
});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		return redirect(302, '/home');
	}

	return {
		title: 'Reset password'
	};
};

export const actions: Actions = {
	resetpassword: async ({ request, locals }) => {
		const formData = Object.fromEntries([...(await request.formData())]) as {
			email: string;
		};

		try {
			resetPasswordSchema.parse(formData);
			await locals.pb.collection('users').requestPasswordReset(formData.email);
			return { success: true };
		} catch (error) {
			if (error instanceof z.ZodError) {
				const { fieldErrors: errors } = error.flatten();
				return fail(422, {
					data: formData,
					errors
				});
			}

			if (error instanceof ClientResponseError) {
				return fail(422, {
					data: formData,
					message: error?.response?.message
				});
			}
		}
	}
};
