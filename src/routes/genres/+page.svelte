<script>
  import GenreBarChart from "$lib/components/GenreBarChart.svelte";
  const { data } = $props();
  const genres = data?.genres ?? [];
</script>

<h1>Top Genres</h1>
<div class="chart-container">
  <GenreBarChart {genres} />
</div>
