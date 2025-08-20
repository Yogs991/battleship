//~~ToDo Tasks~~
//6) οταν κανεις click 1 cell αναλογα αν ειναι hit γινεται κοκκινο και αν ειναι miss σκουρο μπλε
//7) αν βαρεσεις to ηδη χτυπημενο cell βγαζει μηνυμα στο ιδιο h2 "Already hit this cell"
//8) οταν βυθισεις ενα πλοιο τελειως να σβηνει απο το div που τα περιεχει ολα
//9) μηνυμα σε h2 tag πανω απο τα boards που λεει "Player turn" και "Computer turn"
//10) Ελεγχος οταν ολα τα πλοια βυθιστουν "Player Won/ Computer Won" και ενα button για reset σε modal?

//~~ToDo Tasks Done~~
    //1) render τα boards - DONE
    //2) reset button για να κανεις reset το UI - DONE
    //3) ενα div που εχει τα  5 πλοια του καθε παιχτη κατω απο τα board τους - DONE
    //4) randomize button για τα πλοια - DONE
    //5) τα πλοια του αντιπαλου πρεπει να ειναι hidden - DONE

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
    const currentPlayer = game.currentPlayer;
    
    const initGame =()=>{
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
        renderShips(playerBoardElement, game.getPlayerBoard(), false);
        renderShipList(playerShips, game.shipsArray);
        renderShipList(computerShips, game.shipsArray);
        handleCellClick();
    }
    
    const renderBoard = (boardElement)=>{
        boardElement.innerHTML = "";
        for (let y = 0; y < 10; y++){
            for (let x = 0; x < 10; x++){
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.y = y;
                cell.dataset.x = x;
                boardElement.appendChild(cell);
            }
        }
    }
   
    const renderShips = (boardElement, gameboard, isComputer = false)=>{
        for (let x = 0; x < 10; x++){
            for (let y = 0; y < 10; y++){
                const cellElement = boardElement.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                if(!isComputer && gameboard.board[x][y] !== null){
                    cellElement.classList.add("ship");
                }
            }
        }
    }

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

    const handleCellClick = ()=>{
        const computerBoardCells = computerBoardElement.querySelectorAll(".cell");
        computerBoardCells.addEventListener("click",()=>{
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            const cellClicked = game.attackOpponent(x,y);
            updateCellUI(cell, cellClicked);
            if(game.attackOpponent.currentPlayer === "Computer"){
                handleComputerClick();
            }
        });
    }

    const updateCellUI = (cellElement, attackResult)=>{
        cellElement.addEventListener("click",()=>{
            if(attackResult === "miss"){
                cellElement.classList.add("miss");
                showMessage.textContent = "Missed";
            }else if(attackResult === "hit"){
                cellElement.classList.add("hit");
                showMessage.textContent = "Hit the ship";
            }else if(attackResult === "Already been hit"){
                showMessage.textContent = "Already been hit";
                return;
            }else if (attackResult === "hit"){
                //Add sunk feature
            };
        });
    }

    const handleComputerClick = ()=>{}


    startButton.addEventListener("click",()=>{
        initGame();
        startButton.style.display = "none";
    });
    
    randomizeButton.addEventListener("click",()=>{
        game.resetGame();
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
        
        renderShips(playerBoardElement, game.getPlayerBoard(),false);
        renderShips(computerBoardElement, game.getComputerBoard(),true);
    });
    
    resetButton.addEventListener("click",()=>{
        game.resetGame();
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
    });
    
    return{initGame};
}

module.exports = DOMController;