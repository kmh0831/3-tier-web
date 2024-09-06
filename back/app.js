const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = 5000;

// CORS 설정
app.use(cors());

// MySQL RDS 데이터베이스 연결 설정
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.get('/api/movies', async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM movies');
    res.json(rows);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Failed to retrieve movies' });
  } finally {
    if (connection) await connection.end();
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
