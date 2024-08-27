import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST = (({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = undefined;
	redirect(303, '/login');
}) satisfies RequestHandler;
