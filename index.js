require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./api/config/db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

const ethers = require("ethers");

let port = process.env.PORT || 3000;

const MovieRouter = require("./api/route/Movie");
const TicketRouter = require("./api/route/Ticket");
const SeatRouter = require("./api/route/Seat");

app.get("/", (req, res) => {
  res.send("Ticticketic API!");
});

app.use("/movie", MovieRouter);
app.use("/ticket", TicketRouter);
app.use("/seat", SeatRouter);

app.listen(port, () => {
  console.log("Server is running on port 3000.");
});
