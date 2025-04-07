// 1) Place ships at specific coordinates by calling the ship class

// 2) receiveAttack function to specify if a ship was hit or not and send the "hit"
//    function to the correct ship or record the coordinates of the missed shot

// 3) Track  missed attacks to display them properly

// 4) Track if all the ships have been sunk
const Ship = require("./ship");

const Gameboard = ()=>{
    const size = 10;
    const board = [];
    const ships = [];
    const missedAttack = [];
    for(let i=0; i<size; i++){
        board[i] = [];
        for(let j=0; j<size; j++){
            board[i][j]=null;
        }
    }
    console.log(board);
    

    const placeShip = (x, y, length,direction)=>{
        if(!isValidPlacement(x,y,length,direction)){
            console.log("wrong placement");
            return false;
        }else{
            const ship = new Ship(5);
            ships.push(ship);
            for(let i=0; i<length; i++){
                if( direction === "horizontal"){
                    board[x][y+i] = ship;
                }else if( direction === "vertical"){
                    board[x+i][y] = ship;
                }
            }
            return true;
        }
    }

    const isValidPlacement = (x, y, length, direction)=>{
        if(direction === "horizontal"){
            if(y + length>10){
                return false;
            }
            for(let i=0; i<length; i++){
                if(board[x][y+i] !== null){
                    return true;
                } 
            }
        }else if(direction ==="vertical"){
            if(x + length > 10){
                return false;
            }
            for(let i = 0; i < length; i++){
                if(board[x+i][y] !== null){
                    return true;
                }
            }
        }
        return true;
    }

    const receiveAttack = (x, y)=>{
        const target = board[x][y];
        if(target === null){
            board[x][y] = "X";
            missedAttack.push({x,y});
            console.log(missedAttack);
            return "miss";
        }else if(typeof target === "object" && target.isHit){
            target.isHit();
            board[x][y] = "!"
            if(target.isSunk()){
                console.log("Sunk");
                return "Sunk";
            }
            return "hit";
        }else if( target === "X" || target === "!"){
            console.log("Already been hit");
            return("Already been hit");
        }
    }

    const allShipsSunk = ()=>{
        return ships.every(ship=>ship.isSunk())
    };
    return{board, ships, missedAttack ,placeShip, isValidPlacement, receiveAttack, allShipsSunk}
}

export default Gameboard;