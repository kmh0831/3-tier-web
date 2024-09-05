const Movie = require('../models/movieModel');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};

exports.searchMovies = async (req, res) => {
    const query = req.query.q;
    try {
        const movies = await Movie.search(query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
};
