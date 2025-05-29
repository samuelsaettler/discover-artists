<script>
  const { name, image, genres = [], popularity, followers } = $props();
</script>

<div class="card h-100 bg-dark text-white border-0">
  <img src={image} class="card-img-top" alt={name} />
  <div class="card-body p-2">
    <h5 class="card-title mb-1">{name}</h5>

    {#if genres.length > 0}
      <p class="card-text mb-0">
        <strong>Genres:</strong> {genres.join(', ')}
      </p>
    {/if}

    {#if popularity != null}
      <p class="card-text mb-0">
        <strong>Popularity:</strong> {popularity}
      </p>
    {/if}

    {#if followers != null}
      <p class="card-text">
        <strong>Followers:</strong> {followers.toLocaleString()}
      </p>
    {/if}
  </div>
</div>
