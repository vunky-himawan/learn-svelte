<script lang="ts">
	import { Input, Label, P } from 'flowbite-svelte';
	import { getContext, onMount } from 'svelte';
	import { useFormInitialValue } from '../../../hooks/use-form-initialize';
	import type { Writable } from 'svelte/store';

	export let name = '';
	export let type = 'text';
	export let placeholder = '';
	export let label = '';
	export let error: string | null = null;
	export let bindValue = '';
	export let readonly = false;
	export let required = false;

	const formData = getContext<Writable<Record<string, unknown>>>('formData');
	const formErrors = getContext<Writable<Record<string, string>>>('formErrors');

	let currentFormErrors: Record<string, string> = {};

	// Subscribe to form errors
	$: if (formErrors) {
		formErrors.subscribe((errors: Record<string, string>) => {
			currentFormErrors = errors;
		});
	}

	onMount(() => {
		bindValue = useFormInitialValue<string>(name, bindValue);

		// Update form data when bindValue changes
		if (formData) {
			formData.update((data: Record<string, unknown>) => ({
				...data,
				[name]: bindValue
			}));
		}
	});

	// Update form data when bindValue changes
	$: if (formData && name) {
		formData.update((data: Record<string, unknown>) => ({
			...data,
			[name]: bindValue
		}));
	}
</script>

<div>
	<Label for={name} class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
		{label}
		{#if error || currentFormErrors[name]}
			<P class="my-1 text-xs text-red-500">
				{error ?? currentFormErrors[name]}
			</P>
		{/if}
	</Label>
	<Input
		{name}
		{type}
		{placeholder}
		class="focus:border-border mb-2 focus:ring-0"
		id={name}
		{readonly}
		{required}
		bind:value={bindValue}
	/>
</div>
