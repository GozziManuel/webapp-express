const express = require("express");
const router = express.Router();
const postController = require("../controllers/movieController");

router.get("/", postController.index);

router.get("/:id", postController.show);

module.exports = router;
