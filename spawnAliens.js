/*
This code is used to spawn aliens as desired
it is pretty handy and can be used in may ways
*/

spawnAliens.action(game); // this line has to be added in the this.tick block in order for the code to work. 

const spawnAliens = { 
  info: {
    chicken: { // name of the alien
      from_start: 0, // in minutes (time before spawning)
      interval: 10, // in seconds
      amount: 20, // amount of aliens that are supposed to spawn everytime
      code: 10, // code of the alien
      level: 0 // level of the alien
    },
    crab: {
      from_start: 5,
      interval: 10,
      amount: 14,
      code: 11,
      level: 0
    },
    crab_second: { // adjust the name if you want the same alien again
      from_start: 15,
      interval: 25,
      amount: 9,
      code: 11,
      level: 2
    },
    candlestick: {
      from_start: 20,
      interval: 25,
      amount: 7,
      code: 14,
      level: 2
    },
    pointu: {
      from_start: 25,
      interval: 30,
      amount: 8,
      code: 17,
      level: 3
    },
    saucer: {
      from_start: 30,
      interval: 60,
      amount: 3,
      code: 19,
      level: 1
    }
  },
  action: function(game) {
    const positions = Array.from({ length: game.options.map_size*10 }, (j, i) => -(game.options.map_size*5) + i);
    Object.values(spawnAliens.info).forEach(alien => {
      if (game.step % (alien.interval*60) === (alien.from_start*3600)) {
        for (let i = 0; i<alien.amount; i++) {
          game.addAlien({
            code: alien.code,
            level: alien.level,
            x: positions[Math.floor(Math.random() * positions.length)],
            y: positions[Math.floor(Math.random() * positions.length)]
          });
        }
      }
    });
  }
};
