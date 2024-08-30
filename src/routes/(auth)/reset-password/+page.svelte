<script lang="ts">
	import { LoaderCircle, TriangleAlert, MailCheck } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let formLoading = false;
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Reset your password</h1>
			</div>
			{#if form?.message}
				<Alert.Root variant="destructive">
					<TriangleAlert class="h-4 w-4" />
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>
						{form?.message}
					</Alert.Description>
				</Alert.Root>
			{/if}
			{#if form?.success}
				<Alert.Root class="border-brand text-brand text-sm">
					<Alert.Title class="flex items-center">
						<MailCheck class="stroke-brand mr-2 h-6 w-6" />
						<p>Email sent successfully. Check you inbox.</p>
					</Alert.Title>
				</Alert.Root>
			{/if}
			<form
				novalidate
				method="POST"
				action="?/resetpassword"
				use:enhance={() => {
					formLoading = true;
					return async ({ update }) => {
						await update();
						formLoading = false;
					};
				}}
			>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email" class={form?.errors?.email ? 'text-red-500' : 'text-foreground'}
							>Enter your email</Label
						>
						<Input
							autofocus
							id="email"
							type="email"
							name="email"
							placeholder="m@example.com"
							value={form?.data?.email}
						/>
						{#if form?.errors?.email}
							<span class="text-sm text-red-500">{form?.errors?.email[0]}</span>
						{/if}
					</div>
					<Button type="submit" class="w-full" disabled={formLoading}>
						{#if formLoading}
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Reset password
					</Button>
				</div>
			</form>
			<div class="mt-1 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline"> Login </a>
			</div>
		</div>
	</div>
</div>
