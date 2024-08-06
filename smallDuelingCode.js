/*
Shortest dueling code i've seen so far..
you will only find the legacy speedster code.
*/

var regen_button = {id: "regen",position: [71,1.8,8,5.5],clickable: true,shortcut: "J",visible: true,
  components: [{type:"box",position:[0,0,100,100],fill:"#974",stroke:"#CDE",width:4},
    {type: "text",position:[10,22,80,50],value:"regen [J]",color:"#CDE"}]
};

this.options = {
  root_mode: "", 
  map_name: "Meg's Dueling", 
  custom_map: "", 
  map_size: 80, 
  max_level: 6, 
  maxtierlives: 5,
  radar_zoom: 1,
  starting_ship: 605, 
  weapons_store: false,
  ships: ['{"name":"A-Speedster Legacy","level":6,"model":5,"size":1.5,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-95,0,0,70,65],"z":[0,0,0,0,0,0]},"width":[0,10,40,20,20,0],"height":[0,5,30,30,15,0],"texture":[6,11,5,63,12],"propeller":true,"laser":{"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"recoil":50,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,15,15,10,0],"height":[0,10,15,12,0],"texture":[4]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,12]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":45},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":-10,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"winglets":{"offset":{"x":0,"y":-40,"z":10},"doubleside":true,"length":[45,10],"width":[5,20,30],"angle":[50,-10],"position":[90,80,50],"texture":[4],"bump":{"position":10,"size":30}}},"typespec":{"name":"A-Speedster Legacy","level":6,"model":5,"code":605,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"shape":[3,2.914,2.408,1.952,1.675,1.49,1.349,1.263,1.198,1.163,1.146,1.254,1.286,1.689,2.06,2.227,2.362,2.472,2.832,3.082,3.436,3.621,3.481,2.48,2.138,2.104,2.138,2.48,3.481,3.621,3.436,3.082,2.832,2.472,2.362,2.227,2.06,1.689,1.286,1.254,1.146,1.163,1.198,1.263,1.349,1.49,1.675,1.952,2.408,2.914],"lasers":[{"x":0,"y":-3,"z":0,"angle":0,"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.16,"y":-0.277,"z":1.35,"angle":-10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-1.16,"y":-0.277,"z":1.35,"angle":10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.621}}']
};

this.tick = function(game) {
  for (let ship of game.ships) {
    const maxCrystals = 20 * Math.trunc(ship.type / 100) * Math.trunc(ship.type / 100);
    if (ship.crystals > maxCrystals) ship.set({crystals: maxCrystals-1});
    if (!ship.custom.init) {
      ship.custom.init = true;
      ship.set({x:0,y:0});
      ship.setUIComponent(regen_button);
    }
  }
};

this.event = function(event, game) {
  switch (event.name) {
    case "ui_component_clicked": if (event.id == "regen") regen(event.ship); break;
    case "ship_spawned": regen(event.ship); break;
  }
};

function regen(ship) {
  ship.set({
    shield: 999, 
    crystals: 20 * Math.trunc(ship.type / 100) * Math.trunc(ship.type / 100), 
    stats: (Math.trunc(ship.type / 100) < 7)?11111111 * Math.trunc(ship.type / 100):0
  });
}
