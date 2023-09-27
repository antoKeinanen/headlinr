import type { Headline, NewsFeed } from "$lib/types/News";
import { writable } from "svelte/store";
import { feedsStorage } from "./Feeds";

export const activeFeedStore = writable<number>(0);

export const headlinesStore = writable<Headline[]>([]);
