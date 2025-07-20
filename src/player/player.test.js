const Player = require("./player");
const Gameboard = require("../gameboard/Gameboard");

test("create a player with given name",()=>{
    const player = Player("yog");
    expect(player.name).toBe("yog");
});

test("it should create a player with a gameboard",()=>{
    const player = Player();
    expect(player.gameboard).toBeDefined();
});