<script lang="ts">
	import { useAuth } from '$hooks/use-auth';
	import { Button, Heading, P } from 'flowbite-svelte';
	export let title: string = '';
	export let description: string = '';

	const { isAuthenticated } = useAuth();
</script>

<div class="flex h-screen w-screen items-center justify-center bg-gray-50">
	<div class="flex flex-col items-center justify-center space-y-4 text-center">
		<Heading class="text-4xl font-bold text-gray-800">
			{title}
		</Heading>
		<P class="text-gray-600">{description}</P>
		<Button type="button">
			<a href={isAuthenticated ? '/dashboard' : '/'}>Go Back Home</a>
		</Button>
	</div>
</div>
