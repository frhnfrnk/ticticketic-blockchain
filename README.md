<h1 align="center" >
    TicTicketic
</h1>

## About this project
TicTicketic introduces a blockchain-based REST API for film ticket reservations, offering developers a secure and transparent way to integrate and streamline the cinema booking process, ensuring a seamless and enjoyable movie-ticketing experience.

## On-chain
1. **Storing Movie Code, Price, and Maximum Ticket Quantity:**
   - *Description:* Storing the unique code for each movie, its price, and the maximum allowable number of tickets directly on the blockchain.
   - *Purpose:* Ensuring the security and transparency of essential information related to each movie, facilitating tamper-proof access to critical details.

2. **Seat Purchase Transactions:**
   - *Description:* Executing seat purchase transactions directly on the blockchain.
   - *Purpose:* Securing and validating each seat purchase through on-chain transactions, ensuring an auditable and secure record of all ticket transactions.

3. **Transaction Using ETH:**
   - *Description:* Conducting transactions using Ethereum (ETH) as the native cryptocurrency on the blockchain.
   - *Purpose:* Facilitating seamless and decentralized transactions with the use of Ether, providing a standard and widely accepted medium for financial interactions.

## Off-chain:**
1. **Database Storing Movie Details (Genre, Time, Title) in MongoDB:**
   - *Description:* Storing additional movie details such as genre, screening time, and title in an off-chain MongoDB database.
   - *Purpose:* Utilizing MongoDB's flexibility to manage non-critical and dynamic data related to movies, allowing for efficient data retrieval and management.

2. **Storing Transaction History in MongoDB:**
   - *Description:* Storing the complete transaction history, including ticket purchases and other relevant details, in MongoDB.
   - *Purpose:* Leveraging MongoDB to maintain a centralized record of transaction histories, enabling efficient data retrieval and reporting without burdening the main blockchain.

## Links
- **Postman Documentation:** https://documenter.getpostman.com/view/23670076/2s9Ykq7gAZ
- **Etherscan:** https://sepolia.etherscan.io/address/0xd6CF8f3dbe85c3E9bfaA11D723A248BEFFA2414c#code

## Tech Stack
- **NodeJs:** Server-side
- **ExpressJS:** Backend Framework
- **MongoDB:** Database Offchain
- **Hardhat:** Ethereum Framework
- **Solidity:** Smart Contract
- **Sepolia:** Ethereum Testnet
- **Infura:** API Blockchain Infrastructure


## Project structure
Ticticketic
    ├── api
    │   ├── config
    │   ├── controller
    │   ├── models
    │   └── route
    ├── contract
    ├── scripts
    └── test

## How to Run?
1. Clone this repository
    ```````````
    git clone https://github.com/group4paw/auction-fe.git
    ```````````
2. Install NPM Packages
    ```````````
    npm install
    ```````````
3. Run Hardhat
    ```````````
    npx hardhat run --network sepolia  scripts/deploy.js
    ```````````
5. Copy contract address to env
6. Run
    ```````````
    npm run dev
    ```````````

