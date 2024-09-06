const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// CORS 설정
app.use(cors());

// 라우터 불러오기
const moviesRouter = require('./routes/movies');

// 라우터 사용
app.use('/api', moviesRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
