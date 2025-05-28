<script>
    const { data } = $props();
    const { artist } = data;
    if (!artist) {
        console.error('No artist data');
    }
</script>

<h1>{artist.name}</h1>

{#if artist.image}
	<img src={artist.image} alt={artist.name} style="max-width: 300px;" />
{/if}

<p><strong>Genres:</strong> {artist.genres.join(', ')}</p>
<p><strong>Followers:</strong> {artist.followers.toLocaleString()}</p>
<p><strong>Popularity:</strong> {artist.popularity}</p>

<a href="/search" class="btn btn-secondary mt-3">Zurück zur Suche</a>
