const Ship = require("../ship/ship");
const Player = require("../player/player");


const GameController = (playerName)=>{
    //Initializing players and their boards
    let humanPlayer = Player(playerName, false);
    let computerPlayer = Player("Computer", true);
    let currentPlayer = humanPlayer;
    let playerboard = humanPlayer.gameboard;
    let computerBoard = computerPlayer.gameboard;
    
    //Ships list
    const carrier = Ship(5);
    const battleship = Ship(4);
    const cruiser = Ship(3);
    const submarine = Ship(3);
    const destroyer = Ship(3);
    const shipsArray = [carrier,battleship,cruiser,submarine,destroyer];
    
    //function placing ships randomly on boards
    const placeShipsRandomly = (gameboard)=>{
        shipsArray.forEach(ship=>{
            let placed = false;
            while(!placed){
                const x = Math.floor(Math.random()*10);
                const y = Math.floor(Math.random()*10);
                const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
                placed = gameboard.placeShip(ship, x, y, direction);
            }
        });
    }
    
    placeShipsRandomly(playerboard);
    placeShipsRandomly(computerBoard);

    //function changing turns and deciding the winner if ships are sunk
    const switchTurns = ()=>{
        if(allShipsDestroyed(computerBoard)){
            return "Human Won";
        }else if(allShipsDestroyed(playerboard)){
            return "Computer Won";
        }else{
            currentPlayer = (currentPlayer === humanPlayer) ? computerPlayer : humanPlayer;
            return "Next Turn";
        }
    }

    //function that checks if ships are sunk in current board
    const allShipsDestroyed = (gameboard)=>{
        return gameboard.allShipsSunk();
    }
    
    // function to attack opponent and change current player
    const attackOpponent = (x,y)=>{
        let attackResult = null;
        let gameStatus = "continue";
        if( currentPlayer === humanPlayer){
            attackResult = computerBoard.receiveAttack(x,y);
        }else{
            let validAttack = false;
            while(!validAttack){
                const x = Math.floor(Math.random()*10);
                const y = Math.floor(Math.random()*10);
                attackResult = playerboard.receiveAttack(x,y);
                validAttack = attackResult;
            }
        }
        gameStatus = switchTurns();
        return{
            attackResult,
            gameStatus,
            currentPlayer: currentPlayer.name
        };
    }

    //function that resets the game 
    const resetGame = ()=>{
        playerboard.fill(null);
        computerBoard.fill(null);
        placed = [];
        placeShipsRandomly(playerboard);
        placeShipsRandomly(computerBoard);
    };
    
    return{
        getHumanPlayer: ()=> humanPlayer,
        getComputerPlayer:()=> computerPlayer,
        getCurrentPlayer: ()=> currentPlayer,
        getPlayerBoard: ()=> playerboard,
        getComputerBoard: ()=> computerBoard,
        placeShipsRandomly,
        attackOpponent,
        allShipsDestroyed,
        switchTurns,
        shipsArray,
        resetGame,
    };
}

module.exports = GameController;
//functions for:
// 1) random ship placement for computer player -- DONE
// 2) change turns --DONE
// 3) hit/ miss shots correctly
// 4) check for winner -- DONE
// 5) game over logic -- DONE
