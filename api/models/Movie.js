const mongoose = require("mongoose");

const Movie = new mongoose.Schema(
  {
    movieCode: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    genre: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxTicket: {
      type: Number,
      required: true,
    },
    availableTicket: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", Movie);
