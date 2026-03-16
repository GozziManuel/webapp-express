const express = require("express");
const app = express();
const dbConnection = require("./database/databaseMovie");

console.log("User:", process.env.DB_USER);
app.get("/", (req, res) => {
  const sqlMovies = "SELECT * FROM `db-movies`.movies";
  connection.query(sqlMovies);
  res.json({
    success: true,
    result: "movies",
  });
});
