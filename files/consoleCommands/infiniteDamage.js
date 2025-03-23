/*
Players basically get teleported to the sun, collide with eachothers and get back to where they were.
*/

// Console version

let start = 0; 
const end = 2000; 
const shipTroll = 101;
const coords = [...new Array(2)].map((j, i) => -1 + i); 
for (let ship of game.ships) { 
  ship.custom.x = ship.x; 
  ship.custom.y = ship.y; 
  ship.custom.type = ship.type; 
  ship.custom.crystals = ship.crystals; 
  ship.custom.collider = ship.collider;
} 
const int = setInterval(() => { 
  start++; 
  if (start === end) { 
    clearInterval(int); 
    for (let ship of game.ships) {
      ship.set({shield:999, generator:999, x: ship.custom.x, y: ship.custom.y, type: ship.custom.type, crystals: ship.custom.crystals, collider: ship.custom.collider}); 
    }
  } else for (let ship of game.ships) {
      ship.set({type: shipTroll, shield:0, crystals:999999, generator:0, x: coords[~~(Math.random() * coords.length)], y: coords[~~(Math.random() * coords.length)]}); 
    }
}, 10);
