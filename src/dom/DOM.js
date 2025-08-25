//~~ToDo Tasks~~
//10) Ελεγχος οταν ολα τα πλοια βυθιστουν "Player Won/ Computer Won" και ενα button για reset σε modal?
// Καπου το computer board εχει hidden ολα τα cells γιαυτο δεν εμφανιζει τα hits και miss
// Αν οχι το απο πανω τοτε δεν περναει τα hit και miss classes 


const gameController = require("../game/Game");
const game = gameController("player");

const DOMController = ()=>{
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");
    const startButton = document.getElementById("start-button");
    const randomizeButton = document.getElementById("randomize-button");
    const resetButton = document.getElementById("reset-button");
    const playerShips = document.getElementById("player-ships");
    const computerShips = document.getElementById("computer-ships");
    const showMessage = document.getElementById("show-message");
    

    //Initializes the game
    const initGame =()=>{
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
        renderShips(playerBoardElement, game.getPlayerBoard(), false);
        renderShipList(playerShips, game.shipsArray);
        renderShipList(computerShips, game.shipsArray);
        // enableBoardListener();
    }
    
    //Creates the boards used by both players
    const renderBoard = (boardElement)=>{
        boardElement.innerHTML = "";
        for (let x = 0; x < 10; x++){
            for (let y = 0; y < 10; y++){
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.x = x;
                cell.dataset.y = y;
                boardElement.appendChild(cell);
            }
        }
    }

   //Creates the ships inside the boards
    const renderShips = (boardElement, gameboard, isComputer = false)=>{
        for (let x = 0; x < 10; x++){
            for (let y = 0; y < 10; y++){
                const cellElement = boardElement.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                const ship = gameboard.board[x][y];
                if(!isComputer && gameboard.board[x][y] !== null){
                    cellElement.classList.add("ship");
                }
                if(ship && ship.id){
                    cellElement.dataset.shipId = ship.id;
                }
            }
        }
    }

    //Creates the box under the boards that contains the ships
    const renderShipList = (shipList, shipsArray) => {
        if (!shipList) return;
        shipList.innerHTML = "";
        shipsArray.forEach(ship => {
            const shipWrapper = document.createElement("div");
            shipWrapper.classList.add("ship-item");
            shipWrapper.dataset.shipId = ship.id;
            for (let i = 0; i < ship.length; i++) {
                const box = document.createElement("div");
                box.classList.add("ship-box");
                shipWrapper.appendChild(box);
            }
            const label = document.createElement("span");
            label.textContent = `${ship.name}`;
            label.classList.add("ship-label");
            shipWrapper.appendChild(label);
            shipList.appendChild(shipWrapper);
        });
    };

    //Function that handles the player clicks in opponent's board
    const handleCellClick = (event)=>{
        const cell = event.target;
        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);
        const clickedResult = game.attackOpponent(x,y);
        updateCellUI(cell, clickedResult.attackResult, clickedResult.shipId);
        updateMessage(clickedResult.attackResult);
        if(clickedResult.gameStatus === "Human Won" || clickedResult.gameStatus === "Computer Won"){
            endGame(clickedResult.gameStatus);
            return;
        }
        if(clickedResult.currentPlayer === "Computer"){
            updateMessage("Computer Turn");
            setTimeout(() => {
                handleComputerTurn();
            }, 2000);
        }else{
            updateMessage("Player Turn");
        }
    };

    //Function that helps change the style of clicked cells
    const updateCellUI = (cellElement, result, shipId = null)=>{
        if(result === "miss"){
            cellElement.classList.add("miss");
            updateMessage("Missed");
        }else if(result === "hit"){
            cellElement.classList.add("hit");
            updateMessage("Hit!");
        }else if(result === "Already been hit"){
            updateMessage("Already been hit");
        }else if (result === "sunk" && shipId){
            removeShipFromList(shipId);
        }
    };

    //Function that changes the h2 in html
    const updateMessage = (text)=>{
        showMessage.textContent = text;
    };

    //Function that handles the computer AI action
    const handleComputerTurn = () =>{
        const result = game.attackOpponent();
        const playerCell = playerBoardElement.querySelector(`.cell[data-x="${result.x}"][data-y="${result.y}"]`);
        updateCellUI(playerCell, result.attackResult, result.shipId);
        updateMessage(result.attackResult);
        if(result.gameStatus === "Human Won" || result.gameStatus === "Computer Won"){
            endGame(result.gameStatus);
            return;
        }

        updateMessage("Player Turn");
    }

    //Function that removes ship when it gets sunk from the div .ship-container which contains all ships under the boards
    const removeShipFromList = (shipId)=>{
        const playerShipElement = playerShips.querySelector(`[data-ship-id=${shipId}]`);
        const computerShipElement = computerShips.querySelector(`[data-ship-id=${shipId}]`);
        if(playerShipElement){
            playerShipElement.remove();
        }else{
            computerShipElement.remove();
        }
    }

    //Function that checks when game ends when conditions are met
    const endGame = (winner)=>{
       if(winner === "Human Won"){
        updateMessage("Human Won");
       }else if(winner === "Computer Won"){
        updateMessage("Computer Won");
       }

       const cells = document.querySelectorAll(".cell");
       cells.forEach(cell=>{
        cell.removeEventListener("click", handleCellClick);
       });
    }

    //Event listener starting the game
    startButton.addEventListener("click",()=>{
        initGame();
        enableBoardListener();
        startButton.style.display = "none";
        updateMessage("Player Turn");
    });
    
    //Event listener for random ship placement with random button
    randomizeButton.addEventListener("click",()=>{
        game.resetGame();
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
        renderShips(playerBoardElement, game.getPlayerBoard(),false);
        renderShips(computerBoardElement, game.getComputerBoard(),true);
        enableBoardListener();
    });
    
    //Event listener resetting the game with reset button
    resetButton.addEventListener("click",()=>{
        game.resetGame();
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
        renderShipList(playerShips, game.shipsArray);
        renderShipList(computerShips, game.shipsArray);
        showMessage.textContent = "";
    });

    //Event listener that enables the handleCellClick function after the game starts
    const enableBoardListener = ()=>{
        const cells = computerBoardElement.querySelectorAll(".cell");
        cells.forEach(cell=>{
            cell.addEventListener("click",handleCellClick);
        });
    }
    
    return{initGame};
}

module.exports = DOMController;