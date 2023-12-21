const express = require("express");
const { getSeatTaken } = require("../controller/Seat");

const router = express.Router();

router.get("/:id", getSeatTaken);
module.exports = router;
