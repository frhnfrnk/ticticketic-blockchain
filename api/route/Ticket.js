const express = require("express");
const {
  buyTicket,
  getTicketMovie,
  getTicketByUser,
} = require("../controller/Ticket");
const router = express.Router();

router.post("/", buyTicket);
router.get("/movie/:id", getTicketMovie);
router.get("/", getTicketByUser);
module.exports = router;
