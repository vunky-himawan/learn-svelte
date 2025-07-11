<script lang="ts">
	import Error from '$components/molecules/error/error.svelte';
	import Toast from '$components/molecules/toast/toast.svelte';
	import '../app.css';
	import { clientConfig } from '../config/env/client';

	let { children } = $props();
</script>

{#if clientConfig.appMode === 'maintenance'}
	<Error
		title="Maintenance Mode"
		description="We’re currently performing some updates. Please check back later."
	/>
{/if}

<Toast />

{@render children()}
