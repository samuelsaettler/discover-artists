import { getTopGenres } from '$lib/server/db.js';

export async function load() {
  const genres = await getTopGenres();
  console.log('Top Genres:', genres);
  return { genres };
}
