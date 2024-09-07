const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;  // 환경 변수에서 포트 가져오기 (없으면 5000 사용)

// CORS 설정
app.use(cors());

// JSON 요청 처리 설정 (필요한 경우)
app.use(express.json());

// 라우터 불러오기
const moviesRouter = require('./routes/movies');

// 라우터 사용
app.use('/api', moviesRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
