/*
This code allows to show a health bar no matter the amount of shield".

All you need is a "ships" component in the this.options block.

usage example:

in the this.tick function add:
shieldBar.manage();
*/

const shieldBar = {
    update: 20, // don't update too often, may need to change to 60 if there are many players
    shield: this.options.ships // return an object containing the ship codes and their shield value.
      .map(str => JSON.parse(str))
      .reduce((acc, el) => {
        acc[el.typespec.code] = el.specs.shield.capacity;
        return acc;
      }, {}),
    
    removeBar: function(ship) {
      ship.custom.hasCustomHealthBar = false;
      ship.setUIComponent({id: "playersHealthBar",position: [0,0,0,0],visible: false});
    },
    manageBar: function(ship) {
      try {
        const capacity = this.shield[ship.type];
        const shieldStat = +String(ship.stats)[0]; 
        const realCapacity = ((capacity[1] - capacity[0]) / 6) * shieldStat + capacity[0];
    
        if (realCapacity > 999) {
          
          if (!ship.custom.hasCustomHealthBar) ship.custom.hasCustomHealthBar = true;
          ship.setUIComponent({
            id: "playersHealthBar",
            position: [3, 9.8, 18, 4.1],
            clickable: false,
            visible: true,
            components: [
              { type: "box", position: [1, 14, 75, 78], fill: "#545454", stroke: "#00eef2" },
              { type: "box", position: [1, 14, (ship.shield / realCapacity) * 75, 78], fill: "#00eef2" },
              { type: "box", position: [79, 14, 20, 78], fill: "#00eef2", stroke: "#00eef2" },
              { type: "text", position: [79.5, 5, 19.5, 100], align: "left", value: `${(ship.shield / 1000).toFixed(1)}K`, color: "#ffffff" }
            ]
          });
        } else {
          if (ship.custom.hasCustomHealthBar) {
            this.removeBar(ship);
          }
        }
      } catch (e) {
        if (ship.custom.hasCustomHealthBar) {
          this.removeBar(ship);
        }
      }
    },
    manage: function() {
      if (game.step % this.update === 0) {
        for (let ship of game.ships) {
          this.manageBar(ship);
        }
      }
    }
  };
