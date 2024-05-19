const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tutam9',
  password: 'postgres',
  port: 5432,
});


app.get('/todo', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todo ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/todo', async (req, res) => {
  try {
    const { description } = req.body;
    const result = await pool.query(
      'INSERT INTO todo (description, status) VALUES ($1, $2) RETURNING *',
      [description, 'incomplete']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete('/todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM todo WHERE id = $1', [id]);
    res.json({ message: 'Task was deleted' });
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/todo/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await pool.query(
        'UPDATE todo SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
