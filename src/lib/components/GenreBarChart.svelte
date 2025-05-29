<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  const { genres } = $props();

  // Chart erstellung mithilfe von ChatGPT generiert
  let canvas;

  onMount(() => {
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: genres.map((g) => g.name),
        datasets: [{
          label: 'Genre Count',
          data: genres.map((g) => g.count),
          backgroundColor: '#36a2eb'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    return () => chart.destroy();
  });
</script>

<canvas bind:this={canvas}></canvas>
