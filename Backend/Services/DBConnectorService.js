const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../Database/mydatabase.db');

function getDBConnection() {
    return db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
}

module.exports = getDBConnection;

