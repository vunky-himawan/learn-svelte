import { writable } from 'svelte/store';

export const formData = writable<Record<string, unknown>>({});
