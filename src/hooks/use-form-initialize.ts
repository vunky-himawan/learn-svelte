import { getContext } from 'svelte';

type FormInitialData = Record<string, unknown>;

export function useFormInitialValue<T>(name: string, defaultValue: T): T {
	const formInitialData = getContext<FormInitialData>('formInitialData') ?? {};

	if (name in formInitialData) {
		return formInitialData[name] as T;
	}
	return defaultValue;
}
