/*

                          THIS IS AN EXAMPLE
     your code has to get a little bit modified in order to add this
            code, warning little coding skills are required.


var Oresta_101 = '{"name":"Oresta","level":1,"model":1,"size":1,"zoom":1.21,"specs":{"shield":{"capacity":[60,120],"reload":[2,3]},"generator":{"capacity":[25,50],"reload":[12,16]},"ship":{"mass":70,"speed":[130,155],"rotation":[65,80],"acceleration":[85,105]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-94,-88,-60,-42,-20,0,20,49,65,60],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,10,19,25,26.2,28,30,30,16,0],"height":[0,4,10,16,21,21,20,20,21,12,0],"texture":[16,63,3,63,8,2,2,11,12,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-40,"z":19},"position":{"x":[0,0,0,0,0,0,0],"y":[15,25,34,60,75,85],"z":[2,-2,-1,-1,-1,3]},"width":[5,12,12,13,10,5],"height":[0,12,12,12,10,0],"texture":[3,4,9,63,4]},"propulsors":{"section_segments":8,"offset":{"x":25,"y":30,"z":0},"position":{"x":[0,0,5,5,0,0,0],"y":[-50,-45,-20,0,20,50,40],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,0],"height":[0,15,20,25,20,10,0],"texture":[4,3,13,63,12,12],"angle":0,"propeller":true},"lasers":{"section_segments":8,"offset":{"x":20,"y":-20,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,10],"z":[0,0,0,0,0,0,0]},"width":[0,2,2,2,2,2,2],"height":[0,2,2,2,2,2,2],"texture":[1,1,63,63,10,12],"angle":0,"laser":{"damage":[2,3],"rate":10,"type":2,"speed":[105,165],"recoil":0,"number":1,"error":0},"propeller":false},"bodyshield":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":75,"y":25,"z":-5},"position":{"x":[-3,-3,-3,0,0,-3,-3],"y":[-20,-20,-20,0,20,40,42],"z":[0,0,0,0,0,0,0]},"width":[0,3,3,7,7,6,0],"height":[0,3,9,14,14,12,0],"angle":0,"texture":[3,3,3,63,3]}},"wings":{"main":{"length":[65,15],"width":[60,40,30],"angle":[-10,20],"position":[30,50,40],"texture":[2.2,4],"doubleside":true,"offset":{"x":0,"y":-5,"z":5},"bump":{"position":30,"size":20}}},"typespec":{"name":"Oresta","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[60,120],"reload":[2,3]},"generator":{"capacity":[25,50],"reload":[12,16]},"ship":{"mass":70,"speed":[130,155],"rotation":[65,80],"acceleration":[85,105]}},"shape":[1.984,1.977,1.586,1.299,1.116,0.947,0.81,0.719,0.706,0.762,0.767,0.786,0.818,1.524,1.629,1.729,1.832,1.93,2.009,1.942,1.633,1.676,1.746,1.682,1.629,1.202,1.629,1.682,1.746,1.676,1.633,1.942,2.009,1.93,1.832,1.729,1.629,1.524,0.82,0.786,0.767,0.762,0.706,0.719,0.81,0.947,1.116,1.299,1.586,1.977],"lasers":[{"x":0.4,"y":-0.4,"z":0,"angle":0,"damage":[2,3],"rate":10,"type":2,"speed":[105,165],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.4,"y":-0.4,"z":0,"angle":0,"damage":[2,3],"rate":10,"type":2,"speed":[105,165],"number":1,"spread":0,"error":0,"recoil":0}],"radius":2.009}}';
var Scearp_201 = '{"name":"Scearp","level":2,"model":1,"size":1.3,"zoom":1.2,"specs":{"shield":{"capacity":[100,170],"reload":[3,4]},"generator":{"capacity":[60,90],"reload":[15,20]},"ship":{"mass":95,"speed":[100,120],"rotation":[65,90],"acceleration":[95,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-106,-100,-90,-70,-55,-30,-15,2,10,20,30,38,53,70,60],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[4,9,14,25,27,22,20,20,24,24,25,23,18,13,0],"height":[3,7,10,11,13,18,18,14,14,15,15,23,23,13,0],"texture":[3,2,13,8,3,11,2,4,8,4,63,11,15,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-105,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[30,40,60,70,85],"z":[0.5,-3,1,3,8]},"width":[5,13,15,12,4],"height":[0,12,12,10,0],"texture":[2,9,63,4]},"side_propulsors":{"section_segments":8,"offset":{"x":40,"y":15,"z":0},"position":{"x":[0,0,0,5,-3,-3,2,2,1,1],"y":[-50,-45,-30,-15,0,15,30,40,50,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[2,5,10,10,10,10,10,10,8,0],"height":[2,5,10,10,10,10,10,10,8,0],"propeller":true,"texture":[2,3,2,8,63,4,10,13,17]},"lasers":{"section_segments":8,"offset":{"x":40,"y":-35,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,10],"z":[0,0,0,0,0,0,0]},"width":[0,2,2,2,2,2,2],"height":[0,2,2,2,2,2,2],"texture":[17,17,63,63,10,12],"angle":0,"laser":{"damage":[3,4],"rate":8,"type":2,"speed":[115,185],"recoil":0,"number":1,"error":0},"propeller":false},"lasers2":{"section_segments":8,"offset":{"x":0,"y":-101,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,10],"z":[0,0,0,0,0,0,0]},"width":[0,4,3,2,2,2,2],"height":[0,3,2,2,2,2,2],"texture":[17,17,63,63,2,12],"angle":0,"laser":{"damage":[3,4],"rate":8,"type":2,"speed":[115,185],"recoil":0,"number":1,"error":0},"propeller":false},"wingsshield":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":66,"y":-4,"z":0},"position":{"x":[-4,-4,-4,0,0,-4,-4],"y":[-16,-16,-16,0,30,44,44],"z":[0,0,0,0,0,0,0]},"width":[0,3,3,7,7,3,0],"height":[0,4,4,10,10,4,0],"angle":0,"texture":[2,2,2,63,2,2]}},"wings":{"main":{"length":[35,28],"width":[30,30,15],"angle":[-5,10],"position":[0,0,-5],"texture":[2,11],"doubleside":true,"offset":{"x":0,"y":15,"z":-2},"bump":{"position":10,"size":12}},"stab":{"length":[40,10],"width":[50,50,70],"angle":[90,90],"position":[70,75,115],"doubleside":true,"texture":63,"bump":{"position":0,"size":15},"offset":{"x":0,"y":-50,"z":0}},"stab2":{"length":[40,10],"width":[50,50,70],"angle":[90,90],"position":[70,75,105],"doubleside":true,"texture":4,"bump":{"position":0,"size":13.5},"offset":{"x":0.1,"y":-50,"z":-1}}},"typespec":{"name":"Scearp","level":2,"model":1,"code":201,"specs":{"shield":{"capacity":[100,170],"reload":[3,4]},"generator":{"capacity":[60,90],"reload":[15,20]},"ship":{"mass":95,"speed":[100,120],"rotation":[65,90],"acceleration":[95,120]}},"shape":[2.628,2.562,2.17,1.898,1.601,1.202,0.912,1.421,1.41,1.379,1.763,1.815,1.858,1.87,1.915,1.975,1.969,1.969,1.854,2.049,2.116,2.001,1.549,1.913,1.979,2.6,1.979,1.913,1.549,2.001,2.116,2.049,1.854,1.969,1.969,1.975,1.915,1.87,1.858,1.815,1.763,1.379,1.41,1.421,0.912,1.202,1.601,1.898,2.17,2.562],"lasers":[{"x":1.04,"y":-0.91,"z":0,"angle":0,"damage":[3,4],"rate":8,"type":2,"speed":[115,185],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.04,"y":-0.91,"z":0,"angle":0,"damage":[3,4],"rate":8,"type":2,"speed":[115,185],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-2.626,"z":0,"angle":0,"damage":[3,4],"rate":8,"type":2,"speed":[115,185],"number":1,"spread":0,"error":0,"recoil":0}],"radius":2.628}}';
var Urest_202 = '{"name":"Urest","level":2,"model":2,"size":1.3,"zoom":1.2,"specs":{"shield":{"capacity":[115,160],"reload":[3,5]},"generator":{"capacity":[55,85],"reload":[14,20]},"ship":{"mass":90,"speed":[85,110],"rotation":[45,65],"acceleration":[70,90]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-94,-89,-80,-45,-20,0,20,49,70,60],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,9,14,17,22,24,25,24,25,12,0],"height":[0,7,10,13,14,14,14,14,15,10,0],"texture":[16,63,4,2,63,8,18,2,15,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-98,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[25,42,60,70,125],"z":[0.5,1,1,1.5,0]},"width":[5,11,15,10,5],"height":[3,10,10,8,6],"texture":[18,9,3,4]},"lasers":{"section_segments":8,"offset":{"x":5,"y":-93,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,10],"z":[0,0,0,0,0,0,0]},"width":[0,2,2,2,2,2,2],"height":[0,2,2,2,2,2,2],"texture":[1,1,63,63,10,12],"angle":0,"laser":{"damage":[9,15],"rate":3,"type":1,"speed":[145,195],"recoil":0,"number":1,"error":0},"propeller":false},"mainmotor":{"section_segments":16,"offset":{"x":0,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-50,-45,-30,0,20,25,30,40,50,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,10,10,10,25,15,0],"height":[0,5,10,10,10,10,10,19,15,0],"propeller":true,"texture":[4,4,1,1,1,1,2,13,17]},"wingsshield":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":56,"y":15,"z":0},"position":{"x":[-4,-4,-4,0,0,-5,-5],"y":[-30,-30,-30,-15,15,30,30],"z":[0,0,0,0,0,0,0]},"width":[0,3,3,7,7,3,0],"height":[0,3,9,14,14,12,0],"angle":0,"texture":[2,2,2,63,2,2]},"wingsshield2":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":25,"y":2,"z":0},"position":{"x":[-4,-4,-4,0,0,0,0],"y":[-30,-30,-30,-15,15,32,32],"z":[0,0,0,0,0,0,0]},"width":[0,3,3,7,7,6,0],"height":[0,3,9,14,14,12,0],"angle":0,"texture":[4,4,13,13,13,2]},"miniwingsshield":{"section_segments":[40,45,50,130,135,140,220,225,230,310,315,320],"offset":{"x":28,"y":55,"z":35},"position":{"x":[-2,-2,-2,0,0,-2,-2],"y":[-10,-10,-10,-5,10,15,15],"z":[0,0,0,0,0,0,0]},"width":[0,3,3,4,4,3,0],"height":[0,3,5,10,10,6,0],"angle":0,"texture":[2,2,2,63,2,2]},"minimotor":{"section_segments":8,"offset":{"x":30,"y":7,"z":-13},"position":{"x":[-2,0,0,0,0,0,0,0,0,0],"y":[-40,-35,-25,-10,10,30,35,45,55,20],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3,10,12,13,12,12,10,10,7,0],"height":[2,7,8,8,8,8,8,8,5,0],"propeller":true,"texture":[2,8,4,11,4,3,2,12,17]},"extrawing":{"section_segments":12,"offset":{"x":12,"y":36,"z":3},"position":{"x":[0,0,0,0,0],"y":[-30,-20,0,30,30],"z":[0,5,10,10,10]},"width":[2,2,2,2,0],"height":[3,7,23,23,0],"texture":[3,3,3,1],"angle":0}},"wings":{"main":{"length":[37,22],"width":[90,50,25],"angle":[-5,10],"position":[30,50,55],"texture":[2,11],"doubleside":true,"offset":{"x":0,"y":-38,"z":0},"bump":{"position":30,"size":10}},"backwing":{"length":[7,5,9,6],"width":[28,25,25,25,10],"angle":[0,5,5,5],"position":[60,60,60,60,60],"texture":[4,63,3,2],"doubleside":true,"bump":{"position":5,"size":15},"offset":{"x":0,"y":-3,"z":35.5}},"font":{"length":[20,25],"width":[25,10],"angle":[5,20],"position":[-20,-25],"texture":[2.4],"bump":{"position":30,"size":10},"offset":{"x":10,"y":-60,"z":-3}}},"typespec":{"name":"Urest","level":2,"model":2,"code":202,"specs":{"shield":{"capacity":[115,160],"reload":[3,5]},"generator":{"capacity":[55,85],"reload":[14,20]},"ship":{"mass":90,"speed":[85,110],"rotation":[45,65],"acceleration":[70,90]}},"shape":[2.579,2.585,2.462,2.466,1.352,1.118,1.198,1.258,1.269,1.218,1.469,1.518,1.594,1.607,1.646,1.713,1.776,1.79,1.814,1.631,1.83,1.881,1.963,1.989,1.985,1.954,1.985,1.989,1.963,1.881,1.83,1.631,1.814,1.79,1.776,1.713,1.646,1.607,1.595,1.518,1.469,1.218,1.269,1.258,1.198,1.118,1.352,2.466,2.462,2.585],"lasers":[{"x":0.13,"y":-2.418,"z":0,"angle":0,"damage":[9,15],"rate":3,"type":1,"speed":[145,195],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.13,"y":-2.418,"z":0,"angle":0,"damage":[9,15],"rate":3,"type":1,"speed":[145,195],"number":1,"spread":0,"error":0,"recoil":0}],"radius":2.585}}';
//(more ships...)

var ships = [
  Oresta_101,
  Scearp_201,
  Urest_202,
  //(more ships...)
];

this.options = {
  // see documentation for options reference
  root_mode: "survival",
  map_size: 30,
  ships: ships
};

this.tick = function(game) {
  shipSwitcher.manager(game);
  // ... more code
};

this.event = function(event, game) {
  shipSwitcher.manager(game, event);
  // ... more code
};

var shipSwitcher = {
  ...
};

*/

// actual code bellow:

var ships = []; // this is the variable that will contain your ships, if you already have one you can remove it.

/*
shipSwitcher.manager(game); // You must add that line at the start of your this.tick block.
shipSwitcher.manager(game, event); // You must add that line at the start of your this.event block.
*/

var shipSwitcher = {
  shipsMaxed: true,
  crystalsMaxed: true,
  
  shipCodes: this.options.ships.map((str) => { // creation of the ship code list
      let data = JSON.parse(str);
      return Number(data.typespec.code);
    }),
  switchUI: { // switch button
    id: "switch_forward",
    shortcut: "V",
    position: [5, 30, 10, 5],
    clickable: true,
    visible: true,
    components: [
      {type: "box", position: [0, 0, 100, 100], fill: "rgba(255,255,255,0.2)"},
      {type: "text", position: [10, 10, 80, 80], align: "center", value: "Switch [V]", color: "rgb(255,255,255)"},
    ]
  },
  switcher: function(ship) { // ship switcher logic
    let index = this.shipCodes.indexOf(ship.type);
    if (index >= 0) nextShip = this.shipCodes[(index + 1) % this.shipCodes.length];
    let nextShipLevel = Math.trunc(nextShip / 100);
    ship.set({
      type: nextShip,
      shield: 99999,
      stats: this.shipsMaxed ? 11111111 * nextShipLevel:0,
      crystals: this.crystalsMaxed ? 20 * Math.pow(nextShipLevel, 2):0
    });
  },
  UImanager: function(ship) { // adds the UI if its not installed
    if (ship.custom.switch_forward_button_installed !== true) {
      ship.custom.switch_forward_button_installed = true;
      ship.setUIComponent(this.switchUI);
    }
  },
  eventManager: function(event) { // checks for the right event to start the switching
    if (event.name == "ui_component_clicked" && event.id == "switch_forward") {
      this.switcher(event.ship);
    }
  },
  manager: function(game, event=undefined) { // manages the whole switcher
    if (event === undefined) {
      for (let ship of game.ships) {
        this.UImanager(ship);
      }
    } else {
      this.eventManager(event);
    }
  }
};
