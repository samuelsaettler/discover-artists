<script>
  import ArtistCard from "$lib/components/ArtistCard.svelte";
  const { data } = $props();
</script>

<div class="container-fluid bg-black text-white py-4">
  <div class="container mb-4">
    <form class="d-flex" method="GET">
      <input
        type="text"
        name="q"
        class="form-control me-2"
        placeholder="Daft Punk, The Weekend, etc."
        required
      />
      <button type="submit" class="btn spotify-color">Suchen</button>
    </form>
  </div>

  {#if data?.results?.length > 0}
    <div class="container">
      <h2 class="mb-3">Ergebnisse:</h2>
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
        {#each data.results as artist}
          <div class="col">
            <a href={`/artist/${artist.id}`} class="text-decoration-none">
              <ArtistCard
                name={artist.name}
                image={artist.image}
              />
            </a>
          </div>
        {/each}
      </div>
    </div>
  {:else if data}
    <div class="container">
      <p>Keine Künstler gefunden.</p>
    </div>
  {/if}
</div>
