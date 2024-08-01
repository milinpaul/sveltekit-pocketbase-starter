<script>
	import { page } from '$app/stores';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import '../app.css';
</script>

<svelte:head>
	<title>{$page.data.title ? `${PUBLIC_APP_NAME} - ${$page.data.title}` : PUBLIC_APP_NAME}</title>
	<meta
		name="description"
		content="A simple bookmarking application to store your favourite bookmarks."
	/>
</svelte:head>

<slot></slot>
