/*
This code creates asteroid waves like the well known mode SAW.
*/

// Console Version

let num = 15; // Number of asteroids
let delay =0.75; // delay between asteroids break
for (let i = 0; i<num; i++) {
  let coords = [...new Array(game.options.map_size*10)].map((j, i) => -game.options.map_size*5 + i);
  let speed = [...new Array(40)].map((j, i) => -2 + (i/10));
  game.addAsteroid({size: 100, x: coords[~~(Math.random()*coords.length)], y: coords[~~(Math.random()*coords.length)], vx: speed[~~(Math.random()*speed.length)], vy: speed[~~(Math.random()*speed.length)]});
}
let kast = setInterval(() => {
  for (let ast of game.asteroids) {
    if (ast.custom.killed === true || ast.id < 0 || ast == null) continue;
    ast.set({kill: true, vx: ast.vx*1.4, vy: ast.vy*1.4});
  }
  echo("asteroid num: "+game.asteroids.length);
  if (game.asteroids.length === 0) {
    clearInterval(kast);
  }
}, delay*1000);
this.event = function(event) {
  if (event.name == asteroid_destroyed) event.asteroid.custom.killed = true;
};
