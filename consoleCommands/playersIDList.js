/*
Copy that in the console when the mode is running.
It will then give you a list of every players (name+ID) that are currently in the game.

The ID is frequently used in commands like this:
    game.findShip(ID).set({type: 101, crystals: 999, shield: 10, x: 0, y: 0});
*/

const amount = game.ships.length;
const players = game.ships.map(ship => `Name: ${ship.name} ID: ${ship.id}`).join("\n");
game.modding.terminal.echo(`Total number of players: ${amount}\n\nPlayers:\n${players}\n`);
