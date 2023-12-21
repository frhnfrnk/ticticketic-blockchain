const ethers = require("ethers");

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const {
  abi,
} = require("../../artifacts/contracts/Ticticketic.sol/Ticticket.json");
const Movie = require("../models/Movie");
const Transaction = require("../models/Transaction");
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

exports.buyTicket = async (req, res) => {
  const { id, seat, prkey } = req.body;

  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const signer = new ethers.Wallet(prkey, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  try {
    const movie = await Movie.findOne({ movieCode: id });
    let price = movie.price * 0.001;
    const buyTicket = await contract.buy(id, seat, {
      value: ethers.utils.parseEther(price.toString()),
    });
    await buyTicket.wait();

    const transaction = await Transaction.create({
      movieId: id,
      seat,
      price: price,
      signer: signer.address,
    });

    res.status(200).json({ transaction });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

exports.getTicketMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const getTicket = await contract.getTicketByMovie(id);
    let ticket = [];
    for (let i = 0; i < getTicket.length; i++) {
      if (getTicket[i].id != 0) {
        ticket.push({
          id: parseInt(getTicket[i].id),
          movieId: parseInt(getTicket[i].movieId),
          seat: parseInt(getTicket[i].seat),
          owner: getTicket[i].owner,
        });
      }
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.getTicketByUser = async (req, res) => {
  const { prkey } = req.body;
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const signer = new ethers.Wallet(prkey, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  try {
    const getTicket = await contract.getTicketBySender();
    let ticket = [];
    for (let i = 0; i < getTicket.length; i++) {
      if (getTicket[i].id != 0) {
        ticket.push({
          id: parseInt(getTicket[i].id),
          movieId: parseInt(getTicket[i].movieId),
          seat: parseInt(getTicket[i].seat),
        });
      }
    }
    res.status(200).json(ticket);
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};
