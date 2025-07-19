// const Gameboard = require("./Gameboard");
// const Ship = require("../ship/ship");

describe("Gameboard", ()=>{
    let gameboard;
    beforeEach(()=>{
        const Gameboard = require("./Gameboard");
        gameboard = Gameboard();
    });
    
    test("place ship correctly",()=>{
        expect(gameboard.placeShip(2,1,3,"vertical")).toEqual(true);
        expect(gameboard.ships.length).toBe(1);
    });

    test("prevents invalid ship placement",()=>{
        expect(gameboard.placeShip(0,8,3,"horizontal")).toBe(false);
        expect(gameboard.placeShip(8,0,3,"vertical")).toBe(false);
    });

    test("records a missed attack",()=>{
        expect(gameboard.receiveAttack(5,5)).toBe("miss");
        expect(gameboard.missedAttack).toContainEqual({x:5,y:5});
    });

    test("hits a ship correctly",()=>{
        gameboard.placeShip(2,2,3,"horizontal");
        expect(gameboard.receiveAttack(2,2)).toBe("hit");
    });

    test("doesn't allow to hit a spot twice",()=>{
        gameboard.receiveAttack(2,2);
        expect(gameboard.receiveAttack(2,2)).toBe("Already been hit");
    });

    test("all ships has sunk",()=>{
        gameboard.placeShip(0, 0, 2, "horizontal");
        expect(gameboard.ships.length).toBe(1);
        expect(gameboard.receiveAttack(0, 0)).toBe("hit");
        expect(gameboard.receiveAttack(0, 1)).toBe("sunk");
        expect(gameboard.allShipsSunk()).toBe(true);
    });
});
