import { PUBLIC_APP_NAME } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	if (!PUBLIC_APP_NAME || PUBLIC_APP_NAME === 'YOUR APP NAME') {
		throw error(500, { message: 'Add PUBLIC_APP_NAME in the environment variable.' });
	}
	return {
		title: ''
	};
};
