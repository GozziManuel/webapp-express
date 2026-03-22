const connection = require("../database/databaseMovie");

function index(req, res) {
  const sqlMovies =
    "SELECT movies.*, AVG(reviews.vote) AS average_vote FROM `db-movies`.movies INNER JOIN `db-movies`.reviews ON movies.id = reviews.movie_id GROUP BY movies.id";
  connection.query(sqlMovies, (err, result) => {
    const movies = result.map((el) => {
      return {
        ...el,
        image: `http://localhost:3000/${el.image}`,
      };
    });
    res.json({
      success: true,
      message: "Ecco a voi i films",
      results: movies,
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
      ((movie.image = `http://localhost:3000/${movie.image}`),
        res.json({ result: movie }));
    });
  });
}
function storeReview(req, res) {
  console.log(req.body);
  const { id } = req.params;
  const { name, vote, abstract } = req.body;

  const sqlReview = `INSERT INTO reviews (movie_id, name, vote, text) VALUES(?, ?, ?, ?);`;
  connection.query(sqlReview, [id, name, vote, abstract], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    console.log(result.insertId);
    const LastReviewSql = "SELECT * FROM reviews WHERE id = ?";
    connection.query(LastReviewSql, [result.insertId], (err, result) => {
      res.json(result[0]);
    });
  });
}
module.exports = { index, show, storeReview };
