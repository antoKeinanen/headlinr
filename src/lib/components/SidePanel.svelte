<script lang="ts">
  import { activeFeedStore } from "$lib/data/SidePanelData";
  import * as Sheet from "$lib/components/ui/sheet";
  import type { NewsFeed } from "$lib/types/News";
  import { cn } from "$lib/utils";
  import { MoreVertical, Plus, Trash2 } from "lucide-svelte";
  import { Button } from "./ui/button";
  import * as Card from "./ui/card";
  import { Input } from "./ui/input";
  import { Label } from "./ui/label";
  import Separator from "./ui/separator/separator.svelte";
  import { extractFromXml } from "@extractus/feed-extractor";
  import { feedsStorage } from "$lib/data/Feeds";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  export const kind = "feed";

  let feedUrl = "";
  let feedName = "";
  let feedSite = "";

  let timeoutId: NodeJS.Timeout;
  const handleInputChange = (event: any) => {
    feedUrl = event.target.value;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      tryFetchFeed(feedUrl);
    }, 500);
  };

  const tryFetchFeed = async (url: string) => {
    try {
      const response = await fetch("/api/fetch-feed", { mode: "cors", method:"GET", headers: { "x-feed-url": url}});

      const xml = await response.text();
      const data = extractFromXml(xml);

      feedName = data.title ?? feedName;
      feedSite = data.link ?? feedSite;
    } catch (e) {
      console.error(e);
      feedName = "Not found!";
      feedSite = "";
    }
  };

  const setActiveFeed = (index: number) => {
    activeFeedStore.set(index);
  };

  const saveFeed = () => {
    const feed: NewsFeed = {
      title: feedName,
      url: feedUrl,
      site: feedSite,
    };

    feedsStorage.update((feeds) => {
      feeds.push(feed);
      return feeds;
    });
  };

  const deleteFeed = (index: number) => {
    feedsStorage.update((feeds) => {
      feeds.splice(index, 1);
      return feeds;
    });
  };
</script>

{#if kind == "feed"}
  <section class="grid gap-y-4">
    <Sheet.Root>
      <Sheet.Trigger class="w-full">
        <Button class="w-full">
          <Plus class="mr-2" />
          Add Feed
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <Sheet.Header>
          <Sheet.Title>Add Feed</Sheet.Title>
          <Sheet.Description>
            You can add new feeds by providing an RSS feed link. We attempt to automatically populate the remaining details, but you might need to
            edit them manually if necessary.
          </Sheet.Description>
        </Sheet.Header>
        <div class="grid gap-4 py-4">
          <div>
            <Label for="link" class="mb-2">Link to feed</Label>
            <Input id="link" class="col-span-3" on:change={handleInputChange} />
          </div>
          <Separator class="mt-4" />
          <div>
            <Label for="name" class="mb-2">Feed name</Label>
            <Input id="name" class="col-span-3" bind:value={feedName} />
          </div>
          <div>
            <Label for="site" class="mb-2">Site</Label>
            <Input id="site" class="col-span-3" bind:value={feedSite} />
          </div>
        </div>
        <Sheet.Footer>
          <Sheet.Close asChild let:builder>
            <Button builders={[builder]} on:click={saveFeed} type="submit">Save changes</Button>
          </Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
    {#each $feedsStorage as feed, i}
      <button class="relative text-left" on:click={() => setActiveFeed(i)}>
        <Card.Root class={cn({ "border-indigo-900 bg-indigo-600": i == $activeFeedStore })}>
          <Card.Header>
            <Card.Title>
              <p>{feed.title}</p>
              <p class="text-base font-normal text-secondary">{feed.site}</p>
              <div class="absolute right-2 top-2">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger><Button variant="ghost" size="sm"><MoreVertical /></Button></DropdownMenu.Trigger>
                  <DropdownMenu.Content class="max-w-[10rem]">
                    <DropdownMenu.Group>
                      <DropdownMenu.Label>{feed.title}</DropdownMenu.Label>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item on:click={() => deleteFeed(i)}><Trash2 class="mr-2" /> Delete</DropdownMenu.Item>
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </Card.Title>
          </Card.Header>
        </Card.Root>
      </button>
    {/each}
  </section>
{/if}
