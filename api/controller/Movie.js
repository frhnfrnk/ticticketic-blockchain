const ethers = require("ethers");

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {
  abi,
} = require("../../artifacts/contracts/Ticticketic.sol/Ticticket.json");
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

exports.addMovie = async (req, res) => {
  const { title, genre, price, maxTickets, day, time } = req.body;
  try {
    const movie = await contract.add(
      title,
      genre,
      price,
      maxTickets,
      day,
      time
    );
    await movie.wait();
    res.status(200).json({ message: "Movie added" });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const allMovies = await contract.getAllMovies();
    const movies = allMovies.map((movie) => ({
      id: parseInt(movie.id),
      title: movie.title,
      genre: movie.genre,
      price: parseInt(movie.price),
      remainingTickets: parseInt(movie.tickets),
      maxTicket: parseInt(movie.maxTickets),
      day: movie.day,
      time: movie.time,
    }));
    res.status(200).json({ movies });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const getMovie = await contract.getMovie(id);
    const movie = {
      id: parseInt(getMovie.id),
      title: getMovie.title,
      genre: getMovie.genre,
      price: parseInt(getMovie.price),
      remainingTickets: parseInt(getMovie.tickets),
      maxTicket: parseInt(getMovie.maxTickets),
      day: getMovie.day,
      time: getMovie.time,
    };
    res.status(200).json({ movie });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  const owner = await contract.deleteMovie(id);
  await owner.wait();
  res.status(200).json({ message: "Movie deleted" });
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, genre, price, maxTickets, day, time } = req.body;
  try {
    const movie = await contract.updateMovie(
      id,
      title,
      genre,
      price,
      maxTickets,
      maxTickets,
      day,
      time
    );
    await movie.wait();
    res.status(200).json({ message: "Movie updated" });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};
