/*
This code simply has to be pasted in the modding console while the mode is running.
And simply enjoy the result ;)
*/

// Console Version

let number = 0; // do not change
const player = game.findShip(1); // choose the target (using an ID)
const repeat = 200; // number of images it needs to spawn
const speed = 25; // spawn interval speed in (ms)
const decay = 25; // remove interval speed in (ms)
const emojies = ["💀", "🤡", "🤬", "🥸", "💩", "🤓", "🐵", "🗿", "🤮", "🦈", "🤠"];

const param={log:function(e){game.modding.terminal.echo(e)},start:function(){const e=setInterval((()=>{if(!player)return clearInterval(e),void param.log("Player Left, Troll Incomplete ⚠️");number>repeat-2&&(clearInterval(e),param.end());const a=Math.floor(21*Math.random())+7,o=Math.floor(101*Math.random())-10,r=Math.floor(101*Math.random())-10,n=emojies[~~(Math.random()*emojies.length)];player.setUIComponent({id:`img${number}`,position:[o,r,a,a],clickable:!0,visible:!0,components:[{type:"text",position:[0,3,100,100],value:n,color:"#CDE"}]}),number++,param.log(`img${number} [${n}]`)}),speed)},end:function(){const e=setInterval((()=>{player||(clearInterval(e),param.log("Player Left, Troll Incomplete ⚠️")),number<0&&(clearInterval(e),param.log("\nTroll Complete ✅")),player.setUIComponent({id:`img${number}`,visible:!1}),number--}),decay)}};

param.start();
