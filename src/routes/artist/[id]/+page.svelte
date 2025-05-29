<script>
  import ArtistCard from "$lib/components/ArtistCard.svelte";
  import TopTracks from "$lib/components/TopTracks.svelte";
  const { data } = $props();
  const artist = data?.artist;
  const topTracks = data?.topTracks ?? [];
</script>

<ArtistCard
  name={artist.name}
  image={artist.images?.[0]?.url ?? "https://placehold.co/300x300"}
  genres={artist.genres}
  popularity={artist.popularity}
  followers={artist.followers?.total ?? 0}
/>

<TopTracks tracks={topTracks} />
