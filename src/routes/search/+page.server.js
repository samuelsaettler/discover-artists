import { error } from '@sveltejs/kit';
import { getSpotifyAccessToken } from '$lib/server/spotify.js';

/** Laden von Suchergebnissen */
export async function load({ url }) {
  const query = url.searchParams.get('q');

  if (!query) {
    return { results: [] }; // Noch keine Suche
  }

  const token = await getSpotifyAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error('Suche konnte nicht ausgeführt werden');
  }

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