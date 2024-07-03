import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();

	console.log('session', session);
	return {
		session
	};
};
