const Ship = require ("../modules/ship");

test("Ship not sunk", () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false)
});

test("Sink ship", () => {
    const ship = new Ship(2);
    ship.isHit();
    ship.isHit()
    expect(ship.isSunk()).toBe(true);
});