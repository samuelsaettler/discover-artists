<script>
  import '../app.css';
</script>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
  <div class="container">
    <a class="navbar-brand" href="/">Discover Artists</a>
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
      </ul>
    </div>
  </div>
</nav>

<div class="container">
  <slot />
</div>
