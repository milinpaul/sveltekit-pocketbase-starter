import type { PageServerLoad } from '../$types';
import type { UsersResponse } from '../../pocketbase-types';

export const load = (({ locals }) => {
	console.log('user', locals.user);
	return {
		title: 'Home',
		user: locals.user as UsersResponse
	};
}) satisfies PageServerLoad;
