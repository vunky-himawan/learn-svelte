<script lang="ts">
	import { page } from '$app/state';
	import Error from '$components/molecules/error/error.svelte';

	const errorMap: Record<number, { title: string; description: string }> = {
		404: {
			title: 'Whoops! This page wandered off...',
			description: 'Sorry, we couldn’t find what you were looking for. Maybe try going back home.'
		},
		401: {
			title: 'Hey there! You need to sign in first.',
			description: 'It looks like you’re trying to access something that requires authentication.'
		},
		403: {
			title: 'Hold up! You’re not supposed to be here.',
			description: 'It looks like you don’t have permission to access this page.'
		},
		500: {
			title: 'Uh-oh! Something went wrong on our side.',
			description: 'We’re already on it. Try refreshing or come back later.'
		}
	};

	let errorData = {
		title: 'Oops! Looks like you took a wrong turn somewhere...',
		description: 'The page you’re looking for doesn’t exist or has moved.'
	};

	if (page.status) {
		if (page.status >= 500) {
			errorData = errorMap[500];
		} else if (errorMap[page.status]) {
			errorData = errorMap[page.status];
		}
	}
</script>

<div class="flex h-screen flex-col items-center justify-center p-8 text-center">
	<Error {...errorData} />
</div>
