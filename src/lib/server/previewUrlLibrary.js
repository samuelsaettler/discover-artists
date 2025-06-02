import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";

// Umgebungsvariablen im process.env für SpotifyID und Secret setzen
process.env.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID;
process.env.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;

import searchAndGetLinks from "spotify-preview-finder";

// Versucht über Songnamen eine funktionierende preview_url via track.name und artist.name zu finden.
export async function findPreviewUrl(searchString) {
  try {
    const result = await searchAndGetLinks(searchString, 1); // Limit auf das erste Ergebnis setzen
    console.log("Preview-Suche für: ", searchString, "Ergebnis: ", result);
    const preview = result.success && result.results[0]?.previewUrls[0] || null;
    return preview;
  } catch (err) {
    console.error("Fehler bei Preview-Suche für: ", searchString, "Error: ", err.message);
    return null;
  }
}
