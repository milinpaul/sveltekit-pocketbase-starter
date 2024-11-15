<script>
	import SidebarPage from '$lib/components/sidebar-page.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div>
	<h1>Dashboard</h1>
	<h2>{data.user.username}</h2>
	<!-- <form action="/logout" method="POST">
		<Button variant="link" type="submit">SignOut</Button>
	</form> -->
	<SidebarPage />
</div>
