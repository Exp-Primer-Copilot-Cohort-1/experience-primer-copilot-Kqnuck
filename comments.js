// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Set up database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('comments.db');
db.serialize(() => {
  const sql = 'CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, comment TEXT)';
  db.run(sql);
  db.run('INSERT INTO comments (comment) VALUES (?)', 'This is a test comment');
});
// Get all comments
app.get('/comments', (req, res) => {
  db.all('SELECT * FROM comments', (err, comments) => {
    res.send(comments);
  });
});
// Add a comment
app.post('/comments', (req, res) => {
  db.run('INSERT INTO comments (comment) VALUES (?)', req.body.comment, () => {
    res.send('Comment added');
  });
});
// Start web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});