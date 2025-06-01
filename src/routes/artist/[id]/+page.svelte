<script>
  import ArtistCard from "$lib/components/ArtistCard.svelte";
  import TopTracks from "$lib/components/TopTracks.svelte";
  const { data } = $props();
  const artist = data?.artist ?? {};
  const topTracks = data?.topTracks ?? [];
  const isFavorite = data?.isFavorite ?? false;
</script>

<div class="bg-black text-white py-4">
  <div class="container">
    <a href="#" onclick={history.back()} class="text-light mb-3 d-inline-block">← Zurück</a>

    <div class="row">
      <div class="col-md-4 d-flex flex-column">
        <ArtistCard
          name={artist.name}
          image={artist.images?.[0]?.url ?? "https://placehold.co/300x300"}
          genres={artist.genres}
          popularity={artist.popularity}
          followers={artist.followers?.total ?? 0}
        />

        <form method="POST" class="mt-3">
          {#if isFavorite}
            <input type="hidden" name="id" value={artist.id} />
            <button type="submit" formaction="?/delete" class="btn btn-outline-danger w-100">
              Entfernen
            </button>
          {:else}
            <!-- Form felder können value nur per String weitergeben deshalb JSON zu String -->
            <input type="hidden" name="artist" value={JSON.stringify(artist)} />
            <input type="hidden" name="topTracks" value={JSON.stringify(topTracks)}/>
            <button type="submit" formaction="?/save" class="btn btn-outline-light w-100">
              Als Favorit speichern
            </button>
          {/if}
        </form>
      </div>

      <div class="col-md-8">
        <TopTracks tracks={topTracks} />
      </div>
    </div>
  </div>
</div>
