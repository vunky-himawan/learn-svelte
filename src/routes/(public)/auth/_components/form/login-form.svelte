<script lang="ts">
	import Card from '$components/molecules/card/card.svelte';
	import InputField from '$components/molecules/form-field/input-field.svelte';
	import PasswordField from '$components/molecules/form-field/password-field.svelte';
	import Form from '$components/molecules/form/form.svelte';
	import { Button } from 'flowbite-svelte';
	import { loginSchema } from '../../login/_schema/login.schema';

	let formData = {
		email: '',
		password: ''
	};

	function handleSubmit(data: unknown) {
		console.log('Form submitted:', data);
	}
</script>

<Card title="Login" description="Please enter your credentials to login." className="bg-primary">
	<Form vertical onSubmit={handleSubmit} schema={loginSchema} initialData={formData}>
		<InputField name="email" required type="email" placeholder="Enter your email" label="Email" />
		<PasswordField name="password" required placeholder="Enter your password" label="Password" />
		<Button type="submit" class="mt-4 w-full">Sign In</Button>
	</Form>
</Card>
