<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let form;
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Register</h1>
				<p class="text-balance text-muted-foreground">
					Enter your information to create an account
				</p>
			</div>
			<form method="POST" action="?/register" use:enhance>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label
							for="username"
							class={form?.errors?.username ? 'text-red-500' : 'text-foreground'}>Username</Label
						>
						<Input
							class={form?.errors?.username
								? 'border-red-500 focus-visible:ring-red-300'
								: 'border-input'}
							id="username"
							name="username"
							placeholder="Username"
							value={form?.data?.username ?? ''}
							autofocus
						/>
						{#if form?.errors?.username}
							<span class="text-sm text-red-500">{form?.errors?.username[0]}</span>
						{/if}
					</div>
					<div class="grid gap-2">
						<Label for="email" class={form?.errors?.email ? 'text-red-500' : 'text-foreground'}
							>Email</Label
						>
						<Input
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
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label
								for="password"
								class={form?.errors?.password ? 'text-red-500' : 'text-foreground'}>Password</Label
							>
						</div>
						<Input id="password" name="password" type="password" />
						{#if form?.errors?.password}
							<span class="text-sm text-red-500">{form?.errors?.password[0]}</span>
						{/if}
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label
								for="confirmPassword"
								class={form?.errors?.confirmPassword ? 'text-red-500' : 'text-foreground'}
								>Confirm Password</Label
							>
						</div>
						<Input id="confirmPassword" name="confirmPassword" type="password" />
						{#if form?.errors?.confirmPassword}
							<span class="text-sm text-red-500">{form?.errors?.confirmPassword[0]}</span>
						{/if}
					</div>
					<Button type="submit" class="w-full">Create an account</Button>
					<Button variant="outline" class="w-full">Sign up with Google</Button>
				</div>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline"> Login </a>
			</div>
		</div>
	</div>
</div>
