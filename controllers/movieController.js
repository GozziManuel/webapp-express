const connection = require("../database/databaseMovie");

function index(req, res) {
  const sqlMovies = "SELECT * FROM movies";
  connection.query(sqlMovies, (err, result) => {
    res.json({
      success: true,
      message: "Ecco a voi i films",
      results: result,
    });
  });
}
module.exports = { index };
