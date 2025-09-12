/*    stepTimer.js

This code aims at replacing the normal setTimeout function that is in javascript.
Since the function is unstable for modding space here is an alternative that works with game ticks.

For any interogations regarding the vocabulary used bellow, please refer to the modding documentation.

*/

/*    Usage

 -  Add this line in your existing 'this.tick' block
stepTimeout.update();

 -  Use this instruction to call the function, you can store the id is the function in a variable like bellow (note:  the delay is in seconds)
let waiting = stepTimeout.set(() => {
    // your code
}, delay);

 -  Use this instruction to clear a specific stepTimeout, you need the id stored in the variable above to remove it.
    As shown above, I have stored the id in the "waiting" variable. 
stepTimeout.clear(waiting);

 -  Use this instruction to clear every stepTimeout.
stepTimeout.clearAll();

*/

const stepTimeout = {
  timers: new Map(),
  last_id: 0,

  update: function() {
    for (const [id, timer] of this.timers) {
      if (game.step >= timer.target) {
        timer.callback();
        this.timers.delete(id);
      }
    }
  },
  set: function(callback, delay) {
    const id = this.last_id++;
    this.timers.set(id, {
      target: game.step + delay * 60,
      callback
    });
    return id;
  },
  clear: function(id) {
    this.timers.delete(id);
  },
  clearAll: function() {
    this.timers.clear();
  }
};