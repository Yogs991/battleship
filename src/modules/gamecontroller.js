//Attack mechanics: player clicking on board to attack
//Game checks if the attack is a hit or miss
//Game updates the board to reflect hit or miss
//Game alternates turns between player and computer
//Tracking ship damage and sinking
//Win conditions: game ends when all ships of a player are sunk
//Message display the winner and reset button appears
//Computer AI: Initialize an attack in a random coordinate, 
// 1) if it misses moves to a random coordiante, 
// 2) if it hits: saves the location, then attacks the surrounding cells
// 3) if it hits again follows the first 2 steps
// once all parts of the ship are hit, it marks the ship as sunk and goes back to random attacks

import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";

const gameController = ()=>{}
