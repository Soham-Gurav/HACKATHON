const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database in memory
const db = new sqlite3.Database(':memory:');

// Set up the table structure
db.serialize(() => {
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            password TEXT,
            transaction TEXT,
            frequent_transaction TEXT
        )
    `);
});

module.exports = db;
