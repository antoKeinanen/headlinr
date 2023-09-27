import { extractFromXml } from "@extractus/feed-extractor";
import { Parser } from "./parser";
import { toHeadlines } from "$lib/types/News";

/**
 * A parser for XML feeds that extends the base Parser class.
 */
export class XmlParser extends Parser {
  /**
   * Parses an XML feed from the given URL and returns an array of headlines.
   * @param url - The URL of the XML feed to parse.
   * @returns An array of headlines extracted from the XML feed.
   */
  async parse(url: string) {
    const data = await this.fetch(url);

    const feed = await extractFromXml(data);
    return toHeadlines(feed);
  }
}
