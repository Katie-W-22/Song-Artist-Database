// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getSongs() {
  // Query the database and return all songs

  // Define the SQL query to fetch all songs from the 'songs' table
  const queryText = "SELECT * FROM songs";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getSongById(song_id) {
  // Query the database and return the song with a matching id or null

  // Define the SQL query to fetch the song with the specified id from the 'song' table
  const queryText = "SELECT * FROM songs WHERE song_id = $1";

  // Use the pool object to send the query to the database
  // passing the song_id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [song_id]);

  // The rows property of the result object contains the retrieved records
  // If a song with the specified song_id exists, it will be the first element in the rows array
  // If no song exists with the specified song_id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createSong(song) {
  // Query the database to create a song and return the newly created song

  // Define the SQL query to INSERT INTO with song_id, song_title, release_date and artist_id into the song table
  const queryText = "INSERT INTO songs(song_title, release_date, artist_id) VALUES ($1, $2, $3)";

  // Use the pool object to send the query to the database
  // passing the id etc as a parameters to prevent SQL injection
  const result = await pool.query(queryText, [song.song_title, song.release_date, song.artist_id]);

  // The rows property of the result object contains the retrieved records
  // if song entry created, it will become the last row in the table
  // If song entry song created with the specified params, the rows array will be empty
  return result.rows[0];
}


export async function updateSongById(song_id, updates) {
  // Query the database to update a song and find a song by id
  // if not found return error - maybe later!
  // const queryText = "UPDATE books SET song_title=newTitle, release_date=newrelase_date, artist_id=newAuthor_id WHERE id=$1";
  const queryText = "UPDATE songs SET song_title=$2, release_date=$3, artist_id=$4 WHERE song_id=$1 RETURNING *";

  const {song_title, release_date, artist_id} = updates
  // if found then update song title, or published_date or author_id
  const result = await pool.query(queryText, [song_id, song_title, release_date, artist_id]);
  // return updated song
  // tried return result
  // return result.rows
  // return result.rows[id];
  // return result.rows[0]
  return result.rows[0];
}

// export async function deletesongById(id) {
//   // Query the database to delete a song and return the deleted book or null
//   const queryText = "DELETE FROM songs WHERE id = $1";
//   const result = await pool.query(queryText, [id]);
//   return result.rows || null;
// }
export async function deleteSongById(song_id) {
  const queryText = "DELETE FROM songs WHERE song_id = $1 RETURNING *";
  const result = await pool.query(queryText, [song_id]);

  if (result.rowCount === 0) {
    // No rows were affected, indicating that the song with the specified id was not found
    return null;
  }

  // Rows were affected, indicating that the song was successfully deleted
  // Return the deleted song details
  return result.rows[0];
}