import type { UsersResponse } from '../../pocketbase-types';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
	return {
		user: locals.user as UsersResponse
	};
}) satisfies LayoutServerLoad;
