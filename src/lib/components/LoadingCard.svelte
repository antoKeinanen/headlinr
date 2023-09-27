<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { Skeleton } from "$lib/components/ui/skeleton";
</script>

<Card.Root class="h-[175px]" tabindex={0}>
  <Card.Header>
    <Card.Title class="grid gap-0.5">
      <Skeleton class="h-5">&nbsp;</Skeleton>
      <Skeleton class="h-5 w-3/5">&nbsp;</Skeleton>
    </Card.Title>
  </Card.Header>
  <Card.Content class="grid gap-1">
    <Skeleton class="h-4">&nbsp;</Skeleton>
    <Skeleton class="h-4">&nbsp;</Skeleton>
    <Skeleton class="h-4 w-5/6">&nbsp;</Skeleton>
  </Card.Content>
</Card.Root>
