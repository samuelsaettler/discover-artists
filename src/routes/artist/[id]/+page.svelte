<script>
  import ArtistCard from "$lib/components/ArtistCard.svelte";
  import TopTracks from "$lib/components/TopTracks.svelte";
  const { data } = $props();
  const artist = data?.artist;
  const topTracks = data?.topTracks ?? [];
  const isFavorite = data.isFavorite;
</script>

<ArtistCard
  name={artist.name}
  image={artist.images?.[0]?.url ?? "https://placehold.co/300x300"}
  genres={artist.genres}
  popularity={artist.popularity}
  followers={artist.followers?.total ?? 0}
/>

<form method="POST" class="mt-4">
  <input type="hidden" name="artist" value={JSON.stringify(artist)} />
  <input type="hidden" name="topTracks" value={JSON.stringify(topTracks)} />
  <button
    type="submit"
    class="btn btn-outline-light d-flex align-items-center gap-2"
    disabled={isFavorite}
  >
    <i class={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
    {#if isFavorite}
      Bereits gespeichert
    {:else}
      Als Favorit speichern
    {/if}
  </button>
</form>

<TopTracks tracks={topTracks} />
