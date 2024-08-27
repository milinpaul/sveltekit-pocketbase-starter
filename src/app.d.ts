// See https://kit.svelte.dev/docs/types#app

import type { AuthModel } from 'pocketbase';
import type { TypedPocketBase } from './pocketbase-types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AuthModel;
			pb: TypedPocketBase;
		}
		// interface PageData {
		// 	title: string;
		// }
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
