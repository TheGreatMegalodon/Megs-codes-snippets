/*
Copy that in the console when the mode is running and it will give you every players name+ID that are currently in the game
the ID is the used in commands usally like this:
    game.findShip(ID).set({type: 101, crystals: 999, shield: 10, x: 0, y: 0});
*/

game.modding.terminal.echo(`Total number of players: ${game.ships.length}\n\nPlayers:\n${game.ships.map(ship => {`Name: ${ship.name} ID: ${ship.id}`;}).join("\n")}\n`);
