const Gameboard = require("../gameboard/Gameboard");

const Player = (name)=>{
    const gameboard = Gameboard();
    return{name, gameboard};
}

module.exports = Player;