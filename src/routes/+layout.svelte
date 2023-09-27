<script lang="ts">
  import "../global.postcss";
  import SidePanel from "$lib/components/SidePanel.svelte";
</script>

<nav class="float-left flex h-screen w-1/4 flex-col gap-4 overflow-y-auto border-r border-r-border bg-zinc-900 p-8">
  <SidePanel kind="feed"/>
</nav>
<div class="float-right h-screen w-3/4 overflow-y-auto bg-zinc-800 p-8">
  <slot />
</div>
