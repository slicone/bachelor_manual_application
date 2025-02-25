const sqlite3 = require('sqlite3').verbose();

// Connect to (or create) the database file
const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Event Table // TODO user_id as foreign key to user table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Event (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      description_short TEXT CHECK (LENGTH(description_short) <= 20) NOT NULL,
      locationX REAL NOT NULL,
      locationY REAL NOT NULL,
      city TEXT NOT NULL,
      street TEXT NOT NULL,
      zip Number NOT NULL,
      fees REAL NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      image_name TEXT NOT NULL
      )`);
  });


  // Table for Event Images
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Image (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      FOREIGN KEY (event_id) REFERENCES Event(id) ON DELETE CASCADE
      )`);
  });