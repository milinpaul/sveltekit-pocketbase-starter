import PocketBase from 'pocketbase'
import { DATABASE_URL } from '$env/static/private'

export default new PocketBase(DATABASE_URL)