import { redirect, type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';
import pocketbase from '$lib/server/pocketbase';

export const handle = (async ({ event, resolve }) => {
	const IS_SECURE = dev === true ? false : true;
	event.locals.pb = pocketbase;
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		//refresh the auth if it is valid
		if (!event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
		}
		//spread the model to locals.user to be available in all pages
		event.locals.user = { ...event.locals.pb.authStore.model };
	} catch (_: unknown) {
		event.locals.pb.authStore.clear();
		if (event.url.pathname !== '/login' && event.url.pathname !== '/register') {
			throw redirect(303, '/login');
		}
	}

	const response = await resolve(event);

	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: IS_SECURE })
	);

	return response;
}) satisfies Handle;
