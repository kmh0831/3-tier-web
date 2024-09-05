const db = require('./db');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM movies', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

exports.search = (query) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM movies WHERE title LIKE ? OR actor LIKE ?', [`%${query}%`, `%${query}%`], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
