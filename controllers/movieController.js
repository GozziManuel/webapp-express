const connection = require("../database/databaseMovie");
const { param } = require("../routers/router");

function index(req, res) {
  const sqlMovies =
    "SELECT movies.*, AVG(reviews.vote) AS average_vote FROM `db-movies`.movies INNER JOIN `db-movies`.reviews ON movies.id = reviews.movie_id GROUP BY movies.id";
  connection.query(sqlMovies, (err, result) => {
    res.json({
      success: true,
      message: "Ecco a voi i films",
      results: result,
    });
  });
}
function show(req, res) {
  paramId = parseInt(req.params.id);

  const sql = "SELECT * FROM `db-movies`.movies WHERE id = ?";

  connection.query(sql, [paramId], (err, result) => {
    console.log(result);
    const [movie] = result;
    const reviewSQL = "SELECT * FROM `db-movies`.reviews WHERE movie_id = ?";

    connection.query(reviewSQL, [paramId], (err, reviewResult) => {
      movie.reviews = reviewResult;
      res.json({ result: movie });
    });
  });
}

module.exports = { index, show };
