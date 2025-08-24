const Ship = require("../ship/ship.js");

const Gameboard = ()=>{
    const size = 10;
    const board = [];
    const ships = [];
    const missedAttack = [];
    for(let i=0; i<size; i++){
        board[i]= [];
        for(let j=0; j<size; j++){
            board[i][j] = null;
        }
    }

    //function for valid ship placement
    const isValidPlacement = (x, y, length, direction)=>{
        if(direction === "horizontal"){
            if(y + length > size){
                return false; // Checks if ship is out of bounds
            }
            for(let i = 0; i < length; i++){
                if(board[x][y + i] !== null){
                    return false; // Checks if ship overlaps
                }
            }
        }else if(direction === "vertical"){
            if(x + length > size){
                return false; // Checks if ship is out of bounds
            }
            for(let i=0; i < length; i++){
                if(board[x + i][y] !== null){
                    return false; // Checks if ship overlaps
                }
            }
        }else{
            return false;
        }
        return true;
    }

    //placing ship function
    const placeShip = (ship, x, y, direction)=>{
        if(!isValidPlacement(x, y, ship.length, direction)){
            return false;
        }
        for(let i = 0; i < ship.length; i++){
            if(direction === "horizontal"){
                board[x][y + i] = ship;
            }else{
                board[x + i][y] = ship;
            }
        }
        ships.push(ship);
        return true;
    }

    //function for receiving attacks
    const receiveAttack = (x,y)=>{
        if(x < 0 || x >= size || y < 0 || y >= size){
            return "Invalid coordinates";
        }
        const target = board[x][y];
        if(target === null){
            board[x][y] = "X";
            missedAttack.push({x,y});
            return "miss";
        }else if(typeof target === "object" && board[x][y] !== "!"){
            target.isHit();
            board[x][y] = "!";
            if(target.isSunk()){
                return {result:"sunk", shipId: target.id};
            }
            return "hit";
        }else if( target === "X" || target === "!"){
            return("Already been hit");
        }
    }

    //function for sunk ship check
    const allShipsSunk = ()=>{
        return ships.every(ship=>ship.isSunk());
    }

    return {board, ships, missedAttack, placeShip, receiveAttack, allShipsSunk}
}

module.exports = Gameboard;