<script>
  const { tracks } = $props();
</script>

{#if tracks.length > 0}
  <h3 class="mt-4">Top-Tracks</h3>
  <ul class="list-group">
    {#each tracks as track}
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>{track.name}</span>
        <audio controls src={track.preview_url}></audio>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-muted fst-italic mt-3">Keine Top-Tracks verfügbar.</p>
{/if}
