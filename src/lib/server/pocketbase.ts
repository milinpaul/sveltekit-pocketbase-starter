import PocketBase from 'pocketbase'
import { DATABASE_URL } from '$env/static/private'

export const db = new PocketBase(DATABASE_URL)