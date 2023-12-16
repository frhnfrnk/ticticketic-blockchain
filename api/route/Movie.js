const express = require("express");
const {
  getAllMovies,
  addMovie,
  getMovie,
  deleteMovie,
  totalMovies,
  updateMovie,
} = require("../controller/Movie");
const router = express.Router();

router.get("/", getAllMovies);
router.post("/", addMovie);
router.get("/:id", getMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);
module.exports = router;
