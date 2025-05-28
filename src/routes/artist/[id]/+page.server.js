import { error } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

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

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const token = await getSpotifyToken();
	const artistId = params.id;

	const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!res.ok) throw error(500, 'Künstler konnte nicht geladen werden');

	const artist = await res.json();

	return {
		artist: {
			id: artist.id,
			name: artist.name,
			image: artist.images[0]?.url ?? '',
			genres: artist.genres,
			popularity: artist.popularity,
			followers: artist.followers.total
		}
	};
}
