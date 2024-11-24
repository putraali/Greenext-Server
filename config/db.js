// const express = require("express");
// const mysql = require("mysql2");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: "./.env" });

// // connection to db
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   // password:process.env.DB_PASSWORD
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("Error connecting to the database", err.message);
//     return;
//   }
//   console.log("Connected to MySQL Database");
// });
// module.exports = connection;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASWORD || "",
  database: process.env.DB_NAME || "greenext",
  waitForConnections: true,
  connectionLimit: 10, //numnber of concurent connections
  queueLimit: 0, // unlimited queue size
});

module.exports = pool;
