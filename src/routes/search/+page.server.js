import { error } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

/** Holen des Access Tokens */
async function getSpotifyToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await res.json();
  return data.access_token;
}

/** Laden von Suchergebnissen */
export async function load({ url }) {
  const query = url.searchParams.get('q');

  if (!query) {
    return { results: [] }; // Noch keine Suche
  }

  const token = await getSpotifyToken();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) throw error(500, 'Spotify API request failed');

  const data = await res.json();
  const results = data.artists.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    image: artist.images[0]?.url ?? '',
    genres: artist.genres,
    popularity: artist.popularity,
    followers: artist.followers.total
  }));

  return { results };
}