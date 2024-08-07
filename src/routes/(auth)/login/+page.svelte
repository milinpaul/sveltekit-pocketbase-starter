<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';

	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let form;
	let formLoading = false;
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<p class="text-balance text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<form
				class="grid gap-4"
				method="POST"
				action="?/login"
				use:enhance={() => {
					formLoading = true;
					return async ({ update }) => {
						await update();
						formLoading = false;
					};
				}}
			>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						placeholder="m@example.com"
						value={form?.data?.email ?? ''}
						autofocus
					/>
					{#if form?.errors?.email}
						<span class="text-sm text-red-500">{form?.errors?.email[0]}</span>
					{/if}
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
					</div>
					<Input id="password" type="password" name="password" />
					{#if form?.errors?.password}
						<span class="text-sm text-red-500">{form?.errors?.password[0]}</span>
					{/if}
				</div>
				<Button type="submit" class="w-full" disabled={formLoading}>
					{#if formLoading}
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Login
				</Button>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/register" class="underline"> Register </a>
			</div>
		</div>
	</div>
</div>
