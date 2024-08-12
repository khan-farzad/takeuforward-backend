const mysql = require("mysql2");
const express = require("express");
require("dotenv").config();

const app = express();
const connection = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);
})

module.exports = connection