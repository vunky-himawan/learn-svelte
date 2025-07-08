<script lang="ts">
	import { validateZodSchema } from '$utils/zod-validation';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { ZodSchema } from 'zod';

	export let onSubmit: ((data: unknown) => void) | undefined = undefined;
	export let vertical = false;
	export let initialData: Record<string, unknown> = {};
	export let schema: ZodSchema | null = null;

	const formData = writable(initialData);
	const formErrors = writable<Record<string, string>>({});

	setContext('formData', formData);
	setContext('formErrors', formErrors);

	async function handleSubmit(event: Event) {
		event.preventDefault();

		let latestData: Record<string, unknown> = {};

		// Get current form data
		const unsubscribe = formData.subscribe((d) => {
			latestData = d;
		});
		unsubscribe();

		if (!schema) {
			onSubmit?.(latestData);
			return;
		}

		try {
			const result = await validateZodSchema(schema, latestData);

			if (result.success) {
				formErrors.set({});
				onSubmit?.(result.data);
			} else {
				formErrors.set(result.errors);
			}
		} catch (error) {
			console.error('Form validation error:', error);
			formErrors.set({ general: 'Validation failed' });
		}
	}
</script>

<form on:submit={handleSubmit} class="flex {vertical ? 'flex-col' : 'flex-row'} gap-5">
	<slot />
</form>
