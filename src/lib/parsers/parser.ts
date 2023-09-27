/**
 * Abstract class representing a parser for fetching and parsing data from a URL.
 */
export abstract class Parser {
  /**
   * Fetches the data from the given URL.
   * @param url - The URL to fetch the data from.
   * @returns The fetched data as a string.
   */
  protected async fetch(url: string) {
    const rawData = await fetch(url);
    const data = await rawData.text();
    
    return data;
  }

  abstract parse(url: string): Promise<any>;
}
