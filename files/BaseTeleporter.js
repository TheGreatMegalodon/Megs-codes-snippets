/*
Functions used to teleport a certain player to a specific station

thanks jannes ;)
*/

function OrangeBase() {
  let x = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.cos((game.step / 216000 + (2 / 2)) * Math.PI * 2);
  let y = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.sin((game.step / 216000 + (2 / 2)) * Math.PI * 2);
  return [x, y];
}

function GreenBase() {
  let x = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.cos((game.step / 216000 + (1 / 3)) * Math.PI * 2);
  let y = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.sin((game.step / 216000 + (1 / 3)) * Math.PI * 2);
  return [x, y];
}

function BlueBase() {
  let x = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.cos((game.step / 216000 + (2 / 3)) * Math.PI * 2);
  let y = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.sin((game.step / 216000 + (2 / 3)) * Math.PI * 2);
  return [x, y];
}

function PinkBase() {
  let x = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.cos((game.step / 216000 + (1 / 2)) * Math.PI * 2);
  let y = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.sin((game.step / 216000 + (1 / 2)) * Math.PI * 2);
  return [x, y];
}

function YellowBase() {
  let x = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.cos((game.step / 216000 + (2 / 2)) * Math.PI * 2);
  let y = ((Math.sqrt(2) / 2) * game.options.map_size * 5) * Math.sin((game.step / 216000 + (2 / 2)) * Math.PI * 2);
  return [x, y];
}

const bases = [OrangeBase, GreenBase, BlueBase, PinkBase, YellowBase];
tpto = function(what) {
  if (what >= 0 && what < bases.length) {
    const baseCoordinates = bases[what]();
    game.ships[0].set({x: baseCoordinates[0], y: baseCoordinates[1]});
  }
}
