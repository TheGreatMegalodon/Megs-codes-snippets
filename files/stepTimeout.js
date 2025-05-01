/*    stepTimer.js

This code aims at replacing the normal setTimeout function that is in javascript.
Since the function is unstable for modding space here is an alternative that works with game ticks.

For any interogations regarding the vocabulary used bellow, please refer to the modding documentation.

*/

/*    Usage

 -  Add this line in your existing 'this.tick' block
stepTimeout.update(game);

 -  Use this command to call the function (note:  the delay is in seconds)
stepTimeout.set(() => {
    // your code
}, delay, game);

*/

var stepTimeout = {
    timers: [],
    update: function(game) {
        const timer = this.timers;
        for (let i = timer.length - 1; i >= 0; i--) {
            if (game.step >= timer[i].targetStep) {
                timer[i].callback();
                timer.splice(i, 1);
            }
        }
    },
    set: function(callback, delay, game) {
        this.timers.push({
            targetStep: game.step + delay * 60,
            callback
        });
    }
};