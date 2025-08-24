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
    const carrier = Ship(5,"Carrier");
    carrier.id = "carrier";
    const battleship = Ship(4,"Battleship");
    battleship.id = "battleship";
    const cruiser = Ship(3,"Cruiser");
    cruiser.id = "cruiser";
    const submarine = Ship(3,"Submarine");
    submarine.id = "submarine";
    const destroyer = Ship(2,"Destroyer");
    destroyer.id = "destroyer";
    const shipsArray = [carrier,battleship,cruiser,submarine,destroyer];

    //function placing ships randomly on boards
    const placeShipsRandomly = (board)=>{
        shipsArray.forEach(ship=>{
            let placed = false;
            while(!placed){
                const x = Math.floor(Math.random()*10);
                const y = Math.floor(Math.random()*10);
                const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
                placed = board.placeShip(ship, x, y, direction);
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
        let attackCoords = {};
        if( currentPlayer === humanPlayer){
            attackResult = computerBoard.receiveAttack(x,y);
            attackCoords = {x,y};
        }else{
            let validAttack = false;
            while(!validAttack){
                const randomX = Math.floor(Math.random()*10);
                const randomY = Math.floor(Math.random()*10);
                computerAttack = playerboard.receiveAttack(randomX,randomY);
                if(computerAttack !== "Already been hit"){
                    attackResult = computerAttack;
                    validAttack = true;
                    attackCoords = {x: randomX, y: randomY};
                }
            }
        }
        gameStatus = switchTurns();
        if(typeof attackResult === "object"){
            return{
                attackResult: attackResult.result,
                shipId: attackResult.shipId,
                x: attackCoords.x,
                y: attackCoords.y,
                gameStatus,
                currentPlayer: currentPlayer.name,
            }
        }
        return{
            attackResult,
            gameStatus,
            currentPlayer: currentPlayer.name,
            x: attackCoords.x,
            y: attackCoords.y,
        };
    }

    //function that resets the game 
    const resetGame = ()=>{
        for(let x = 0; x < 10; x++){
            for(let y = 0; y < 10; y++){
                playerboard.board[x][y] = null;
                computerBoard.board[x][y] = null;
            }
        }
        playerboard.ships.length = 0;
        computerBoard.ships.length = 0;
        placeShipsRandomly(playerboard);
        placeShipsRandomly(computerBoard);
    };
    
    return{
        getHumanPlayer: ()=> humanPlayer,
        getComputerPlayer:()=> computerPlayer,
        getCurrentPlayer: ()=> currentPlayer,
        getPlayerBoard: ()=> playerboard,
        getComputerBoard: ()=> computerBoard,
        shipsArray,
        placeShipsRandomly,
        attackOpponent,
        allShipsDestroyed,
        switchTurns,
        resetGame,
    };
}

module.exports = GameController;
