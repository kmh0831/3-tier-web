const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to RDS:', err);
    return;
  }
  console.log('Connected to RDS');
});

module.exports = connection;
