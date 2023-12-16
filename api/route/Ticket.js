const express = require("express");
const {
  buyTicket,
  getTicketMovie,
  getTicketUser,
} = require("../controller/Ticket");
const router = express.Router();

router.post("/", buyTicket);
router.get("/movie/:id", getTicketMovie);
router.get("/:id", getTicketUser);
module.exports = router;
