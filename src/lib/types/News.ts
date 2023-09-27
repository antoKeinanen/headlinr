import type { FeedData } from "@extractus/feed-extractor";

export type NewsFeed = {
  title: string;
  url: string;
  site: string;
};

export type Headline = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export function toHeadlines(data: FeedData): Headline[] {
  if (!data.entries) throw new Error("No entries in feed data.");

  return data.entries.map((entry) => ({
    title: entry.title ?? "No title",
    link: entry.link ?? "No link",
    description: entry.description ?? "No description",
    pubDate: entry.published ? new Date(entry.published).toLocaleString("en-CA") : "No date",
  }));
}
