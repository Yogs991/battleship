// const carrier = new Ship("carrier", 5);
// const battleship = new Ship("battleship",4);
// const cruiser = new Ship("cruiser",3);
// const submarine = new Ship("submarine",3);
// const destroyer = new Ship("destroyer",2);

import Gameboard from "./modules/gameboard";

const gameboard = Gameboard();
gameboard.receiveAttack(0,2);
gameboard.receiveAttack(1,5);
gameboard.receiveAttack(0,1);
