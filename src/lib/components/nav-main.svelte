<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let {
		items
	}: {
		items: {
			title: string;
			url: string;
			icon: any;
		}[];
	} = $props();
</script>

<Sidebar.Menu>
	{#each items as item (item.title)}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton isActive={page.url.pathname === item.url}>
				{#snippet child({ props })}
					<a href={item.url} {...props}>
						<item.icon />
						<span>{item.title}</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	{/each}
</Sidebar.Menu>
