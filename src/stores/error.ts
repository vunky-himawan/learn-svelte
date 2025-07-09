import { writable } from 'svelte/store';

type FormErrorValue = string | { title: string; message: string };
type FormErrors = Record<string, FormErrorValue>;

export const formErrors = writable<FormErrors>({});
