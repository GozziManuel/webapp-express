const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    result: "Welcome to the site!",
  });
});

const router = require("./routers/router");
app.use("/movies", router);

// Middlewares
const ErrorCalibrator = require("./middlewares/ErrorCalibrator");
const notFound = require("./middlewares/notFound404");
app.use(ErrorCalibrator);
app.use(notFound);

app.listen(3000, () => {});
