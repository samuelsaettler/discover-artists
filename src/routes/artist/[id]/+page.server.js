import { getSpotifyAccessToken } from '$lib/server/spotify';

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

    return { 
        artist,
        topTracks: topTracks.tracks
     };
}
