import { browser } from "$app/environment";
import type { Writable } from "svelte/store";

/**
 * Retrieves a value from local storage by key, or returns a fallback value if the key is not found.
 * @param key - The key to retrieve the value for.
 * @param fallback - The fallback value to return if the key is not found.
 * @returns The value stored in local storage for the given key, or the fallback value if the key is not found.
 */
export function fromLocalStorage(key: string, fallback: any) {
  if (!browser) return fallback;

  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}

/**
 * Automatically save the value of a Svelte store to local storage.
 * @param store - The Svelte store to save.
 * @param key - The key to use when saving the store's value to local storage.
 * @throws Will throw an error if called on the server.
 */
export function toLocalStorage(store: Writable<any>, key: string) {
  if (!browser) throw new Error("Cannot write to local storage on the server");

  store.subscribe((value) => {
    let storedVale = JSON.stringify(value);
    window.localStorage.setItem(key, storedVale);
  });
}
