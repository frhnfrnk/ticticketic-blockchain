// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ticticket is ERC721 {
    address public owner;
    uint256 public totalMovies;
    uint256 public totalSupply;
    uint256 public totalAdmins;
    uint256 public idIncrement = 202300;

    struct Movie {
        uint256 id;
        uint256 price;
        uint256 tickets;
        uint256 maxTickets;
    }
    
    struct Ticket {
        uint256 id;
        uint256 movieId;
        uint256 seat;
        address owner;
    }


    mapping(uint256 => Movie) public movies;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;
    Movie[] public movieArray;
    Movie public removeMe;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function add(
        uint256 _id,
        uint256 _maxTickets,
        uint256 _price
    ) public onlyOwner {
        totalMovies++;
        uint256 maxTickets = _maxTickets;
        uint256 ticketsMax = _maxTickets;
        Movie memory movie = Movie(
            _id,
            _price,
            ticketsMax,
            maxTickets
        );
        movies[_id] = movie;
        movieArray.push(
            Movie(
                _id,
                _price,
                ticketsMax,
                maxTickets
            )
        );
    }

    function buy(uint256 _id, uint256 _seat) public payable  {
        // Require that _id is not 0 or less than total occasions...
        require(_id != 0, "Movie tidak ditemukan");

        // Require that ETH sent is greater than price...
        require(msg.value != movies[_id].price, "Harga tidak valid");

        // Require that the seat is not taken, and the seat exists...
        require(seatTaken[_id][_seat] == address(0), "Seat tidak valid");
        require(_seat <= movies[_id].maxTickets, "Seat tidak sesuai");

        movies[_id].tickets -= 1; // <-- Update ticket count

        hasBought[_id][msg.sender] = true; // <-- Update buying status
        seatTaken[_id][_seat] = msg.sender; // <-- Assign seat

        seatsTaken[_id].push(_seat); // <-- Update seats currently taken

        totalSupply++;
        Ticket memory ticket = Ticket(totalSupply,_id, _seat, msg.sender);
        tickets[totalSupply] = ticket;

        _safeMint(msg.sender, totalSupply);
    }

    function getTicketById(uint256 _id) public view returns (Ticket memory) {
        require(_id != 0, "Ticket tidak ditemukan");
        require(_id <= totalSupply, "Ticket tidak ditemukan");
        require(tickets[_id].owner == msg.sender, "Ticket tidak ditemukan");
        return tickets[_id];
    }

    function getTicketBySender() public view returns (Ticket[] memory) {
        Ticket[] memory allTickets = new Ticket[](totalSupply);
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (tickets[i].owner == msg.sender) {
                allTickets[counter] = tickets[i];
                counter++;
            }
        }
        return allTickets;
    }

    function getTicketByMovie(uint256 _id)
        public
        view
        returns (Ticket[] memory)
    {
        require(_id != 0, "Movie tidak ditemukan");
        // find ticket user by movie id
        Ticket[] memory allTickets = new Ticket[](movies[_id].maxTickets);
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (tickets[i].movieId == _id) {
                allTickets[counter] = tickets[i];
                counter++;
            }
        }
        return allTickets;
    }

    function getMovie(uint256 _id) public view returns (Movie memory) {
        require(_id != 0, "Movie tidak ditemukan");
        Movie memory movie = movies[_id];
        return movie;
    }

    function deleteMovie(uint256 _id) public onlyOwner {
        require(movies[_id].id != 0, "Movie ID tidak valid");

        // Memeriksa apakah _id dalam rentang yang valid (sesuai kebutuhan)
        delete movies[_id];
        for (uint i = 0; i < movieArray.length; i++){
            if(movieArray[i].id == _id){
                removeMe = movieArray[i];
                movieArray[i] = movieArray[movieArray.length - 1];
                movieArray[movieArray.length - 1] = removeMe;
            }
        }
        movieArray.pop();
    }

    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

    function getAllMovies() public view returns (Movie[] memory) {
        return movieArray;
    }
}