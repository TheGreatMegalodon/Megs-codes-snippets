/*
Console command that makes everyone go at super high speeds
*/

var start = 0;
const end = 100;
const int = setInterval(() => {
  if (start >= end) {
    clearInterval(int);
    return;
  }
  start++;
  game.ships.forEach(ship => ship.set({vx: 9999})) 
}, 100);
