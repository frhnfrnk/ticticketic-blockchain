require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-toolbox");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: "HPXR4VU5RDVE2TBPFCCC427E7J69ZYXEQS",
  },
};
