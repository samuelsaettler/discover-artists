import { getSpotifyAccessToken } from '$lib/server/spotify';
import { createFavoriteArtist, updateGenres, getFavoriteArtistById } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';


export async function load({ params, fetch }) {
    const token = await getSpotifyAccessToken();

    // Artist-Daten holen
    const artistRes = await fetch(`https://api.spotify.com/v1/artists/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!artistRes.ok) {
        throw new Error('Konnte Artist nicht laden');
    }

    const artist = await artistRes.json();
    // console.log('Artist-Daten:', artist);

    // Top-Tracks von Artist holen
    const tracksRes = await fetch(`https://api.spotify.com/v1/artists/${params.id}/top-tracks?market=CH`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!tracksRes.ok) {
        throw new Error('Konnte Tracks nicht laden');
    }

    const topTracks = await tracksRes.json();
    //console.log('Top-Tracks:', topTracks);

    // Überprüfe, ob der Künstler bereits in den Favoriten ist (zum speichern)
    const existing = await getFavoriteArtistById(artist.id);

    return {
        artist,
        topTracks: topTracks.tracks,
        isFavorite: !!existing
    };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const artist = JSON.parse(data.get('artist'));
        const topTracks = JSON.parse(data.get('topTracks') ?? '[]');

        await createFavoriteArtist(artist, topTracks);
        await updateGenres(artist.genres);

        throw redirect(303, '/favorites');
    }
};