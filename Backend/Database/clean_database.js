const sqlite3 = require('sqlite3').verbose();

// Connect to (or create) the database file
const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.serialize(() => {
  db.run(`DROP TABLE Image`);
});

db.serialize(() => {
  db.run(`DROP TABLE Event`);
});
