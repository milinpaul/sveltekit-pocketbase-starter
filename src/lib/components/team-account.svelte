<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import Command from "lucide-svelte/icons/command";
	import Logout from "lucide-svelte/icons/log-out";

	let {
		username,
	}: {
		username: string
	} = $props();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props} class="w-full px-1.5 flex items-center space-x-1">
						<div
							class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md"
						>
							<Command class="size-3" />
						</div>
						<span class="truncate font-semibold">{username}</span>
						<ChevronDown class="opacity-50" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-60 rounded-lg"
				align="start"
				side="bottom"
				sideOffset={4}
			>
				<!-- <DropdownMenu.Label class="text-muted-foreground text-xs">Teams</DropdownMenu.Label> -->
				<DropdownMenu.Item  class="gap-2 p-2">
					<div class="flex size-6 items-center justify-center rounded-sm border">
						<Logout class="size-4 shrink-0" />
					</div>
					Signout
					<!-- <DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut> -->
				</DropdownMenu.Item>
				<!-- <DropdownMenu.Separator /> -->
				<!-- <DropdownMenu.Item class="gap-2 p-2">
					<div
						class="bg-background flex size-6 items-center justify-center rounded-md border"
					>
						<Plus class="size-4" />
					</div>
					<div class="text-muted-foreground font-medium">Add team</div>
				</DropdownMenu.Item> -->
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
