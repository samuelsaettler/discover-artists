import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("DiscoverArtists");

//////////////////////////////////////////
// Favorite Artists
//////////////////////////////////////////

// Get all favorite artists
async function getFavoriteArtists() {
  let artists = [];
  try {
    const collection = db.collection("favoriteArtists");
    const query = {};
    artists = await collection.find(query).toArray();
    artists.forEach((artist) => {
      artist._id = artist._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return artists;
}

// Get favorite artist by _id
async function getFavoriteArtistById(id) {
  try {
    const collection = db.collection("favoriteArtists");
    const query = { _id: new ObjectId(id) };
    const artist = await collection.findOne(query);

    if (artist) artist._id = artist._id.toString();
    return artist;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// artist = full artist object from Spotify
// topTracks = array of top tracks from Spotify
async function createFavoriteArtist(artist, topTracks = []) {
  try {
    const collection = db.collection("favoriteArtists");

    // Check if artist already exists
    const existing = await collection.findOne({ id: artist.id });
    if (existing) {
      console.log("Artist already in favorites");
      return existing._id.toString();
    }

    // Build the artist object to insert
    const favoriteArtist = {
      id: artist.id,
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
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

// Update genre stats
async function updateGenres(genres) {
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

// Get top genres (sorted)
async function getTopGenres(limit = 10) {
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

// Delete favorite artist by _id
async function deleteFavoriteArtist(id) {
  try {
    const collection = db.collection("favoriteArtists");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

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

export default {
  getFavoriteArtists,
  getFavoriteArtistById,
  createFavoriteArtist,
  deleteFavoriteArtist,
  updateGenres,
  getTopGenres,
};
