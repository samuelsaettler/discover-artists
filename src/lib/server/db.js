import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("DiscoverArtists");

// Collections
const artistCollection = db.collection("favoriteArtists");
const genreCollection = db.collection("genres");

//////////////////////////////////////////////////////////
// Artist Funktionen (Spotify-ID als _id für Konsistenz und Unique)
//////////////////////////////////////////////////////////

// Alle gespeicherten Künstler abrufen
export async function getFavoriteArtists() {
  try {
    return await artistCollection.find({}).toArray();
  } catch (err) {
    console.error("Fehler beim Laden von allen Künstler:", err);
    return [];
  }
}

// Einzelnen Künstler abrufen (per Spotify-ID)
export async function getFavoriteArtistById(spotifyId) {
  try {
    return await artistCollection.findOne({ _id: spotifyId });
  } catch (err) {
    console.error("Fehler beim Laden vom Künstler:", err);
    return null;
  }
}

// Künstler speichern (falls nicht vorhanden)
export async function createFavoriteArtist(artist, topTracks = []) {
  try {
    const exists = await artistCollection.findOne({ _id: artist.id });
    if (exists) {
      console.log("Artist: ", artist.name, " existiert schon");
      return exists._id;
    }

    const doc = {
      _id: artist.id,
      name: artist.name,
      image: artist.images?.[0]?.url ?? "",
      genres: artist.genres ?? [],
      popularity: artist.popularity ?? 0,
      followers: artist.followers?.total ?? 0,
      topTracks: topTracks.map(track => ({
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        duration_ms: track.duration_ms,
        popularity: track.popularity
      }))
    };

    const result = await artistCollection.insertOne(doc);
    if (result.acknowledged) {
      await updateGenres(artist.genres);
    }

    return result.insertedId;
  } catch (err) {
    console.error("Fehler beim speichern:", err);
    return null;
  }
}

// Künstler löschen + Genres dekrementieren
export async function deleteFavoriteArtistBySpotifyId(spotifyId) {
  try {
    const artist = await artistCollection.findOne({ _id: spotifyId });
    if (!artist) {
      console.log("Kein Artist mit der ID: ", spotifyId, " gefunden.");
      return null;
    }

    const result = await artistCollection.deleteOne({ _id: spotifyId });
    if (result.deletedCount > 0) {
      await updateGenres(artist.genres, -1);
      return spotifyId;
    }

    return null;
  } catch (err) {
    console.error("Fehler beim Löschen:", err);
    return null;
  }
}

//////////////////////////////////////////////////////////
// Genre Funktionen
//////////////////////////////////////////////////////////

// Genres hoch- oder runterzählen
export async function updateGenres(genres = [], delta = 1) {
  try {
    for (const genre of genres) {
      await genreCollection.updateOne(
        { name: genre },
        { $inc: { count: delta } },
        { upsert: true }
      );
    }
  } catch (err) {
    console.error("Fehler beim update genre:", err);
  }
}

// Top Genres abrufen (default: Top 10)
export async function getTopGenres(limit = 10) {
  try {
    const genres = await genreCollection
      .find({})
      .sort({ count: -1 })
      .limit(limit)
      .toArray();
    return genres.map(g => ({ ...g, _id: g._id.toString() })); // Konvertiere ObjectId zu String
  } catch (err) {
    console.error("Fehler beim genre laden:", err);
    return [];
  }
}
