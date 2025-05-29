import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("DiscoverArtists");

//////////////////////////////////////////
// Favorite Artists
//////////////////////////////////////////

// Alle gespeicherten Künstler laden
export async function getFavoriteArtists() {
  try {
    const collection = db.collection("favoriteArtists");
    const artists = await collection.find({}).toArray();
    return artists.map(artist => ({ ...artist, _id: artist._id.toString() }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Einzelnen Künstler laden (per Spotify-ID)
export async function getFavoriteArtistById(id) {
  try {
    const collection = db.collection("favoriteArtists");
    const artist = await collection.findOne({ _id: id });
    if (artist) artist._id = artist._id.toString();
    return artist;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// Künstler speichern
export async function createFavoriteArtist(artist, topTracks = []) {
  try {
    const collection = db.collection("favoriteArtists");

    // Duplikate vermeiden
    const existing = await collection.findOne({ _id: artist.id });
    if (existing) {
      console.log("Artist already in favorites");
      return existing._id;
    }

    const favoriteArtist = {
      _id: artist.id, // Spotify-ID als MongoDB-ID
      name: artist.name,
      image: artist.images?.[0]?.url ?? '',
      genres: artist.genres,
      popularity: artist.popularity,
      followers: artist.followers?.total ?? 0,
      topTracks: topTracks.map((track) => ({
        id: track.id,
        name: track.name,
        preview_url: track.preview_url,
        duration_ms: track.duration_ms,
        popularity: track.popularity
      }))
    };

    const result = await collection.insertOne(favoriteArtist);
    return result.insertedId;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// Genre-Statistiken aktualisieren
export async function updateGenres(genres) {
  try {
    const collection = db.collection("genres");
    for (const genre of genres) {
      await collection.updateOne(
        { name: genre },
        { $inc: { count: 1 } },
        { upsert: true }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

// Top-Genres abrufen
export async function getTopGenres(limit = 10) {
  try {
    const collection = db.collection("genres");
    return await collection
      .find({})
      .sort({ count: -1 })
      .limit(limit)
      .toArray();
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

// Künstler löschen (per Spotify-ID)
export async function deleteFavoriteArtist(id) {
  try {
    const collection = db.collection("favoriteArtists");
    const result = await collection.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      return id;
    } else {
      console.log("No artist with id " + id);
      return null;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
