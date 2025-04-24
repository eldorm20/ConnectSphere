import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import Sentiment from 'sentiment';
import cors from 'cors';

console.log('Starting server setup...');

dotenv.config();
console.log('Environment variables loaded:', {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});

const app = express();
app.use(cors());
app.use(express.json());
console.log('Express middleware configured');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

console.log('Database pool created, attempting to connect...');
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    process.exit(1);
  }
  console.log('Successfully connected to the database');
  release();
});

const sentiment = new Sentiment();
console.log('Sentiment analyzer initialized');

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error in GET /api/categories:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new category
app.post('/api/categories', async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error in POST /api/categories:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new user
app.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error in POST /api/users:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new thread
app.post('/api/threads', async (req, res) => {
  const { title, userId, categoryId } = req.body;
  if (!title || !userId || !categoryId) {
    return res.status(400).json({ error: 'Title, userId, and categoryId are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO threads (title, user_id, category_id) VALUES ($1, $2, $3) RETURNING *',
      [title, userId, categoryId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error in POST /api/threads:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get a single thread
app.get('/api/threads/:threadId', async (req, res) => {
  const { threadId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM threads WHERE id = $1', [threadId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in GET /api/threads/:threadId:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get threads for a category
app.get('/api/categories/:categoryId/threads', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM threads WHERE category_id = $1 ORDER BY created_at ASC', [categoryId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in GET /api/categories/:categoryId/threads:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get a single category
app.get('/api/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error in GET /api/categories/:categoryId:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
  const { threadId, userId, content } = req.body;
  if (!threadId || !userId || !content) {
    return res.status(400).json({ error: 'ThreadId, userId, and content are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO posts (thread_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [threadId, userId, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error in POST /api/posts:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get posts for a thread
app.get('/api/threads/:threadId/posts', async (req, res) => {
  const { threadId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM posts WHERE thread_id = $1 ORDER BY created_at ASC', [threadId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in GET /api/threads/:threadId/posts:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
console.log('Starting server on port', PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
