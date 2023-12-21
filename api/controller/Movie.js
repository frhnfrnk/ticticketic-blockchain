const ethers = require("ethers");

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {
  abi,
} = require("../../artifacts/contracts/Ticticketic.sol/Ticticket.json");
const Movie = require("../models/Movie");
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

function generateRandomSixDigitNumber() {
  const randomDecimal = Math.random();
  const randomSixDigitNumber = Math.floor(randomDecimal * 1000000);
  const paddedSixDigitNumber = String(randomSixDigitNumber).padStart(6, "0");
  return paddedSixDigitNumber;
}

// Contoh penggunaan

exports.addMovie = async (req, res) => {
  const { title, genre, price, maxTickets, day, time } = req.body;

  try {
    let check = false;
    let movieCode = 0;
    while (check == false) {
      const code = generateRandomSixDigitNumber();
      const checkMovie = await Movie.find({ movieCode });
      if (checkMovie.length == 0) {
        check = true;
        movieCode = code;
      }
    }
    const movieToDatabase = await Movie.create({
      movieCode,
      title,
      genre,
      price,
      availableTicket: maxTickets,
      maxTicket: maxTickets,
      day,
      time,
    });

    const movie = await contract.add(movieCode, maxTickets, price);
    await movie.wait();
    res.status(200).json({ message: "Movie added" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const allMovies = await contract.getAllMovies();
    const movies = allMovies.map((movie) => ({
      id: parseInt(movie.id),
    }));
    const moviesFromDatabase = await Movie.find({
      movieCode: { $in: movies.map((movie) => movie.id) },
    });
    res.status(200).json(moviesFromDatabase);
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const getMovie = await contract.getMovie(id);
    const idMovie = parseInt(getMovie.id);
    const availableTicket = parseInt(getMovie.tickets);
    let movie = await Movie.findOne({ movieCode: idMovie });
    movie.availableTicket = availableTicket;
    await movie.save();
    res.status(200).json({ movie });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    const movieCode = movie.movieCode;
    const deleteMovie = await contract.deleteMovie(movieCode);
    await deleteMovie.wait();
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, genre, day, time } = req.body;
  try {
    const movie = await Movie.findOne({ movieCode: id });
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    }

    movie.title = title;
    movie.genre = genre;
    movie.day = day;
    movie.time = time;
    await movie.save();
    res.status(200).json({ message: "Movie updated" });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};
