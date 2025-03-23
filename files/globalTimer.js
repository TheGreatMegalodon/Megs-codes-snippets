
/*
This code is used to add a timer inside of any mod.
It must be updated every seconds.
Usage example bellow the code..
*/

timer.update(game, "name", "color"); // this line has to be added in the this.tick block in order for the code to work. 
/*
- name can be "anything". (keep the word short)
- color can be used in any format (rgb, hex, hsla...)
*/

timer.remover(game, reset); // this line can be exectuted anywhere, simply "game" must be defined.
/*
This code is used to remove the timer UI if needed.
You can also choose to reset the timer or not when removing the clock.
  reset: true or false.
*/


var timer = {
  clock: 0,
  update: function(game, name="", color = "rgba(255,255,255,0.8)") {
    this.clock++; // add +1 each seconds
    game.setUIComponent({
      id: "globalTimerUI",
      position: [3.5, 30, 13, 10],
      clickable: false,
      visible: true,
      components: [
        {type: "text",position: [0, 0, 100, 50],color: color,value: name},
        {type: "text",position: [0, 50, 100, 46],color: color,value: this.formatTime(this.clock)}
      ]
    });
  },
  remover: function(game, reset) {
    this.clock = reset ? 0 : this.clock;
    game.setUIComponent({id: "globalTimerUI", visible: false});
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
  }
};

/*
Usage example:

this.tick = function(game) {
  if (game.step % 60 === 0) {
    timer.update(game, "game timer", "rgb(255, 255, 255)");
  }
}

note: That only one function this.tick can be defined in a game.
*/
