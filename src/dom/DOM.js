//~~ToDo Tasks~~
    //3) ενα div που εχει τα  5 πλοια του καθε παιχτη κατω απο τα board τους
    //6) οταν βυθισεις ενα πλοιο τελειως να σβηνει απο το div που τα περιεχει ολα
    //7) οταν κανεις click 1 cell αναλογα αν ειναι hit γινεται κοκκινο και αν ειναι miss σκουρο μπλε
    //8) μηνυμα σε h2 tag πανω απο τα boards που λεει "Player turn" και "Computer turn"
    //9) αν βαρεσεις to ηδη χτυπημενο cell βγαζει μηνυμα στο ιδιο h2 "Already hit this cell"
    //10) Ελεγχος οταν ολα τα πλοια βυθιστουν "Player Won/ Computer Won" και ενα button για reset σε modal?
    
    //~~ToDo Tasks Done~~
    //1) render τα boards - DONE
    //2) reset button για να κανεις reset το UI - DONE
    //4) randomize button για τα πλοια - DONE
    //5) τα πλοια του αντιπαλου πρεπει να ειναι hidden - DONE

const { container } = require("webpack");
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
    
    const initGame =()=>{
        renderBoard(playerBoardElement);
        renderBoard(computerBoardElement);
        // renderShips(playerBoardElement, game.getPlayerBoard());
        // renderShips(computerBoardElement, game.getComputerBoard());
        renderShipList(playerShips, game.shipsArray);
        renderShipList(computerShips, game.shipsArray);
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

    // const renderShipContainer = (container, shipsArray)=>{
    //     container.innerHTML = "";
    //     const shipWrapper = document.createElement("div");
    //     shipWrapper.classList.add("ship-item");
    //     shipsArray.forEach(ship => {
    //         for(let i = 0; i < ship.length; i++){
    //             const box = document.createElement("div");
    //             box.classList.add("ship-box");
    //             shipWrapper.appendChild(box);
    //         }
    //         container.appendChild(shipWrapper);
    //     });
    // }

    const renderShipList = (container, shipsArray) => {
        if (!container) return;
        container.innerHTML = "";

        shipsArray.forEach((ship, i) => {
            const shipWrapper = document.createElement("div");
            shipWrapper.classList.add("ship-item");
            for (let j = 0; j < ship.length; j++) {
                const box = document.createElement("div");
                box.classList.add("ship-box");
                shipWrapper.appendChild(box);
            }
            const label = document.createElement("span");
            label.textContent = `${ship.name}`;
            label.classList.add("ship-label");
            shipWrapper.appendChild(label);
            container.appendChild(shipWrapper);
        });
    };


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