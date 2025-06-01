import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";

/** Holen des Access Tokens */
export async function getSpotifyAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  if (!res.ok) {
    throw new Error("Spotify Token konnte nicht geholt werden");
  }

  const data = await res.json();
  return data.access_token;
}

/** Suche nach Künstlern auf Spotify */
export async function searchSpotifyArtists(query, limit = 10) {
  const token = await getSpotifyAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Spotify-Suche fehlgeschlagen");
  }

  const data = await res.json();

  return data.artists.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    image: artist.images[0]?.url ?? "",
    genres: artist.genres,
    popularity: artist.popularity,
    followers: artist.followers?.total ?? 0
  }));
}


// Artist-Daten holen
export async function fetchSpotifyArtist(id) {
  const token = await getSpotifyAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Konnte Artist nicht laden");
  }

  return await res.json();
}

// Top-Tracks von Artist holen
export async function fetchSpotifyTopTracks(id) {
  const token = await getSpotifyAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=CH`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Konnte Tracks nicht laden");
  }

  const data = await res.json();
  return data.tracks;
}
