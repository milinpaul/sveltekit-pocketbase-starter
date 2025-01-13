<script>
	import { page } from '$app/state';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import '../../app.css';

	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar';

	let { children, data } = $props();
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
	<meta
		name="description"
		content="A simple bookmarking application to store your favourite bookmarks."
	/>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar user={data?.user} />
	<Sidebar.Inset>
		{#if !['/home', '/search', '/settings'].includes(page.url.pathname)}
		<header class="flex h-14 shrink-0 items-center gap-2">
			<div class="flex flex-1 items-center gap-2 px-3">
				<Sidebar.Trigger />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Page class="line-clamp-1">
								Project Management & Task Tracking
							</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
			<div class="ml-auto px-3">
				<NavActions />
			</div>
		</header>
		 
		{/if}
		
		<div class="flex flex-1 flex-col gap-4 px-4 py-4">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
