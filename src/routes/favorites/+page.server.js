import { getFavoriteArtists } from '$lib/server/db.js';

export async function load() {
    const artists = await getFavoriteArtists();
    return { artists };
}
