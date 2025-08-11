// const Ship = require("../ship/ship");
// const Player = require("../player/player");
// const Gameboard = require("../gameboard/Gameboard");
const gameController = require("../game/Game");

const DOMController = ()=>{
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");
    const startButton = document.getElementById("start-button");
    
    const initGame =()=>{
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
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
        console.log(
            `Rendered ${boardElement.children.length} cells for #${boardElement.id}`
        );
    }

    if(startButton){
        startButton.addEventListener("click",()=>{
            console.log("start button clicked");
            
            initGame();
        });
    }else{
        console.log("start button not found");
        
    }

    return{initGame};
}

module.exports = DOMController;