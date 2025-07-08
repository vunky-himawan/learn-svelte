<script lang="ts">
	import { Input, Label, P } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import { getContext, onMount } from 'svelte';
	import { useFormInitialValue } from '../../../hooks/use-form-initialize';
	import type { Writable } from 'svelte/store';

	export let name = '';
	export let placeholder = '';
	export let label = '';
	export let error: string | null = null;
	export let bindValue = '';
	export let required = false;

	export let type: 'text' | 'password' | 'number' = 'password';

	const formData = getContext<Writable<Record<string, unknown>>>('formData');
	const formErrors = getContext<Writable<Record<string, string>>>('formErrors');

	let showPassword = false;
	let inputType: 'text' | 'password' | 'number' = type;

	onMount(() => {
		bindValue = useFormInitialValue<string>(name, bindValue);

		// Initial update
		formData?.update((data) => ({ ...data, [name]: bindValue }));
	});

	// Reactive update to formData
	$: formData?.update((data) => ({ ...data, [name]: bindValue }));

	// Adjust inputType
	$: inputType = type === 'password' && showPassword ? 'text' : type;

	// Reactive error
	$: currentError = error ?? $formErrors?.[name] ?? '';
</script>

<div>
	<Label for={name} class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
		{#if required}
			<span class="text-danger-500">*</span>
		{/if}
		{label}
		{#if currentError}
			<P class="text-danger-500 my-1 text-xs">{currentError}</P>
		{/if}
	</Label>

	<div class="relative">
		<Input
			id={name}
			{name}
			{placeholder}
			class="focus:border-border mb-2 focus:ring-0"
			type={inputType}
			bind:value={bindValue}
			{required}
		/>

		<button
			type="button"
			class="text-text-secondary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer bg-transparent hover:bg-transparent focus:ring-0"
			on:click={() => (showPassword = !showPassword)}
		>
			{#if showPassword}
				<EyeSlashOutline />
			{:else}
				<EyeOutline />
			{/if}
		</button>
	</div>
</div>
