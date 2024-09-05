const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// 모든 영화 목록을 가져오는 라우트
router.get('/', movieController.getAllMovies);

// 영화 검색 라우트
router.get('/search', movieController.searchMovies);

module.exports = router;
