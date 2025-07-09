<script lang="ts">
	import { Alert, Heading, P } from 'flowbite-svelte';
	import type { TVariant } from '../../../common/types/component';
	export let title: string = '';
	export let message: string = '';
	export let className: string = '';
	export let type: TVariant = 'default';

	const bgClassMap = {
		info: 'bg-info-100 text-info-800',
		success: 'bg-success-100 text-success-800',
		warning: 'bg-warning-100 text-warning-800',
		danger: 'bg-danger-100 text-danger-800',
		default: 'bg-default-100 text-default-800'
	};

	$: alertClass = bgClassMap[type] ?? bgClassMap.default;
</script>

<Alert class="{alertClass} {className}">
	{#if title}
		<Heading tag="h6" class="mb-2 font-bold">{title}</Heading>
	{/if}
	<P>{message}</P>
</Alert>
