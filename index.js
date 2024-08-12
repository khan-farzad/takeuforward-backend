const mysql = require("mysql2");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id", db.threadId);
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM bannerData";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/", (req, res) => {
  const values = [req.body.description, req.body.link, req.body.expiryTime];
  const q =
    "UPDATE bannerData SET `description` = ?, `link` = ?, `expiryTime` = ? WHERE id = ? ";
  db.query(q, [...values, 12], (err, data) => {
    if (err) return res.json(err);
    return res.json("Updated successfully 200");
  });
});

app.listen(8000, () => {
  console.log("listening on port 8000");
});
