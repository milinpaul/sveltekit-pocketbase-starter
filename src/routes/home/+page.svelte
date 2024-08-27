<script>
	import Button from '$lib/components/ui/button/button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div>
	<h1>Dashboard</h1>
	<h2>{data.user.username}</h2>
	<form action="/logout" method="POST">
		<Button variant="link" type="submit">SignOut</Button>
	</form>
</div>
