var gameInfo = {
  Copyright: "©Megalodon 2023-2024",
  Version: "v1.2.1",
  
  Name: "Meg's Dueling (OP)",
  Idea: "Bylolopro360",
  Support: "Bhpsngum",
  Auth: `Invalid⚠️`, // That will change when you start the game
  
   Connexions: {
    discord: "https://discord.gg/KXvCq4N",
    documentation: "https://urlz.fr/lQZd",
    feedback: "https://urlz.fr/lQZg"
  },
  
  issue: [
    `⚠️ Main code has been edited ⚠️`,
    `Issues might occur in the future`
  ],
  
  commandsInfo: {
    getPlayerName: function(player) {
      const icon = (player.custom.admin || player.custom.defaultAdmin) ? "⚔️" : (player.name.includes(["Megalodon"])) ? "🦈" : "";
      return `${player.name.replace(/[\[\]]/g, '|')} ${icon}`;
    },
    findAvailableID: function(obj, id=1) {
      while (id in obj) id++;
      return id;
    },
    findColor: function(color) {
      switch(color) {
        case "green": return "#70ffc1";
        case "red": return "#ff7070";
        case "lightblue": return "#70dcff";
        case "yellow": return "#fff870";
        default: return "#ffffff";
      }
    },
    log: function(name, ID, color, end) {
      color = gameInfo.commandsInfo.findColor(color);
      game.modding.terminal.echo(`[[g;${color};]Player:] [[g;Gold;]${name}][[g;${color};], ID:] [[g;Gold;]${ID}][[g;${color};], ${end||"undefined"}]\n`);
    },
    more: {
      usage: "more",
      description: "Gives a description of each Commands in the mod.",
      action: function() {
        const commandDescriptions = Object.keys(gameInfo.commandsInfo)
        .filter(command => ![ 'getPlayerName', 'findAvailableID', 'findColor', 'log' ].includes(command))
        .map(command => {
          const { description, usage } = gameInfo.commandsInfo[command];
          return `[[gui;#85ff70;]Command:] [[gb;Gold;]${usage}] \n[[i;Cyan;]${description}]`;
        }).join("\n");
        game.modding.terminal.echo(`${commandDescriptions}\n\n  [[gbui;#bf70ff;]Note][[ig;#bf70ff;]:] [[ig;#bf70ff;]Commands should be used without brackets and commas.]\n`);
      }
    },
    info: {
      usage: "info",
      description: "Returns the entire player list (name + ID) and all of the banned members if any.",
      action: function() {
        const playerList = game.ships.map(ship => `[[i;Cyan;]ID:] [[g;Gold;]${ship.id}][[i;Cyan;], Name:] [[g;Gold;]${gameInfo.commandsInfo.getPlayerName(ship)}]\n[[i;Cyan;]Position:  X:] [[g;Gold;]${Math.round(ship.x)}][[i;Cyan;], Y:] [[g;Gold;]${Math.round(ship.y)}]` ).join("\n");
        const bannedPlayerList = Object.keys(gameOptions.ban).map(index => {return `[[g;#ff7070;]Index:] [[g;Gold;]${index}][[g;#ff7070;], Name:] [[g;Gold;]${gameOptions.ban[index].name}]\n[[g;#ff7070;]Reason:] [[g;Gold;]${gameOptions.ban[index].reason}]`}).join("\n");
        game.modding.terminal.echo(`[[g;#85ff70;]Amount of players:] [[gb;#fffc70;]${game.ships.length}]\n`);
        game.modding.terminal.echo(`[[gu;#ff7070;]Banned players][[g;#ff7070;]:]\n${bannedPlayerList||"[[g;#ff7070;]None]"}`);
        game.modding.terminal.echo(`\n[[gu;#70aeff;]Players][[g;#70aeff;]:] \n${playerList||"[[g;#70aeff;]None]"}\n`);
      }
    },
    kick: {
      usage: `kick ID "reason"`,
      description: "Allow the game host to kick a player.",
      action: function(ID, reason = "Disturbing duels") {
        const ship = game.findShip(ID);
        if (!ship) {
          modding.terminal.error(new Error("The ID you used doesn't exist, try again with a valid ID\n"));
          return;
        }
        ship.custom.explused = true;
        gameOptions.gameButtons.state.event(ship, "Kicked", "rgba(255,100,100, 0.4)");
        gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(ship), ID, "red", "has been Kicked");
        ship.gameover({
          "You got kicked from the game" : " ",
          "Reason" : reason, 
          "Kills" : ship.custom.Kills, 
          "Deaths" : ship.custom.Deaths
        });
      }
    },
    ban: {
      usage: `ban ID "reason"`,
      description: "Allow the game host to Ban player.",
      action: function(ID, reason = "Disturbing duels") {
        const ship = game.findShip(ID);
        if (!ship) {
          modding.terminal.error(new Error("The ID you used doesn't exist, try again with a valid ID\n"));
          return;
        }
        gameInfo.commandsInfo.idle.action(ID, 1e9, false);
        if (ID in gameOptions.ban) {
          ID = gameInfo.commandsInfo.findAvailableID(gameOptions.ban);
        }
        gameOptions.ban[ID] = {
          name: gameInfo.commandsInfo.getPlayerName(ship),
          reason: reason
        };
        ship.custom.explused = true;
        gameOptions.gameButtons.state.event(ship, "Banned", "rgba(255,100,100, 0.4)");
        gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(ship), ID, "red", "has been Banned");
        ship.gameover({
          "You got banned from the game" : " ",
          "Reason" : reason, 
          "Kills" : ship.custom.Kills, 
          "Deaths" : ship.custom.Deaths
        });
      }
    },
    unban: {
      usage: "unban ID",
      description: "Allow the game host to unban one player.",
      action: function(ID) {
        if (!(ID in gameOptions.ban)) {
          modding.terminal.error(new Error("The ID you used doesn't exist, try again with a valid ID\n"));
          return;
        }
        gameInfo.commandsInfo.log(gameOptions.ban[ID].name, ID, "green", "has been Unbanned");
        delete gameOptions.ban[ID];
      }
    },
    idle: {
      usage: "idle ID duration",
      description: "Allow the game host to freeze a player.",
      action: function(ID, duration=20, showMessage=true) {
        const ship = game.findShip(ID);
        if (ship.custom.ISidle) {
          modding.terminal.error(new Error(`${gameInfo.commandsInfo.getPlayerName(ship)} is already frozen.`));
          return;
        }
        if (duration < 1e9) {
          ship.custom.idleTM = setTimeout(function() { gameInfo.commandsInfo.unidle.action(ID) }, duration*1000);
        }
        ship.custom.ISidle = true;
        ship.set({ idle: true });
        gameOptions.gameButtons.state.event(ship, "Freezed", "rgba(255,100,100, 0.4)");
        if (!ship.custom.spectating) gameOptions.gameButtons.spectate_button.event(ship);
        if (showMessage) gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(ship), ID, "red", "has been Freezed");
      }
    },
    unidle: {
      usage: "unidle ID",
      description: "Allow the game host to unfreeze a player.",
      action: function(ID) {
        const ship = game.findShip(ID);
        if (!ship) {
          modding.terminal.error(new Error("The ID you used doesn't exist, try again with a valid ID\n"));
          return;
        }
        if (!ship.custom.ISidle) {
          modding.terminal.error(new Error(`${gameInfo.commandsInfo.getPlayerName(ship)} not frozen.`));
          return;
        }
        clearTimeout(ship.custom.idleTM);
        ship.custom.ISidle = false;
        ship.set({ idle: false });
        gameOptions.gameButtons.state.event(ship, "Playing", "rgba(255,255,255, 0.4)");
        gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(ship), ID, "green", "has been unFreezed");
      }
    },
    settings: {
      usage: "set ID shipCode crystals stats",
      description: "Allow the game host to change a player's ship to another\n(cannot use that command to put the player in spectator mode or in an admin ship).",
      action: function(ID, code, max_crystals, max_stats) {
        const ship = game.findShip(ID);
        if (!ship) {
          modding.terminal.error(new Error("The ID you used doesn't exist, try again with a valid ID\n"));
          return;
        }
        if (!gameOptions.shipCodes.includes(code.toString())) {
          game.modding.terminal.error(new Error("Wrong ship type, try again with a valid ship type\n"));
          return;
        }
        max_stats = (!max_stats && Math.trunc(code / 100) < 7) ? 11111111 * Math.trunc(code / 100) : max_stats || 0;
        max_crystals = max_crystals || 20 * Math.trunc(code / 100) * Math.trunc(code / 100);
        ship.set({ type: code, crystals: max_crystals, stats: max_stats, shield: 999, collider: true });
        gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(ship), ID, "lightblue", `has successfully been given\nShip: ${gameOptions.shipInformations.main[code].name}, Crystals: ${max_crystals}, Stats: ${max_stats}`);
      }
    },
    admin: {
      usage: "admin ID which",
      description: `Allows the hoster to give the admin ship to someone.\n"p" for Precision or "g" for General   Ex: admin(1, "p").\nUse admin("player ID") to get off`,
      action: function(ID, which) {
        var new_type;
        var style = {
          text: "",
          color: ""
        };
        const ship = game.findShip(ID);
        if (!ship) {
          modding.terminal.error(new Error("The ID you used doesn't exist, try again with a valid ID\n"));
          return;
        }
        if (ship.custom.spectating) {
          gameOptions.gameButtons.spectate_button.event(ship);
          gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(ship), ID, "lightblue", `\nDo the command one more time`);
          return;
        }
        if (!gameOptions.adminShip.includes(ship.type.toString()) || which) {
          if (!gameOptions.adminShip.includes(ship.type.toString())) {
            ship.custom.oldShip = ship.type;
          }
          switch(which || "p") {
            case "p": new_type = gameOptions.adminShip[0]; break;
            case "g": new_type = gameOptions.adminShip[1]; break;
          }
          gameOptions.gameButtons.state.event(ship, gameOptions.shipInformations.admin[new_type.toString()].name, "rgba(255, 155, 100, 0.4)");
          style = {
            text: `given an Admin Ship\nShip: ${gameOptions.shipInformations.admin[new_type.toString()].name}`,
            color: `green`
          };
        } else {
          new_type = ship.custom.oldShip;
          gameOptions.gameButtons.state.event(ship, "Playing", "rgba(255,255,255, 0.4)");
          style = {
            text: `brought back to normal\nShip: ${gameOptions.shipInformations.main[new_type.toString()].name}`,
            color: `red`
          };
        }
        const maxCrystals = 20 * Math.trunc(new_type / 100) * Math.trunc(new_type / 100);
        const maxStats = Math.trunc(new_type / 100) < 7 ? 11111111 * Math.trunc(new_type / 100) : 0;
        ship.set({type: new_type, stats: maxStats, crystals: maxCrystals, collider: true});
        gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(ship), ID, style.color, `has successfully been ${style.text}`);
      }
    }
  },
  getArguments: function (cmd) {
    cmd = cmd.trim(); // remove excessive whitespaces in the start and end of string
    let args = [];
    if (cmd.length < 1) return args;
    let separator = `"'`.includes(cmd[0]) ? cmd[0] : ' ';
    let i = separator == ' ' ? 0 : 1;
    for (; i < cmd.length; ++i) {
      let index = i;
      // get last current argument's index
      while (index < cmd.length && (cmd[index] != separator || (cmd.slice(i, index).match(/\\+$/) || [''])[0].length % 2)) ++index;
      // insert current argument value
      let lit = separator == ' ' ? '"' : separator;
      let value = eval(lit + cmd.slice(i, index) + lit);
      if (!isNaN(value)) value = +value;
      args.push(value);
      // run index to next separator
      ++index;
      while (index < cmd.length) {
        if (cmd[index] == ' ') {
          ++index;
          continue;
        }
        if ((cmd[index] == '"' || cmd[index] == "'") && !((cmd.slice(i, index).match(/\\+$/) || [''])[0].length % 2)) {
          separator = cmd[index];
          break;
        }
        separator = ' ';
        --index;
        break;
      }
      i = index;
    }
    return args;
  },
  resolveCommands: function () {
    for (let i in this.commandsInfo) {
      if (i == 'getPlayerName' || i == `findAvailableID` || i == `findColor` || i == `log`) continue;
      game.modding.commands[i] = function (req) {
        return this.commandsInfo[i].action(...this.getArguments(req.replace(i + " ", "")));
      }.bind(this);
    }
  }
};

var gameOptions = {
  ban: {},
  ships: [],
  shipCodes: [],
  spectatorShip: [],
  adminShip: [],
  shipInformations: {
    /*
    empty string = using the default model from vanila.
    */
    spectator: { // not more then one spectator ship.
      191: {
        name: "Spectating",
        code: '{"name":"Spectator","level":1.9,"model":1,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}'
      }
    },
    admin: { // admin ships are specific, you must have and advanced amout of skill in coding in order to add more.
      192: {
        name: "AdminToolPrecision",
        code: '{"name":"AdminToolPrecision","level":1.9,"model":2,"size":1,"zoom":0.5,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"bodies":{"object0":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[17,4],"angle":0,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}}},"typespec":{"name":"AdminToolPrecision","level":1.9,"model":2,"code":192,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"shape":[0.802,0.803,0.375,0.227,0.16,0.126,0.107,0.095,0.085,0.078,0.075,0.072,0.071,0.071,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.071,0.072,0.075,0.078,0.085,0.095,0.107,0.126,0.16,0.227,0.375,0.803],"lasers":[{"x":0,"y":-0.8,"z":0,"angle":0,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0}],"radius":0.803}}'
      },
      193: {
        name: "AdminToolGeneral",
        code: '{"name":"Admin_Ship_General","level":1.9,"model":3,"size":1.2,"zoom":0.5,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"bodies":{"Body1":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":5,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body2":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":10,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":15,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":20,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":25,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body6":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":30,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":35,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body8":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":40,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body9":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":45,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body10":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":50,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body11":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":55,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body12":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":60,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body13":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":65,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body14":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":70,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body15":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":75,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body16":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":80,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body17":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":85,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body18":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":90,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body19":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":95,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body20":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":100,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body21":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":105,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body22":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":110,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body23":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":115,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body24":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":120,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body25":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":125,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body26":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":130,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body27":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":135,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body28":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":140,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body29":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":145,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body30":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":150,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body31":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":155,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body32":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":160,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body33":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":165,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body34":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":170,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body35":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":175,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body36":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":180,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body37":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":185,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body38":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":190,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body39":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":195,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body40":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":200,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body41":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":205,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body42":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":210,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body43":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":215,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body44":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":220,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body45":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":225,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body46":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":230,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body47":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":235,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body48":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":240,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body49":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":245,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body50":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":250,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body51":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":255,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body52":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":260,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body53":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":265,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body54":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":270,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body55":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":275,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body56":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":280,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body57":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":285,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body58":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":290,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body59":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":295,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body60":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":300,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body61":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":305,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body62":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":310,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body63":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":315,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body64":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":320,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body65":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":325,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body66":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":330,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body67":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":335,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body68":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":340,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body69":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":345,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body70":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":350,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body71":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":355,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}},"Body72":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[17,4],"angle":360,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}}},"typespec":{"name":"Admin_Ship_General","level":1.9,"model":3,"code":193,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"shape":[0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961],"lasers":[{"x":-0.084,"y":-0.956,"z":0,"angle":5,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.167,"y":-0.945,"z":0,"angle":10,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.248,"y":-0.927,"z":0,"angle":15,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.328,"y":-0.902,"z":0,"angle":20,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.406,"y":-0.87,"z":0,"angle":25,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.48,"y":-0.831,"z":0,"angle":30,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.551,"y":-0.786,"z":0,"angle":35,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.617,"y":-0.735,"z":0,"angle":40,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.679,"y":-0.679,"z":0,"angle":45,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.735,"y":-0.617,"z":0,"angle":50,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.786,"y":-0.551,"z":0,"angle":55,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.831,"y":-0.48,"z":0,"angle":60,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.87,"y":-0.406,"z":0,"angle":65,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.902,"y":-0.328,"z":0,"angle":70,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.927,"y":-0.248,"z":0,"angle":75,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.945,"y":-0.167,"z":0,"angle":80,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.956,"y":-0.084,"z":0,"angle":85,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.96,"y":0,"z":0,"angle":90,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.956,"y":0.084,"z":0,"angle":95,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.945,"y":0.167,"z":0,"angle":100,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.927,"y":0.248,"z":0,"angle":105,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.902,"y":0.328,"z":0,"angle":110,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.87,"y":0.406,"z":0,"angle":115,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.831,"y":0.48,"z":0,"angle":120,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.786,"y":0.551,"z":0,"angle":125,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.735,"y":0.617,"z":0,"angle":130,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.679,"y":0.679,"z":0,"angle":135,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.617,"y":0.735,"z":0,"angle":140,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.551,"y":0.786,"z":0,"angle":145,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.48,"y":0.831,"z":0,"angle":150,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.406,"y":0.87,"z":0,"angle":155,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.328,"y":0.902,"z":0,"angle":160,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.248,"y":0.927,"z":0,"angle":165,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.167,"y":0.945,"z":0,"angle":170,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.084,"y":0.956,"z":0,"angle":175,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":0.96,"z":0,"angle":180,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.084,"y":0.956,"z":0,"angle":185,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.167,"y":0.945,"z":0,"angle":190,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.248,"y":0.927,"z":0,"angle":195,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.328,"y":0.902,"z":0,"angle":200,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.406,"y":0.87,"z":0,"angle":205,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.48,"y":0.831,"z":0,"angle":210,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.551,"y":0.786,"z":0,"angle":215,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.617,"y":0.735,"z":0,"angle":220,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.679,"y":0.679,"z":0,"angle":225,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.735,"y":0.617,"z":0,"angle":230,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.786,"y":0.551,"z":0,"angle":235,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.831,"y":0.48,"z":0,"angle":240,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.87,"y":0.406,"z":0,"angle":245,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.902,"y":0.328,"z":0,"angle":250,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.927,"y":0.248,"z":0,"angle":255,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.945,"y":0.167,"z":0,"angle":260,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.956,"y":0.084,"z":0,"angle":265,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.96,"y":0,"z":0,"angle":270,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.956,"y":-0.084,"z":0,"angle":275,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.945,"y":-0.167,"z":0,"angle":280,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.927,"y":-0.248,"z":0,"angle":285,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.902,"y":-0.328,"z":0,"angle":290,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.87,"y":-0.406,"z":0,"angle":295,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.831,"y":-0.48,"z":0,"angle":300,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.786,"y":-0.551,"z":0,"angle":305,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.735,"y":-0.617,"z":0,"angle":310,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.679,"y":-0.679,"z":0,"angle":315,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.617,"y":-0.735,"z":0,"angle":320,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.551,"y":-0.786,"z":0,"angle":325,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.48,"y":-0.831,"z":0,"angle":330,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.406,"y":-0.87,"z":0,"angle":335,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.328,"y":-0.902,"z":0,"angle":340,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.248,"y":-0.927,"z":0,"angle":345,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.167,"y":-0.945,"z":0,"angle":350,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.084,"y":-0.956,"z":0,"angle":355,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-0.96,"z":0,"angle":360,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0}],"radius":0.961}}'
      }
    },
    main: { // add pretty much anything you want.
      101: { name: "Fly", code: `` },
      102: {
        name: "Gnat",
        code: '{"name":"Gnat","level":1,"model":2,"size":1.2,"specs":{"shield":{"capacity":[70,90],"reload":[2,3]},"generator":{"capacity":[45,70],"reload":[10,14]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,135],"acceleration":[120,150]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-60,-50,-45,-20,10,20,35,50,40],"z":[0,0,0,0,0,0,5,5,5]},"width":[0,8,15,30,25,20,18,13,0],"height":[0,6,8,12,15,15,18,13,0],"propeller":true,"texture":[63,13,11,8,1,11,13,13]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-25,"z":15},"position":{"x":[0,0,0,0],"y":[-15,-5,5,35],"z":[0,0,0,4]},"width":[0,13,17,0],"height":[0,8,5,0],"propeller":false,"texture":[9]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-5,"z":-10},"position":{"x":[0,0,0,0,0],"y":[-40,-50,-20,0,20],"z":[4,4,0,2,10]},"width":[0,5,10,6,3],"height":[0,5,7,4,0],"angle":0,"laser":{"damage":[8,12],"rate":3,"type":1,"speed":[120,150],"number":1,"error":4},"propeller":false,"texture":[13,13,4,63]}},"wings":{"main":{"length":[50,2,10],"width":[60,50,100,75],"angle":[-20,10,-10],"position":[-30,20,10,10],"doubleside":true,"offset":{"x":0,"y":2,"z":5},"bump":{"position":-30,"size":15},"texture":[10,13,63]}},"typespec":{"name":"Gnat","level":1,"model":2,"code":102,"specs":{"shield":{"capacity":[70,90],"reload":[2,3]},"generator":{"capacity":[45,70],"reload":[10,14]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,135],"acceleration":[120,150]}},"shape":[1.44,1.337,1.197,1.141,1.037,0.967,0.917,1.488,1.507,1.538,1.518,1.456,1.421,1.421,1.456,1.518,1.61,1.734,1.851,1.886,1.896,0.977,1.137,1.24,1.221,1.202,1.221,1.24,1.137,0.977,1.896,1.886,1.851,1.734,1.61,1.518,1.456,1.421,1.421,1.456,1.518,1.538,1.507,1.488,0.917,0.967,1.037,1.141,1.197,1.337],"lasers":[{"x":0,"y":-1.32,"z":-0.24,"angle":0,"damage":[8,12],"rate":3,"type":1,"speed":[120,150],"number":1,"spread":0,"error":4,"recoil":0}],"radius":1.896}}'
      },
      201: { name: "Delta-Fighter", code: `` },
      202: { name: "Trident", code: `` },
      203: { 
        name: "Jester",
        code: '{"name":"Jester","level":2,"model":3,"size":1,"specs":{"shield":{"capacity":[120,150],"reload":[3,5]},"generator":{"capacity":[60,90],"reload":[20,25]},"ship":{"mass":70,"speed":[115,140],"rotation":[90,120],"acceleration":[45,75]}},"bodies":{"engine":{"section_segments":9,"offset":{"x":0,"y":45,"z":0},"position":{"x":[0,0,0,0,0],"y":[-15,5,30,50,40],"z":[0,5,-5,-10,-10]},"width":[0,15,25,15,8],"height":[0,10,25,15,8],"texture":[2],"propeller":true},"cannons":{"section_segments":4,"offset":{"x":40,"y":-40,"z":16},"position":{"x":[0,-10,10,10,12],"y":[-80,5,30,50,70],"z":[-5,-20,0,0,0]},"width":[0,15,13,24,10],"height":[0,10,0,10,0],"texture":[12,63,3,3],"propeller":false,"angle":8,"laser":{"damage":[2,3],"rate":4,"type":1,"speed":[100,120],"number":2,"error":10}},"cockpit":{"section_segments":4,"offset":{"x":0,"y":-65,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-10,30,50,60,90,105],"z":[0,0,0,0,0,0,0,0]},"width":[0,17,20,27,24,0],"height":[0,5,7,8,8,0],"texture":[11,11,9,9,9,9],"propeller":false}},"wings":{"bridge":{"offset":{"x":0,"y":45,"z":0},"length":[70],"width":[70,60],"texture":[4],"angle":[0,0],"position":[10,-20],"bump":{"position":0,"size":18}},"main":{"offset":{"x":30,"y":15,"z":10},"length":[5,35,0,20],"width":[0,220,130,80,50],"texture":[13,63,13,11],"angle":[0,-20,0,10],"position":[0,-30,0,-10,-5],"doubleside":true,"bump":{"position":15,"size":8}}},"typespec":{"name":"Jester","level":2,"model":3,"code":203,"specs":{"shield":{"capacity":[120,150],"reload":[3,5]},"generator":{"capacity":[60,90],"reload":[20,25]},"ship":{"mass":70,"speed":[115,140],"rotation":[90,120],"acceleration":[45,75]}},"shape":[1.5,1.303,2.596,2.472,2.183,1.974,1.835,1.74,1.677,1.584,1.687,1.777,1.765,1.765,1.806,1.883,1.886,1.73,1.865,2.098,2.091,2.038,2.025,1.833,1.923,1.904,1.923,1.833,2.025,2.038,2.091,2.098,1.865,1.73,1.886,1.883,1.806,1.765,1.765,1.777,1.687,1.584,1.677,1.74,1.835,1.974,2.183,2.472,2.596,1.303],"lasers":[{"x":0.577,"y":-2.384,"z":0.32,"angle":8,"damage":[2,3],"rate":4,"type":1,"speed":[100,120],"number":2,"spread":0,"error":10,"recoil":0},{"x":-0.577,"y":-2.384,"z":0.32,"angle":-8,"damage":[2,3],"rate":4,"type":1,"speed":[100,120],"number":2,"spread":0,"error":10,"recoil":0}],"radius":2.596}}'
      },
      301: { name: "Pulse-Fighter",code: `` },
      302: { name: "Side-Fighter", code: `` },
      303: { name: "Shadow X-1", code: `` },
      304: { name: "Y-Defender", code: `` },
      305: {
        name: "Renegade",
        code: '{"name":"Renegade","level":3,"model":5,"size":1.4,"specs":{"shield":{"capacity":[130,200],"reload":[3,5]},"generator":{"capacity":[60,100],"reload":[25,35]},"ship":{"mass":130,"speed":[75,130],"rotation":[50,80],"acceleration":[80,100]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-72,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,1,35,80,105,105,118,108],"z":[0,0,0,0,0,0,0,0]},"width":[0,6,12,16,10,8,8,0],"height":[0,4,9,16,10,8,8,0],"texture":[4,1,10,11,4,13,13],"propeller":true,"laser":{"damage":[7,14],"rate":5,"type":1,"speed":[100,160],"number":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-22,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[0,3,28,36,37],"z":[0,0,0,0,0,0,0]},"width":[0,7,10,6,0],"height":[0,3,8,4,0],"texture":[9]},"lasers":{"section_segments":8,"offset":{"x":30,"y":-98,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[10,0,62,72,79,102,126,127],"z":[6,6,9,3,-3,-5,-5,-5]},"width":[0,4,10,4,4,12,5,0],"height":[0,4,8,4,4,5,4,0],"texture":[12,10,1,4,11,11,63],"angle":14,"laser":{"damage":[7,14],"rate":1,"type":1,"speed":[100,160],"number":1}},"braces":{"section_segments":8,"offset":{"x":28,"y":-104,"z":0},"position":{"x":[2,0,10,5,2,2,2,2],"y":[0,1,35,52,76,97,112,113],"z":[3,3,3,3,0,-5,-5,-5]},"width":[0,6,13,14,9,9,4,0],"height":[0,3,4,4,4,4,3,0],"texture":[63,3,63,4,8,4,63]},"thrusters":{"section_segments":8,"offset":{"x":82,"y":15,"z":0},"position":{"x":[0,0,0,0],"y":[0,7,23,13],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,4,4,0],"texture":[4,13,13],"propeller":true}},"wings":{"main":{"offset":{"x":7,"y":0,"z":7},"length":[24,21,19,5,12],"width":[40,44,27,27,70,61],"angle":[-10,-4,0,-10,4],"position":[0,8,4,-6,-6,-6],"texture":[4,63,3,13,4],"doubleside":true,"bump":{"position":0,"size":15}}},"typespec":{"name":"Renegade","level":3,"model":5,"code":305,"specs":{"shield":{"capacity":[130,200],"reload":[3,5]},"generator":{"capacity":[60,100],"reload":[25,35]},"ship":{"mass":130,"speed":[75,130],"rotation":[50,80],"acceleration":[80,100]}},"shape":[2.016,1.999,3.036,3.037,2.725,2.495,2.132,1.986,1.886,2.654,2.629,2.525,2.468,2.467,2.526,2.619,2.658,1.343,1.26,1.206,0.952,0.775,0.928,1.193,1.307,1.291,1.307,1.193,0.928,0.775,0.952,1.206,1.26,1.343,2.658,2.619,2.526,2.467,2.468,2.525,2.629,2.654,1.886,1.986,2.132,2.495,2.725,3.037,3.036,1.999],"lasers":[{"x":0,"y":-2.016,"z":0,"angle":0,"damage":[7,14],"rate":5,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.84,"y":-2.744,"z":0,"angle":14,"damage":[7,14],"rate":1,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.84,"y":-2.744,"z":0,"angle":-14,"damage":[7,14],"rate":1,"type":1,"speed":[100,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.037}}'
      },
      401: { name: "Vanguard", code: `` },
      402: { name: "Mercury",code: `` },
      403: { name: "X-Warior", code: `` },
      404: { name: "Side-interceptor", code: `` },
      405: { name: "Pioneer",code: `` },
      406: { name: "Crusader", code: `` },
      407: { 
        name: "Gale", 
        code: '{"name":"Gale","level":4,"model":7,"size":1.2,"specs":{"shield":{"capacity":[150,200],"reload":[3,5]},"generator":{"capacity":[90,140],"reload":[20,30]},"ship":{"mass":150,"speed":[75,105],"rotation":[30,50],"acceleration":[70,90]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-44,"z":20},"position":{"x":[0,0,0,0],"y":[0,2,20,25],"z":[-1,2,7,6]},"width":[5,8,9,5],"height":[3,4,5,3],"texture":[9],"laser":{"damage":[30,40],"rate":1.5,"type":2,"speed":[90,140],"number":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-76,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,12,9,25,66,84,120,126,154,148],"z":[0,0,0,0,10,10,0,0,0,0]},"width":[0,3,6,14,14,14,14,17,13,0],"height":[0,3,6,10,14,14,14,14,10,0],"texture":[6,13,3,2,2,2,4,12,13],"propeller":true},"sides":{"section_segments":8,"offset":{"x":41,"y":-90,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,12,9,25,66,84,120,126,154,148],"z":[0,0,0,0,10,10,0,0,0,0]},"width":[0,3,6,14,14,14,14,14,10,0],"height":[0,3,6,14,14,14,14,17,13,0],"texture":[6,13,4,3,8,3,4,13,13],"propeller":true,"laser":{"damage":[31,41],"rate":1,"type":2,"speed":[80,110],"number":1}}},"wings":{"main":{"doubleside":false,"offset":{"x":12,"y":-3,"z":15},"length":[18,0],"width":[75,75,0],"angle":[-20,0],"position":[0,-16,-16],"texture":[63],"bump":{"position":7,"size":10}},"topout":{"doubleside":false,"offset":{"x":49,"y":-17,"z":6},"length":[124],"width":[48,30],"angle":[-2],"position":[0,10],"texture":[63],"bump":{"position":-16,"size":10}},"bottomout":{"doubleside":true,"offset":{"x":46,"y":-16,"z":0},"length":[105,14],"width":[82,52,30],"angle":[-1,10],"position":[0,7,10],"texture":[4],"bump":{"position":10,"size":10}},"winglets1":{"doubleside":true,"offset":{"x":10,"y":61,"z":14},"length":[12],"width":[18,10],"angle":[15],"position":[0,3],"texture":[63],"bump":{"position":10,"size":10}},"winglets2":{"doubleside":true,"offset":{"x":50,"y":50,"z":0},"length":[12],"width":[18,10],"angle":[0],"position":[0,3],"texture":[63],"bump":{"position":10,"size":15}}},"typespec":{"name":"Gale","level":4,"model":6,"code":406,"specs":{"shield":{"capacity":[150,200],"reload":[3,5]},"generator":{"capacity":[90,140],"reload":[20,30]},"ship":{"mass":150,"speed":[75,105],"rotation":[30,50],"acceleration":[70,90]}},"shape":[1.824,1.614,1.395,2.374,2.337,2.19,2.052,2.095,2.388,2.841,3.534,4.184,4.183,4.154,3.399,2.104,1.543,1.614,2.038,2.034,1.964,1.819,1.676,1.762,1.898,1.876,1.898,1.762,1.676,1.819,1.964,2.034,2.038,1.614,1.543,2.104,3.399,4.154,4.183,4.184,3.534,2.841,2.388,2.095,2.052,2.19,2.337,2.374,1.395,1.614],"lasers":[{"x":0,"y":-1.056,"z":0.48,"angle":0,"damage":[30,40],"rate":1.5,"type":2,"speed":[90,140],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.984,"y":-2.16,"z":0,"angle":0,"damage":[31,41],"rate":1,"type":2,"speed":[80,110],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.984,"y":-2.16,"z":0,"angle":0,"damage":[31,41],"rate":1,"type":2,"speed":[80,110],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.184}}'
      },
      408: { 
        name: "Mite-Defender", 
        code: '{"name":"Mite-Defender","level":4,"model":8,"size":1.92,"specs":{"shield":{"capacity":[180,240],"reload":[4,6]},"generator":{"capacity":[70,140],"reload":[25,35]},"ship":{"mass":220,"speed":[80,100],"rotation":[50,65],"acceleration":[90,135]}},"bodies":{"main":{"section_segments":8,"offset":{"x":20,"y":20,"z":0},"position":{"x":[10,10,-10,-10,5,0,0],"y":[-95,-80,-60,0,20,70,65],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,0],"height":[10,10,20,20,20,10,0],"texture":[63,3,2,3,2,13],"propeller":true},"cannon":{"section_segments":8,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-65,-60,-50,-5,15,40],"z":[0,0,0,0,10,10]},"width":[0,8,10,15,20,20],"height":[0,8,10,15,16,5],"texture":[63,2,13,9,9],"laser":{"damage":[8,15],"rate":2,"type":1,"speed":[120,180],"number":4,"angle":20,"error":1}},"bridge2":{"section_segments":8,"offset":{"x":0,"y":55,"z":0},"position":{"x":[0,0,0,0,0],"y":[-50,-15,35,40],"z":[0,0,0,0]},"width":[0,25,16,0],"height":[10,13,6,0],"texture":[3,8,63]},"thrusters":{"section_segments":8,"offset":{"x":55,"y":-20,"z":0},"position":{"x":[-10,-10,-10,-5,-3,-3],"y":[-15,-20,-10,35,45,35],"z":[0,0,0,0,0,0]},"width":[0,8,15,20,12,0],"height":[0,8,10,15,8,0],"texture":[13,1,10,63,13],"propeller":true}},"wings":{"teeth1":{"offset":{"x":19,"y":-80,"z":12},"length":[10,20],"width":[0,40,0],"angle":[0,0],"position":[-25,0,35],"texture":[63,2],"doubleside":true,"bump":{"position":20,"size":20}},"teeth2":{"offset":{"x":19,"y":-80,"z":-12},"length":[10,20],"width":[0,40,0],"angle":[0,0],"position":[-25,0,35],"texture":[63,2],"doubleside":true,"bump":{"position":20,"size":20}},"bridge":{"offset":{"x":15,"y":-5,"z":5},"length":[27],"width":[40,40],"angle":[0],"position":[-10,0],"texture":[3],"doubleside":true,"bump":{"position":20,"size":20}}},"typespec":{"name":"Mite-Defender","level":4,"model":8,"code":408,"specs":{"shield":{"capacity":[180,240],"reload":[4,6]},"generator":{"capacity":[70,140],"reload":[25,35]},"ship":{"mass":220,"speed":[80,100],"rotation":[50,65],"acceleration":[90,135]}},"shape":[3.648,4.097,4.086,3.819,3.315,2.975,2.724,2.563,2.563,2.576,2.53,2.509,2.557,2.649,2.749,2.714,2.607,1.992,1.774,2.323,2.615,3.035,3.643,3.634,3.584,3.648,3.584,3.634,3.643,3.035,2.615,2.323,1.774,1.992,2.607,2.714,2.749,2.649,2.557,2.509,2.53,2.576,2.563,2.563,2.724,2.975,3.315,3.819,4.086,4.097],"lasers":[{"x":0,"y":-3.648,"z":0,"angle":0,"damage":[8,15],"rate":2,"type":1,"speed":[120,180],"number":4,"spread":20,"error":1,"recoil":0}],"radius":4.097}}'
      },
      501: { name: "U-Sniper", code: `` },
      502: { name: "FuryStar", code: `` },
      503: { name: "T-Warrior",code: `` },
      504: { name: "Aetos",code: `` },
      505: { name: "Shadow X-2", code: `` },
      506: { name: "Howler", code: `` },
      507: { name: "Bat-Defender", code: `` },
      508: { 
        name: "Valkyrie", 
        code: '{"name":"Valkyrie","level":5,"model":8,"size":0.9,"specs":{"shield":{"capacity":[180,280],"reload":[4,6]},"generator":{"capacity":[70,130],"reload":[30,45]},"ship":{"mass":200,"speed":[75,100],"rotation":[60,85],"acceleration":[75,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-214,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,14,54,65,135,180,271,259],"z":[-2,-4,0,4,10,12,0,0]},"width":[0,15,23,13,22,38,24,0],"height":[1,5,12,10,16,25,16,0],"texture":[3,3,3,11,1,10,13],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-207,"z":6},"position":{"x":[0,0,0,0],"y":[0,8,44,55],"z":[-8,-4,0,4]},"width":[4,10,14,6],"height":[1,5,12,0],"texture":[9],"propeller":false},"engines":{"section_segments":10,"offset":{"x":149,"y":-52,"z":14},"position":{"x":[4,4,4,4,-2,-2],"y":[5,20,14,55,145,133],"z":[0,0,0,7,0,0]},"width":[0,16,24,35,17,0],"height":[0,10,18,22,14,1],"texture":[17,13,10,11,13],"propeller":true},"cannons":{"section_segments":8,"offset":{"x":71,"y":-150,"z":-8},"position":{"x":[0,0,3,3,11,6],"y":[0,-5,55,63,150,168],"z":[0,0,3,0,-3,3]},"width":[0,7,16,9,27,12],"height":[0,6,14,9,14,0],"texture":[13,13,4,3,4],"propeller":false,"laser":{"damage":[25,45],"rate":2,"type":2,"speed":[150,200],"number":1,"recoil":50}}},"wings":{"front":{"offset":{"x":16,"y":-56,"z":5},"length":[36,20,14,32],"width":[92,94,98,42,19],"angle":[-15,-15,0,5],"position":[-8,23,18,11,8],"texture":[3,4,63],"doubleside":true,"bump":{"position":10,"size":6}},"back":{"offset":{"x":8,"y":-17,"z":8},"length":[77,47,25,52],"width":[140,132,130,78,42],"angle":[12,-10,0,5],"position":[-5,53,44,56,70],"texture":[8,4,63],"doubleside":true,"bump":{"position":-20,"size":8}}},"typespec":{"name":"Valkyrie","level":5,"model":8,"code":508,"specs":{"shield":{"capacity":[180,280],"reload":[4,6]},"generator":{"capacity":[70,130],"reload":[30,45]},"ship":{"mass":200,"speed":[75,100],"rotation":[60,85],"acceleration":[75,100]}},"shape":[3.852,3.645,1.945,3.083,3.123,2.782,2.475,2.095,2.221,2.33,2.957,3.261,3.338,3.519,3.834,3.947,3.676,3.381,2.832,2.563,2.375,1.642,1.266,1.079,1.044,1.028,1.044,1.079,1.266,1.642,2.375,2.563,2.832,3.381,3.676,3.947,3.834,3.519,3.338,3.261,2.957,2.33,2.221,2.095,2.475,2.782,3.123,3.083,1.945,3.645],"lasers":[{"x":1.278,"y":-2.79,"z":-0.144,"angle":0,"damage":[25,45],"rate":2,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":50},{"x":-1.278,"y":-2.79,"z":-0.144,"angle":0,"damage":[25,45],"rate":2,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":50}],"radius":3.947}}'
      },
      509: {
        name: "Toscian",
        code: '{"name":"Toscain","level":5,"model":9,"size":1.7,"specs":{"shield":{"capacity":[275,350],"reload":[5,8]},"generator":{"capacity":[75,100],"reload":[35,50]},"ship":{"mass":300,"speed":[80,90],"rotation":[50,80],"acceleration":[80,110]}},"bodies":{"front":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-100,-95,-25,0,25],"z":[0,0,0,0,0]},"width":[0,20,40,40,20],"height":[0,10,35,20,5],"texture":[63,11,2,63],"laser":{"damage":[14,30],"rate":1,"type":2,"speed":[150,200],"number":1,"recoil":50,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-25,0,100],"z":[0,0,0,0,9]},"width":[0,10,15,15,10],"height":[0,15,35,20,0],"texture":[9,9,9,4]},"lasers":{"section_segments":8,"angle":15,"offset":{"x":1,"y":-5,"z":-3},"position":{"x":[0,0,0],"y":[-90,-70,-100],"z":[0,0,0]},"width":[5,5,0],"height":[5,5,0],"texture":[6],"laser":{"damage":[3.75,6],"rate":2,"type":1,"speed":[100,130],"number":2,"angle":45,"error":0}},"motor":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[10,20,30,100,95],"z":[0,0,0,0,0]},"width":[0,40,50,50,0],"height":[0,10,15,20,0],"texture":[63,63,10,4]},"propulsors":{"section_segments":8,"offset":{"x":25,"y":0,"z":0},"position":{"x":[0,0,0],"y":[30,105,100],"z":[0,0,0]},"width":[15,15,0],"height":[10,10,0],"texture":[12],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":30,"y":80,"z":0},"length":[70,20],"width":[80,20],"angle":[0,0],"position":[-20,0],"texture":[11],"bump":{"position":20,"size":10}},"winglets":{"doubleside":true,"offset":{"x":98,"y":81,"z":-20},"length":[20,50,20],"width":[20,35,20],"angle":[90,90,90],"position":[0,0,0,0],"texture":[63],"bump":{"position":30,"size":50}}},"typespec":{"name":"Toscain","level":5,"model":9,"code":509,"specs":{"shield":{"capacity":[275,350],"reload":[5,8]},"generator":{"capacity":[75,100],"reload":[35,50]},"ship":{"mass":300,"speed":[80,90],"rotation":[50,80],"acceleration":[80,110]}},"shape":[3.4,3.354,3.556,2.748,2.336,2.055,1.858,1.732,1.634,1.548,1.462,1.404,1.371,1.36,1.241,1.161,1.723,4.485,5.01,4.795,4.111,3.842,3.82,3.753,3.634,3.407,3.634,3.753,3.82,3.842,4.111,4.795,5.01,4.485,1.723,1.161,1.241,1.353,1.371,1.404,1.462,1.548,1.634,1.732,1.858,2.055,2.336,2.748,3.556,3.354],"lasers":[{"x":0,"y":-3.4,"z":0,"angle":0,"damage":[14,30],"rate":1,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":50},{"x":-0.846,"y":-3.454,"z":-0.102,"angle":15,"damage":[3.75,6],"rate":2,"type":1,"speed":[100,130],"number":2,"spread":45,"error":0,"recoil":0},{"x":0.846,"y":-3.454,"z":-0.102,"angle":-15,"damage":[3.75,6],"rate":2,"type":1,"speed":[100,130],"number":2,"spread":45,"error":0,"recoil":0}],"radius":5.01}}'
      },
      510: { 
        name: "Seeker", 
        code: '{"name":"Seeker","level":5,"model":10,"size":2.1,"specs":{"shield":{"capacity":[200,280],"reload":[6,8]},"generator":{"capacity":[80,130],"reload":[30,45]},"ship":{"mass":250,"speed":[75,100],"rotation":[65,95],"acceleration":[80,110]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-44,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,2,6,38,43,63,68,105,110,112,130,125],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,15,20,16,19,25,31,28,15,10,0],"height":[0,3,10,15,13,14,16,19,16,15,10,0],"texture":[63,4,1,4,3,4,10,4,4,13,13],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-36,"z":24},"position":{"x":[0,0,0,0],"y":[0,7,20,27],"z":[-3,0,0,-4]},"width":[8,10,12,10],"height":[3,5,8,5],"texture":[9],"propeller":false},"arms":{"section_segments":8,"offset":{"x":41,"y":-90,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-16,-9,5,5,9,15,21,25,25,42,47,80,85,105,110,150,158,190,185],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,9,14,16,14,9,4,4,18,18,13,13,18,18,0],"height":[0,2,3,5,7,8,7,5,4,4,18,18,13,13,18,18,0],"texture":[17,63,4,4,4,4,4,4,63,4,11,4,63,4,11,4],"angle":6,"laser":{"damage":[15,30],"rate":2,"type":2,"speed":[120,190],"number":1}},"thrusters":{"section_segments":8,"offset":{"x":55,"y":-95,"z":0},"position":{"x":[3,0,0],"y":[148,190,185],"z":[0,0,0]},"width":[13,7,0],"height":[13,7,0],"texture":[13,13],"propeller":true}},"wings":{"outclaw":{"doubleside":true,"offset":{"x":52,"y":-77,"z":0},"length":[12,7],"width":[20,12,4],"angle":[-1,10],"position":[0,-7,-22],"texture":[4,63],"bump":{"position":10,"size":25}},"inclaw":{"doubleside":true,"offset":{"x":-32,"y":-74,"z":0},"length":[13,9],"width":[18,8,2],"angle":[-1,10],"position":[-1,-5,-17],"texture":[4,63],"bump":{"position":10,"size":25}},"bridge1":{"doubleside":true,"offset":{"x":16,"y":-20,"z":13},"length":[25],"width":[25,12],"angle":[-10],"position":[0,-4],"texture":[8],"bump":{"position":10,"size":25}},"bridge2":{"doubleside":true,"offset":{"x":26,"y":45,"z":15},"length":[30],"width":[30,17],"angle":[-10],"position":[0,-4],"texture":[8],"bump":{"position":10,"size":25}}},"typespec":{"name":"Seeker","level":5,"model":10,"code":510,"specs":{"shield":{"capacity":[200,280],"reload":[6,8]},"generator":{"capacity":[80,130],"reload":[30,45]},"ship":{"mass":250,"speed":[75,100],"rotation":[65,95],"acceleration":[80,110]}},"shape":[1.848,3.887,3.691,4.745,4.372,5.183,3.181,3.246,3.283,3.106,2.97,2.893,2.7,2.725,3.053,3.23,3.482,3.847,3.95,4.309,4.765,4.725,3.011,3.092,3.636,3.619,3.636,3.092,3.011,4.725,4.765,4.309,3.95,3.847,3.482,3.23,3.053,2.725,2.7,2.893,2.97,3.106,3.283,3.246,3.181,5.183,4.372,4.745,3.691,3.887],"lasers":[{"x":1.652,"y":-4.448,"z":0,"angle":6,"damage":[15,30],"rate":2,"type":2,"speed":[120,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.652,"y":-4.448,"z":0,"angle":-6,"damage":[15,30],"rate":2,"type":2,"speed":[120,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.183}}'
      },
      511: { 
        name: "Settler", 
        code: '{"name":"Settler","level":5,"model":11,"size":1.7,"specs":{"shield":{"capacity":[175,250],"reload":[4,8]},"generator":{"capacity":[75,120],"reload":[25,40]},"ship":{"mass":250,"speed":[80,120],"rotation":[45,80],"acceleration":[60,110]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":-120,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[0,5,22,70,100,105,110,150,170,220,235],"z":[15,15,15,20,20,20,20,30,43,75,75]},"width":[0,15,30,38,40,45,47,40,35,15,0],"height":[5,35,60,70,70,75,77,70,55,15,0],"texture":[4,10,1,1,4,4,2,4,3,63]},"enginea":{"section_segments":6,"offset":{"x":37,"y":-80,"z":30},"position":{"x":[-5.7,3,-4,-3,0,0,0],"y":[0,40,70,75,122,131,120],"z":[-33,-10,-5,-5,0,0,5,5,0]},"width":[0,20,25,20,24,20,0],"height":[0,30,40,35,38,34,0],"texture":[1,11,13,63,13,13],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-119,"z":50},"position":{"x":[0,0,0,0,0,0],"y":[0,0,9,21,38,52],"z":[-20,-15,0,12,18,17]},"width":[2,8,14,19,17,10],"height":[0,2,14,16,13,2],"texture":[9]},"laser":{"section_segments":6,"offset":{"x":42,"y":-68,"z":35},"position":{"x":[0,0,0,0,-10],"y":[-8,5,0,5,40],"z":[0,0,0,0,0]},"width":[0,5,5,8,15],"height":[0,5,5,10,15],"texture":[17,13],"angle":1,"laser":{"damage":[8,12],"rate":4,"type":1,"speed":[110,140],"number":1}}},"wings":{"wings":{"offset":{"x":20,"y":35,"z":70},"length":[30,10],"width":[80,60,25],"angle":[-15,-20],"position":[0,30,70],"texture":[11,13],"bump":{"position":0,"size":10},"doubleside":true}},"typespec":{"name":"Settler","level":5,"model":11,"code":511,"specs":{"shield":{"capacity":[175,250],"reload":[4,8]},"generator":{"capacity":[75,120],"reload":[25,40]},"ship":{"mass":250,"speed":[80,120],"rotation":[45,80],"acceleration":[60,110]}},"shape":[4.08,4.055,3.722,3.248,2.95,2.8,2.587,2.412,2.378,2.192,2.037,1.929,1.795,1.81,1.892,2.004,2.179,2.418,2.533,2.868,3.682,4.461,3.404,3.167,3.673,3.91,3.673,3.167,3.404,4.461,3.682,2.868,2.533,2.418,2.179,2.004,1.892,1.81,1.795,1.929,2.037,2.192,2.378,2.412,2.587,2.8,2.95,3.248,3.722,4.055],"lasers":[{"x":1.423,"y":-2.584,"z":1.19,"angle":1,"damage":[8,12],"rate":4,"type":1,"speed":[110,140],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.423,"y":-2.584,"z":1.19,"angle":-1,"damage":[8,12],"rate":4,"type":1,"speed":[110,140],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.461}}'
      },
      601: { name: "Advanced-Fighter", code: `` },
      602: { name: "Scorpion", code: `` },
      603: { name: "Marauder", code: `` },
      604: { name: "Condor", code: `` },
      605: { name: "A-Speedster",code: `` },
      606: { name: "Rock-Tower", code: `` },
      607: {
        name: "O-Defender",
        code: '{"name":"O-Defender","level":6,"model":7,"size":2.2,"specs":{"shield":{"capacity":[400,550],"reload":[10,13]},"generator":{"capacity":[70,100],"reload":[25,40]},"ship":{"mass":500,"speed":[70,80],"rotation":[30,40],"acceleration":[60,80]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-90,-88,0,90,91],"z":[0,0,0,0,0]},"width":[5,6,25,10,20],"height":[2,10,40,20,20],"texture":[63,1,10],"propeller":true,"laser":{"damage":[35,60],"rate":2,"type":2,"speed":[130,180],"number":1,"angle":0,"error":0}},"side":{"section_segments":10,"offset":{"x":50,"y":0,"z":0},"position":{"x":[-40,-5,15,25,20,0,-50],"y":[-100,-70,-40,-10,20,50,90],"z":[0,0,0,0,0,0,0]},"width":[5,20,20,20,20,20,5],"height":[15,25,30,30,30,25,0],"texture":[0,1,2,3,4,63]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,30,40],"z":[0,0,0,0,0]},"width":[0,5,10,10,0],"height":[0,5,10,12,0],"texture":[9]},"top_propulsor":{"section_segments":15,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0],"y":[80,95,100,90],"z":[0,0,0,0]},"width":[5,20,10,0],"height":[5,15,5,0],"propeller":true,"texture":[1,63,12]},"bottom_propulsor":{"section_segments":15,"offset":{"x":0,"y":0,"z":-10},"position":{"x":[0,0,0,0],"y":[80,95,100,90],"z":[0,0,0,0]},"width":[5,20,10,0],"height":[5,15,5,0],"propeller":true,"texture":[1,63,12]}},"wings":{"join":{"offset":{"x":0,"y":20,"z":0},"length":[80,0],"width":[130,50],"angle":[-1],"position":[0,-30],"texture":[8],"bump":{"position":-20,"size":15}}},"typespec":{"name":"O-Defender","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[400,550],"reload":[10,13]},"generator":{"capacity":[70,100],"reload":[25,40]},"ship":{"mass":500,"speed":[70,80],"rotation":[30,40],"acceleration":[60,80]}},"shape":[4.409,4.448,4.372,4.204,4.119,4.136,4.174,4.107,4.066,4.094,4.073,4.141,4.16,4.062,4.015,3.966,3.83,3.76,3.742,3.591,3.502,3.494,3.575,4.291,4.422,4.409,4.422,4.291,3.575,3.494,3.502,3.591,3.742,3.76,3.83,3.966,4.015,4.062,4.16,4.141,4.073,4.094,4.066,4.107,4.174,4.136,4.119,4.204,4.372,4.448],"lasers":[{"x":0,"y":-3.96,"z":0,"angle":0,"damage":[35,60],"rate":2,"type":2,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.448}}'
      },
      608: { 
        name: "Gallus-X", 
        code: '{"name":"Gallus-X","level":6,"model":8,"size":1.05,"specs":{"shield":{"capacity":[180,240],"reload":[4,7]},"generator":{"capacity":[80,150],"reload":[25,40]},"ship":{"mass":150,"speed":[75,110],"rotation":[75,95],"acceleration":[90,155]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-150,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,4,26,31,78,124,132,156,188,207,226,220],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,14,18,28,34,47,55,54,32,25,0],"height":[0,5,6,8,17,19,24,27,26,20,18,0],"propeller":true,"texture":[17,12,4,1,10,4,12,3,4,13,17],"laser":{"damage":[10,25],"rate":4,"type":2,"speed":[150,220],"number":4,"angle":5,"error":10}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-95,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,4,32,62,69,116,140,143],"z":[0,0,0,0,5,8,8,5]},"width":[0,7,15,16,20,16,5,0],"height":[0,7,15,16,18,14,5,0],"texture":[9,9,9,2,11,3]},"thrust1":{"section_segments":12,"offset":{"x":62,"y":-115,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,21,16,52,47,61,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,12,24,28,12,9,0],"height":[0,11,22,22,11,8,0],"propeller":true,"texture":[6,13,63,13,13,17]},"thrust2":{"section_segments":12,"offset":{"x":88,"y":7,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[0,21,16,52,47,61,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,12,24,28,12,9,0],"height":[0,11,22,22,11,8,0],"propeller":true,"texture":[6,13,63,13,13,17]},"side_cannons":{"section_segments":6,"offset":{"x":124,"y":37,"z":50},"position":{"x":[0,4,4,0],"y":[0,7,40,47],"z":[0,0,0,0]},"width":[0,12,14,0],"height":[0,8,9,0],"angle":-8,"texture":[63],"laser":{"damage":[2,5],"rate":2,"type":1,"speed":[150,250],"number":1}},"strut1":{"section_segments":8,"offset":{"x":0,"y":-6,"z":35},"position":{"x":[0,0,0,0],"y":[0,8,39,45],"z":[0,0,2,3]},"width":[0,6,7,0],"height":[5,12,14,7],"texture":[3]},"strut2":{"section_segments":8,"offset":{"x":88,"y":21,"z":45},"position":{"x":[0,0,0,0],"y":[0,8,37,42],"z":[0,0,2,3]},"width":[0,5,6,0],"height":[5,7,8,7],"texture":[3]}},"wings":{"bridge1":{"length":[30,0],"width":[30,20,30],"angle":[0,0],"position":[0,9,9],"doubleside":true,"bump":{"position":-20,"size":10},"texture":[3],"offset":{"x":18,"y":-87,"z":0}},"bridge2":{"length":[40,0],"width":[30,25,25],"angle":[20,0],"position":[0,12,11],"doubleside":true,"bump":{"position":-20,"size":10},"texture":[3],"offset":{"x":33,"y":30,"z":4}},"main":{"length":[130,0],"width":[57,32,0],"angle":[5,0,0],"position":[0,30,0],"doubleside":true,"bump":{"position":20,"size":10},"texture":[1],"offset":{"x":0,"y":30,"z":40}}},"typespec":{"name":"Gallus-X","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[180,240],"reload":[4,7]},"generator":{"capacity":[80,150],"reload":[25,40]},"ship":{"mass":150,"speed":[75,110],"rotation":[75,95],"acceleration":[90,155]}},"shape":[3.15,2.915,2.293,2.298,2.744,2.697,2.754,2.53,2.329,1.047,1.058,1.076,1.111,1.916,2.808,3.083,3.229,3.272,2.558,2.092,1.794,1.585,1.68,1.678,1.624,1.599,1.624,1.678,1.68,1.585,1.794,2.092,2.558,3.272,3.229,3.083,2.808,1.916,1.113,1.076,1.058,1.047,2.329,2.53,2.754,2.697,2.744,2.298,2.293,2.915],"lasers":[{"x":0,"y":-3.15,"z":0,"angle":0,"damage":[10,25],"rate":4,"type":2,"speed":[150,220],"number":4,"spread":5,"error":10,"recoil":0},{"x":2.604,"y":0.777,"z":1.05,"angle":-8,"damage":[2,5],"rate":2,"type":1,"speed":[150,250],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.604,"y":0.777,"z":1.05,"angle":8,"damage":[2,5],"rate":2,"type":1,"speed":[150,250],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.272}}'
      },
      609: { 
        name: "Support-Fighter", 
        code: '{"name":"Support-Fighter","level":6,"model":9,"size":1.6,"specs":{"shield":{"capacity":[200,220],"reload":[5,7]},"generator":{"capacity":[80,140],"reload":[30,40]},"ship":{"mass":140,"speed":[100,130],"rotation":[35,65],"acceleration":[80,140]}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-61,-28,-11,0,26,50,57,47],"z":[0,0,0,0,0,0,0,0]},"width":[0,13,13,13,12,10,10,0],"height":[0,3,5,10,9,8,8,0],"texture":[3,3,4,3,8,13,13],"propeller":true},"lasers":{"section_segments":6,"offset":{"x":25,"y":-51,"z":2},"position":{"x":[0,0,0,0,0,0,16,12,-3,-19,-19],"y":[1,0,3,10,10,22,30,48,60,66,106],"z":[-10,-10,-10,-10,-10,-10,-8,-8,-10,-5,0]},"width":[0,4,6,4,6,6,5,9,9,4,5],"height":[0,4,6,4,6,3,1,1,1,1,4],"texture":[6,13,13,4,4,63,3,4,4,4],"propeller":true,"angle":1,"laser":{"damage":[5,10],"rate":8,"type":1,"speed":[120,250],"number":1,"error":2}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0],"y":[0,13,29,33],"z":[0,0,0,0]},"width":[3,6,6,0],"height":[0,5,7,0],"texture":[9]}},"wings":{"back":{"offset":{"x":12,"y":18,"z":0},"length":[19,19,8,2,25],"width":[25,31,15,14,18,0],"angle":[-10,-10,-10,-10,-10,-10],"position":[0,-12,-13,-11,-13,2],"texture":[4,8,4,4,63],"doubleside":true,"bump":{"position":0,"size":5}},"front":{"offset":{"x":12,"y":-19,"z":0},"length":[15,17,0,7,12],"width":[17,31,66,116,99,0],"angle":[-10,-10,-10,-10,-10,-10],"position":[0,-12,-23,-48,-37,-50],"texture":[4,63,63,63,63],"doubleside":true,"bump":{"position":0,"size":5}},"winglets":{"offset":{"x":10,"y":40,"z":3},"length":[12,5],"width":[27,19,24],"angle":[65,70],"position":[0,7,15],"texture":[4,63],"doubleside":true,"bump":{"position":0,"size":5}}},"typespec":{"name":"Advanced-Support-Fighter","level":6,"model":9,"code":609,"specs":{"shield":{"capacity":[200,220],"reload":[5,7]},"generator":{"capacity":[80,140],"reload":[30,40]},"ship":{"mass":140,"speed":[100,130],"rotation":[35,65],"acceleration":[80,140]}},"shape":[1.952,1.649,1.268,4.235,3.76,3.339,3.05,2.618,2.242,1.993,1.827,1.701,2.023,2.34,2.76,1.621,1.419,1.281,1.187,1.12,1.077,1.053,1.738,2.21,1.845,1.828,1.845,2.21,1.738,1.053,1.077,1.12,1.187,1.281,1.419,1.621,2.76,2.34,2.023,1.701,1.827,1.993,2.242,2.618,3.05,3.339,3.76,4.235,1.268,1.649],"lasers":[{"x":0.8,"y":-1.632,"z":0.064,"angle":1,"damage":[5,10],"rate":8,"type":1,"speed":[120,250],"number":1,"spread":0,"error":2,"recoil":0},{"x":-0.8,"y":-1.632,"z":0.064,"angle":-1,"damage":[5,10],"rate":8,"type":1,"speed":[120,250],"number":1,"spread":0,"error":2,"recoil":0}],"radius":4.235}}'
      },
      610: { 
        name: "M-Seeker", 
        code: '{"name":"M-Seeker","level":6,"model":10,"size":1.4,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[100,180],"reload":[35,55]},"ship":{"mass":300,"speed":[70,95],"rotation":[55,75],"acceleration":[95,135]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-110,-80,-70,-40,-30,15,25,75,85,70],"z":[-10,-9,-8,-7,-6,-4,-2,0,0,0,0]},"width":[0,4,6,20,25,30,30,40,40,30,0],"height":[0,4,6,20,25,30,30,30,20,15,0],"texture":[13,63,4,10,4,2,4,11,4,13],"propeller":true,"laser":{"damage":[3,6],"rate":5,"type":1,"speed":[140,200],"number":1,"angle":2,"error":5}},"engines":{"section_segments":8,"offset":{"x":75,"y":0,"z":-25},"position":{"x":[10,10,10,10,10],"y":[-3,10,55,65,50],"z":[0,0,0,0,0]},"width":[8,15,15,10,0],"height":[8,15,15,10,0],"angle":0,"propeller":true,"texture":[4,11,4,12]},"cannons":{"section_segments":8,"offset":{"x":85,"y":0,"z":-25},"position":{"x":[0,0,0],"y":[-80,-85,10],"z":[0,0,0]},"width":[0,5,10],"height":[0,5,10],"angle":3,"laser":{"damage":[25,50],"rate":2,"type":2,"speed":[120,250],"recoil":150,"number":1},"propeller":false,"texture":[13,63]},"cockpit":{"section_segments":18,"offset":{"x":0,"y":-45,"z":22},"position":{"x":[0,0,0,0],"y":[-15,0,20,35],"z":[0,0,0,0]},"width":[0,20,20,0],"height":[0,10,10,0],"texture":[9]}},"wings":{"bridge":{"offset":{"x":25,"y":15,"z":7},"length":[30,30],"width":[25,25,25],"angle":[-15,-25],"position":[0,10,15],"texture":[8],"doubleside":true,"bump":{"position":10,"size":20}},"wingletsa":{"offset":{"x":95,"y":35,"z":-25},"length":[20],"width":[25,15],"angle":[0],"position":[0,10],"texture":[63],"doubleside":true,"bump":{"position":10,"size":20}},"wingletsb":{"offset":{"x":25,"y":-38,"z":0},"length":[20],"width":[25,15],"angle":[0],"position":[0,10],"texture":[63],"doubleside":true,"bump":{"position":10,"size":20}}},"typespec":{"name":"M-Seeker","level":6,"model":10,"code":610,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[100,180],"reload":[35,55]},"ship":{"mass":300,"speed":[70,95],"rotation":[55,75],"acceleration":[95,135]}},"shape":[3.922,3.067,2.865,2.194,1.913,1.56,3.379,3.298,3.033,2.845,2.725,2.657,2.649,2.821,2.888,3.462,3.54,3.223,3.096,1.69,1.724,1.754,1.702,1.619,1.567,1.543,1.567,1.619,1.702,1.754,1.724,1.69,3.096,3.223,3.54,3.462,2.888,2.821,2.649,2.657,2.725,2.845,3.033,3.298,3.379,1.56,1.913,2.194,2.865,3.067],"lasers":[{"x":0,"y":-3.92,"z":0,"angle":0,"damage":[3,6],"rate":5,"type":1,"speed":[140,200],"number":1,"spread":2,"error":5,"recoil":0},{"x":2.255,"y":-2.377,"z":-0.7,"angle":3,"damage":[25,50],"rate":2,"type":2,"speed":[120,250],"number":1,"spread":0,"error":0,"recoil":150},{"x":-2.255,"y":-2.377,"z":-0.7,"angle":-3,"damage":[25,50],"rate":2,"type":2,"speed":[120,250],"number":1,"spread":0,"error":0,"recoil":150}],"radius":3.922}}'
      },
      611: { 
        name: "Mantis", 
        code: '{"name":"Mantis","level":6,"model":11,"size":2.1,"specs":{"shield":{"capacity":[200,350],"reload":[5,7]},"generator":{"capacity":[70,200],"reload":[30,45]},"ship":{"mass":350,"speed":[75,90],"rotation":[60,100],"acceleration":[70,95]}},"bodies":{"main":{"section_segments":16,"offset":{"x":0,"y":5,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-90,-80,-60,-30,10,30,45,65,60],"z":[2,6,7,3,0,0,0,0,0]},"width":[0,3,8,30,25,23,24,15,0],"height":[0,3,8,12,20,20,18,15,0],"propeller":true,"texture":[63,4,3,11,1,10,12,17],"laser":{"damage":[35,70],"rate":2,"type":2,"speed":[150,210],"number":1,"angle":0,"error":0}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-1,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-22,-11,0,30,40],"z":[0,0,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9],"propeller":false},"cannon":{"section_segments":8,"offset":{"x":55,"y":10,"z":15},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-55,-40,-45,10,20,35,45],"z":[0,0,0,10,10,10,10,0]},"width":[0,3,5,10,15,12,0,0],"height":[0,3,5,10,12,10,0,0],"angle":0,"laser":{"damage":[2,4],"rate":8,"type":1,"speed":[110,150],"number":1,"error":1},"propeller":false,"texture":[6,12,3,4,10,4]},"deco":{"section_segments":8,"offset":{"x":16,"y":-45,"z":15},"position":{"x":[-8,-3,5,7,-1,0,0,0],"y":[-62,-50,-20,20,60,95,112,110],"z":[-10,-14,-15,-10,-2,0,0,0]},"width":[0,5,10,12,5,8,5,0],"height":[0,5,10,15,10,5,8,0],"angle":0,"texture":[63,4,3,11,1,12,17],"propeller":true}},"wings":{"main":{"length":[20,20],"width":[100,50,20],"angle":[20,30],"position":[0,20,30],"doubleside":true,"offset":{"x":20,"y":10,"z":11},"bump":{"position":30,"size":10},"texture":[4,63]},"winglets1":{"length":[15],"width":[15,10],"angle":[-10],"position":[0,8],"doubleside":true,"offset":{"x":65,"y":35,"z":25},"bump":{"position":-20,"size":20},"texture":[63]},"winglets2":{"length":[10],"width":[13,10],"angle":[-10],"position":[-2,-8],"doubleside":true,"offset":{"x":59,"y":-25,"z":16},"bump":{"position":20,"size":7},"texture":[63]},"winglets3":{"length":[15],"width":[15,10],"angle":[-10],"position":[0,-8],"doubleside":true,"offset":{"x":57,"y":-5,"z":20},"bump":{"position":20,"size":10},"texture":[63]},"winglets4":{"length":[15],"width":[15,10],"angle":[-10],"position":[0,-8],"doubleside":true,"offset":{"x":60,"y":15,"z":23},"bump":{"position":20,"size":10},"texture":[63]},"winglets5":{"length":[15],"width":[15,10],"angle":[30],"position":[0,8],"doubleside":true,"offset":{"x":30,"y":-40,"z":2},"bump":{"position":20,"size":20},"texture":[63]}},"typespec":{"name":"Mantis","level":6,"model":11,"code":611,"specs":{"shield":{"capacity":[200,350],"reload":[5,7]},"generator":{"capacity":[70,200],"reload":[30,45]},"ship":{"mass":350,"speed":[75,90],"rotation":[60,100],"acceleration":[70,95]}},"shape":[3.57,4.507,4.05,3.441,3.034,2.538,2.366,2.985,3.303,3.299,3.016,3.108,3.038,3.165,3.181,3.096,3.822,3.91,3.355,3.277,2.912,2.779,2.885,3.007,2.993,2.946,2.993,3.007,2.885,2.779,2.912,3.277,3.355,3.91,3.822,3.096,3.181,3.165,3.038,3.108,3.016,3.299,3.303,2.985,2.366,2.538,3.034,3.441,4.05,4.507],"lasers":[{"x":0,"y":-3.57,"z":0.42,"angle":0,"damage":[35,70],"rate":2,"type":2,"speed":[150,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.31,"y":-1.89,"z":0.63,"angle":0,"damage":[2,4],"rate":8,"type":1,"speed":[110,150],"number":1,"spread":0,"error":1,"recoil":0},{"x":-2.31,"y":-1.89,"z":0.63,"angle":0,"damage":[2,4],"rate":8,"type":1,"speed":[110,150],"number":1,"spread":0,"error":1,"recoil":0}],"radius":4.507}}'
      },
      612: {
        name: "Payload",
        code: '{"name":"Payload","level":6,"model":12,"size":1.5,"specs":{"shield":{"capacity":[200,300],"reload":[4,6]},"generator":{"capacity":[150,230],"reload":[45,70]},"ship":{"mass":200,"speed":[85,120],"rotation":[40,60],"acceleration":[45,65]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-80,-70,-50,-40,0,40,50,80,85],"z":[-5,-5,-3,0,0,0,10,10,10]},"width":[4,11,14,8,10,10,12,10,0],"height":[0,5,6,8,12,10,8,9,0],"texture":[63,4,4,3,3,13,2,13],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-55,"z":12},"position":{"x":[0,0,0,0],"y":[-20,0,10],"z":[-4,0,6]},"width":[5,10,5],"height":[0,7,0],"texture":[9]},"uwings":{"section_segments":8,"offset":{"x":25,"y":10,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-44,-43,-45,-40,10,30,40,50,40],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,8,10,12,10,14,12,0],"height":[0,8,10,12,14,12,16,12,0],"texture":[13,13,4,3,4,3,4,13],"propeller":true},"main_cannon":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-20,-10,0,20,50,55],"z":[-10,-10,-10,-10,0,0,0]},"width":[0,8,12,10,15,12,0],"height":[0,5,10,10,10,8,0],"angle":0,"laser":{"damage":[110,190],"rate":1,"type":2,"speed":[70,90],"recoil":750,"number":1},"propeller":false,"texture":[111,4,63,3,4,13]},"side_cannons":{"section_segments":10,"offset":{"x":70,"y":20,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-55,-10,0,20,35,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,7,12,10,5,0],"height":[0,3,5,7,5,3,0],"laser":{"damage":[6,12],"rate":7.5,"type":1,"speed":[40,80],"number":1,"error":20},"propeller":true,"texture":[13,3,4,63,4,13]}},"wings":{"main":{"length":[50,25,20,10,10,16,2,2],"width":[60,60,50,50,55,60,5,60,0],"angle":[-10,-10,-10,-10,-10,-10,-10,-10],"position":[-10,10,5,-5,-20,-35,-30,-40,-30],"doubleside":true,"offset":{"x":0,"y":10,"z":10},"bump":{"position":0,"size":10},"texture":[4,8,3,63,4,3,63,63]},"winglets":{"length":[30,10],"width":[30,20,0],"angle":[15,10],"position":[0,10,35],"doubleside":true,"offset":{"x":5,"y":60,"z":20},"bump":{"position":0,"size":10},"texture":[4,63]}},"typespec":{"name":"Payload","level":6,"model":12,"code":612,"specs":{"shield":{"capacity":[200,300],"reload":[4,6]},"generator":{"capacity":[150,230],"reload":[45,70]},"ship":{"mass":200,"speed":[85,120],"rotation":[40,60],"acceleration":[45,65]}},"shape":[2.403,2.354,1.869,0.835,1.243,1.362,1.443,1.406,1.303,4.322,4.239,4.094,4.009,3.929,3.222,3.018,2.765,2.778,2.784,2.14,2.086,2.988,3.139,2.474,2.472,2.55,2.472,2.474,3.139,2.988,2.086,2.14,2.784,2.778,2.765,3.018,3.222,3.502,4.009,4.094,4.239,4.322,1.303,1.406,1.443,1.362,1.243,0.835,1.869,2.354],"lasers":[{"x":0,"y":-0.6,"z":0,"angle":0,"damage":[110,190],"rate":1,"type":2,"speed":[70,90],"number":1,"spread":0,"error":0,"recoil":750},{"x":2.1,"y":-1.05,"z":-0.3,"angle":0,"damage":[6,12],"rate":7.5,"type":1,"speed":[40,80],"number":1,"spread":0,"error":20,"recoil":0},{"x":-2.1,"y":-1.05,"z":-0.3,"angle":0,"damage":[6,12],"rate":7.5,"type":1,"speed":[40,80],"number":1,"spread":0,"error":20,"recoil":0}],"radius":4.322}}'
      },
      613: {
        name: "H_Mercury",
        code: '{"name":"H-Mercury","level":6,"model":13,"size":2.2,"specs":{"shield":{"capacity":[250,350],"reload":[6,8]},"generator":{"capacity":[100,150],"reload":[45,60]},"ship":{"mass":275,"speed":[75,95],"rotation":[50,60],"acceleration":[55,90]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-65,-70,-60,-40,0,50,110,100],"z":[0,0,0,0,0,0,0,0]},"width":[1,5,10,20,30,25,10,0],"height":[1,5,10,15,25,20,10,0],"texture":[6,4,4,63,11,63,12],"propeller":true,"laser":{"damage":[4,7],"rate":8,"type":1,"speed":[100,150],"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-20,"z":35},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-10,0,15,25],"z":[0,0,0,0,0]},"width":[0,10,12,10,5],"height":[0,10,13,12,5],"texture":[9,9,4,4],"propeller":false},"arms":{"section_segments":8,"offset":{"x":60,"y":0,"z":-10},"position":{"x":[0,0,0,5,10,0,0,-10],"y":[-85,-70,-80,-30,0,30,100,90],"z":[0,0,0,0,0,0,0,0]},"width":[1,5,6,15,15,15,10,0],"height":[1,5,6,20,30,25,10,0],"texture":[6,4,4,4,4,4,12],"angle":1,"propeller":true,"laser":{"damage":[2,4],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0}},"canon":{"section_segments":12,"offset":{"x":100,"y":27,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,7,3,5,0],"height":[0,5,15,15,3,5,0],"angle":3,"laser":{"damage":[4,8],"rate":1,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,10,4,4,4]}},"wings":{"main":{"offset":{"x":0,"y":-15,"z":20},"length":[60,40],"width":[60,30,20],"angle":[-20,10],"position":[30,50,30],"texture":[11,11],"bump":{"position":30,"size":10}},"font":{"length":[60],"width":[20,15],"angle":[-10,20],"position":[-20,-40],"texture":[63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":0,"z":0}},"font2":{"offset":{"x":0,"y":40,"z":8},"length":[60],"width":[20,15],"angle":[-10,20],"position":[20,40],"texture":[63],"bump":{"position":30,"size":10}}},"typespec":{"name":"H-Mercury","level":6,"model":13,"code":613,"specs":{"shield":{"capacity":[250,350],"reload":[6,8]},"generator":{"capacity":[100,150],"reload":[45,60]},"ship":{"mass":275,"speed":[75,95],"rotation":[50,60],"acceleration":[55,90]}},"shape":[3.086,3.088,2.59,2.24,2.004,4.566,4.489,4.168,3.955,3.818,3.747,4.587,4.622,4.713,4.854,4.959,5.317,5.372,4.412,4.987,5.408,5.207,3.941,3.8,4.86,4.849,4.86,3.8,3.941,5.207,5.408,4.987,4.412,5.372,5.317,4.959,4.854,4.713,4.622,4.587,3.747,3.818,3.955,4.168,4.489,4.566,2.004,2.24,2.59,3.088],"lasers":[{"x":0,"y":-3.08,"z":0.88,"angle":0,"damage":[4,7],"rate":8,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.575,"y":-3.739,"z":-0.44,"angle":1,"damage":[2,4],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.575,"y":-3.739,"z":-0.44,"angle":-1,"damage":[2,4],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":4.285,"y":-1.009,"z":0.22,"angle":3,"damage":[4,8],"rate":1,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-4.285,"y":-1.009,"z":0.22,"angle":-3,"damage":[4,8],"rate":1,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.408}}'
      },
      614: {
        name: "Vampire",
        code: '{"name":"Vampire","designer":"nex","level":6,"model":14,"size":1.5,"specs":{"shield":{"capacity":[230,275],"reload":[6,9]},"generator":{"capacity":[190,225],"reload":[35,50]},"ship":{"mass":170,"speed":[120,130],"rotation":[90,90],"acceleration":[120,120]}},"bodies":{"main_DOESNOTSHOOT":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-35,-45,-15,10,30,45,70,100,90],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,15,25,15,15,25,20,0],"height":[0,6,13,17,13,13,17,13,0],"texture":[3,11,1,63,4,3,8,17],"propeller":true},"boris":{"section_segments":8,"offset":{"x":20,"y":30,"z":-5},"position":{"x":[0,0,-1,0,0,0,10,0,0],"y":[-105,-97,-80,-60,-20,0,20,50,40],"z":[-6.6,-10,-10,-10,0,0,0,0,0]},"width":[0,7,10,10,8,14,15,15,0],"height":[0,6,8,12,8,13,13,13,0],"texture":[6,4,1,10,8,4,13,17],"propeller":false,"angle":5,"laser":{"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"error":25,"angle":0,"recoil":15}},"propeller":{"section_segments":8,"offset":{"x":24,"y":25,"z":-5},"position":{"x":[0,0],"y":[41,40],"z":[0,0]},"width":[15,0],"height":[11,0],"texture":[69],"propeller":true,"angle":5},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-1,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-40,-25,-5,20,30,20],"z":[0,0,0,3,0,0]},"width":[0,9,12,17,10,0],"height":[0,8,12,14,13,0],"texture":[3,9,9,4],"propeller":false}},"wings":{"holy_moly_its_goku":{"offset":{"x":29,"y":44,"z":0},"length":[25,30],"width":[60,35,20],"angle":[-30,-20],"position":[0,10,25],"texture":[11,4],"doubleside":true,"bump":{"position":0,"size":10}},"what_no_way":{"offset":{"x":5,"y":45,"z":0},"length":[30,30],"width":[60,35,20],"angle":[30,20],"position":[0,15,35],"texture":[11,4],"doubleside":true,"bump":{"position":0,"size":10}},"teeth":{"offset":{"x":8,"y":-60,"z":-19},"length":[10,-10,25],"width":[15,15,55,25],"angle":[-30,-30,-20],"position":[10,3,-20,10],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}},"backteeth":{"offset":{"x":33,"y":60,"z":-10},"length":[30,-10,30],"width":[25,15,55,20],"angle":[-28,-20,-30],"position":[-20,-30,-40,-10],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}},"somanyteeth":{"offset":{"x":15,"y":10,"z":-5},"length":[10,-10,25],"width":[15,15,55,20],"angle":[30,30,50],"position":[-10,-20,-30,0],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}}},"typespec":{"name":"Vampire","level":6,"model":14,"code":614,"specs":{"shield":{"capacity":[230,275],"reload":[6,9]},"generator":{"capacity":[190,225],"reload":[35,50]},"ship":{"mass":170,"speed":[120,130],"rotation":[90,90],"acceleration":[120,120]}},"shape":[1.829,3.234,2.747,2.384,2.136,1.76,1.481,1.028,0.933,0.896,0.885,1.531,1.62,1.758,1.943,2.226,2.604,2.82,3.244,3.348,3.231,3.146,2.667,3.059,3.054,3.006,3.054,3.059,2.667,3.146,3.231,3.348,3.244,2.82,2.604,2.226,1.943,1.758,1.62,1.531,0.885,0.896,0.933,1.028,1.481,1.76,2.136,2.384,2.747,3.234],"lasers":[{"x":0.325,"y":-2.238,"z":-0.15,"angle":5,"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"spread":0,"error":25,"recoil":15},{"x":-0.325,"y":-2.238,"z":-0.15,"angle":-5,"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"spread":0,"error":25,"recoil":15}],"radius":3.348}}'
      },
      615: {
        name: "Contraband",
        code: '{"name":"Contraband","level":6,"model":15,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-80,-20,0,15,20,60,65,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,24,26,20,20,20,20,25,12,0],"height":[0,5,25,25,20,15,15,15,20,10,0],"texture":[1,2,4,63,5,10,5,63,4,17],"propeller":true,"laser":{"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"recoil":250,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-77,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,5,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":3,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"cannons":{"section_segments":12,"offset":{"x":18,"y":43,"z":20},"position":{"x":[0,0,0,0,0],"y":[-50,-45,-20,-5,5],"z":[0,0,0,0,0]},"width":[0,5,7,8,0],"height":[0,5,7,8,0],"angle":0,"laser":{"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,63,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":-2,"z":0},"length":[37,0],"width":[20,70],"angle":[0],"position":[-95,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":25,"y":30,"z":0},"length":[35],"width":[10,10],"angle":[0],"position":[0,0,0,50],"texture":[8],"doubleside":1,"bump":{"position":0,"size":0}},"wing1":{"doubleside":true,"offset":{"x":50,"y":30,"z":-36},"length":[0,30,20,30],"width":[0,0,100,100,0],"angle":[110,70,90,110],"position":[0,0,0,0,0],"texture":[63],"bump":{"position":0,"size":5}}},"typespec":{"name":"Contraband","level":6,"model":15,"code":615,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"shape":[3.424,3.274,2.552,2.215,2.002,1.835,1.725,1.612,1.456,1.35,2.032,2.005,1.991,2.031,2.107,2.229,2.362,2.513,2.737,3.055,3.205,3.163,3.112,2.961,2.525,2.501,2.525,2.961,3.112,3.163,3.205,3.055,2.737,2.513,2.362,2.229,2.107,2.031,1.992,2.005,2.032,1.35,1.456,1.612,1.725,1.835,2.002,2.215,2.552,3.274],"lasers":[{"x":0,"y":-3.264,"z":0,"angle":0,"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"number":1,"spread":0,"error":0,"recoil":250},{"x":0.576,"y":-0.224,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.576,"y":-0.224,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.424}}'
      },
      616: { 
        name: "Deadshot", 
        code: '{"name":"Deadshot","level":6,"model":16,"size":1.35,"zoom":1,"specs":{"shield":{"capacity":[200,255],"reload":[7,9]},"generator":{"capacity":[180,215],"reload":[20,45]},"ship":{"mass":185,"speed":[80,108],"rotation":[40,65],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-105,-110,-100,-80,-50,0,30,70,80,75],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,8,14,19,25,25,30,30,20,0],"height":[0,12,18,19,20,20,24,24,20,0],"texture":[17,4,63,3,11,2,3,12,17],"propeller":true,"laser":{"damage":[15,25],"rate":7,"type":1,"speed":[150,180],"number":1,"error":0}},"cannon":{"section_segments":6,"offset":{"x":0,"y":-10,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[8,15],"rate":9,"type":1,"speed":[160,200],"number":1,"error":0}},"side":{"section_segments":8,"offset":{"x":25,"y":0,"z":0},"position":{"x":[-17,-12,-3,0,0,0,0,0,0,0,0],"y":[-70,-60,-30,-5,5,20,35,55,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,12,15,15,15,15,15,15,10,0],"height":[0,5,7,10,10,10,10,10,10,7,0],"texture":[3,4,10,3,63,4,11,63,3,4],"propeller":false},"intake":{"section_segments":12,"offset":{"x":25,"y":0,"z":7},"position":{"x":[-10,-3,-2,-2,-2,4,7,0,0,0],"y":[-60,-20,0,35,60,70,85,95,100],"z":[-2,-6,0,0,0,0,0,0,0,0]},"width":[0,9,10,10,17,17,20,5,0],"height":[0,12,10,10,10,10,10,5,0],"texture":[13,4,63,18,2,3,4,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-45,-20,0,30,50,90,125],"z":[-2,-4,-5,0,0,0,0,0]},"width":[2,12,15,17,17,15,0],"height":[0,12,19,16,15,15,0],"texture":[9,9,9,10,4,63],"propeller":false},"propulsor":{"section_segments":10,"offset":{"x":40,"y":58,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-30,-24,-28,-15,-10,10,30,40,50,60,55],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,6,11,12,13,13,13,11,8,0],"height":[0,4,6,11,12,13,13,13,11,8,0],"texture":[3,4,3,4,11,3,63,4,4,17],"propeller":true},"propulsor2":{"section_segments":12,"offset":{"x":15,"y":68,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-54,-48,-35,-20,0,25,40,50,60,55],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,6,11,12,13,13,13,11,8,0],"height":[0,4,6,11,12,13,13,13,11,8,0],"texture":[4,63,3,4,63,10,4,3,63,17],"propeller":true}},"wings":{"main":{"doubleside":1,"offset":{"x":0,"y":60,"z":0},"length":[50,20,20],"width":[70,50,50,50],"texture":[3,63,4],"angle":[0,0,0],"position":[-50,30,30,50],"bump":{"position":10,"size":5}},"main2":{"doubleside":true,"offset":{"x":10,"y":-60,"z":-5},"length":[0,20,20],"width":[0,160,140,70],"angle":[0,0,0,0],"position":[0,0,0,50],"texture":[63,3.5,63],"bump":{"position":20,"size":5}},"winglet":{"length":[10,20],"width":[50,50,40],"angle":[25,25],"position":[80,90,120],"texture":[2,4],"bump":{"position":10,"size":10},"offset":{"x":25,"y":-20,"z":25}},"winglet2":{"length":[20,10],"width":[30,30,20],"angle":[20,20],"position":[0,5,20],"texture":[3,4],"bump":{"position":10,"size":5},"offset":{"x":20,"y":-10,"z":5}}},"typespec":{"name":"Deadshot","level":6,"model":16,"code":616,"specs":{"shield":{"capacity":[200,255],"reload":[7,9]},"generator":{"capacity":[180,215],"reload":[20,45]},"ship":{"mass":185,"speed":[80,108],"rotation":[40,65],"acceleration":[100,130]}},"shape":[2.164,3.79,3.637,3.064,2.561,2.211,1.996,1.828,1.662,1.532,1.445,1.394,1.359,1.36,1.391,1.448,1.509,1.577,3.037,3.806,4.381,3.932,3.525,3.439,3.511,3.463,3.511,3.439,3.525,3.932,4.381,3.806,3.037,1.577,1.509,1.448,1.391,1.36,1.359,1.394,1.445,1.532,1.662,1.828,1.996,2.211,2.561,3.064,3.637,3.79],"lasers":[{"x":0,"y":-2.16,"z":0,"angle":0,"damage":[15,25],"rate":7,"type":1,"speed":[150,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-1.62,"z":-0.27,"angle":0,"damage":[8,15],"rate":9,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.381}}'
      },
      617: { 
        name: "F-22", 
        code: '{"name":"F-22","designer":"Thuliux & Nex & ☒☒☒","level":6,"model":17,"size":0.9,"zoom":0.8,"specs":{"shield":{"capacity":[180,250],"reload":[6,10]},"generator":{"capacity":[300,600],"reload":[40,80]},"ship":{"mass":200,"speed":[120,145],"rotation":[35,55],"acceleration":[150,170]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-17,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-100,-95,-70,-30,0,30,50,85,100],"z":[-13,-10,-5,-5,0,0,0,0,0]},"width":[0,5,23,35,24,23,30,25,20,0],"height":[0,6,12,20,15,10,12,12,10,10],"texture":[4,4,3,4,8,4,13,4]},"wingconnect":{"section_segments":8,"offset":{"x":80,"y":40,"z":-10},"position":{"x":[-10,0,-8,4],"y":[-75,-30,40,70],"z":[0,0,0,0]},"width":[2,12,8,2],"height":[2,10,10,2],"angle":0,"propeller":false,"texture":63},"NUKE":{"section_segments":6,"offset":{"x":0,"y":45,"z":-30},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,3,4,5,5,0],"angle":0,"laser":{"damage":[50,100],"rate":2,"type":1,"speed":[2.5,5],"number":3,"angle":270},"propeller":false},"back":{"section_segments":10,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,19,2],"height":[3,5,7,8,2],"texture":[63],"propeller":true},"cockpit2":{"section_segments":8,"offset":{"x":0,"y":-86,"z":6},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-20,0,20,30,55,60],"z":[-13,-3,0,0,0,0]},"width":[0,12,15,15,11,0],"height":[0,10,13,12,12,0],"texture":[7,9,63,9,7]},"cockpit":{"section_segments":0,"offset":{"x":0,"y":-86,"z":6},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-13,-5,0,0,0]},"width":[0,10,13,10,0],"height":[0,10,13,12,0],"texture":[7,9,9,7]},"engin":{"section_segments":8,"offset":{"x":30,"y":-30,"z":-5},"position":{"x":[0,0,0,0,-10,0,0,0,0],"y":[0,-15,0,20,60,80,100,60],"z":[0,0,0,0,-5,0,0,0]},"width":[0,12,15,20,20,15,12,0],"height":[0,12,12,18,18,10,5,0],"texture":[4,63,4,8,4,63,4,3,4,3],"propeller":true,"angle":0},"laser2":{"section_segments":12,"offset":{"x":100,"y":25,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-25,-10,20,30,40,50,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,15,20,15,10,10,0],"height":[0,8,10,10,10,8,8,0],"texture":[3,4,8,3],"propeller":0}},"wings":{"top":{"offset":{"x":-11,"y":45,"z":-1},"length":[50],"width":[50,30],"angle":[50],"position":[0,50],"doubleside":true,"texture":[3],"bump":{"position":10,"size":5}},"half":{"offset":{"x":30,"y":20,"z":-7},"length":[40],"width":[70,40],"angle":[8],"position":[0,20],"doubleside":true,"texture":[3],"bump":{"position":10,"size":15}},"mainholyhsit":{"offset":{"x":0,"y":20,"z":-13},"length":[80,0,65],"width":[180,80,80,40],"angle":[0,0,0],"position":[-40,10,30,70],"doubleside":true,"texture":[4,4],"bump":{"position":10,"size":10}},"main2":{"offset":{"x":0,"y":90,"z":-13},"length":[60],"width":[100,30],"angle":[0],"position":[-50,30],"doubleside":true,"texture":[4],"bump":{"position":10,"size":10}}},"typespec":{"name":"F-22","level":6,"model":17,"code":617,"specs":{"shield":{"capacity":[180,250],"reload":[6,10]},"generator":{"capacity":[300,600],"reload":[40,80]},"ship":{"mass":200,"speed":[120,145],"rotation":[35,55],"acceleration":[150,170]}},"shape":[2.106,1.971,1.723,1.481,1.375,1.305,1.263,1.24,1.254,1.441,1.459,1.503,1.978,2.083,2.183,2.341,2.977,3.225,3.276,2.554,2.513,2.536,2.659,2.247,2.008,1.696,2.008,2.247,2.659,2.536,2.513,2.554,3.276,3.225,2.977,2.341,2.183,2.083,1.98,1.503,1.459,1.441,1.254,1.24,1.263,1.305,1.375,1.481,1.723,1.971],"lasers":[{"x":0,"y":-0.09,"z":-0.54,"angle":0,"damage":[50,100],"rate":2,"type":1,"speed":[2.5,5],"number":3,"spread":270,"error":0,"recoil":0}],"radius":3.276}}'
      },
      618: {
        name: "Streamliner v1",
        code: '{"name":"C-Speedster","level":6,"model":18,"size":1.4,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[150,200],"reload":[20,35]},"ship":{"mass":155,"speed":[100,125],"rotation":[55,75],"acceleration":[95,145]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-85,-80,-50,0,0,70,65],"z":[0,0,0,0,0,0,0]},"width":[0,10,21,28,20,20,0],"height":[0,7,16,25,20,15,0],"texture":[63,4,11,5,18,12],"propeller":true,"laser":{"damage":[25,65],"rate":3,"type":1,"speed":[160,200],"number":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-50,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,8,10,10,0],"height":[0,10,12,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"tops":{"section_segments":12,"offset":{"x":15,"y":45,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-40,-25,0,15,40,35],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,13,11,6,0],"height":[0,5,9,8,6,5,0],"propeller":1,"angle":0,"texture":[5,4,10,63,4,17]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"join1":{"offset":{"x":0,"y":20,"z":0},"length":[37],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":0,"y":50,"z":0},"length":[30],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}}},"typespec":{"name":"C-Speedster","level":6,"model":18,"code":618,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[150,200],"reload":[20,35]},"ship":{"mass":155,"speed":[100,125],"rotation":[55,75],"acceleration":[95,145]}},"shape":[2.38,2.312,2.007,1.668,1.485,1.388,1.314,1.274,1.253,1.179,1.113,1.066,1.042,1.043,1.487,1.656,1.757,1.903,1.92,2.239,2.689,3.102,3.328,3.238,2.423,1.964,2.423,3.238,3.328,3.102,2.689,2.239,1.92,1.903,1.757,1.656,1.487,1.043,1.042,1.066,1.113,1.179,1.253,1.274,1.314,1.388,1.485,1.668,2.007,2.312],"lasers":[{"x":0,"y":-2.38,"z":0,"angle":0,"damage":[25,65],"rate":3,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.328}}'
      },
      619: {
        name: "Broly v1",
        code: '{"name":"B-Speedster","level":6,"model":19,"size":1.6,"specs":{"shield":{"capacity":[250,350],"reload":[8,10]},"generator":{"capacity":[90,150],"reload":[25,40]},"ship":{"mass":210,"speed":[90,100],"rotation":[50,70],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-100,-95,0,0,60,85,75],"z":[0,0,0,0,0,0,0]},"width":[0,10,40,20,22,15,0],"height":[0,5,30,30,20,15,0],"texture":[6,18,5,11,15,17],"propeller":true,"laser":{"damage":[48,94],"rate":1,"type":2,"speed":[185,240],"recoil":70,"number":1,"error":0}},"core":{"vertical":true,"angle":180,"section_segments":[30,90,150,210,270,330],"offset":{"x":0,"y":-5,"z":-40},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-40,-43,-40,-30,0,0],"z":[0,0,0,0,0,0,0]},"width":[1,13,18,23,30,30,0],"height":[1,13,18,23,30,30,0],"texture":[16.9,4.9,63,3.9,9.9,0.9,11.9]},"ye":{"vertical":true,"section_segments":12,"offset":{"x":0,"y":38,"z":-40},"position":{"x":[0,0,0],"y":[-10,-3,-1],"z":[0,0,0]},"width":[0,5,0],"height":[0,5,0],"texture":[5]},"shield":{"section_segments":12,"offset":{"x":30,"y":-40,"z":0},"position":{"x":[-6,0,0,0,0,-4],"y":[-70,-60,-10,15,30,40],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,5,5,8,3,0],"texture":63,"angle":16},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,17]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":0,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}}},"typespec":{"name":"B-Speedster","level":6,"model":19,"code":619,"specs":{"shield":{"capacity":[250,350],"reload":[8,10]},"generator":{"capacity":[90,150],"reload":[25,40]},"ship":{"mass":210,"speed":[90,100],"rotation":[50,70],"acceleration":[100,130]}},"shape":[3.384,3.353,3.037,2.443,2.076,1.832,1.659,1.541,1.458,1.406,1.378,1.341,1.248,1.801,2.197,2.375,2.52,2.637,3.021,3.288,3.665,3.862,3.713,2.623,2.758,2.725,2.758,2.623,3.713,3.862,3.665,3.288,3.021,2.637,2.52,2.375,2.197,1.801,1.248,1.341,1.378,1.406,1.458,1.541,1.659,1.832,2.076,2.443,3.037,3.353],"lasers":[{"x":0,"y":-3.2,"z":0,"angle":0,"damage":[48,94],"rate":1,"type":2,"speed":[185,240],"number":1,"spread":0,"error":0,"recoil":70},{"x":0.96,"y":-0.32,"z":0.96,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-0.96,"y":-0.32,"z":0.96,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.862}}'
      },
      701: { name: "Odyssey", code: `` },
      702: { name: "Shadow X-3", code: `` },
      703: { name: "Bastion", code: `` },
      704: { name: "Aries", code: `` },
      705: {
        name: "Poseidon",
        code: '{"name":"Poseidon","level":7,"model":5,"size":4,"specs":{"shield":{"capacity":[650,650],"reload":[15,15]},"generator":{"capacity":[300,300],"reload":[100,100]},"ship":{"mass":650,"speed":[50,50],"rotation":[25,25],"acceleration":[120,120]}},"bodies":{"main":{"section_segments":20,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-100,-80,-75,-90,-80,0,30,40,80,90,80],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,15,20,25,20,15,20,15,0],"height":[0,5,10,15,20,25,20,15,20,15,0],"texture":[13,13,13,4,1,10,4,12,63,13],"laser":{"damage":[125,125],"rate":0.7,"type":1,"speed":[95,95],"number":1,"error":3,"recoil":50},"propeller":true},"shield":{"section_segments":14,"offset":{"x":70,"y":0,"z":0},"position":{"x":[-25,-20,-5,0,0,0,0,0,0,0,0,0],"y":[-100,-80,-60,-40,-35,0,35,45,65,70,60],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,8,6,15,20,15,6,12,8,0],"height":[0,4,8,6,15,20,15,6,12,8,0],"texture":[13,63,63,4,8,3,4,12,63,13],"propeller":true},"sidecannons":{"section_segments":20,"offset":{"x":110,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[10,18,15,20,40],"z":[0,0,0,0,0]},"width":[0,5,10,15,20],"height":[0,5,10,15,15],"texture":[13,13,63,63,4],"angle":-90,"laser":{"damage":[10,10],"rate":4,"type":1,"speed":[200,200],"number":2,"angle":45}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-39,"z":17},"position":{"x":[0,0,0,0],"y":[-35,-10,10,35],"z":[0,0,0,0]},"width":[10,15,15,10],"height":[5,8,10,5],"texture":[9,9,9]}},"wings":{"bridge1":{"offset":{"x":15,"y":20,"z":-5},"length":[45],"width":[18,6],"angle":[10],"position":[0,0],"texture":[4],"bump":{"position":0,"size":50},"doubleside":true},"bridge2":{"offset":{"x":15,"y":-10,"z":5},"length":[45],"width":[18,16],"angle":[-10],"position":[0,10],"texture":[63],"bump":{"position":0,"size":15},"doubleside":true},"bridge3":{"offset":{"x":15,"y":-40,"z":-5},"length":[45],"width":[18,6],"angle":[10],"position":[0,20],"texture":[4],"bump":{"position":0,"size":50},"doubleside":true},"winglets1":{"offset":{"x":16,"y":-70,"z":10},"length":[15],"width":[18,13],"angle":[45],"position":[0,-10],"texture":[63],"bump":{"position":0,"size":10},"doubleside":true},"winglets2":{"offset":{"x":16,"y":-70,"z":-10},"length":[15],"width":[18,13],"angle":[-45],"position":[0,-10],"texture":[63],"bump":{"position":0,"size":10},"doubleside":true}},"typespec":{"name":"Poseidon","level":7,"model":6,"code":706,"specs":{"shield":{"capacity":[650,650],"reload":[15,15]},"generator":{"capacity":[300,300],"reload":[100,100]},"ship":{"mass":650,"speed":[50,50],"rotation":[25,25],"acceleration":[120,120]}},"shape":[8,7.299,7.24,8.773,8.634,7.85,7.586,7.547,7.295,7.326,7.292,7.516,7.994,8,7.516,7.292,7.326,7.869,8.372,8.18,2.921,3.185,4.206,7.07,7.299,7.214,7.299,7.07,4.206,3.185,2.921,8.18,8.372,7.869,7.326,7.292,7.516,7.994,8,7.516,7.292,7.326,7.295,7.547,7.586,7.85,8.634,8.773,7.24,7.299],"lasers":[{"x":0,"y":-8,"z":0,"angle":0,"damage":[125,125],"rate":0.7,"type":1,"speed":[95,95],"number":1,"spread":0,"error":3,"recoil":50},{"x":8,"y":0,"z":0,"angle":-90,"damage":[10,10],"rate":4,"type":1,"speed":[200,200],"number":2,"spread":45,"error":0,"recoil":0},{"x":-8,"y":0,"z":0,"angle":90,"damage":[10,10],"rate":4,"type":1,"speed":[200,200],"number":2,"spread":45,"error":0,"recoil":0}],"radius":8.773}}'
      },
      706: {
        name: "Warthog",
        code: '{"name":"Warthog","level":7,"model":6,"size":3,"specs":{"shield":{"capacity":[350,350],"reload":[15,15]},"generator":{"capacity":[140,140],"reload":[80,80]},"ship":{"mass":300,"speed":[60,60],"rotation":[35,35],"acceleration":[85,85]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-140,-110,-30,0,80,160,165],"z":[0,0,0,3,10,20,24]},"width":[0,15,26,28,22,6,0],"height":[0,15,25,25,20,8,0],"texture":[63,1,10,1,2,4]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-30,"z":10},"position":{"x":[0,0,0],"y":[-70,-50,0],"z":[-3,-3,0]},"width":[8,13,13],"height":[10,25,15],"texture":[9]},"engines":{"section_segments":10,"offset":{"x":30,"y":0,"z":5},"position":{"x":[-29,0,0,0,0],"y":[-18,60,100,110,100],"z":[-2.7,0,0,0,0]},"width":[22,22,20,18,0],"height":[24,22,20,18,0],"propeller":true,"texture":[10,13,12,17]},"cannon":{"section_segments":8,"offset":{"x":0,"y":-90,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-40,-30,-20,0,20,10],"z":[0,0,0,5,10,20]},"width":[0,5,6,6,6,0],"height":[0,6,7,7,7,0],"angle":0,"propeller":false,"texture":[6,3,4],"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[85,85],"number":1}}},"wings":{"main":{"doubleside":true,"offset":{"x":10,"y":20,"z":15},"length":[70,60,15],"width":[60,50,40,25],"angle":[-10,-5,45],"position":[0,10,0,0],"texture":[8,2,63],"bump":{"position":10,"size":10}},"winglets":{"doubleside":true,"offset":{"x":5,"y":-75,"z":5},"length":[35],"width":[35,20],"angle":[-5],"position":[0,5],"texture":[63],"bump":{"position":10,"size":10}},"tail":{"doubleside":true,"offset":{"x":0,"y":140,"z":20},"length":[60,20],"width":[50,40,30],"angle":[10,40],"position":[-6,7,9,0],"texture":[11,63],"bump":{"position":0,"size":11}}},"typespec":{"name":"Warthog","level":7,"model":2,"code":702,"specs":{"shield":{"capacity":[350,350],"reload":[15,15]},"generator":{"capacity":[140,140],"reload":[80,80]},"ship":{"mass":300,"speed":[60,60],"rotation":[35,35],"acceleration":[85,85]}},"shape":[8.4,7.425,5.402,5.349,5.363,4.463,2.32,2.061,1.882,1.761,1.675,2.107,3.33,9.029,9.169,8.87,7.45,6.39,5.56,4.775,5.6,10.479,10.805,10.485,9.962,9.9,9.962,10.485,10.805,10.479,5.6,4.775,5.56,6.39,7.45,8.87,9.169,9.029,8.322,2.107,1.675,1.761,1.882,2.061,2.32,4.463,5.363,5.349,5.402,7.425],"lasers":[{"x":0,"y":-7.8,"z":-0.9,"angle":0,"damage":[80,80],"rate":2,"type":2,"speed":[85,85],"number":1,"spread":0,"error":0,"recoil":0}],"radius":10.805}}'
      }
    }
  },
  vocabulary: [
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
    {text: "Leave", icon: "\u00b3", key: "L"},
    {text: "Gems", icon: "\u0044", key: "M"},
    {text: "Stats", icon: "\u0078", key: "K"},
    {text: "Hmm", icon: "\u004b", key: "Q"},
    {text: "No Prb", icon: "\u0047", key: "P"},
    {text: "Discord", icon: "\u007b", key: "D"},
    {text: "Idiot", icon: "\u0079", key: "I"},
    {text: "Lag", icon: "\u0069", key: "J"},
    {text: "Spectate", icon: "\u0059", key: "W"}
  ],
  gameButtons: {
    regen_button: { 
      button: createButton("regen_button", [77, 1, 2.25, 3.5], "1", "RGBA(255, 155, 155, 0.6)", "Rej"),
      event: function(ship) {
        if (ship.type.toString() === gameOptions.spectatorShip[0] || gameOptions.adminShip.includes(ship.type.toString())) {
          return;
        }
        const maxCrystals = 20 * Math.trunc(ship.type / 100) * Math.trunc(ship.type / 100);
        const maxStats = Math.trunc(ship.type / 100) < 7 ? 11111111 * Math.trunc(ship.type / 100) : 0;
        ship.set({
          shield: 999,
          crystals: maxCrystals,
          stats: maxStats,
          invulnerable: 80
        });
      }
    },
    switch_button: {
      button: createButton("switch_button", [74, 1, 2.25, 3.5], "2", "RGBA(100, 255, 155, 0.6)", "Swip"),
      event: function(ship) {
        let index;
        let nextType;
        if (gameOptions.adminShip.includes(ship.type.toString())) {
          admin(game.ships.indexOf(ship));
        } else if (ship.custom.spectating) {
          gameOptions.gameButtons.spectate_button.event(ship);
        } else {
          index = gameOptions.shipCodes.indexOf(ship.type.toString());
          if (index >= 0) {
            nextType = gameOptions.shipCodes[(index + 1) % gameOptions.shipCodes.length];
          }
          ship.custom.last_ship = nextType;
          gameOptions.gameButtons.state.event(ship, gameOptions.shipInformations.main[nextType.toString()].name, "rgba(255,255,255, 0.4)");
          const maxCrystals = 20 * Math.trunc(nextType / 100) * Math.trunc(nextType / 100);
          const maxStats = Math.trunc(nextType / 100) < 7 ? 11111111 * Math.trunc(nextType / 100) : 0;
          ship.set({
            type: nextType,
            collider: true,
            shield: 999,
            crystals: maxCrystals,
            stats: maxStats,
            vx: 0,
            vy: 0
          });
        }
      }
    },
    spectate_button: {
      button: createButton("spectate_button", [71, 1, 2.25, 3.5], "3", "RGBA(155, 155, 255, 0.6)", "Spec"),
      event: function(ship, newJoiner = false) {
        const newType = (!ship.custom.spectating) ? gameOptions.spectatorShip[0] : ship.custom.oldSpecType;
        ship.custom.oldSpecType = newJoiner ? 605 : (!ship.custom.spectating) ? ship.type : ship.custom.oldSpecType;
        ship.custom.spectating = !ship.custom.spectating;
        ship.custom.spectating ? gameOptions.gameButtons.state.event(ship, "Spectating", "rgba(255,200,255, 0.4)") : gameOptions.gameButtons.state.event(ship, gameOptions.shipInformations.main[newType.toString()].name, "rgba(255,255,255, 0.4)");
        const collider = (newType === gameOptions.spectatorShip[0]) ? false : true;
        const maxCrystals = (newType === gameOptions.spectatorShip[0]) ? 0 : 20 * Math.trunc(newType / 100) * Math.trunc(newType / 100);
        const maxStats = (Math.trunc(newType / 100) < 7) ? 11111111 * Math.trunc(newType / 100) : 0;
        ship.set({
          type: newType,
          shield: 999,
          crystals: maxCrystals,
          stats: maxStats,
          vx: 0,
          vy: 0,
          collider: collider
        });
      }
    },
    warp_button: {
      button: createButton("warp_button", [68, 1, 2.25, 3.5], "4", "RGBA(255, 255, 100, 0.6)", "Warp"),
      event: function(ship) {
        let index;
        if (!ship.custom.spectating) {
          gameOptions.gameButtons.spectate_button.event(ship);
          return;
        } 
        if (game.ships.length > 1) {
          ship.custom.warpIndex = (ship.custom.warpIndex + 1) % game.ships.length;
          game.ships.indexOf(ship) === ship.custom.warpIndex && (ship.custom.warpIndex = (ship.custom.warpIndex + 1) % game.ships.length);
          ship.set({
            x: game.ships[ship.custom.warpIndex].x, 
            y: game.ships[ship.custom.warpIndex].y, 
            vx: 0, 
            vy: 0
          });
        }
      }
    },
    state: {
      event: function(ship, state, color) {
        const stateUI = gameOptions.gameButtons.state.button
        stateUI.components[0].fill = color;
        stateUI.components[1].value = state;
        ship.setUIComponent(stateUI);
      },
      button: {
        id: "state",
        position: [68.7,5.7,10,3],
        clickable: false,
        visible: true,
        components: [
          { type: "box", position: [0, 0, 100, 100], fill: "rgba(255,255,255,0.4)", stroke: "#CDE", width: 4 },
          { type: "text", position: [0, 7.5, 100, 80], value: "Playing", color: "#CDE", align: "center" }
        ]
      }
    }
  }
};

function createButton(id, position, shortcut, color, text) {
  return {
    id: id, 
    position: position, 
    clickable: true, 
    shortcut: shortcut, 
    visible: true,
    components: [
      { type: "box", position: [0, 0, 100, 100], fill: color, stroke: "#CDE", width: 4 },
      { type: "text", position: [0, 10, 100, 45], value: shortcut, color: "#CDE", align: "center" },
      { type: "text", position: [0, 50, 100, 40], value: text, color: "#CDE", align: "center" }
    ]
  };
}

(function() {
  const { main: main, spectator: spectator, admin: admin } = gameOptions.shipInformations;
  const spectatorShips = Object.values(spectator).flatMap(a => a.code);
  const adminShips = Object.values(admin).flatMap(a => a.code);
  const mainShips = Object.values(main).flatMap(a => a.code);
  gameOptions.ships = [...spectatorShips, ...adminShips, ...mainShips];
})();

(function() {
  const { main: mainShips, spectator: spectatorShips, admin: adminShips } = gameOptions.shipInformations;
  gameOptions.shipCodes = Object.keys(mainShips);
  gameOptions.spectatorShip = Object.keys(spectatorShips);
  gameOptions.adminShip = Object.keys(adminShips);
})();

game.custom.launched&&Warning();
game.custom.launched||mapOpen();
this.options = {
  map_name: gameInfo.Name,
  root_mode: "",
  custom_map: "",
  speed_mod: 1.2,
  ships: gameOptions.ships,
  vocabulary: gameOptions.vocabulary,
  map_size: 80,
  maxtierlives: 5,
  starting_ship: 801,
  weapons_store: false
};

this.tick = function(game) {
  if (game.step % 18000 === 30) game.modding.terminal.echo(`[[i;Cyan;]Write] [[gb;Gold;]more] [[i;Cyan;]in the console\nfor more information on the mod and its integrated commands.]\n`);
  if (game.step % 30 !== 0) {
    game.ships.forEach(function(ship) {
      const maxCrystals = 20 * Math.trunc(ship.type / 100) * Math.trunc(ship.type / 100);
      if (ship.crystals >= maxCrystals) {
        ship.set({crystals: maxCrystals - 1});
      }
    });
  }
};

this.event = function(event, game) {
  switch (event.name) {
    case "ui_component_clicked":
      if (!event.ship.custom.ISidle) {
        gameOptions.gameButtons[event.id].event(event.ship);
      }
      break;
    case "ship_destroyed":
      event.ship.custom.info = {
        x: event.ship.x,
        y: event.ship.y
      };
      break;
    case "ship_disconnected":
      event.ship.custom.explused||gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(event.ship), event.ship.id, "red", "\njust left the game");
      break;
    case "ship_spawned":
      if (!event.ship.custom.init && Object.values(gameOptions.ban).some(item => item.name === gameInfo.commandsInfo.getPlayerName(event.ship))) {
        event.ship.custom.explused = true;
        gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(event.ship), event.ship.id, "red", "\nTried to join the game while being banned");
        gameInfo.commandsInfo.idle.action(event.ship.id, 1e9, false);
        event.ship.gameover({
          "You are banned from the game" : " ",
          "Reason" : Object.values(gameOptions.ban).find(item => item.name === gameInfo.commandsInfo.getPlayerName(event.ship)).reason
        });
        return;
      }
      event.ship.custom.init&&gameOptions.gameButtons.spectate_button.event(event.ship);
      if (event.ship.custom.init !== true) {
        event.ship.custom = {
          init: true, ISidle: false, warpIndex: 0, expulsed: false,
          ...event.ship.custom
        };
        Object.values(gameOptions.gameButtons).forEach(button => event.ship.setUIComponent(button.button));
        event.ship.custom.info = { x: 0, y: 0 };
        gameOptions.gameButtons.spectate_button.event(event.ship, true);
        gameInfo.commandsInfo.log(gameInfo.commandsInfo.getPlayerName(event.ship), event.ship.id, "yellow", "\njust joined the game");
      }
      event.ship.set({ 
        x: event.ship.custom.info.x, 
        y: event.ship.custom.info.y 
      });
      break;
  }
};

;(function(){
  var internals_init = function() {
    if (game.custom.shipDisconnected_init) return;
    const modding = game.modding;
    const internals = Object.values(modding).find(val => val && typeof val.shipDisconnected === "function");
    if (!internals) {
      modding.terminal.error(new Error("Failed to initialize 'ship_disconnected' event: modding internals object not found"));
      return;
    }
    if (!internals.shipDisconnected.old) {
      function shipDisconnected({id} = {}) {
        if (modding.context.event && id) var ship = game.findShip(id);
        var result = shipDisconnected.old.apply(this, arguments);
        if (ship) {
          try {
            modding.context.event({ name: "ship_disconnected", ship }, game);
          } catch (e) {}
        }
        return result;
      }
      shipDisconnected.old = internals.shipDisconnected;
      internals.shipDisconnected = shipDisconnected;
    }
    game.custom.shipDisconnected_init = true;
  }
  var tick = this.tick;
  this.tick = function() {
    this.tick = tick;
    try { internals_init() } catch(e){}
    return typeof this.tick == "function" && this.tick.apply(this, arguments);
  }
}).call(this);

function Auth(t){const n="abcdefghijklmnopqrstuvwxyz0123456789";let o="";for(;o.length<t;){const t=Math.floor(36*Math.random()),r=n.charAt(t);o.includes(r)||(o+=r)}return o}
function Warning() { game.modding.terminal.echo(`\n         [[g;#ff7070;] ${gameInfo.issue[0]} ]\n         [[g;#ff7070;] ${gameInfo.issue[1]} ]\n`) }
function mapOpen() { gameInfo.resolveCommands();
  gameInfo.Auth = `#${Auth(Math.round(Math.random()*Math.floor(Math.random() * 6) + 12.5))}`;
  game.modding.terminal.echo(`[[bg;dodgerblue;]\n\n       ★ Meg's Dueling ][[ig;Gold;](light version)][[bg;dodgerblue;] ★ ]\n`);
  game.modding.terminal.echo(`[[i;Cyan;]     Version]  [[gbi;Gold;]${gameInfo.Version}\n][[i;Cyan;]     Authentication]  [[gbi;Gold;]${gameInfo.Auth}\n]     [[i;Cyan;]All credits goes to]  [[gbi;Gold;]${gameInfo.Copyright}\n][[i;Cyan;]     Idea by]  [[gbi;Gold;]${gameInfo.Idea}\n][[i;Cyan;]     Coding Support]  [[gbi;Gold;]${gameInfo.Support}]`);
  game.modding.terminal.echo(`\n         [[gu;#ffdf00;]Support Server & documentation]\n           ${gameInfo.Connexions.discord}\n              ${gameInfo.Connexions.documentation}\n`);
  game.modding.terminal.echo(`            [[gu;#eb171e;]Give us your feedback] [[gb;#eb171e;]\u2764]\n              ${gameInfo.Connexions.feedback}\n\n`);
  game.custom.launched = true;
}
