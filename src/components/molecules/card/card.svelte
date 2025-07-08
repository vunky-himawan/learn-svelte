<script lang="ts">
	import { Card, Heading, P } from 'flowbite-svelte';
	export let title: string = '';
	export let description: string = '';
	export let className: string = '';
</script>

<Card class={`bg-background border-border p-4 sm:p-6 md:p-8 ${className}`}>
	{#if title}
		<Heading tag="h3" class="mb-4">
			{title}
		</Heading>
	{/if}

	{#if description}
		<P>
			{description}
		</P>
	{/if}

	<div class="mt-4">
		<slot />
	</div>
</Card>
