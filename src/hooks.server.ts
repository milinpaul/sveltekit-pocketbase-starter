import type { Handle } from "@sveltejs/kit";
import { db } from "$lib/server/pocketbase";
import { dev } from "$app/environment";

export const handle = (async ({ event, resolve }) => {
    const IS_SECURE = dev === true ? false : true
    event.locals.pb = db
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.model;
	}

	const response = await resolve(event);

	// TODO: secure before deployment
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: IS_SECURE }));

	return response;
}) satisfies Handle;