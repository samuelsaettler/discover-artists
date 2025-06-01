<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  const { genres } = $props(); // Array mit name und count: [{ name: "rap", count: 5 }, etc.]

  let canvas;

  onMount(() => {
    // Neues Balkendiagramm erstellen
    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: genres.map((genre) => genre.name),
        datasets: [
          {
            label: "Anzahl der Künstler pro Genre",
            data: genres.map((genre) => genre.count),
            backgroundColor: "#1DB954", // Farbe der Balken
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",
            },
          },
          x: {
            ticks: {
              color: "white",
            },
          },
        },
      },
    });

    return () => chart.destroy();
  });
</script>

<canvas bind:this={canvas}></canvas>
