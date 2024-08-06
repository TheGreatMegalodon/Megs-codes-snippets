/*
Paste this in the console and enjoy the rainbow ships!
*/

// Console version

let start = 0;
const end = 20;
const allow_colors = false;
const int = setInterval(() => {
  start++;
  if (start === end) {
    clearInterval(int);
    return;
  }
  for (let ship of game.ships) {
    ship.custom.color = (ship.custom.color < 360) ? ship.custom.color += 20 : 0;
    ship.set({hue:ship.custom.color});
  }
}, 100);
