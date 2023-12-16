require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ethers = require("ethers");

let port = process.env.PORT || 3000;

const MovieRouter = require("./api/route/Movie");
const TicketRouter = require("./api/route/Ticket");

app.get("/", (req, res) => {
  res.send("Ticticketic API!");
});

app.use("/movie", MovieRouter);
app.use("/ticket", TicketRouter);

app.listen(port, () => {
  console.log("Server is running on port 3000.");
});
