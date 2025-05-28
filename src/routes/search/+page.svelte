<script>
    const { data } = $props();
    let query = $state("");
</script>

<h1 class="mb-4">Künstler suchen</h1>

<form class="mb-4 d-flex" method="GET">
    <input
        type="text"
        name="q"
        bind:value={query}
        placeholder="Z. B. Daft Punk"
        class="form-control me-2"
        required
    />
    <button type="submit" class="btn btn-primary">Suchen</button>
</form>

{#if data?.results?.length > 0}
    <h2 class="mb-3">Ergebnisse:</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {#each data.results as artist}
            <div class="col">
                <div class="card h-100">
                    {#if artist.image}
                        <img
                            src={artist.image}
                            class="card-img-top"
                            alt={artist.name}
                        />
                    {/if}
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href={`/artist/${artist.id}`}>{artist.name}</a>
                        </h5>
                        {#if artist.genres.length > 0}
                            <p class="card-text">
                                <strong>Genres:</strong>
                                {artist.genres.join(", ")}
                            </p>
                        {/if}
                        <p class="card-text">
                            <strong>Popularity:</strong>
                            {artist.popularity}
                        </p>
                        <p class="card-text">
                            <strong>Followers:</strong>
                            {artist.followers.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{:else if query}
    <p>Keine Künstler gefunden.</p>
{/if}
