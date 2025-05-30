<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  const { genres } = $props(); // Array: [{ name: 'rap', count: 5 }, etc.]

  // Chart erstellung mithilfe von ChatGPT generiert (als library chart.js)
  let canvas;

  onMount(() => {
    // Neues Balkendiagramm erstellen
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: genres.map((genre) => genre.name),
        datasets: [{
          label: 'Anzahl der Künstler pro Genre',
          data: genres.map((genre) => genre.count),
          backgroundColor: '#36a2eb'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true },
          x: {
            ticks: {
              color: 'white' // Schrift auf der X-Achse weiss
            }
          }
        }
      }
    });

    return () => chart.destroy();
  });
</script>

<canvas bind:this={canvas}></canvas>
