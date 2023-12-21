const mongoose = require("mongoose");

const Transactions = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
      ref: "Movie",
    },
    seat: {
      type: Number,
      required: true,
    },
    signer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transactions", Transactions);
