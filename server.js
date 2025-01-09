const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create the posts table
db.serialize(() => {
  db.run(`
    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    )
  `);
});

// Get all posts
app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ posts: rows });
  });
});

// Get a specific post
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ post: row });
  });
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ post: { id: this.lastID, title, content } });
  });
});

// Update a post
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }
  db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ post: { id, title, content } });
  });
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ message: 'Post deleted' });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
