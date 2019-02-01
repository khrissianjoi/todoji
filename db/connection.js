/*
  This file will be used to create a MySQL connection pool, to later be used
  by the models.
*/
const mysql = require('mysql');

// Pool configuration, most of which is taken from environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 90,
  queueLimit: 1000,
  waitForConnections: true,
});

/*
Wrapping pool.query to be promise based instead of using callbacks

eg:
  pool.query('SHOW TABLES', (error, results, fields) => {
    console.log(results);
  })

becomes:
  const outcome = await pool.query('SHOW TABLES');
  console.log(outcome);
*/
pool.queryOriginal = pool.query;

pool.query = (...args) => {
  return new Promise((resolve, reject) => {
    pool.queryOriginal(...args, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve({results: results.map(r => ({...r})), fields});
      }
    });
  });
};

module.exports = pool;
