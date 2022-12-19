import { writable } from 'svelte/store';

export const productList = writable([]);
export const viewMode = writable('table');
export const searchActive = writable('');
export const loadingData = writable(true);