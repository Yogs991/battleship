const Ship = require("../ship/ship");
const Gameboard = require("../gameboard/Gameboard");
const Player = require("../player/player");

//functions for:
// 1) random ship placement for computer player
// 2) change turns
// 3) hit/ miss shots correctly
// 4) check for winner
// 5) game over logic


const GameController = ()=>{
    let playerBoard;
    let computerBoard;
    let player;
    let computer;
    let currentPlayer;
    let gameOver = false;

    const initGame = ()=>{
        playerBoard = Gameboard();
        computerBoard = Gameboard();
        player = Player("player");
        computer = Player("computer", true);
        currentPlayer = player;
        gameOver = false;
    }

    const shipsList = ()=>{
        const carrier = Ship(5);
        const battleship = Ship(4);
        const cruiser = Ship(3);
        const submarine = Ship(3);
        const destroyer = Ship(2);
        playerBoard.placeShip(carrier,0,0,"horizontal");
        playerBoard.placeShip(battleship,5,3,"vertical");
        playerBoard.placeShip(cruiser,6,0,"vertical");
        playerBoard.placeShip(submarine,0,3,"horizontal");
        playerBoard.placeShip(destroyer,4,1,"horizontal");
    }    

    return{initGame,shipsList}
}

module.exports = GameController;