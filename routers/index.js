const pool = require('../db/pool');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY time DESC'
    );
    const messages = result.rows.map((row) => ({
      text: row.message,
      user: row.name,
      added: row.time,
    }));
    res.render('index', { messages });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).send('Server error');
  }
});

router.get('/detail/:index', async (req, res) => {
  const i = parseInt(req.params.index) + 1;
  const result = await pool.query(`SELECT * FROM messages WHERE id = ${i};`);
  const row = result.rows[0];
  const message = {
    text: row.message,
    user: row.name,
    added: row.time,
  };
  res.render('detail', { message });
});

router.get('/new', (req, res) => {
  res.render('form');
});

router.post('/new', async (req, res) => {
  const { user, text } = req.body;
  try {
    await pool.query(
      'INSERT INTO messages (name,message,time) VALUES ($1,$2,now())',
      [user, text]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
