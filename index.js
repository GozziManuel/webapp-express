const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

// Cors bypass
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    result: "Welcome to the site!",
  });
});

const router = require("./routers/router");
app.use("/movies", router);

// Public
app.use(express.static("public"));

// Middlewares
const ErrorCalibrator = require("./middlewares/ErrorCalibrator");
const notFound = require("./middlewares/notFound404");
app.use(notFound);
app.use(ErrorCalibrator);

app.listen(3000, () => {});
