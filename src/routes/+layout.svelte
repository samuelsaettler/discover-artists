<script>
  import "../app.css";
</script>

<nav class="navbar navbar-expand-lg navbar-dark custom-navbar mb-4">
  <div class="container">
    <a class="navbar-brand spotify-color" href="/">Discover Artists</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/search">Search Artists</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/favorites">Favorites</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/genres">Genres</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container">
  <slot />
</div>
