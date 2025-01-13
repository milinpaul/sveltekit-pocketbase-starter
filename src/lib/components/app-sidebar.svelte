<script lang="ts">
	import House from 'lucide-svelte/icons/house';
	import Search from 'lucide-svelte/icons/search';

	import NavFavorites from '$lib/components/nav-favorites.svelte';
	import NavMain from '$lib/components/nav-main.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import type { ComponentProps } from 'svelte';
	import UserMenu from './user-menu.svelte';
	import type { UsersResponse } from '../../pocketbase-types';
	import Logo from './logo.svelte';

	const data = {
		navMain: [
			{
				title: 'Home',
				url: '/home',
				icon: House
			},
			{
				title: 'Search',
				url: '/search',
				icon: Search
			}
		],
		favorites: [
			{
				name: 'Project Management & Task Tracking',
				url: '#',
				emoji: '📊'
			},
			{
				name: 'Family Recipe Collection & Meal Planning',
				url: '#',
				emoji: '🍳'
			},
			{
				name: 'Fitness Tracker & Workout Routines',
				url: '#',
				emoji: '💪'
			},
			{
				name: 'Book Notes & Reading List',
				url: '#',
				emoji: '📚'
			},
			{
				name: 'Project Management & Task Tracking0',
				url: '#',
				emoji: '📊'
			},
			{
				name: 'Family Recipe Collection & Meal Planning9',
				url: '#',
				emoji: '🍳'
			},
			{
				name: 'Fitness Tracker & Workout Routines0',
				url: '#',
				emoji: '💪'
			},
			{
				name: 'Book Notes & Reading List0',
				url: '#',
				emoji: '📚'
			},
			{
				name: 'Sustainable Gardening Tips & Plant Care',
				url: '#',
				emoji: '🌱'
			},
			{
				name: 'Language Learning Progress & Resources',
				url: '#',
				emoji: '🗣️'
			},
			{
				name: 'Home Renovation Ideas & Budget Tracker',
				url: '#',
				emoji: '🏠'
			},
			{
				name: 'Personal Finance & Investment Portfolio',
				url: '#',
				emoji: '💰'
			},
			{
				name: 'Movie & TV Show Watchlist with Reviews',
				url: '#',
				emoji: '🎬'
			},
			{
				name: 'Daily Habit Tracker & Goal Setting',
				url: '#',
				emoji: '✅'
			},
			{
				name: 'Personal Life Management',
				emoji: '🏠',
				pages: [
					{
						name: 'Daily Journal & Reflection',
						url: '#',
						emoji: '📔'
					},
					{
						name: 'Health & Wellness Tracker',
						url: '#',
						emoji: '🍏'
					},
					{
						name: 'Personal Growth & Learning Goals',
						url: '#',
						emoji: '🌟'
					}
				]
			},
			{
				name: 'Professional Development',
				emoji: '💼',
				pages: [
					{
						name: 'Career Objectives & Milestones',
						url: '#',
						emoji: '🎯'
					},
					{
						name: 'Skill Acquisition & Training Log',
						url: '#',
						emoji: '🧠'
					},
					{
						name: 'Networking Contacts & Events',
						url: '#',
						emoji: '🤝'
					}
				]
			},
			{
				name: 'Creative Projects',
				emoji: '🎨',
				pages: [
					{
						name: 'Writing Ideas & Story Outlines',
						url: '#',
						emoji: '✍️'
					},
					{
						name: 'Art & Design Portfolio',
						url: '#',
						emoji: '🖼️'
					},
					{
						name: 'Music Composition & Practice Log',
						url: '#',
						emoji: '🎵'
					}
				]
			},
			{
				name: 'Home Management',
				emoji: '🏡',
				pages: [
					{
						name: 'Household Budget & Expense Tracking',
						url: '#',
						emoji: '💰'
					},
					{
						name: 'Home Maintenance Schedule & Tasks',
						url: '#',
						emoji: '🔧'
					},
					{
						name: 'Family Calendar & Event Planning',
						url: '#',
						emoji: '📅'
					}
				]
			},
			{
				name: 'Travel & Adventure',
				emoji: '🧳',
				pages: [
					{
						name: 'Trip Planning & Itineraries',
						url: '#',
						emoji: '🗺️'
					},
					{
						name: 'Travel Bucket List & Inspiration',
						url: '#',
						emoji: '🌎'
					},
					{
						name: 'Travel Journal & Photo Gallery',
						url: '#',
						emoji: '📸'
					}
				]
			}
		]
	};

	interface AppSidebar extends ComponentProps<typeof Sidebar.Root> {
		user: UsersResponse;
	}

	let { user, ref = $bindable(null), ...restProps }: AppSidebar = $props();
</script>

<Sidebar.Root bind:ref class="border-r-0" {...restProps}>
	<Sidebar.Header>
		<Logo />
		<NavMain items={data.navMain} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavFavorites favorites={data.favorites} />
		<!-- <NavWorkspaces workspaces={data.workspaces} /> -->
	</Sidebar.Content>
	<Sidebar.Footer>
		<UserMenu {user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
