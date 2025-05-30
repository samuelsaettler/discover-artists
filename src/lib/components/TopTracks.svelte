<script>
  const { tracks } = $props();

  function formatDuration(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Format für MM:SS, nicht 3:7 -> 3:07
  }
</script>

{#if tracks.length > 0}
  <h3 class="mb-3">Top-Tracks</h3>
  <ul class="list-group">
    {#each tracks as track}
      <li class="list-group-item bg-dark text-white d-flex justify-content-between align-items-center border-bottom border-secondary">
        <span class="me-3">{track.name}: {formatDuration(track.duration_ms)}</span>
        <div style="min-width: 150px;">
          <audio controls src={track.preview_url}></audio>
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-muted fst-italic mt-3">Keine Top-Tracks verfügbar.</p>
{/if}
