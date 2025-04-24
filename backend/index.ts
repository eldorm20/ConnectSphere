import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import Sentiment from 'sentiment';

dotenv.config();

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

const sentiment = new Sentiment();

// Create a post with sentiment analysis
app.post('/api/posts', async (req, res) => {
  const { threadId, userId, content } = req.body;

  // Analyze sentiment
  const analysis = sentiment.analyze(content);
  if (analysis.score < 0) {
    return res.status(400).json({ error: 'Content flagged as negative' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO posts (thread_id, user_id, content) VALUES ($1, $2, $3) RETURNING id',
      [threadId, userId, content]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});
// Other endpoints (users, categories, threads, get threads) remain unchanged

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
