//   Add this line in your existing this.tick block
// killBoard.stepTimer.update(game);

//   Add this line at the very bottom of your mod.
// killBoard.eventManager(event, game);

var killBoard = {
    timers: [],
    clearInterval: 8, // seconds
    board: {
      id: "globalKillboard",
      position: [59, 70, 20, 20],
      clickable: false,
      visible: true,
      components: []
    },
    
    stepTimer: {
      update: function(game) {
        const timer = killBoard.timers;
        for (let i = timer.length - 1; i >= 0; i--) {
          if (game.step >= timer[i].targetStep) {
            timer[i].callback();
            timer.splice(i, 1);
          }
        }
      },
      set: function(callback, delayInSteps, game) {
        killBoard.timers.push({
          targetStep: game.step + delayInSteps,
          callback
        });
      }
    },
    
    remover: function(game) {
      this.board.components = this.board.components.slice(3);
      game.setUIComponent(this.board);
    },
    adder: function(event, game) {
      const killer = event.killer;
      const ship = event.ship;
      this.board.components.push(
        {type: "text", position: [5, 20 * (this.board.components.length/3), 40, 15], color: "rgb(55, 255, 55)", value: killer.name},
        {type: "text", align: "center", position: [0, 20 * (this.board.components.length/3), 100, 15], color: "rgb(255, 255, 255)", value: "⚔️"},
        {type: "text", position: [55, 20 * (this.board.components.length/3), 40, 15], color: "rgb(255, 55, 55)", value: ship.name}
      );
      game.setUIComponent(this.board);
      this.stepTimer.set(() => {
        this.remover(game);
      }, this.clearInterval * 60, game);
    },
    
    eventManager: function(event, game) {
      if (event.name == "ship_destroyed" && event.ship && event.killer) {
        this.manage(event, game);
      }
    },
    manage: function(event, game) {
      if (this.board.components.length/3 > 4) {
        this.remover(game);
      }
      this.adder(event, game);
    }
  };