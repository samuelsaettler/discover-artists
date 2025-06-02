import { fetchSpotifyArtist, fetchSpotifyTopTracks } from "$lib/server/spotify";
import { createFavoriteArtist, getFavoriteArtistById, deleteFavoriteArtistBySpotifyId } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import { findPreviewUrl } from '$lib/server/previewUrlLibrary.js';

export async function load({ params }) {
    const artistId = params.id;
    const existingFavorite = await getFavoriteArtistById(artistId);

    let artist;
    let topTracks;

    if (existingFavorite) {
        // Fals vorhanden dann nutze die Datenbank einträge
        artist = existingFavorite;
        console.log("Existierender Artist und TopTracks gefunden");
        // console.log(artist);
        topTracks = existingFavorite.topTracks;
    } else {
        artist = await fetchSpotifyArtist(artistId);
        topTracks = await fetchSpotifyTopTracks(artistId);
        console.log("Artist und TopTracks von Spotify geladen");
        // console.log("Top Tracks:", topTracks);
        topTracks = await Promise.all(topTracks.map(async (track) => {
            if (!track.preview_url) {
                const searchString = track.name + " " + artist.name;
                track.preview_url = await findPreviewUrl(searchString);
            }
            return track;
        }));
    }

    return {
        artist,
        topTracks,
        isFavorite: existingFavorite !== null // Überprüft ob der Künstler bereits favorisiert ist
    };
}

export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        // Strings von Form wieder zu Objekten umwandeln
        const artist = JSON.parse(data.get("artist"));
        const topTracks = JSON.parse(data.get("topTracks") ?? "[]");
        await createFavoriteArtist(artist, topTracks);
        throw redirect(303, "/favorites");
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");
        await deleteFavoriteArtistBySpotifyId(id);
        throw redirect(303, "/favorites");
    }
};
