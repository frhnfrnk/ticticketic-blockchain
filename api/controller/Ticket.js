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

exports.buyTicket = async (req, res) => {
  const { id, seat } = req.body;
  try {
    const buyTicket = await contract.buy(id, seat, {
      value: ethers.utils.parseEther("0.00001"),
    });
    await buyTicket.wait();
    res.status(200).json({ buyTicket });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

exports.getTicketMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const getTicket = await contract.getTicketByMovie(id);

    res.status(200).json({ getTicket });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};

exports.getTicketUser = async (req, res) => {
  const { id } = req.params;
  try {
    const getTicket = await contract.getTicketById(id);
    const ticket = {
      id: parseInt(getTicket.id),
      movieId: parseInt(getTicket.movieId),
      movie: getTicket.movie,
      seat: parseInt(getTicket.seat),
    };
    res.status(200).json({ ticket });
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};
