const GameController = require("./Game");
const Gameboard = require("../gameboard/Gameboard");
const Ship = require("../ship/ship");


describe("game controller",()=>{
    test("places correctly 5 ships",()=>{
        const board = Gameboard();
        const game = GameController("testplayer");
        game.placeShipsRandomly(board);
        let shipCellCount = 0;
        for(let i=0; i<board.board.length;i++){
            for(let j=0; j<board.board.length;j++){
                const cell = board.board[i][j];
                if(typeof cell === "object" && cell !== null){
                    shipCellCount++;
                }
            }
        }
        expect(shipCellCount).toBe(18);
    });

    test("places all ships randomly",()=>{
        const board = Gameboard();
        const game = GameController("test");
        game.placeShipsRandomly(board);
        let boardHasShips = false;
        for(let i=0; i<board.board.length;i++){
            for(let j=0; j<board.board.length;j++){
                const cell = board.board[i][j];
                if(typeof cell === "object" && cell !== null){
                    boardHasShips=true;
                }
            }
            if(boardHasShips) break;
        }
        expect(boardHasShips).toBe(true);
    });

});