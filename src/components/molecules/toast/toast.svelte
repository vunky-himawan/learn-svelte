<script lang="ts">
	import { P, Toast, type ToastProps } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { parseDuration } from '$utils/time';
	import {
		CheckCircleOutline,
		CloseCircleOutline,
		ExclamationCircleOutline,
		InfoCircleOutline
	} from 'flowbite-svelte-icons';
	import { toast } from '$stores/toast';

	let localToast = { type: 'default', title: '', message: '', duration: '3s', toastStatus: false };

	const unsubscribe = toast.subscribe((val) => {
		localToast = val;
		if (val.toastStatus) startTimer();
	});

	let timer: ReturnType<typeof setTimeout>;

	function startTimer() {
		clearTimeout(timer);
		const durationMs = parseDuration(localToast.duration || '3s');
		if (durationMs > 0) {
			timer = setTimeout(() => {
				toast.update((t) => ({ ...t, toastStatus: false }));
			}, durationMs);
		}
	}

	$: if (localToast.toastStatus) startTimer();

	onDestroy(() => {
		unsubscribe();
		clearTimeout(timer);
	});

	const colorMap: Record<keyof ToastProps['color'], string> = {
		info: 'blue',
		success: 'green',
		warning: 'yellow',
		danger: 'red',
		default: 'primary'
	};

	$: color = colorMap[localToast.type as keyof typeof colorMap] ?? 'primary';
</script>

<div class="fixed top-4 left-1/2 z-50 -translate-x-1/2">
	<Toast transition={slide} toastStatus={localToast.toastStatus} {color}>
		{#snippet icon()}
			{#if localToast.type === 'info'}
				<InfoCircleOutline class="h-6 w-6" />
			{:else if localToast.type === 'success'}
				<CheckCircleOutline class=" h-6 w-6" />
			{:else if localToast.type === 'warning'}
				<ExclamationCircleOutline class="h-6 w-6 " />
			{:else if localToast.type === 'danger'}
				<CloseCircleOutline class="h-6 w-6" />
			{/if}
		{/snippet}
		<P>
			{localToast.message}
		</P>
	</Toast>
</div>
