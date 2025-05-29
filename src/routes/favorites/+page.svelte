<script>
    import ArtistCard from "$lib/components/ArtistCard.svelte";
    const { data } = $props();
    const artists = data.artists ?? [];
</script>

<h1 class="mb-4">Gespeicherte Künstler</h1>

<div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
    {#each artists as artist}
        <div class="col">
            <a href={`/artist/${artist._id}`} class="text-decoration-none">
                <ArtistCard
                    name={artist.name}
                    image={artist.image}
                    genres={artist.genres}
                    popularity={artist.popularity}
                    followers={artist.followers}
                />
            </a>
        </div>
    {/each}
</div>
