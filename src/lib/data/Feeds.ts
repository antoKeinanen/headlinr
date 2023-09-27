import type { NewsFeed } from "$lib/types/News";
import { writable } from "svelte/store";
import { fromLocalStorage, toLocalStorage } from "./LocalStorage";


export const feedsStorage = writable<NewsFeed[]>(fromLocalStorage("feeds", []));
toLocalStorage(feedsStorage, "feeds");

