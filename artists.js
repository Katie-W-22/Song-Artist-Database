// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getArtists() {
   // Query the database and return all artists

  // Define the SQL query to fetch all artists from the 'artists' table
  const queryText = "SELECT * FROM artists";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getArtistById(id) {
  // Query the database and return the artist with a matching id or null

  // Define the SQL query to fetch the artist with the specified id from the 'artists' table
  const queryText = "SELECT * FROM artists WHERE id = $1";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If an artist with the specified id exists, it will be the first element in the rows array
  // If no artist exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createArtist(artist) {
  // Query the database to create an artist and return the newly created artist

  // Define the SQL query to INSERT INTO with id, artist_first_name, artist_last_name into the artists table
  const queryText = "INSERT INTO artists(artist_first_name, artist_last_name) VALUES ($1, $2)";

  // Use the pool object to send the query to the database
  // passing the id etc as a parameters to prevent SQL injection
  const result = await pool.query(queryText, [artist.artist_first_name, artist.artist_last_name]);

  // The rows property of the result object contains the retrieved records
  // if artist entry created, it will become the last row in the table
  // If artist entry artist created with the specified params, the rows array will be empty
  return result.rows[0];
}

export async function updateArtistById(id, updates) {
  // Query the database to update an artist and return the newly updated artist or null
  const queryText = "UPDATE artists SET artist_first_name=$2, artist_last_name=$3 WHERE id=$1 RETURNING *";

  const {artist_first_name, artist_last_name} = updates
  // if found then update artist artist_first_name or artist_last_name
  const result = await pool.query(queryText, [id, artist_first_name, artist_last_name]);
  return result.rows[0];
}

export async function deleteArtistById(id) {
  // Query the database to delete an artist and return the deleted artist or null
  // Where do we include the cascade?

  const queryText = "DELETE FROM artists WHERE id = $1 RETURNING *";
  const result = await pool.query(queryText, [id]);

  if (result.rowCount === 0) {
    // No rows were affected, indicating that the artist with the specified id was not found
    return null;
  }

  // Rows were affected, indicating that the song was successfully deleted
  // Return the deleted artist details
  return result.rows[0];
}
