//Create real player and a computer player option
//Both players should contain its on own gameboard
//Computer player use random attack selection(doesn't the already hit coordinates)
//Manage turn based gameplay
//Track player's remaining ships
//Determine player win/loss conditions

const Player = (name, isComputer=false)=>{
    const attack = (opponentBoard, x, y)=>{
        return opponentBoard.receiveAttack(x,y);
    }

    const makeRandomAttack = (opponentBoard)=>{
        if(!isComputer){
            return null;
        }

        let validAttack = false;
        let x, y;

        while(!validAttack){
            x = Math.floor(Math.random()*10);
            y = Math.floor(Math.random()*10);

            const result = attack(opponentBoard, x, y);
            if(result === "!" || result === "X");{
                validAttack = true;
                return{x, y, result};
            }
        }
    };

    return{name, isComputer, attack, makeRandomAttack}
}

export default Player;