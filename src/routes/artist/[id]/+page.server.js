import { fetchSpotifyArtist, fetchSpotifyTopTracks } from '$lib/server/spotify';
import { createFavoriteArtist, getFavoriteArtistById, deleteFavoriteArtistBySpotifyId } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const artist = await fetchSpotifyArtist(params.id);
    // console.log('Artist-Daten:', artist);
    const topTracks = await fetchSpotifyTopTracks(params.id);
    // console.log('TopTracks-Daten:', topTracks);
    const existing = await getFavoriteArtistById(artist.id);

    return {
        artist,
        topTracks,
        isFavorite: existing !== null // Überprüft ob der Künstler bereits favorisiert ist
    };
}

export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        // Strings von Form wieder zu Objekten umwandeln
        const artist = JSON.parse(data.get('artist'));
        const topTracks = JSON.parse(data.get('topTracks') ?? '[]');
        await createFavoriteArtist(artist, topTracks);
        throw redirect(303, '/favorites');
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        await deleteFavoriteArtistBySpotifyId(id);
        throw redirect(303, '/favorites');
    }
};
