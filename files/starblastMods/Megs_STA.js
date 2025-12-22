/*

|                        Starblast Testing Area

| Main Developer: Megalodon
| Main Ship Builder: Hazard

*/

var game_name = "Starblast Testing Area";
var game_version = "v2.0.3";
var delays = { // in seconds
  // advised to keep 0.5 or 1
  hide: 0.5, 
  selector: 0.5,
  teleporter: 0.5,
  
  // Doesn't matter
  spectate: 0.5,
  teleport: 0,
  swich: 0,
  change_with_tree: 0,
  restore: 0,
  stats: 0
};

/*

Add your ships here

*/

var ships = [
  /*

  Add the ship's variables here

  */
];

var Spectator_191 = '{"name":"Spectator","level":1.9,"model":1,"size":0.025,"zoom":0.05,"specs":{"shield":{"capacity":[1e-10,1e-10],"reload":[1000,1000]},"generator":{"capacity":[1e-10,1e-10],"reload":[1000,1000]},"ship":{"mass":1,"speed":[250,250],"rotation":[1000,1000],"acceleration":[1000,1000],"dash":{"rate":10,"burst_speed":[750,750],"speed":[600,600],"acceleration":[250,250],"initial_energy":[1e-20,1e-20],"energy":[1e-30,1e-30]}}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1.9,"model":1,"code":191,"specs":{"shield":{"capacity":[1e-10,1e-10],"reload":[1000,1000]},"generator":{"capacity":[1e-10,1e-10],"reload":[1000,1000]},"ship":{"mass":1,"speed":[250,250],"rotation":[1000,1000],"acceleration":[1000,1000],"dash":{"rate":10,"burst_speed":[750,750],"speed":[600,600],"acceleration":[250,250],"initial_energy":[1e-20,1e-20],"energy":[1e-30,1e-30]}}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}';

const spectator = [
  Spectator_191
];

//  ------------------------------  Do not modify the code bellow  ------------------------------  //

const info = {
  shipTree: {},
  spectator: {},
  ship_switch: [],
  order: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] },
};

const vocabulary = [
  {text: "You", icon: "\u004e", key: "O"},
  {text: "Me", icon: "\u004f", key: "E"},
  {text: "Wait", icon: "\u0048", key: "T"},
  {text: "Yes", icon: "\u004c", key: "Y"},

  {text: "No", icon: "\u004d", key: "N"},
  {text: "Hello", icon: "\u0045", key: "H"},
  {text: "Sorry", icon: "\u00a1", key: "S"},
  {text: "Thanks", icon: "\u0041", key: "X"},

  {text: "Attack", icon: "\u0049", key: "A"},
  {text: "Follow Me", icon: "\u0050", key: "F"},
  {text: "Good Game", icon: "\u00a3", key: "G"},
  {text: "Gems", icon: "\u0044", key: "M"},
  
  {text: "Hmm", icon: "\u004b", key: "Q"},
  {text: "No Prb", icon: "\u0047", key: "P"},
  {text: "Stats", icon: "\u0078", key: "K"},
  {text: "Leave", icon: "\u00b3", key: "L"},
  
  {text: "Spectate", icon: "\u0059", key: "B"},
  {text: "My ship", icon: "\u0061", key: "I"},
  {text: "Lag", icon: "\u0069", key: "J"},
  {text: "Discord", icon: "\u007b", key: "D"},
];

this.options = {
  root_mode: "",
  map_name: game_name,
  soundtrack: "civilisation.mp3",
  starting_ship: 801,
  map_size: 80,
  weapons_store: false,
  
  reset_tree: ships.length > 0,
  
  asteroids_strength: 2,
  crystal_value: 1,
  
  ships: ships.concat(spectator),
  custom_map: " ",
  vocabulary: vocabulary
};

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
  set: function(callback, delay) {
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

const utilities = {
  parseAndStore: function(list, stats) {
    list.forEach((str) => {
      const ship = JSON.parse(str);
      stats[ship.typespec.code] = ship;
    });
  },
  orderShips: function(list, stats) {
    list.forEach(str => {
      const ship = JSON.parse(str);
      stats[ship.level].push([ship.typespec.code, ship.name]);
    });
  },
  createSwitch: function(list, stats) {
    list.forEach(str => {
      const ship = JSON.parse(str);
      stats.push(ship.typespec.code);
    });
  },
  buildShiptree: function() {
    this.parseAndStore(ships, info.shipTree);
    this.parseAndStore(spectator, info.spectator);
    this.orderShips(ships, info.order);
    this.createSwitch(ships, info.ship_switch);
  },
  
  alert: function(ship, text1, color) {
    stepTimeout.clear(ship.custom.messager);
    ship.setUIComponent({
      id: "messager", 
      position: [-5, -5, 110, 110], 
      clickable: false, 
      visible: true,
      components: [
        {type: "text", position: [-5, 20, 110, 4], color: color, value: text1}
      ]
    });
    ship.custom.messager = stepTimeout.set(() => {
      ship.setUIComponent({id: "messager", visible: false});
    }, 2);
  }
};

const buttons = {
  pos: {
    origin: {
      x: 63.75,
      y: 0.2
    },
    width: 3,
    height: 6,
    spacing: 0.5
  },
  
  spectate: function(ship) {
    let x = this.pos.origin.x;
    let y = this.pos.origin.y;
    let width = this.pos.width;
    let height = this.pos.height;
    return {
      id: "button_spectate",
      position: [x, y, width, height],
      clickable: true,
      visible: !ship.custom.buttons_hidden,
      shortcut: "3",
      components: [
        { type: "box", position: [0, 0, 100, 50], fill: "rgba(55, 155, 255, 0.6)" },
        { type: "text", position: [5, 5, 90, 40], color: "rgba(255, 255, 255, 1)", value: "Spe" },
        
        { type: "box", position: [0, 55, 100, 50], fill: "rgba(55, 155, 255, 0.6)" },
        { type: "text", position: [0, 58, 100, 40], color: "rgba(255, 255, 255, 1)", value: "3" }
      ]
    };
  },
  regen: function(ship) {
    let x = this.pos.origin.x + ((this.pos.spacing * 0.5) + this.pos.width) * 1;
    let y = this.pos.origin.y;
    let width = this.pos.width;
    let height = this.pos.height;
    return {
      id: "button_regen",
      position: [x, y, width, height],
      clickable: true,
      visible: !ship.custom.buttons_hidden,
      shortcut: "4",
      components: [
        { type: "box", position: [0, 0, 100, 50], fill: "rgba(55, 255, 155, 0.6)" },
        { type: "text", position: [5, 5, 90, 40], color: "rgba(255, 255, 255, 1)", value: "Reg" },
        
        { type: "box", position: [0, 55, 100, 50], fill: "rgba(55, 255, 155, 0.6)" },
        { type: "text", position: [0, 58, 100, 40], color: "rgba(255, 255, 255, 1)", value: "4" }
      ]
    };
  },
  stats: function(ship) {
    let x = this.pos.origin.x + ((this.pos.spacing * 0.5) + this.pos.width) * 2;
    let y = this.pos.origin.y;
    let width = this.pos.width;
    let height = this.pos.height;
    return {
      id: "button_stats",
      position: [x, y, width, height],
      clickable: true,
      visible: !ship.custom.buttons_hidden,
      shortcut: "5",
      components: [
        { type: "box", position: [0, 0, 100, 50], fill: "rgba(255, 255, 55, 0.6)" },
        { type: "text", position: [5, 5, 90, 40], color: "rgba(255, 255, 255, 1)", value: "Sta" },
        
        { type: "box", position: [0, 55, 100, 50], fill: "rgba(255, 255, 55, 0.6)" },
        { type: "text", position: [0, 58, 100, 40], color: "rgba(255, 255, 255, 1)", value: "5" }
      ]
    };
  },
  teleporter: function(ship) {
    let x = this.pos.origin.x + ((this.pos.spacing * 0.5) + this.pos.width) * 3;
    let y = this.pos.origin.y;
    let width = this.pos.width;
    let height = this.pos.height;
    return {
      id: "button_teleporter",
      position: [x, y, width, height],
      clickable: true,
      visible: !ship.custom.buttons_hidden,
      shortcut: "6",
      components: [
        { type: "box", position: [0, 0, 100, 50], fill: "rgba(0, 200, 255, 0.6)" },
        { type: "text", position: [5, 5, 90, 40], color: "rgba(255, 255, 255, 1)", value: "TP" },
        
        { type: "box", position: [0, 55, 100, 50], fill: "rgba(0, 200, 255, 0.6)" },
        { type: "text", position: [0, 58, 100, 40], color: "rgba(255, 255, 255, 1)", value: "6" }
      ]
    };
  },
  selector: function(ship) {
    let x = this.pos.origin.x + ((this.pos.spacing * 0.5) + this.pos.width) * 4;
    let y = this.pos.origin.y;
    let width = this.pos.width;
    let height = this.pos.height;
    return {
      id: "button_selector",
      position: [x, y, width, height],
      clickable: true,
      visible: !ship.custom.buttons_hidden,
      shortcut: "7",
      components: [
        { type: "box", position: [0, 0, 100, 50], fill: "rgba(255, 55, 155, 0.6)" },
        { type: "text", position: [5, 5, 90, 40], color: "rgba(255, 255, 255, 1)", value: "Sel" },
        
        { type: "box", position: [0, 55, 100, 50], fill: "rgba(255, 55, 155, 0.6)" },
        { type: "text", position: [0, 58, 100, 40], color: "rgba(255, 255, 255, 1)", value: "7" }
      ]
    };
  },
  
  hide: function(ship) {
    let x = this.pos.origin.x + ((this.pos.spacing * 0.5) + this.pos.width) * 5 - (6 + (this.pos.spacing * 0.5));
    let y = this.pos.origin.y + (ship.custom.buttons_hidden ? 0 : (this.pos.spacing + this.pos.height));
    return {
      id: "button_hide",
      position: [x, y, 6, 3.5],
      clickable: true,
      visible: true,
      shortcut: "8",
      components: [
        { type: "text",position: [-15, -375, 100, 800], color: "rgba(155, 155, 155, 1)", value: "V" },
        { type: "box",position: [19, 0, 100, 100], fill: "rgba(155, 155, 155, 1)" },
        { type: "text", position: [9, 17.5, 100, 65], color: "rgba(255, 255, 255, 1)", value: `${ship.custom.buttons_hidden ? "Show" : "Hide"} [8]` }
      ]
    };
  },
  deco: function(ship) {
    let x = this.pos.origin.x;
    let y = this.pos.origin.y + (ship.custom.buttons_hidden ? 0 : (this.pos.spacing + this.pos.height));
    let width = ((this.pos.spacing * 0.5) + this.pos.width) * 5 - (this.pos.spacing * 0.5);
    return {
      id: "deco",
      position: [x, y, width, 0.7],
      clickable: false,
      visible: true,
      components: [
        { type: "box",position: [0, 0, 100, 100], fill: "rgba(155, 155, 155, 1)" },
      ]
    };
  }
};
  
const events = {
  rateLimit: function(ship) {
    utilities.alert(ship, "You are being rate limited", "rgba(255,55,55,0.8)");
  },
  manage: function(event, game) {
  const id = event.id;
  const name = id.split("_");
  const ship = event.ship;

  switch (true) {
    case id.startsWith("button"):
      this[name[1]](ship);
      break;
    
    case id.startsWith("selector"):
      switch (name[1]) {
        case "hide": this.selector(ship); break;
        case "switch": this.switch(ship, name[2]); break;
        case "ships": this.change_with_tree(ship, +name[3]); break;
      }
      break;
    
    case id.startsWith("teleporter"):
      switch (name[1]) {
        case "hide": this.teleporter(ship); break;
        case "players": this.teleport(ship, +name[2]); break;
      }
      break;
    }
  },
  
  // events
  selector: function(ship) {
    if (!ship.custom.selector || game.step >= ship.custom.selector) {
      ship.custom.selector = game.step + delays.selector * 60;
      if (ship.custom.teleporter_is_open) {
        this.teleporter(ship);
      }
      if (ship.custom.selector_is_open) {
        ship.custom.selector_is_open = false;
      } else {
        if (ship.custom.spectating) {
          this.spectate(ship);
        } 
        ship.custom.selector_is_open = true;
      }
      selector.manage(ship);
    } else this.rateLimit(ship);
  },
  teleporter: function(ship) {
    if (!ship.custom.teleporter || game.step >= ship.custom.teleporter) {
      ship.custom.teleporter = game.step + delays.teleporter * 60;
      if (ship.custom.selector_is_open) {
        this.selector(ship);
      }
      if (ship.custom.teleporter_is_open) {
        ship.custom.teleporter_is_open = false;
      } else {
        if (!ship.custom.spectating) {
          this.spectate(ship);
        }
        ship.custom.teleporter_is_open = true;
      }
      teleporter.manage(ship);
    } else this.rateLimit(ship);
  },
  spectate: function(ship) {
    if (!ship.custom.spectate || game.step >= ship.custom.spectate) {
      ship.custom.spectate = game.step + delays.spectate * 60;
      if (ship.custom.spectating) {
        ship.custom.spectating = false;
        nextShip = ship.custom.lastShip;
      } else {
        ship.custom.spectating = true;
        nextShip = Object.keys(info.spectator)[0];
        ship.custom.lastShip = ship.type;
      }
      ship.set({
        type: nextShip, shield: 999, 
        collider: !ship.custom.spectating,
        stats: ship.custom.spectating ? 11111111 : ship.custom.keep_maxed ? 11111111 * Math.trunc(nextShip / 100) : 0,
        crystals: ship.custom.spectating ? 0 : 20 * Math.pow(Math.trunc(nextShip / 100), 2),
        vx: 0, vy: 0, generator: 0
      });
    } else this.rateLimit(ship);
  },
  switch: function(ship, select) {
    if (!ship.custom.swich || game.step >= ship.custom.swich) {
      ship.custom.swich = game.step + delays.swich * 60;
      if (ship.custom.spectating) {
        this.spectate(ship);
      } 
      let index = info.ship_switch.indexOf(ship.type);
      switch(select) {
        case "next": if (index >= 0) nextShip = info.ship_switch[(index + 1) % info.ship_switch.length]; break;
        case "previous": if (index !== -1) nextShip = info.ship_switch[(index - 1 + info.ship_switch.length) % info.ship_switch.length]; break;
      }
      ship.custom.lastShip = nextShip;
      selector.highlighter(ship);
      ship.set({
        type: nextShip, shield: 9999, collider: true,
        stats: ship.custom.keep_maxed ? 11111111 * Math.trunc(nextShip / 100):0,
        crystals: 20 * Math.pow(Math.trunc(nextShip / 100), 2)
      });
    } else this.rateLimit(ship);
  },
  regen: function(ship) {
    if (!ship.custom.restore || game.step >= ship.custom.restore) {
      ship.custom.restore = game.step + delays.restore * 60;
      ship.set({
        shield: 999,
        crystals: 20 * Math.pow(Math.trunc(ship.type / 100), 2)
      });
    } else this.rateLimit(ship);
  },
  stats: function(ship) {
    if (!ship.custom.stats || game.step >= ship.custom.stats) {
      ship.custom.stats = game.step + delays.stats * 60;
      if (ship.custom.spectating) utilities.alert(ship, "You can't modify your stats as a Spectator.", "rgba(255,55,55,0.8)"); return;
      var level = Math.trunc(ship.type / 100); 
      var max = 11111111 * level;
      if (level < 7) {
        if (ship.stats == max) {
          ship.custom.keep_maxed = false;
          ship.set({stats: 0});
        } else {
          ship.custom.keep_maxed = true;
          ship.set({stats: 11111111 * level});
        }
      }
    } else this.rateLimit(ship);
  },
  teleport: function(ship, id) {
    if (!ship.custom.teleport || game.step >= ship.custom.teleport) {
      ship.custom.teleport = game.step + delays.teleport * 60;
      const player = game.findShip(id); // player = the player you want to teleport to
      if (!player) utilities.alert(ship, "This player is not in the arena anymore.", "rgba(255,55,55,0.8)"); return;
      ship.set({
        x: game.findShip(id).x,
        y: game.findShip(id).y,
        vx: 0, vy: 0
      })
    } else this.rateLimit(ship);
  },
  hide: function(ship) {
    if (!ship.custom.hide || game.step >= ship.custom.hide) {
      ship.custom.hide = game.step + delays.hide * 60;
      if (ship.custom.buttons_hidden) {
        ship.custom.buttons_hidden = false;
      } else {
        ship.custom.buttons_hidden = true;
      }
      Object.entries(buttons).forEach(([key, value]) => {
        if (key === "pos") return;
        ship.setUIComponent(value.call(buttons, ship));
      });
    } else this.rateLimit(ship);
  },
  change_with_tree: function(ship, nextShip) {
    if (!ship.custom.change_with_tree || game.step >= ship.custom.change_with_tree) {
      ship.custom.change_with_tree = game.step + delays.change_with_tree * 60;
      ship.set({
        type: nextShip, shield: 9999, collider: true,
        stats: ship.custom.keep_maxed ? 11111111 * Math.trunc(nextShip / 100):0,
        crystals: 20 * Math.pow(Math.trunc(nextShip / 100), 2)
      });
      selector.highlighter(ship);
    } else this.rateLimit(ship);
  }
};

const teleporter = {
  manage: function(ship) {
    ship.setUIComponent({
      id: "teleporter_header",
      position: [6, 30, 50, 5],
      clickable: false,
      visible: ship.custom.teleporter_is_open,
      components: [
        { type: "text",position: [20, -375, 100, 800], color: "rgba(100, 100, 100, 1)", value: "V" },
        { type: "box",position: [0, 0, 75, 100], fill: "rgba(100, 100, 100, 1)" },
        { type: "text", align: "left", position: [4, 10, 100, 80], color: "rgba(255, 255, 255, 1)", value: "Teleporter" }
      ]
    });
    
    ship.setUIComponent({
      id: "teleporter_hide",
      position: [69, 30, 10, 5],
      clickable: ship.custom.teleporter_is_open,
      visible: ship.custom.teleporter_is_open,
      shortcut: "9",
      components: [
        { type: "text",position: [-50, -375, 100, 800], color: "rgba(255, 55, 55, 1)", value: "V" },
        { type: "box",position: [18, 0, 100, 100], fill: "rgba(255, 55, 55, 1)" },
        { type: "text", position: [8, 20, 100, 60], color: "rgba(255, 255, 255, 1)", value: "Close [9]" }
      ]
    });
    
    // logic
    
    const limit = {
      top: 36,
      left: 6.5,
      bottom: 93
    };
    
    const size = {
      height: 4,
      width: 26,
      spacing: 0.5
    };
    
    let col = 0;
    let row = 0;
    
    const players = game.ships.filter(player => ship.id != player.id);
    
    players.forEach(player => {
      let y = limit.top + row * (size.height + size.spacing);
      let x = limit.left + col * (size.width + 2);
      if (y + size.height > limit.bottom) {
        row = 0;
        col++;
        y = limit.top;
        x = limit.left + col * (size.width + 2);
      }
      const UI = {
        id: `teleporter_players_${player.id}`,
        position: [x, y, size.width, size.height],
        clickable: ship.custom.teleporter_is_open,
        visible: ship.custom.teleporter_is_open,
        components: [
          { type: "box", position: [0, 0, 100, 100], fill: "rgba(55, 55, 55, 0.4)" },
          { type: "text", position: [0, 0, 100, 70], color: "rgba(255, 255, 255, 0.8)", value: "" },
          { type: "player", id: player.id, position: [2, 10, 100, 80], color: "rgba(255, 255, 255, 1)", value: "" },
          
          { type: "box", position: [90, 0, 10, 100], fill: "rgba(55, 255, 55, 0.4)" },
          { type: "text", position: [90, 10, 10, 80], color: "rgba(255, 255, 255, 0.8)", value: "TP" },
        ]
      };
      ship.setUIComponent(UI);
      row++;
    });
    
    ship.setUIComponent({
      id: "teleporter_playerZone",
      position: [6, 30, 73, 64],
      clickable: false,
      visible: ship.custom.teleporter_is_open,
      components: [
        { type: "box", position: [0, 0, 100, 100], fill: "rgba(55, 55, 55, 0.4)" },
        (players.length <= 0) ? { type: "text", align: "center", position: [1, 10, 25, 4], color: "rgba(255, 255, 255, 0.6)", value: "There are no players to teleport to." } : {}
      ]
    });
  }
};

const selector = {
  highlighter: function (ship) {
    stepTimeout.clear(ship.custom.actualization_reducer);
    ship.custom.actualization_reducer = stepTimeout.set(() => {
      const storage = info.shipTree;
      ship.setUIComponent(this.highlight(ship, `selector_ships_${storage[ship.type].name}_${ship.type}`, true));
      if (ship.custom.previous_ship != ship.type) {
        ship.setUIComponent(this.highlight(ship, `selector_ships_${storage[ship.custom.previous_ship].name}_${ship.custom.previous_ship}`, false));
      }
      ship.custom.previous_ship = ship.type;
    }, 0.4);
  },

  highlight: function (ship, id, highlight) {
    const button = ship.custom.selector_button_list.find(b => b.id === id);
    button.components[0].width = highlight ? 5 : 1;
    return button;
  },
  
  createShipList: function(ship) {
    const limit = {
      top: 36,
      left: 7,
      right: 78,
    };

    const spacing = 0.5;
    const areaWidth = limit.right - limit.left;

    const list = Object.values(info.order).slice().reverse();

    const maxRowLength = Math.max(...list.map(tier => tier.length));
    const maxCaseWidth = 8;
    const totalSpacing = (maxRowLength - 1) * spacing;
    const uniformWidth = Math.min(maxCaseWidth, (areaWidth - totalSpacing) / maxRowLength);

    const size = {
      width: uniformWidth,
      height: 6
    };

    ship.custom.selector_button_list = [];

    list.forEach((tier, row) => {
      const totalWidth = tier.length * (size.width + spacing) - spacing;
      const offsetX = limit.left + (areaWidth - totalWidth) / 2;

      tier.forEach((vessel, line) => {
        const x = offsetX + line * (size.width + spacing);
        const y = limit.top + row * (size.height + 1);
        
        const highlight = ship.type == vessel[0] ? 5 : 1;
        
        const UI = {
          id: `selector_ships_${vessel[1]}_${vessel[0]}`,
          position: [x, y, size.width, size.height],
          clickable: ship.custom.selector_is_open,
          visible: ship.custom.selector_is_open,
          components: [
            { type: "box", position: [0, 0, 100, 100], fill: "rgba(55, 55, 55, 0.4)", stroke: "rgba(255, 255, 255, 0.8)", width: highlight },
            { type: "text", position: [0, 10, 100, 40], color: "rgba(255, 255, 255, 1)", value: vessel[1] },
            { type: "text", position: [0, 55, 100, 35], color: "rgba(255, 255, 255, 1)", value: vessel[0] }
          ]
        };
        
        ship.custom.selector_button_list.push(UI);
        ship.setUIComponent(UI);
      });
    });
  },

  manage: function (ship) {
    ship.setUIComponent({
      id: "selector_header",
      position: [6, 30, 50, 5],
      clickable: false,
      visible: ship.custom.selector_is_open,
      components: [
        { type: "text", position: [20, -375, 100, 800], color: "rgba(100, 100, 100, 1)", value: "V" },
        { type: "box", position: [0, 0, 75, 100], fill: "rgba(100, 100, 100, 1)" },
        { type: "text", align: "left", position: [4, 10, 100, 80], color: "rgba(255, 255, 255, 1)", value: "Ship selector" }
      ]
    });

    ship.setUIComponent({
      id: "selector_hide",
      position: [69, 30, 10, 5],
      clickable: ship.custom.selector_is_open,
      visible: ship.custom.selector_is_open,
      shortcut: "9",
      components: [
        { type: "text", position: [-50, -375, 100, 800], color: "rgba(255, 55, 55, 1)", value: "V" },
        { type: "box", position: [18, 0, 100, 100], fill: "rgba(255, 55, 55, 1)" },
        { type: "text", position: [8, 20, 100, 60], color: "rgba(255, 255, 255, 1)", value: "Close [9]" }
      ]
    });

    ship.setUIComponent({
      id: "selector_switch_next",
      position: ship.custom.selector_is_open ? [7, 85.4, 9, 7] : [0, 0, 0, 0],
      clickable: true,
      visible: true,
      shortcut: "1",
      components: [
        { type: "box", position: [0, 0, 100, 100], fill: "rgba(255, 255, 255, 0.4)" },
        { type: "text", position: [0, 10, 100, 45], color: "rgba(255, 255, 255, 1)", value: "Next Ship" },
        { type: "text", position: [0, 55, 100, 35], color: "rgba(255, 255, 255, 1)", value: "[1]" }
      ]
    });
    
    ship.setUIComponent({
      id: "selector_switch_previous",
      position: ship.custom.selector_is_open ? [17, 85.4, 9, 7] : [0, 0, 0, 0],
      clickable: true,
      visible: true,
      shortcut: "2",
      components: [
        { type: "box", position: [0, 0, 100, 100], fill: "rgba(255, 255, 255, 0.4)" },
        { type: "text", position: [0, 10, 100, 45], color: "rgba(255, 255, 255, 1)", value: "Prev Ship" },
        { type: "text", position: [0, 55, 100, 35], color: "rgba(255, 255, 255, 1)", value: "[2]" }
      ]
    });
    
    this.createShipList(ship);
    
    ship.setUIComponent({
      id: "selector_treeZone",
      position: [6, 30, 73, 64],
      clickable: false,
      visible: ship.custom.selector_is_open,
      components: [
        { type: "box", position: [0, 0, 100, 100], fill: "rgba(55, 55, 55, 0.4)" },
        { type: "text", align: "center", position: [73, 88, 25, 4], color: "rgba(255, 255, 255, 0.6)", value: "[1] and [2] can be used even" },
        { type: "text", align: "center", position: [73, 92, 25, 4], color: "rgba(255, 255, 255, 0.6)", value: "if the selector is closed." }
      ]
    });
    
    if (ship.custom.selector_is_open) {
      this.highlighter(ship);
    }
  }
};

this.event = function(event, game) {
  switch(event.name) {
    case "ui_component_clicked":
      events.manage(event, game);
      break;
    case "ship_spawned":
      if (!event.ship.custom.init) {
        event.ship.custom.init = true;
        event.ship.custom.selector_button_list = [];
        event.ship.custom.previous_ship = 101;
        event.ship.custom.keep_maxed = true;
        
        Object.entries(buttons).forEach(([key, value]) => {
          if (key === "pos") return;
          event.ship.setUIComponent(value.call(buttons, event.ship));
        });
        return;
      }
      
      events.regen(event.ship);
      const death = event.ship.custom.last_place_of_death;
      event.ship.set({
        x: death.x,
        y: death.y
      })
      break;
    case "ship_destroyed":
      event.ship.custom.last_place_of_death = {
        x: event.ship.x, 
        y: event.ship.y
      };
      break;
  }
};

this.tick = function(game) {
  stepTimeout.update(game);
};

;(function() {
  game.custom.gameLaunched = true;
  utilities.buildShiptree();
}).call(this);