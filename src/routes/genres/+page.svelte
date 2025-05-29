<script>
  import GenreBarChart from '$lib/components/GenreBarChart.svelte';
  const { data } = $props();
</script>

<h1>Top Genres</h1>

<GenreBarChart genres={data.genres} />
