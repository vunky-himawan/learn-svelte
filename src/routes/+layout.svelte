<script lang="ts">
	import Toast from '$components/molecules/toast/toast.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Toast />

{@render children()}
