import { pool } from "../index.js";

async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS songs CASCADE;
      DROP TABLE IF EXISTS artists CASCADE;
    `);

    // Create the artists table
    await pool.query(`
      CREATE TABLE artists (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        artist_first_name VARCHAR(255) NOT NULL,
        artist_last_name VARCHAR(255) NOT NULL
      );
    `);

    // Create the songs table with a foreign key to the artists table
    await pool.query(`
      CREATE TABLE songs (
        song_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        song_title VARCHAR(255) NOT NULL,
        release_date DATE,
        artist_id INT REFERENCES artists(id) ON DELETE CASCADE
      );
    `);

    // Seed the artists table
    await pool.query(`
      INSERT INTO artists (artist_first_name, artist_last_name)
      VALUES 
      ('Michael', 'Jackson'),
      ('Madonna', 'Ciccone'),
      ('Elvis', 'Presley'),
      ('Whitney', 'Houston'),
      ('Bob', 'Dylan');
    `);

    // Seed the songs table
    await pool.query(`
      INSERT INTO songs (song_title, release_date, artist_id)
      VALUES 
      ('Thriller', '1982-11-30', 1),
      ('Billie Jean', '1983-01-02', 1),
      ('Beat It', '1983-02-03', 1),
      ('Like a Virgin', '1984-10-31', 2),
      ('Material Girl', '1984-01-23', 2),
      ('Vogue', '1990-03-27', 2),
      ('Can''t Help Falling in Love', '1961-10-01', 3),
      ('Jailhouse Rock', '1957-09-24', 3),
      ('Love Me Tender', '1956-09-28', 3),
      ('I Will Always Love You', '1992-11-03', 4),
      ('I Wanna Dance with Somebody', '1987-05-02', 4),
      ('Greatest Love of All', '1986-04-14', 4),
      ('Blowin'' in the Wind', '1962-07-09', 5),
      ('The Times They Are a-Changin''', '1964-01-13', 5),
      ('Like a Rolling Stone', '1965-07-20', 5);
    `);

    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();


/*CREATE TABLE MusicalArtists (
    ArtistName VARCHAR(255)
);

INSERT INTO MusicalArtists (ArtistName)
VALUES
    ('Michael Jackson'),
    ('Madonna'),
    ('Elvis Presley'),
    ('Whitney Houston'),
    ('Bob Dylan');*/

    /*CREATE TABLE SongsByArtists (
    ArtistName VARCHAR(255),
    SongTitle VARCHAR(255),
    ReleaseDate DATE
);

INSERT INTO SongsByArtists (ArtistName, SongTitle, ReleaseDate)
VALUES
    ('Michael Jackson', 'Thriller', '1982-11-30'),
    ('Michael Jackson', 'Billie Jean', '1983-01-02'),
    ('Michael Jackson', 'Beat It', '1983-02-03'),
    ('Madonna', 'Like a Virgin', '1984-10-31'),
    ('Madonna', 'Material Girl', '1984-01-23'),
    ('Madonna', 'Vogue', '1990-03-27'),
    ('Elvis Presley', 'Can''t Help Falling in Love', '1961-10-01'),
    ('Elvis Presley', 'Jailhouse Rock', '1957-09-24'),
    ('Elvis Presley', 'Love Me Tender', '1956-09-28'),
    ('Whitney Houston', 'I Will Always Love You', '1992-11-03'),
    ('Whitney Houston', 'I Wanna Dance with Somebody', '1987-05-02'),
    ('Whitney Houston', 'Greatest Love of All', '1986-04-14'),
    ('Bob Dylan', 'Blowin'' in the Wind', '1962-07-09'),
    ('Bob Dylan', 'The Times They Are a-Changin''', '1964-01-13'),
    ('Bob Dylan', 'Like a Rolling Stone', '1965-07-20');*/
