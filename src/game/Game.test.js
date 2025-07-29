const GameController = require("./Game");
const Gameboard = require("../gameboard/Gameboard");
const player = require("../player/player");
const Ship = require("../ship/ship");

describe("game controller",()=>{
    let game;
    let playerBoard;
    let computerBoard;
    beforeEach(()=>{
        game = GameController("yog");
        playerBoard = game.getPlayerBoard();
        computerBoard = game.getComputerBoard();
    });

    test("places all 5 ships correctly for the player",()=>{
        let shipCellCount = 0;
        for(let i=0; i<playerBoard.board.length;i++){
            for(let j=0; j<playerBoard.board.length;j++){
                const cell = playerBoard.board[i][j];
                if(typeof cell === "object" && cell !== null){
                   shipCellCount++;
                }
            }
        }
    expect(shipCellCount).toBe(18);
    });

    test("places all ships randomly",()=>{
        let boardHasShips = false;
        for(let i = 0; i < playerBoard.board.length; i++){
            for(let j = 0; j < playerBoard.board.length; j++){
                const cell = playerBoard.board[i][j];
                if(typeof cell === "object" && cell !== null){
                    boardHasShips = true;
                }
            }
            if(boardHasShips)break;
        }
        expect(boardHasShips).toBe(true);
    });

    test("should switch to computer Player and return next Turn",()=>{
        const attackResult = game.attackOpponent(0,0);
        expect(attackResult.gameStatus).toBe("Next Turn");
        expect(attackResult.currentPlayer).toBe("Computer");
        expect(game.getCurrentPlayer().name).toBe("Computer");
    });

    test("should switch to player and return next turn",()=>{
        game.attackOpponent(0,0); //Player attacks and turn changes
        const attackResult = game.attackOpponent(); // Computer attacks and turn changes
        expect(attackResult.gameStatus).toBe("Next Turn");
        expect(attackResult.currentPlayer).toBe("yog");
        expect(game.getCurrentPlayer().name).toBe("yog");
    })
});