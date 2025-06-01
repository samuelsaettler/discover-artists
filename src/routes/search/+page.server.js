import { searchSpotifyArtists } from "$lib/server/spotify.js";

export async function load({ url }) {
  const query = url.searchParams.get("q");

  if (!query) {
    return { results: [] };
  }

  const results = await searchSpotifyArtists(query); // Default limit ist 10, kann angepasst werden
  return { results };
}
