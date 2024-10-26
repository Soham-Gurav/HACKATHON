const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Import the SQLite database connection

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS to allow communication with React frontend
app.use(bodyParser.json()); // Parse JSON request bodies

// POST route to add user transaction to the database
app.post('/api/transactions', (req, res) => {
    const { email, password, transaction } = req.body;
    
    // Insert the data into the SQLite database
    db.run('INSERT INTO users (email, password, transaction) VALUES (?, ?, ?)',
        [email, password, transaction],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Transaction saved!', id: this.lastID });
        }
    );
});

// GET route to fetch all transactions
app.get('/api/transactions', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ transactions: rows });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
