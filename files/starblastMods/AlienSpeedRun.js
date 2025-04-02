var informations = {

    name: "Alien SpeedRun\n\n",

    Version: "2.1.2",
    Creator: "Megalodon\n",

    warning: `
ASR (Alien SpeedRun) IS A SOLO MODE!
      
WHICH MEANS IT IS NOT MADE FOR MORE THAN 1 PLAYER TO JOIN.
TRYING TO MAKE MORE THAN 1 PLAYER JOIN IS GONNA CAUSE 
THE MOD TO CRASH OR MALFUNCTION.
      
Thanks.\n`
};

var info = {
  startingGame: false,
  instrutor_ended: false,
  
  endGameTimer: 0,
  time: 30,
  
  stage: 0, // 0
  code: 1, // 1
  
  nextAlien_Code: 10, // 10
  nextAlien_Level: 0 // 0
};

var work = {
  addObject: function(name, object, i) {
    i = {x: 0,y: 0,z: 0,sx: 0,sy: 0,sz: 0,rx: Math.PI,rz: Math.PI,...i};
    game.setObject({
      id: name,
      type: object,
      position: {x: i.x,y: i.y,z: i.z},
      scale: {x: i.sx,y: i.sy,z: i.sz},
      rotation: {x: i.rx,y: 0,z: i.rz}
    });
  },
  distance: function(e, t) {
    return Math.sqrt(e * e + t * t)
  },
  shortestPath: function(e, t, i, o) {
    var n = 5 * game.options.map_size,
      a = [
        [i - e, o - t],
        [i + 2 * n - e, o - t],
        [i - 2 * n - e, o - t],
        [i - e, o + 2 * n - t],
        [i - e, o - 2 * n - t],
        [i + 2 * n - e, o + 2 * n - t],
        [i + 2 * n - e, o - 2 * n - t],
        [i - 2 * n - e, o + 2 * n - t],
        [i - 2 * n - e, o - 2 * n - t]
      ];
    let s = 1 / 0,
      r = [0, 0];
    for (let e = 0; e < a.length; e++) {
      var t = this.distance(a[e][0], a[e][1]);
      t < s && (s = t, r = a[e])
    }
    return r
  },
  addMap: function(game, e, t, i, o, n) {
    var a = this.shortestPath(e.x, e.y, t.x, t.y)
    var s = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    game.setUIComponent({
      id: "ShowAlien",
      position: [45 + a[0] / s * 25, 45 - a[1] / s * 25, 10, 10],
      clickable: false,
      visible: true,
      components: [{
          type: "box",
          position: [44, 47, 12, 12],
          fill: `rgb(${i})`,
          stroke: "#CDE",
          width: 2
      }, {
          type: "text",
          position: [25, 67, 50, 24],
          value: n,
          color: "#CDE"
      }, {
          type: "text",
          position: [10, 10, 80, 30],
          value: o,
          color: "#CDE"
      }]
    })
  },
  paChangeMode: function(e, t) {
    return 16 == e && 3 == t || 20 == e && t >= 1 ? "active" : "passive";
  },
  getNextAlien: function() {
    return info.code === Object.keys(datas.wavesInfo[info.stage]).length ? (info.stage++, info.code = 1) : info.code++, {
      code: datas.wavesInfo[info.stage][info.code].code,
      level: datas.wavesInfo[info.stage][info.code].level
    }
  },
  isBoss: function(e, t) {
    return 20 == e || 19 == e || 15 == e || 12 == e || 16 == e && 3 == t || 10 == e && 3 == t
  },
  alert: function(game, t = "", i = "", o = "rgba(255, 255, 255, 0.8)", delay = 4e3, a = {txt1: 18,txt2: 24}) {
    clearTimeout(game.custom.logtimeout), 
    game.custom.logtimeout = setTimeout((() => {game.setUIComponent({id: "Text",  visible: false})}), delay), 
    game.setUIComponent({
      id: "Text",
      position: [-5, -5, 110, 110],
      clickable: false,
      visible: true,
      components: [{
        type: "text",
        position: [0, a.txt1, 100, 5],
        color: o,
        value: t
      }, {
        type: "text",
        position: [0, a.txt2, 100, 4],
        color: o,
        value: i
      }]
    })
  },
  shipInstructor: function(e, t, i = "Lucina", o = 0, n = 0, a = !0) {
    if (!e || !t || !t.length) return;
    let s;
    s = n ? function() {
      e.showInstructor(), e.instructorSays(t, i), setTimeout((() => {
        e.hideInstructor(), a && (info.instrutor_ended ? info.instrutor_ended = !1 : (info.instrutor_ended = !0, e.setUIComponent(gameUIs.radar_background), work.addObject("MapCenter", datas.objects.MapCenter, {x: 100,y: 100,z: -15,sx: 60,sy: 60,rz: 0})))
      }), 650 * n)
    } : function() {
      e.showInstructor(), e.instructorSays(t, i)
    }, setTimeout(s, 650 * o)
  },
  shipColor: function(ship) {
    var t = datas.damagePerLevels[Math.floor(ship.type / 100)];
    return ship.shield <= 5 ? "55, 55, 55" : ship.shield <= t[0] ? "255, 55, 55" : ship.shield <= t[1] ? "255, 155, 55" : ship.shield >= t[1] ? "55, 255, 55" : "255, 255, 255"
  },
  format_time: function(e) {
    return e > 0 ? (minutes = Math.floor(e / 60), seconds = e % 60, e % 60 == 0 ? `${(e/60).toString()}:00` : (seconds < 10 && (seconds = `0${seconds.toString()}`), minutes < 1 ? seconds.toString() : `${minutes.toString()}:${seconds.toString()}`)) : "0:00";
  },
  stageByColor: function() {
    return 0 === info.stage ? "55, 255, 55" : 1 === info.stage ? "255, 220, 55" : 2 === info.stage ? "255, 55, 55" : 3 === info.stage ? "155, 55, 255" : info.stage >= 4 ? "55, 200, 255" : "255, 255, 255"
  },
  colorForBosses: function() {
    let inform = datas.aliensInfo[info.nextAlien_Code];
    return "Caterpillar" == inform.name || "Final Boss" == inform.name ? "155,55,255" : "255,255,255";
  },
  colorDifficultyAliens: function() {
    let inform = datas.aliensInfo[info.nextAlien_Code];
    return "Easy" == inform.difficulty[info.nextAlien_Level] ? "55,255,55" : "Medium" == inform.difficulty[info.nextAlien_Level] ? "255,155,55" : "Medium" == inform.difficulty[info.nextAlien_Level] ? "151,0,0" : "255,55,55";
  },
  prepareShip: function(ship, game, i = 0) {
    game.setUIComponent(gameUIs.hideScore);
    game.custom.Hasjoined = true;
    ship.custom.kills = 0;
    ship.set({x: 0,y: 0,invincible: 1e3,idle: true}); 
    
    // instructor messages
    this.shipInstructor(game.findShip(1), "Welcome to..\n", "Zoltar");
    this.shipInstructor(game.findShip(1), "Alien Speedrun!\n", "Zoltar", i += 3);
    this.shipInstructor(game.findShip(1), "To win the game, you must kill all the aliens as quickly as possible without dying once..\n", "Zoltar", i += 3); 
    this.shipInstructor(game.findShip(1), "There are 5 stages, from 0 to 4, each one is more difficult than the other\n", "Zoltar", i += 9); 
    this.shipInstructor(game.findShip(1), "Complete them as quickly as possible and maybe become the new record holder!\n", "Zoltar", i += 8);
    this.shipInstructor(game.findShip(1), "\nGood luck Commander!", "Zoltar", i += 8, 4);
    
    // ready game
    info.startingGame = true;
  },
  expulsed: function() {
    game.ships.forEach((e => {
      this.alert(game, "A problem has occurred", "Please restart the mod in order to continue playing", "rgba(255, 55, 55, 0.8)", 8e3);
      e.set({x: 0,y: 0,vx: 0,vy: 0,collider: false,type: 191,idle: true});
      setTimeout((() => { e.gameover({"-": e.name.toString(),"A problem has occurred on": "Alien SpeedRun","Please": "Restart the mod"})}), 5e3)
    }));
    game.custom.launched === true && this.goValues(datas.announceMessages.error, "#fc4444");
    info.startingGame = false;
  },
  desactivate: function() {
    var ship = game.findShip(1);
    this.alert(game, "You failed!", "Be better next time!", "rgba(255, 55, 55, 0.8)");
    var playersShip = datas.shipsInformations.hasOwnProperty(ship.type) ? datas.shipsInformations[ship.type] : datas.shipsInformations.default;
    ship.set({x: 0,y: 0,vx: 0,vy: 0,collider: false,type: 191,idle: true}); 
    setTimeout((() => {
      var i = datas.aliensInfo[info.nextAlien_Code];
      ship.gameover({
        "You LOST!": ship.name.toString(),
        "Killer": i.name.toString(),
        "Difficulty": i.difficulty[info.nextAlien_Level].toString(),
        "Stage": `${info.stage.toString()}/4`,
        "Time Survived": this.format_time(info.time - 1).toString(),
        "Ship Used": `${playersShip}, Tier ${Math.floor(ship.custom.oldType / 100)}`,
        "Aliens Killed": ship.custom.kills.toString()
      });
      this.goValues(datas.announceMessages.expulse, "#fc9744");
    }), 4e3)
  },
  gameFinished: function(ship, t = 0, i = 0) {
    ship.custom.oldType = ship.type,
    info.startingGame = false, 
    info.endGameTimer = info.time, 
    ship.set({x: 0,y: 0,vx: 0,vy: 0,collider: false,type: 191,idle: true});
    this.alert(game, "Finished!", "Well done Commander!", "rgba(55,255,55,0.8)");
    setTimeout((() => {
      info.time = 30;
      info.startingGame = 2;
    }), i += 2e3);
    setTimeout((() => {
      this.shipInstructor(game.findShip(1), "\n\n\n\n\n\n", "Zoltar", 1);
      this.shipInstructor(game.findShip(1), "Well done! Commander\n", "Zoltar", t += 2);
      this.shipInstructor(game.findShip(1), "You successfuly killed all of the aliens.\n", "Zoltar", t += 5);
      this.shipInstructor(game.findShip(1), `It took you ${this.format_time(info.endGameTimer-1)} minutes to finish the Speedrun!\n`, "Zoltar", t += 6);
      this.shipInstructor(game.findShip(1), "You did a great performance.\n", "Zoltar", t += 7);
      this.shipInstructor(game.findShip(1), "Thanks for playing, and see you next SpeedRun!", "Zoltar", t += 5);
      this.shipInstructor(game.findShip(1), "\n\n\n\n\n\ncommunications\nover.\n", "Zoltar", t += 6, 4);
    }), i += 2e3);
    this.goValues(datas.announceMessages.finish, "#44fc4f");
  },
  setVariables: function(e, t = [], i = 0) {
    if (!(e.len > 10)) {
      for (e.gap = e.gap || 1; i < e.len;) {
        var o = Math.round(Math.random() * (10 * e.gap)) + 10 * e.order;
        t.includes(o) || (t.push(o), i++)
      }
      return t
    }
  },
  getCords: function(e, t, i = !0) {
    var o = Array(e + 1).fill(0).map(((i, o) => t.cords - Math.round(e / 2) + o));
    return i ? o[~~(Math.random() * o.length)] : o
  },
  repeatString: function(str, num) {
    return num > 0 ? str.repeat(num) : '';
  },
  mapOpen: function() {
    const { echo } = game.modding.terminal;
    echo("\n");
    for (const key in informations) {
      if (Object.hasOwnProperty.call(informations, key)) {
        const text = key == "warning" || key == "name" ? informations[key] : `${key} - ${informations[key]}`;
        const lines = text.split('\n');
        const maxWidth = lines.reduce((max, line) => Math.max(max, line.length), 0);
        lines.forEach(line => {
          const spaceBefore = this.repeatString(' ', Math.floor((65 - line.length) / 2));
          const color = key == "warning" ? `[[ig;#fc4444;]` : key == "name" ? `[[igb;#ffdf00;]` : `[[ig;#37b8fa;]`;
          echo(`${spaceBefore}${color}${line}]`);
        });
      }
    };
    game.custom.launched = true;
  },
  goValues: function(path, color) {
    const { echo } = game.modding.terminal;
    echo(" ");
    path.forEach(message => {
      const spaceBefore = this.repeatString(' ', Math.floor((65 - message.length) / 2));
      echo(`${spaceBefore}[[ig;${color};]${message}]`);
    });
    echo(" ");
  }
};

var datas = {
  collectibles: [10, 11, 20, 21, 41, 42, 90, 91],
  asteroid_positions: work.getCords(100, {cords: 100}, !1),
  asteroid_sizes: work.setVariables({order: 3,len: 10,gap: 2}),
  asteroid_velocity: work.getCords(6, {cords: 0}, !1).map((e => e / 12.5)).filter((e => 0 !== e)),
  hideScoreColor: ["100,55,55", "55,100,55", "55,55,100", "100,55,100"][~~(4 * Math.random())],
  intraWaves: {
    active: {
      velocityMultiplier: 2.5,
      sizeReducer: 1.15,
      spawnFrequency: 0.5,
      spawnLimit: 16
    },
    passive: {
      velocityMultiplier: 1,
      sizeReducer: 1,
      spawnFrequency: 4,
      spawnLimit: 4
    }
  },
  map: "                    \n"+
       "                    \n"+
       "                    \n"+
       "                    \n"+
       "                    \n"+
       "                    \n"+
       "          5         \n"+
       "      55758 7       \n"+
       "       8  57        \n"+
       "       57  58       \n"+
       "      55    55      \n"+
       "      58 7 75       \n"+
       "       7 8755       \n"+
       "        55 5        \n"+
       "                    \n"+
       "                    \n"+
       "                    \n"+
       "                    \n"+
       "                    \n"+
       "                    ",
  vocabulary: [
    {text: "GG",icon: "£",key: "G"}, 
    {text: "Alien",icon: "0",key: "A"}, 
    {text: "Yes",icon: "L",key: "Y"}, 
    {text: "No",icon: "M",key: "N"}, 
    {text: "Record",icon: "2",key: "J"}, 
    {text: "For the win",icon: ".",key: "W"}
  ],
  aliensInfo: {
    10: {
      name: "Chicken",
      difficulty: {
        0: "Easy",
        1: "Easy",
        2: "Easy",
        3: "Medium"
      }
    },
    11: {
      name: "Crab",
      difficulty: {
        0: "Easy",
        1: "Easy",
        2: "Easy",
        3: "Easy"
      }
    },
    12: {
      name: "Fortress",
      difficulty: {
        0: "Medium",
        1: "Hard",
        2: "Hard",
        3: "Hard"
      }
    },
    14: {
      name: "Candlestick",
      difficulty: {
        0: "Easy",
        1: "Easy",
        2: "Easy",
        3: "Easy"
      }
    },
    15: {
      name: "Hirsute",
      difficulty: {
        0: "Medium",
        1: "Hard",
        2: "Hard",
        3: "Hard"
      }
    },
    16: {
      name: "Piranha",
      difficulty: {
        0: "Easy",
        1: "Easy",
        2: "Easy",
        3: "Hard"
      }
    },
    17: {
      name: "Pointu",
      difficulty: {
        0: "Easy",
        1: "Easy",
        2: "Easy",
        3: "Easy"
      }
    },
    18: {
      name: "Fork",
      difficulty: {
        0: "Easy",
        1: "Easy",
        2: "Easy",
        3: "Easy"
      }
    },
    19: {
      name: "Saucer",
      difficulty: {
        0: "Medium",
        1: "Medium",
        2: "Hard",
        3: "Hard"
      }
    },
    20: {
      name: "Final Boss",
      difficulty: {
        0: "Hard",
        1: "Hard",
        2: "Hard",
        3: "Hard"
      }
    },
    13: {
      name: "Caterpillar",
      difficulty: {
        0: "Medium",
        1: "Hard",
        2: "Extreme"
      }
    }
  },
  wavesInfo: {
    0: {
      1: {
        code: 10,
        level: 0
      },
      2: {
        code: 11,
        level: 0
      },
      3: {
        code: 14,
        level: 0
      },
      4: {
        code: 16,
        level: 0
      },
      5: {
        code: 17,
        level: 0
      },
      6: {
        code: 18,
        level: 0
      }
    },
    1: {
      1: {
        code: 10,
        level: 1
      },
      2: {
        code: 11,
        level: 1
      },
      3: {
        code: 12,
        level: 0
      },
      4: {
        code: 14,
        level: 1
      },
      5: {
        code: 15,
        level: 0
      },
      6: {
        code: 16,
        level: 1
      },
      7: {
        code: 17,
        level: 1
      },
      8: {
        code: 18,
        level: 1
      },
      9: {
        code: 19,
        level: 0
      }
    },
    2: {
      1: {
        code: 10,
        level: 2
      },
      2: {
        code: 11,
        level: 2
      },
      3: {
        code: 12,
        level: 1
      },
      4: {
        code: 14,
        level: 2
      },
      5: {
        code: 15,
        level: 1
      },
      6: {
        code: 16,
        level: 2
      },
      7: {
        code: 19,
        level: 1
      },
      8: {
        code: 20,
        level: 0
      }
    },
    3: {
      1: {
        code: 10,
        level: 3
      },
      2: {
        code: 16,
        level: 3
      },
      3: {
        code: 17,
        level: 2
      },
      4: {
        code: 18,
        level: 2
      },
      5: {
        code: 19,
        level: 2
      },
      6: {
        code: 20,
        level: 1
      }
    },
    4: {
      1: {
        code: 13,
        level: 0
      },
      2: {
        code: 13,
        level: 1
      },
      3: {
        code: 13,
        level: 2
      }
    },
    5: {
      1: {
        code: 0,
        level: 0
      }
    }
  },
  messages: {
    300: {
      txt1: `${work.format_time(300)}`,
      txt2: "Minutes on the clock",
      color: "rgba(255, 255, 55, 0.8)"
    },
    600: {
      txt1: `${work.format_time(600)}`,
      txt2: "Minutes on the clock!",
      color: "rgba(255, 255, 55, 0.8)"
    },
    1200: {
      txt1: `${work.format_time(1200)}`,
      txt2: "Minutes on the clock..!",
      color: "rgba(255, 155, 55, 0.8)"
    },
    1800: {
      txt1: `${work.format_time(1800)}`,
      txt2: "Minutes on the clock..! Time is running high!",
      color: "rgba(255, 55, 55, 0.8)"
    },
    3600: {
      txt1: `Bro? are you even still playing?`,
      txt2: `${work.format_time(2700)} minutes is kinda long...`,
      color: "rgba(255, 55, 55, 0.8)"
    }
  },
  announceMessages: {
    expulse: [
      "The aliens were too strong to retreat!",
      "STOP and RESTART the Mod to retry the SpeedRun"
    ],
    error: [
      "Something went wrong",
      "STOP and RESTART the Mod to retry the SpeedRun"
    ],
    finish: [
      "All aliens have been defeated",
      "STOP and RESTART the Mod to retry the SpeedRun"
    ]
  },
  shipsInformations: {
    default: "Unknown",
    301: "Pulse-Fighter",
    302: "Side-Fighter",
    303: "Shadow X-1",
    304: "Y-Defender",
    401: "Vanguard",
    402: "Mercury",
    403: "X-Warior",
    404: "Side-interceptor",
    405: "Pioneer",
    406: "Crusader",
    501: "U-Sniper",
    502: "FuryStar",
    503: "T-Warrior",
    504: "Aetos",
    505: "Shadow X-2",
    506: "Howler",
    507: "Bat-Defender",
    601: "Advanced-Fighter",
    602: "Scorpion",
    603: "Marauder",
    604: "Condor",
    605: "A-Speedster",
    606: "Rock-Tower",
    607: "Barracuda",
    608: "O-Defender",
    701: "Odyssey",
    702: "Shadow X-3",
    703: "Bastion",
    704: "Aries",
  },
  damagePerLevels: {
    1: [0, 50],
    2: [25, 75],
    3: [50, 100],
    4: [75, 125],
    5: [100, 150],
    6: [125, 175],
    7: [150, 200]
  },
  ship: ['{"name":"Spectator","level":1.9,"model":1,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}'],
  objects: {
    MapCenter: {
      id: "MapCenter",
      obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
      emissive: "https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/Aliens_SpeedRun_blur.png"
    },
    lost_sector_aries: {
      id: "lost_sector_aries",
      obj: "https://starblast.io/lost_sector/LostSector_Aries_HardEdges.obj",
      diffuse: "https://starblast.io/lost_sector/LostSector_Aries_LostSector_Aries_Diffuse.jpg",
      bump: "https://starblast.io/lost_sector/LostSector_Aries_LostSector_Aries_Height.jpg",
      specular: "https://starblast.io/lost_sector/LostSector_Aries_LostSector_Aries_Specular.jpg",
      shininess: 10,
      emissiveColor: 0,
      specularColor: 16777215,
      transparent: false
    }
  }
};

var gameUIs = {
  hideScore: {
    id: "hideScore",
    position: [0.5, 1.5, 16.5, 7],
    clickable: false,
    visible: true,
    components: [{
      type: "box",
      position: [0, 0, 100, 100],
      fill: `rgb(${datas.hideScoreColor})`,
      stroke: `rgb(${datas.hideScoreColor})`,
      width: 8
    }, {
      type: "text",
      position: [2, 8, 100, 25],
      value: `Version  -  ${informations.Version}`
    }, {
      type: "text",
      position: [2, 37, 100, 25],
      value: `Creator  -  ${informations.Creator}`
    }, {
      type: "text",
      position: [2, 65, 100, 25],
      value: `Mode  -  ${informations.name}`
    }].map((el => ({
      ...el,
      color: "rgb(255,255,255)",
      align: "left"
    })))
  },
  radar_background: {
    id: "radar_background",
    position: [100, 100, 0, 0],
    visible: !0,
    components: [{
        type: "round",
        position: [-7.5, -7.5, 15, 15]
    }, {
        type: "round",
        position: [92.5, 92.5, 15, 15]
    }, {
        type: "round",
        position: [92.5, -7.5, 15, 15]
    }, {
        type: "round",
        position: [-7.5, 92.5, 15, 15]
    }].map((el => ({
      ...el,
      fill: "rgba(55,255,55, 0.4)",
      stroke: "rgba(55,255,55, 0.6)",
      width: 2
    })))
  },
  endScoreboard: function(game) {
    return {
      id: "scoreboard",
      clickable: false,
      visible: true,
      components: [{
        type: "text",
        position: [14, 4, 100, 8],
        value: "Game is ending",
        color: "rgba(255,255,255,0.8)",
        align: "left"
      }, {
        type: "text",
        position: [32, 4, 100, 8],
        value: work.format_time(info.time),
        color: "rgba(255,255,255,0.8)",
        align: "center"
      }, {
        type: "box",
        position: [10, 15, 80, 1.4],
        fill: "rgba(155, 155, 155, 0.4)"
      }, {
        type: "box",
        position: [0, 21, 1.5, 12],
        fill: `rgba(${work.shipColor(game.findShip(1))}, 0.4)`
      }, {
        type: "box",
        position: [3, 21, 96, 12],
        fill: "rgba(155, 155, 155, 0.1)"
      }, {
        type: "player",
        id: t.id,
        position: [4, 22.5, 100, 9],
        value: "",
        color: "rgba(255,255,255,0.8)"
      }, {
        type: "text",
        position: [0, 57, 100, 8],
        value: "Communications",
        color: "rgba(255,255,255,0.8)",
        align: "center"
      }, {
        type: "text",
        position: [0, 67, 100, 8],
        value: "Over",
        color: "rgba(255,255,255,0.8)",
        align: "center"
      }]
    };
  },
  prepareScoreboard: function(game) {
    return {
      id: "scoreboard",
      clickable: false,
      visible: true,
      components: [{
        type: "text",
        position: [14, 4, 100, 8],
        value: work.format_time(info.time),
        color: "rgba(255,255,255,0.8)",
        align: "left"
      }, {
        type: "text",
        position: [52, 4, 100, 8],
        value: `Stage  ${info.stage}/4`,
        color: "rgba(55, 255, 55,0.8)",
        align: "left"
      }, {
        type: "box",
        position: [10, 15, 80, 1.4],
        fill: "rgba(155, 155, 155, 0.4)"
      }, {
        type: "box",
        position: [0, 21, 1.5, 12],
        fill: `rgba(${work.shipColor(game.findShip(1))}, 0.4)`
      }, {
        type: "box",
        position: [3, 21, 96, 12],
        fill: "rgba(155, 155, 155, 0.1)"
      }, {
        type: "player",
        id: 1,
        position: [4, 22.5, 100, 9],
        value: "",
        color: "rgba(255,255,255,0.8)"
      }, {
        type: "text",
        position: [0, 60, 100, 8],
        value: "Game loading, wait..!",
        color: "rgba(255,255,255,0.8)",
        align: "center"
      }]
    }
  },
  updateScoreboard: function(game) {
    return {
      id: "scoreboard",
      clickable: false,
      visible: true,
      components: [{
        type: "text",
        position: [14, 4, 100, 8],
        value: work.format_time(info.time++),
        color: "rgba(255,255,255,0.8)",
        align: "left"
      }, {
        type: "text",
        position: [52, 4, 100, 8],
        value: `Stage  ${info.stage}/4`,
        color: `rgba(${work.stageByColor()}, 0.8)`,
        align: "left"
      }, {
        type: "box",
        position: [10, 15, 80, 1.4],
        fill: "rgba(155, 155, 155, 0.4)"
      }, {
        type: "box",
        position: [0, 21, 1.5, 12],
        fill: `rgba(${work.shipColor(game.findShip(1))}, 0.4)`
      }, {
        type: "box",
        position: [3, 21, 96, 12],
        fill: "rgba(155, 155, 155, 0.1)"
      }, {
        type: "player",
        id: 1,
        position: [4, 22.5, 100, 9],
        value: "",
        color: "rgba(255,255,255,0.8)"
      }, {
        type: "text",
        position: [0, 37.5, 100, 8],
        value: "Game Information",
        color: "rgba(255,255,255,0.8)",
        align: "center"
      }, {
        type: "box",
        position: [22.5, 45, 55, .8],
        fill: "rgba(155, 155, 155, 0.4)"
      }, {
        type: "box",
        position: [0, 53, 1.5, 10],
        fill: "rgba(255, 255, 255, 0.4)"
      }, {
        type: "box",
        position: [3, 53, 75, 10],
        fill: "rgba(155, 155, 155, 0.1)"
      }, {
        type: "box",
        position: [79.5, 53, 19.5, 10],
        fill: "rgba(155, 155, 155, 0.2)"
     }, {
        type: "text",
        position: [20, 54, 100, 8],
        value: "Aliens Killed",
        color: "rgba(255,255,255,0.8)",
        align: "left"
      }, {
        type: "text",
        position: [39.5, 54, 100, 8],
        value: game.findShip(1).custom.kills,
        color: "rgba(255,255,255,0.8)",
        align: "center"
      }, {
        type: "box",
        position: [0, 65, 1.5, 10],
        fill: `rgba(${work.colorForBosses()}, 0.4)`
      }, {
        type: "box",
        position: [3, 65, 55, 10],
        fill: "rgba(155, 155, 155, 0.1)"
      }, {
        type: "box",
        position: [59.5, 65, 39.5, 10],
        fill: "rgba(155, 155, 155, 0.2)"
      }, {
        type: "text",
        position: [9.5, 66, 100, 8],
        value: "Current Alien",
        color: "rgba(255,255,255,0.8)",
        align: "left"
      }, {
        type: "text",
        position: [29, 66, 100, 8],
        value: datas.aliensInfo[info.nextAlien_Code].name,
        color: `rgba(${work.colorForBosses()}, 0.8)`,
        align: "center"
      }, {
        type: "box",
        position: [0, 77, 1.5, 10],
        fill: `rgba(${work.colorDifficultyAliens()}, 0.4)`
      }, {
        type: "box",
        position: [3, 77, 60, 10],
        fill: "rgba(155, 155, 155, 0.1)"
      }, {
        type: "box",
        position: [64.5, 77, 34.5, 10],
        fill: "rgba(155, 155, 155, 0.2)"
      }, {
        type: "text",
        position: [9.5, 78, 100, 8],
        value: "Alien Difficulty",
        color: "rgba(255,255,255,0.8)",
        align: "left"
      }, {
        type: "text",
        position: [31.5, 78, 100, 8],
        value: datas.aliensInfo[info.nextAlien_Code].difficulty[info.nextAlien_Level],
        color: `rgba((${work.colorDifficultyAliens()}, 0.8)`,
        align: "center"
      }, {
        type: "box",
        position: [0, 89, 1.5, 10],
        fill: "rgba(255, 255, 255, 0.4)"
      }, {
        type: "box",
        position: [3, 89, 75, 10],
        fill: "rgba(155, 155, 155, 0.1)"
      }, {
        type: "box",
        position: [79.5, 89, 19.5, 10],
        fill: "rgba(155, 155, 155, 0.2)"
      }, {
        type: "text",
        position: [12.5, 90, 100, 8],
        value: "Moving Asteroids",
        color: "rgba(255,255,255,0.8)",
        align: "left"
      }, {
        type: "text",
        position: [39.5, 90, 100, 8],
        value: game.asteroids.length,
        color: "rgba(255,255,255,0.8)",
        align: "center"
      }]
    };
  }
}

work.expulsed(), game.custom.launched || work.mapOpen();
work.addObject("lost_sector_aries", datas.objects.lost_sector_aries, {x: 100,y: 100,z: -60,sx: 2,sy: 2,sz: 2,rx: 0});

this.options = {
  radar_zoom: 1,
  root_mode: "",
  map_name: informations.name,
  map_size: 20,
  max_players: 1,
  crystal_value: 2.5,
  starting_ship: 801,
  starting_ship_maxed: true,
  weapons_store: false,
  choose_ship: [301, 302, 303, 304],
  custom_map: datas.map,
  vocabulary: datas.vocabulary,
  soundtrack: "warp_drive.mp3",
  ships: datas.ship
};

this.tick = function(game) {
  if (game.step % 60 == 0) {
    switch (info.startingGame) {
      case true:
        if (info.time >= 0) {
          info.time--;
          game.setUIComponent(gameUIs.prepareScoreboard(game));
          if (info.instrutor_ended === true) {
            work.alert(game, work.format_time(info.time + 1), "Starting...!", "rgba(255,255,255, 0.8)", 1500);
          }
        } else {
          info.time = 0;
          info.startingGame = 1;
          game.addAlien({
            code: info.nextAlien_Code,
            level: info.nextAlien_Level,
            x: 5 * game.options.map_size,
            y: 5 * game.options.map_size,
            crystal_drop: work.setVariables({order: info.stage + 4,len: 10,gap: 2})[~~(Math.random() * 10)],
            weapon_drop: datas.collectibles[~~(Math.random() * datas.collectibles.length)]
          });
          work.alert(game, "First Alien!", `Alien:  ${datas.aliensInfo[info.nextAlien_Code].name}, difficulty:  ${datas.aliensInfo[info.nextAlien_Code].difficulty[info.nextAlien_Level]}`)
          game.findShip(1).set({idle: false});
        }
        break;
      case 1:
        game.setUIComponent(gameUIs.updateScoreboard(game));
        datas.messages.hasOwnProperty(info.time) && work.alert(game, datas.messages[info.time].txt1, datas.messages[info.time].txt2, datas.messages[info.time].color, 4e3, {txt1: 75,txt2: 81});
        var donnees = datas.intraWaves[work.paChangeMode(info.nextAlien_Code, info.nextAlien_Level)];
        if (game.step % (60 * donnees.spawnFrequency) == 0 && game.asteroids.length <= donnees.spawnLimit) {
          game.addAsteroid({
            size: datas.asteroid_sizes[~~(Math.random() * datas.asteroid_sizes.length)] / donnees.sizeReducer,
            x: datas.asteroid_positions[~~(Math.random() * datas.asteroid_positions.length)],
            y: datas.asteroid_positions[~~(Math.random() * datas.asteroid_positions.length)],
            vx: datas.asteroid_velocity[~~(Math.random() * datas.asteroid_velocity.length)] * donnees.velocityMultiplier,
            vy: datas.asteroid_velocity[~~(Math.random() * datas.asteroid_velocity.length)] * donnees.velocityMultiplier
          });
        }
        break;
      case 2:
        if (info.time >= 0) {
          info.time--;
          game.setUIComponent(gameUIs.endScoreboard(game));
          if (info.instrutor_ended === false) {
            work.alert(game, work.format_time(info.time + 1), "Ending...!", "rgba(255,255,255, 0.8)", 1500);
          }
        } else {
          var ship = game.findShip(1);
          var lastShip = datas.shipsInformations.hasOwnProperty(ship.custom.oldType) ? datas.shipsInformations[ship.custom.oldType] : datas.shipsInformations.default;
          ship.gameover({
            "You WON!": ship.name.toString(),
            "-": "-",
            "Total Time": work.format_time(info.endGameTimer - 1),
            "Ship Used": `${lastShip}, Tier ${Math.floor(ship.custom.oldType / 100)}`,
            "Aliens Killed": ship.custom.kills.toString()
          });
        }
        break;
    }
  }
  if (game.step % 5 == 0) {
    if (game.custom.lastlyDied === true) return void game.ships[0].setUIComponent({id: "ShowAlien",visible: false});
    if (game.aliens[0]) {
      work.addMap(game, game.findShip(1), game.aliens[0], work.colorDifficultyAliens(), work.isBoss(info.nextAlien_Code, info.nextAlien_Level) ? "⚠️" : "♾️", datas.aliensInfo[info.nextAlien_Code].name) ;
    } else {
      game.setUIComponent({id: "ShowAlien", visible: false});
    }
  }
};

this.event = function(event, game) {
  switch (event.name) {
    case "alien_destroyed":
      event.killer.custom.kills++;
      i = work.getNextAlien();
      if (5 === info.stage) {
        work.gameFinished(event.killer);
      } else {
        info.nextAlien_Code = i.code;
        info.nextAlien_Level = i.level;
        o = datas.aliensInfo[info.nextAlien_Code];
        if (13 == i.code) {
          work.alert(game, "Warning!", `Next alien:  ${o.name}, difficulty:  ${o.difficulty[info.nextAlien_Level]}`, "rgba(155,55,255,0.8)");
        } else {
          work.alert(game, "Well Done!", `Next alien:  ${o.name}, difficulty:  ${o.difficulty[info.nextAlien_Level]}`);
        }
        coll = work.isBoss(info.nextAlien_Code, info.nextAlien_Level) ? 12 : datas.collectibles[~~(Math.random() * datas.collectibles.length)],
        cris = work.isBoss(info.nextAlien_Code, info.nextAlien_Level) ? work.setVariables({order: Math.pow(info.stage + 1, 3) + 10,len: 10,gap: 2})[~~(Math.random() * 10)] : work.setVariables({order: info.stage + 4,len: 10,gap: 2})[~~(Math.random() * 10)];
        setTimeout((() => {
          game.addAlien({code: info.nextAlien_Code,level: info.nextAlien_Level,x: 5 * game.options.map_size,y: 5 * game.options.map_size,crystal_drop: cris,weapon_drop: coll});
          if (13 == info.nextAlien_Code) {
            setTimeout((() => {
              alien = game.aliens[0];
              switch (info.code) {
                case 1: alien.set({damage: 100, rate: 2}); break;
                case 2: alien.set({damage: 200, rate: 1}); break;
                case 3: alien.set({damage: 600, rate: 0.2, laser_speed: 160}); break;
              }
            }), 200);
          }
        }), 3e3);
      }
      break;
    case "ship_spawned":
      game.custom.Hasjoined ? event.ship === game.findShip(1) ? work.desactivate(event.ship) : work.expulsed() : work.prepareShip(event.ship, game);
      break;
    case "asteroid_destroyed":
      if (event.killer && event.asteroid.size > 35) {
        i = datas.collectibles[~~(Math.random() * datas.collectibles.length)];
        game.addCollectible({code: i,x: e.asteroid.x,y: e.asteroid.y})
      }
      break;
    case "ship_destroyed":
      game.custom.lastlyDied = true;
      info.startingGame = false;
      event.ship.custom.oldType = event.ship.type;
      break;
  }
};