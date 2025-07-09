<script lang="ts">
	import Card from '$components/molecules/card/card.svelte';
	import InputField from '$components/molecules/form-field/input-field.svelte';
	import PasswordField from '$components/molecules/form-field/password-field.svelte';
	import Form from '$components/molecules/form/form.svelte';
	import { Button } from 'flowbite-svelte';
	import { loginSchema } from '../../login/_schema/login.schema';
	import { login } from '$lib/api/auth';
	import { formErrors } from '$stores/error';
	import Alert from '$components/molecules/alert/alert.svelte';
	import { showToast } from '$utils/toast';
	import { goto } from '$app/navigation';

	const handleSubmit = async (data: Record<string, unknown>) => {
		const success = await login(data.email as string, data.password as string);

		if (success.success) {
			showToast({
				type: 'info',
				message: 'Login successful! Redirecting...'
			});

			goto('/dashboard', { replaceState: true });
		}
	};
</script>

<Card title="Login" description="Please enter your credentials to login." className="bg-primary">
	{#if $formErrors.login}
		{#if typeof $formErrors.login === 'string'}
			<Alert type="danger" className="mb-4" message={$formErrors.login} />
		{:else}
			<Alert
				type="danger"
				className="mb-4"
				message={$formErrors.login.message}
				title={$formErrors.login.title}
			/>
		{/if}
	{/if}
	<Form vertical onSubmit={handleSubmit} schema={loginSchema}>
		<InputField name="email" required type="email" placeholder="Enter your email" label="Email" />
		<PasswordField name="password" required placeholder="Enter your password" label="Password" />
		<Button type="submit" class="mt-4 w-full">Sign In</Button>
	</Form>
</Card>
