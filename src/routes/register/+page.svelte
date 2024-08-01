<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
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
			<form method="POST" action="?/login">
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="username">Username</Label>
						<Input id="username" placeholder="Username" required autofocus />
					</div>
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
						</div>
						<Input id="password" type="password" required />
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
