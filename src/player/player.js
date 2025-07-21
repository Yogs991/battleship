const Gameboard = require("../gameboard/Gameboard");

const Player = (name,isComputer = false)=>{
    const gameboard = Gameboard();
    return{name, isComputer, gameboard};
}

module.exports = Player;