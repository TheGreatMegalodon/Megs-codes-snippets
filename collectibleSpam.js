/*
This code once pasted in the console will give the collectible that has been chosen to every players in the game
This allows to have a ton of fun!

(this works with everything that is launchable or placable aka rockets, missiles, torpedos, mines (light and heavy))

WARNING do not reuse the command before the last requst is done, this could either make your game crash or malfunction.
*/

// Console Version

var num = 0; // do not change
const numMax = 200; // amount of collectible distributed in total.
const collectible = 11; // what collectible is used
const init = setInterval(() => {
  if (num === numMax) {
      echo(`\n[[bi;#85ff70;]Ended - ${num}/${numMax}]\n`);
    clearInterval(init);
    return;
  }
  for (let ship of game.ships) {
    if (ship.type === 191 || ship.alive !== true) continue;
    game.addCollectible({code: collectible, x: ship.x, y: ship.y});
    setTimeout(() => {
      ship.emptyWeapons();
    }, 125);
  }
  num++;
  if (num % 10 === 0) {
    echo(`[[i;${(num % 100 === 0) ? "#ff7070" : "#fffc70"};]Step - ${num}/${numMax}]`);
  }
}, 150);
