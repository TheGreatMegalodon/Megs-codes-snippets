/*
This code is used to add some sort of collectible spawning areas like in battle royale 
its very good if you want to create a mod.
*/

collectibleZone.manage(game, "zone1", 600, 4); // this line has to be added in the this.tick block in order for the code to work.

/*
collectibleZone.manage(game, 600, 4);
                         ^    ^   ^
                         |    |   | This is the amount of collectible that will spawn inside of the zone.
                              | this is the name of the zone, if you want to add more areas the 2 names must be different.
*/

const collectibleZone = {
  showWhereTheZonesAre: false,
  posX: [...new Array(this.options.map_size*10 + 1)].map((j, i) => this.options.map_size*5 + i),
  posY: [...new Array(this.options.map_size*10 + 1)].map((j, i) => this.options.map_size*5 + i),
  image: {
    id: "Energy_Zone",
    obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
    emissive: "https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/Energy_Zone.png"
  },
  collectibles: {
    output: [[90, 91], [10, 11], [20, 21], [12]],
    weight: [50, 30, 15, 5],
    rand: function() {
      let rand = Math.random() * this.weight.reduce((a, b) => a + b);
      return this.output[this.weight.findIndex(p => (rand -= p) < 0)];
    }
  },
  position: function(pos) {
    return [...new Array(21)].map((j, i) => pos - 10 + i);
  },
  getRandomElement: function(array) {
    return array[Math.floor(Math.random()*array.length)];
  },
  add: function(amount) {
    let x = this.getRandomElement(this.posX);
    let y = this.getRandomElement(this.posY);
    if (showWhereTheZonesAre) game.modding.terminal.echo(`new Zone at:\nx: ${x}, y: ${y}`);
    game.setObject({
      id: `zone${x}${y}${amount}`,
      type: this.image,
      position:{x:x,y:y,z:-5},
      scale:{x:40,y:40,z:0},
      rotation:{x:Math.PI,y:0,z:0}
    });
    for (let i = 0; i < amount; i++) {
      let X = this.getRandomElement(this.position(x));
      let Y = this.getRandomElement(this.position(y));
      game.addCollectible({
        code: this.getRandomElement(this.collectibles.rand()),
        x: X, y: Y
      });
    }
    setTimeout(() => {
      game.setObject({id:`zone${x}${y}${amount}`,scale:{x:0,y:0,z:0}});
      game.removeObject(`zone${x}${y}${amount}`);
    }, 30000);
  },
  manage: function(game, rate=600, amount=2) {
    if (game.step % rate === 0) this.add(amount);
  }
};
