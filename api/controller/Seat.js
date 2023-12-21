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

exports.getSeatTaken = async (req, res) => {
  const { id } = req.params;
  try {
    const getSeat = await contract.getSeatsTaken(id);
    const seat = getSeat.map((seat) => ({
      seat: parseInt(seat),
    }));
    res.status(200).json(seat);
  } catch (err) {
    res.status(404).json({ message: err.reason });
  }
};
