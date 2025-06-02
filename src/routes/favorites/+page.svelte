<script>
    import ArtistCard from "$lib/components/ArtistCard.svelte";
    const { data } = $props();
    const artists = data?.artists ?? [];
</script>

<h1 class="mb-4">Gespeicherte Künstler</h1>

<div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
    {#each artists as artist}
        <div class="col">
            <!-- rel="external" hilft das die Daten nicht direkt wenn man drüberhovered geladen werden (für track preview suche)-->
            <a href={`/artist/${artist._id}`} rel="external" class="text-decoration-none">
                <ArtistCard
                    name={artist.name}
                    image={artist.image}
                    popularity={artist.popularity}
                    followers={artist.followers}
                />
            </a>
        </div>
    {/each}
</div>
