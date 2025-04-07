const Gameboard = require("../modules/gameboard");
const Ship =  require("../modules/ship")

describe("gameboard",()=>{
    let gameboard;
    beforeEach(()=>{
        gameboard = Gameboard();
    });

    test ("valid ship placement",()=>{
        expect(gameboard.placeShip(0,0,3,"horizontal")).toBe(true);
        expect(gameboard.ships.length).toBe(1);
    });

    test("invalid ship placement",()=>{
        expect(gameboard.placeShip(0,8,3,"horizontal")).toBe(false);
        expect(gameboard.placeShip(8,0,3,"vertical")).toBe(false);
    });

    test("records a missed attack",()=>{
        expect(gameboard.receiveAttack(5,5)).toBe("miss");
    });

    test("hits a ship correctly",()=>{
        gameboard.placeShip(2,2,3,"horizontal");
        expect(gameboard.receiveAttack(2,2)).toBe("hit");
    });

    test("doesnt allow attacking the same spot",()=>{
        gameboard.receiveAttack(4,4);
        expect(gameboard.receiveAttack(4,4)).toBe("Already attacked");
    });

    test("deteces when all ship are sunk", ()=>{
        const ship = Ship(2);
        const ship2 = Ship(2);
        gameboard.ships.push(ship);
        gameboard.ships.push(ship2);
        ship.isHit();
        ship.isHit();
        expect(gameboard.allShipsSunk()).toBe(false);
    });
});