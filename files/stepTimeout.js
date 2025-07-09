/*    stepTimer.js

This code aims at replacing the normal setTimeout function that is in javascript.
Since the function is unstable for modding space here is an alternative that works with game ticks.

For any interogations regarding the vocabulary used bellow, please refer to the modding documentation.

*/

/*    Usage

 -  Add this line in your existing 'this.tick' block
stepTimeout.update(game);

 -  Use this instruction to call the function, you can store the id is the function in a variable like bellow (note:  the delay is in seconds)
let waiting = stepTimeout.set(() => {
    // your code
}, delay, game);

 -  Use this instruction to clear a specific stepTimeout, you need the id stored in the variable above to remove it.
stepTimeout.clear(id);

 -  Use this instruction to clear every stepTimeout.
stepTimeout.clearAll();

*/

var stepTimeout = {
    timers: [],
    last_id: 0,

    update: function(game) {
      for (let i = this.timers.length - 1; i >= 0; i--) {
        if (game.step >= this.timers[i].targetStep) {
          this.timers[i].callback();
          this.timers.splice(i, 1);
        }
      }
    },

    set: function(callback, delay, game) {
      const id = this.last_id++;
      this.timers.push({
        id,
        targetStep: game.step + delay * 60,
        callback
      });
      return id;
    },

    clear: function(id) {
      this.timers = this.timers.filter(timer => timer.id !== id);
    },

    clearAll: function() {
      this.timers = [];
    }
  };