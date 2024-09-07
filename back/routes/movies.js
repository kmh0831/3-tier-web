// routes/movies.js
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const router = express.Router();

// MySQL RDS 데이터베이스 연결 설정
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// 영화 데이터 가져오기
router.get('/movies', async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    // DB에서 영화 리스트를 가져옴 (trailer_url 포함)
    const [rows] = await connection.query('SELECT * FROM movies');
    res.json(rows);  // 모든 영화 데이터를 JSON 형태로 반환
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Failed to retrieve movies' });
  } finally {
    if (connection) await connection.end();
  }
});

module.exports = router;
