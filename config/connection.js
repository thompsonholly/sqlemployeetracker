const mysql = require('mysql2');
require("dotenv").config();

// Connect to MySQL database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);


module.exports = db;