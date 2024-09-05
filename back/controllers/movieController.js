const Movie = require('../models/movieModel');

// 모든 영화 목록을 가져오는 함수
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

// 영화 제목이나 배우 이름으로 검색하는 함수
exports.searchMovies = async (req, res) => {
    const query = req.query.q;
    try {
        const movies = await Movie.search(query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
};
