const Ship = require("./ship");

test("Ship not sunk", ()=>{
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false);
});

test("ship object has correct methods",()=>{
    const ship = Ship(2);
    expect(typeof ship.isHit).toBe("function");
    expect(typeof ship.isSunk).toBe("function");
})

test("Sink Ship", ()=>{
    const ship = new Ship(2);
    ship.isHit();
    ship.isHit();
    expect(ship.isSunk()).toBe(true);
})