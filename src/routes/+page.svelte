<script lang="ts">
  import LoadingCard from "$lib/components/LoadingCard.svelte";
  import * as Card from "$lib/components/ui/card";
  import { feedsStorage } from "$lib/data/Feeds";
  import { activeFeedStore } from "$lib/data/SidePanelData";
  import { XmlParser } from "$lib/parsers/XmlParser";
  import { toHeadlines, type NewsFeed } from "$lib/types/News";
  import { extractFromXml } from "@extractus/feed-extractor";

  $: activeFeed = $feedsStorage[$activeFeedStore];
  
  const fetchFeed = async () => {
    if (!activeFeed) throw new Error("No feed selected");

    const parser = new XmlParser();
    

    return await parser.parse(activeFeed.url);
  };
</script>

{#key $activeFeedStore}
  <section class="grid-cols-2 grid gap-4">
    {#await fetchFeed()}
      <div class="grid-cols-2 col-span-2 row-span-2 grid max-w-xl gap-4">
        {#each [0, 1, 2, 3, 4, 5, 6, 7] as _}
          <LoadingCard />
        {/each}
      </div>
    {:then headlines}
      {#each headlines as headline}
        <a href={headline.link} target="_blank" rel="noopener">
          <Card.Root class="h-[175px] overflow-y-auto hover:cursor-pointer" tabindex={0}>
            <Card.Header>
              <Card.Title>
                <p>{headline.title}</p>
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <p class="text-sm">{headline.description}</p>
            </Card.Content>
          </Card.Root>
        </a>
      {/each}
    {:catch error}
      {console.error(error) + ""}
      <p class="text-white">Error: {error}</p>
    {/await}
  </section>
{/key}
