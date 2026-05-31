let freezeStart = {
    clock: 40,
    UI: {
      id: "freezeStart_timer",
      position: [0, 0, 100, 100],
      clickable: false,
      visible: true,
      components: [
        { type: "text", position: [30, 25, 30, 6], color: "#FFF", value: "Waiting for more players..." },
        { type: "text", position: [30, 31, 30, 4], color: "#AAA", value: 0,}
      ]
    },
    formatTime: function(time) {
      if (time > 0) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
        return `${minutes.toString()}:${formattedSeconds}`;
      } else {
        return "0:00";
      }
    },
    uiUpdate: function(game) {
      this.UI.components[1].value = this.formatTime(this.clock);
      this.clock--;
      
      game.setUIComponent(this.UI);
      
      if (this.clock < 0) {
        this.started(game);
      }
    },
    
    spawned: function(ship) {
      ship.set({idle: true, collider: false});
    },
    started: function(game) {
      game.custom.launched = true;
      
      this.UI.position = [0, 0, 0, 0];
      this.UI.visible = false;
      game.setUIComponent(this.UI);
      
      for (let ship of game.ships) {
        ship.set({idle: false, collider: true});
      }
    },
    
    event: function(event, game) {
      if (!game.custom.launched && event.name == "ship_spawned") {
        this.spawned(event.ship);
      }
    },
    tick: function(game) {
      if (game.step % 60 === 0 && !game.custom.launched) {
        this.uiUpdate(game);
      }
    }
  };