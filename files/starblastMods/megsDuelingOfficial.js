/*

 |  Mod creator : Megalodon
 |  Coding support : Lotus, Bhpsngum

# Changed the leaderboard scale, optimization and the color update system.
  => it can now show 9 players, gives less lag, and ign event are not the first color to apear.
  => Fixed the leaderboard
# updated the AFK checker.
# Fixed the bug where you couldn't load the game

See the documentation on the github page for more information about the mod and its integrated commands.
GitHub: https://github.com/TheGreatMegalodon/Megalodon-s-dueling-code

*/

var gameOptions = {
  Copyright: "©Megalodon 2023-2024",
  Version: "v1.4.2",
  Name: "Meg's Dueling",
  Creator: "Megalodon",
  Support: [
    "Lotus", 
    "Bhpsngum"
  ],
  
  Connexions: {
    github: "https://github.com/TheGreatMegalodon/Megalodon-s-dueling-code",
    discord: "https://discord.gg/KXvCq4N",
    documentation: "https://urlz.fr/lQZd",
    feedback: "https://urlz.fr/lQZg"
  },
  
  issue: [
    `⚠️ Main code has been edited ⚠️`,
    `Issues might occur in the future`
  ],
  
  // LeaderBoard Feature: (leave thoses variables empty if you don't want a special color on the leaderboard)
  Your_in_game_NAME: "", // Put here your "in Game Name"!   ex: "PMGL"
  Your_in_game_COLOR: "", // Put here your "Favorite Color" using a Hex code (they usally look like this: #6a65ff)!   ex: "#ec371b"
  
  // Moderation
  BannedList: [],
  BannedListReasons: [],
  
  // Main gameSettings:
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
  images: {
    "MapCenter": {
      image: "https://raw.githubusercontent.com/TheGreatMegalodon/Megalodon-s-dueling-code/main/gameImages/megs_dueling_center_map_with_speedsters.png",
      positions: { x: -1, y: 0, width: 95, height: 52, depth: 0 }
    },
    "ModVersion": {
      image: `https://raw.githubusercontent.com/TheGreatMegalodon/Megalodon-s-dueling-code/main/gameImages/versions/v1.4.2_Img.png`,
      positions: { x: 21, y: -8.5, width: 22, height: 9, depth: -0.30 }
    }
  },
  vocabulary: [
    // 1
    {text: "You", icon: "\u004e", key: "O"},
    {text: "Me", icon: "\u004f", key: "E"},
    {text: "Wait", icon: "\u0048", key: "T"},
    {text: "Yes", icon: "\u004c", key: "Y"},
    // 2
    {text: "No", icon: "\u004d", key: "N"},
    {text: "Hello", icon: "\u0045", key: "H"},
    {text: "Sorry", icon: "\u00a1", key: "S"},
    {text: "Thanks", icon: "\u0041", key: "X"},
    // 3
    {text: "Attack", icon: "\u0049", key: "A"},
    {text: "Follow Me", icon: "\u0050", key: "F"},
    {text: "Good Game", icon: "\u00a3", key: "G"},
    {text: "Leave", icon: "\u00b3", key: "L"},
    // 4
    {text: "Gems", icon: "\u0044", key: "M"},
    {text: "Stats", icon: "\u0078", key: "K"},
    {text: "Hmm", icon: "\u004b", key: "Q"},
    {text: "No Prb", icon: "\u0047", key: "P"},
    // 5
    {text: "Discord", icon: "\u007b", key: "D"},
    {text: "Idiot", icon: "\u0079", key: "I"},
    {text: "Lag", icon: "\u0069", key: "J"},
    {text: "Spectate", icon: "\u0059", key: "W"}
    // Infinity
  ],
  Enable_antiCheat: true, // Changing the value while the mod is running isn't recomanded.
  Enable_AFK: true, // Allow AFK checker to run
  AFK_Cooldown: 40,
  always_pickup_crystals: true,
  invincible_adminShips: true,
  delays: { // in seconds
    spawn_zone_delay: 1,
    switch_ship_delay: 0.15,
    spectator_switch_delay: 1,
    TP_points_delay: 1, // not lower than 1 second
    Regenerate_delay: 2,
    warp_delay: 0.25,
    Mb_delay: 1, // not lower than 1 second
  },
  anchorMenu: {
    anchor: {x: 0, y: 0},
    look: {
      componentBoxWidth: 7,
      opacity: 0.35
    }
  }
};

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

(function() {
  const images = gameOptions.images;
  for (let key of Object.keys(images)) {
    const image = images[key];
    const positions = image.positions;
    game.setObject({
      id: key,
      type: {
        id: key,
        obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
        emissive: image.image 
      },
      position: { x: positions.x, y: positions.y, z: -15 },
      scale: { x: positions.width, y: positions.height, z: 0 },
      rotation: { x: Math.PI, y: 0, z: positions.depth }
    });
  }
})();

game.custom.launched&&game.modding.terminal.echo(`\n                     [[g;#ff7070;] ${gameOptions.issue[0]} ]\n                     [[g;#ff7070;] ${gameOptions.issue[1]} ]\n  `);
game.custom.launched||MapOpen();
this.options = {
  map_name: gameOptions.Name,
  max_players: 69, // :D haha funny
  starting_ship: 801,
  map_size: 100,
  speed_mod: 1.2,
  max_level: 1,
  weapons_store: false,
  vocabulary: gameOptions.vocabulary,
  ships: gameOptions.ships,
  soundtrack: "warp_drive.mp3",
  custom_map: ""
};

// Admin buttons
const Admin = createButton("Admin", [21, 0, 7.2, 4], "1", "255, 255, 255");
const Spectate = createButton("Spectate", [72.2, 4.8, 7.6, 4], "8", "55, 55, 255");
const Regen = createButton("Regen", [72.2, 0, 7.6, 4], "9", "55, 255, 55");
const Menu_ = createButton("Menu_", [64.1, 0, 7.6, 4], "0", "255, 55, 55");
const Info = createButton("Info", [65.9+gameOptions.anchorMenu.anchor.x, 31.1+gameOptions.anchorMenu.anchor.y, 4, 3], "", "100, 100, 100", `rgb(0,0,0)`);
const next_ship = createButton("Next", [31+gameOptions.anchorMenu.anchor.x, 37.5+gameOptions.anchorMenu.anchor.y, 10, 5.5], "3", "0, 148, 255");
const previous_ship = createButton("Previous", [59+gameOptions.anchorMenu.anchor.x, 37.5+gameOptions.anchorMenu.anchor.y, 10, 5.5], "4", "0, 148, 255");
const Tp_Spawn = createButton("Center", [59+gameOptions.anchorMenu.anchor.x, 45+gameOptions.anchorMenu.anchor.y, 10, 5.5], "5", "255, 55, 55");
const Stats = createButton("Stats", [31+gameOptions.anchorMenu.anchor.x, 45+gameOptions.anchorMenu.anchor.y, 10, 5.5], "7", "255, 232, 0");
const Warp = createButton("Warp", [31+gameOptions.anchorMenu.anchor.x, 52.5+gameOptions.anchorMenu.anchor.y, 10, 5.5], "6", "55, 255, 55");
const HideShow_Buttons = { id: "HideShow_Buttons", position: [4.8, 27.5, 11, 7], clickable: true, visible: true, shortcut: "2", components: [{type: "text", position: [0, 0, 100, 100], value: "Hide Buttons [2]", color: "#ffffff"}] };
const Always_Pickup_Crystals = { id: "APC", position: [-4.5, -5, 110, 110], clickable: false, visible: true, components: [{type: "text", position: [-4, 5, 100, 3], value: "--", color: "#ffffff"}] };
const Square = {
  id: "Square",
  position: [30+gameOptions.anchorMenu.anchor.x,27.5+gameOptions.anchorMenu.anchor.y,40,42.5],
  clickable: false,
  visible: true,
  components: [
    {type:"box",position:[0,10,100,85],fill: `rgba(155, 155, 155, ${gameOptions.anchorMenu.look.opacity})`},
    {type:"box",position:[0,2,41.5,10],fill:"rgba(200, 200, 200)"},
    {type:"box",position:[0,8,100,8],fill:"rgba(200, 200, 200)"},
    {type: "text",position:[-2,3.5,45,11],value:"Actions Menu",color:"#000000"},
    {align: "left", type: "text",position:[1,90,45,4.5],value:gameOptions.Copyright,color:"#439fff"},
    {align: "left", type: "text",position:[gameOptions.Enable_antiCheat?30:29,90,45,4.5],value: `AntiCheat  ${gameOptions.Enable_antiCheat ? "Active" : "Inactive"}`,color: gameOptions.Enable_antiCheat ? "#85ff70" : "#ff7070"},
    {align: "left", type: "text",position:[51.5,90,45,4.5],value: `AFKChecker  ${gameOptions.Enable_AFK ? "Active" : "Inactive"}`,color: gameOptions.Enable_AFK ? "#85ff70" : "#ff7070"}
  ]
};

function createButton(id, position, shortcut, color, txt_color = "#FFFFFF") {
  return { 
    id: id, position: position, clickable: true, visible: true, shortcut: shortcut,
    components: [
      { type: "box", position: [0, 0, 100, 100], fill: `rgba(${color}, ${ gameOptions.anchorMenu.look.opacity.toString() })`, stroke: `rgba(${color}, ${ (gameOptions.anchorMenu.look.opacity*2).toString() })`, width: gameOptions.anchorMenu.look.componentBoxWidth },
      { type: "text", position: [0, 20, 100, 60], value: shortcut !== "" ? `${id} [${shortcut}]` : `${id}`, color: txt_color, align: "center" }
    ]
  };
}

this.tick = function(game) {
  if (game.step % 60 === 0 && game.custom.launched) {
    updateScoreboard(game);
    game.ships.forEach((ship) => {
      if (gameOptions.Enable_AFK) AFKship(ship);
      if (gameOptions.adminShip.includes(ship.type.toString()) && gameOptions.invincible_adminShips) ship.set({invulnerable: 120});
    });
    if (!game.ships[0].custom.defaultAdmin) {
      game.ships[0].custom.defaultAdmin = true;
      game.ships[0].setUIComponent(Admin);
    }
  }
  if (game.step % 20 === 0 && gameOptions.always_pickup_crystals) {
    game.ships.forEach((ship) => {
      let max_crystals = 20 * Math.pow(Math.trunc(ship.type / 100), 2);
      if (ship.crystals >= max_crystals && ship.custom.crystals_last_updated !== ship.last_updated) {
        ship.set({ crystals: max_crystals - 1 });
        ship.custom.crystals_last_updated = ship.last_updated;
      }
    });
  }
};

function getShipAFKinfo(ship) {
  return new Promise((resolve) => {
    ship.custom.point1 = { x: ship.x, y: ship.y };
    ship.custom.r1 = ship.r;
    const check_2 = function() {
      ship.custom.point2 = { x: ship.x, y: ship.y };
      ship.custom.r2 = ship.r;
    };
    const check_3 = function() {
      const isAFK =
        (ship.custom.r1 === ship.custom.r2) ||
        (ship.custom.point1.x === ship.custom.point2.x &&
        ship.custom.point2.x === ship.x &&
        ship.custom.point1.x === ship.x &&
        ship.custom.point1.y === ship.custom.point2.y &&
        ship.custom.point2.y === ship.y &&
        ship.custom.point1.y === ship.y &&
        ship.custom.r1 === ship.custom.r2);
      resolve(isAFK);
    };
    setTimeout(check_2, 150);
    setTimeout(check_3, 300);
  });
}

async function AFKship(ship) {
  if (!ship.custom.afk_main || !ship.alive) {
    ship.custom.TimeAFK = gameOptions.AFK_Cooldown;
    return;
  }
  const isAFK = await getShipAFKinfo(ship);
  if (!isAFK) {
    ship.custom.TimeAFK = gameOptions.AFK_Cooldown;
    return;
  }
  ship.custom.TimeAFK--;
  if (ship.custom.TimeAFK > 15) {
    return;
  }
  alert(ship, `Going AFK`, ship.custom.TimeAFK, "rgba(255,55,55,0.8)", 1500, warning = {v1: 4, v2: 6, h: 0});
  if (ship.custom.TimeAFK >= 0) {
    return;
  }
  spectator_ship(ship);
  ship.custom.isAFK = true;
  alert(ship, ``, `You are AFK!`, "rgba(255,55,55,0.8)", 30000, warning = {v1: 4, v2: 5, h: -2});
}

function findLeaderboardPosition(array) {
  return array.sort((a, b) => {
    if (a.custom.Kills !== b.custom.Kills) {
      return b.custom.Kills - a.custom.Kills;
    }
    return a.custom.Deaths - b.custom.Deaths;
  }).slice(0, 9);
}

function findColor(ship, KDr) {
  switch (true) {
    case !ship.alive: return "rgb(55, 55, 55)";
    case ship.custom.isAFK: return "rgb(200, 111, 111)";
    case ship.custom.spectator: return "rgb(155, 155, 155)";
    case ship.name === gameOptions.Your_in_game_NAME: return gameOptions.Your_in_game_COLOR;
    case ship.name.includes(gameOptions.Creator): return "#005cb9";
    case ship.id === KDr[0].id && ship.custom.Kills >= 1: return "rgb(255, 215, 0)";
    default: return "rgb(255, 255, 255)";
  }
}

function updateScoreboard(game) {
  const sortedShips = findLeaderboardPosition([...game.ships]);
  const players = sortedShips.map((ship, i) => {
    const kills = ship.custom.Kills;
    const deaths = ship.custom.Deaths;
    const color = findColor(ship, sortedShips);
    return [
      { type: "text", position: [0, 0, 77, 8], value: "" },
      { type: "player", index: i, position: [0, 10 * i + 11, 77, 8.5], id: ship.id, color, value: "", align: "left" },
      { type: "text", position: [74, 10 * i + 11.75, 29, 7.5], value: `${kills}/${deaths}`, color: "rgb(255,255,255)", align: "center" }
    ];
  });
  const Scoreboard = {
    id: "scoreboard",
    clickable: false,
    visible: true,
    components: [
      { type: "box", position: [0, 0, 100, 9.75], fill: "rgba(255, 255, 255, 0.35)" },
      { type: "box", position: [81, 0, 7.5, 9.75], fill: "rgba(55, 255, 55, 0.35)" },
      { type: "box", position: [88.5, 0, 7.5, 9.75], fill: "rgba(255, 55, 55, 0.35)" },
      { type: "text", position: [3, 0.5, 69, 8], value: "Players", color: "rgba(255,255,255,0.8)", align: "left" },
      { type: "text", position: [65.75, 0.8, 29, 8], value: "K/D", color: "rgba(255,255,255,0.8)", align: "right" },
      ...players.flat()
    ]
  };
  for (let ship of game.ships) {
    if (ship === null) continue;
    let components = [...Scoreboard.components];
    let index = components.findIndex(c => c.type == "player" && c.id === ship.id);
    if (index == -1) {
      let last = Scoreboard.components.at(-2);
      last.id = ship.id;
      last.color = findColor(ship);
      Scoreboard.components.at(-1).value = `${ship.custom.Kills}/${ship.custom.Deaths}`;
      index = Scoreboard.components.length - 2;
    }
    Scoreboard.components.splice(index, 0, {type: "box",position: [0, 10 * components[index].index + 10.25, 100, 10], fill: "rgba(200, 200, 255, 0.125)"});
    ship.setUIComponent(Scoreboard);
    Scoreboard.components = components;
  }
}

function getCords(size, info, random = true) {
  const mapSize = size + 1;
  const newInfo = Array(mapSize).fill(0).map((_, i) => (info.cords - Math.round(size / 2)) + i);
  return random ? newInfo[~~(Math.random() * newInfo.length)] : newInfo;
}

function setAPC(ship) {
  const isAlwaysPickup = gameOptions.always_pickup_crystals ? "ON" : "OFF";
  Always_Pickup_Crystals.components[0].value = `Always Pickup Crystals: ${isAlwaysPickup}`;
  Always_Pickup_Crystals.components[0].color = gameOptions.always_pickup_crystals ? "rgba(55, 255, 55, 0.4)" : "rgba(255, 55, 55, 0.4)";
  ship.setUIComponent(Always_Pickup_Crystals);
}

function alert(ship, Value1 = "", Value2 = "", Color = "rgba(255,255,255,0.8)", time = 2500, warning = {v1: 4, v2: 4, h: 0}) {
  clearTimeout(ship.custom.logtimeout);
  ship.custom.logtimeout = setTimeout(() => {ship.setUIComponent({id: "Text", visible: false})}, time);
  ship.setUIComponent({
    id: "Text",
    position: [-5, -5, 110, 110],
    clickable: false,
    visible: true,
    components: [
      {type: "text", position: [0, 18, 100, warning.v1], color: Color, value: Value1},
      {type: "text", position: [0, 23-warning.h, 100, warning.v2], color: Color, value: Value2}
    ]
  });
}

function format_time(time) {
  if (time > 0) {
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    if (time % 60 === 0) return `${(time / 60).toString()}:00`;
    if (seconds < 10) seconds = `0${seconds.toString()}`;
    if (minutes < 1) return seconds.toString();
    return `${minutes.toString()}:${seconds.toString()}`;
  } else return "0:00";
}

function MapOpen(tm=0) {
  game.custom.launched = true;
  game.modding.terminal.echo(`\n\n                          [[gb;#007bff;]★ ${gameOptions.Name} ★]\n\n   [[gi;#a5ff73;]This is an official dueling mod produced by] [[bigu;#ffc300;]${gameOptions.Creator}][[gi;#00d5ff;].]\n   [[gi;#a5ff73;]Any modified version of this code posted online can result in copyrights problems.]`); 
  game.modding.terminal.echo(`\n      [[gu;#00d5ff;]Official Website]  [[ib!;#5970ff;]https://thegreatmegalodon.github.io/Megs-Dueling/]`);
  game.modding.terminal.echo(`\n                     [[gu;#00d5ff;]Current Version]  [[gb;#ffc300;]${gameOptions.Version}]\n                     [[gu;#00d5ff;]Coding Support]  [[gb;#ffc300;]${gameOptions.Support[0]}, ${gameOptions.Support[1]}]\n\n`); 
  if (!gameOptions.Enable_antiCheat) game.modding.terminal.echo(`\n[[u;#ff7529;]Warning⚠️][[i;#ff7529;]:]  [[i;#ff7529;]Anti Cheat is desactivated!]\n`);
  if (!gameOptions.Enable_AFK) game.modding.terminal.echo(`\n[[u;#ff7529;]Warning⚠️][[i;#ff7529;]:]  [[i;#ff7529;]AFK checker system is desactivated!]\n`);
}

function warp_ship(ship, game) {
  if (!ship.custom.warp || game.step >= ship.custom.warp) {
    ship.custom.warp = game.step + gameOptions.delays.warp_delay * 60;
    if (game.ships.length <= 1) {
      alert(ship, "You are the only player in this game.");
      return;
    } else if (!ship.custom.spectator) {
      spectator_ship(ship);
    } else if (game.ships.length > 1) {
      ship.custom.warpIndex = (ship.custom.warpIndex + 1) % game.ships.length;
      game.ships.indexOf(ship) === ship.custom.warpIndex ? (ship.custom.warpIndex = (ship.custom.warpIndex + 1) % game.ships.length) : undefined;
      ship.set({x: getCords(10, {cords: game.ships[ship.custom.warpIndex].x}), y: getCords(10, {cords: game.ships[ship.custom.warpIndex].y}), vx: 0, vy: 0});
      alert(ship, `You have been teleported to ${game.ships[ship.custom.warpIndex].name}`);
    }
  } else alert(ship, "Hold up! You're clicking too fast!");
}

function next_ship_button(ship) {
  let index;
  let next_type;
  if (gameOptions.adminShip.includes(ship.type.toString())) {
    admin_ship(ship, true);
  } else if (ship.custom.spectator) {
    spectator_ship(ship);
  } else if (!ship.custom.next_switch || game.step >= ship.custom.next_switch) {
    ship.custom.next_switch = game.step + gameOptions.delays.switch_ship_delay * 60;
    index = gameOptions.shipCodes.indexOf(ship.type.toString());
    if (index >= 0) next_type = gameOptions.shipCodes[(index + 1) % gameOptions.shipCodes.length];
    ship.custom.last_ship = next_type;
    ship.set({
      type: next_type, collider: true, shield: 999,
      crystals: 20 * Math.trunc(next_type / 100) * Math.trunc(next_type / 100)
    });
    alert(ship, "", gameOptions.shipInformations.main[next_type].name, "rgb(55,255,55)");
    update_stats_button(ship);
    reset_afk_timer(ship);
  } else alert(ship, "Hold up! You're clicking too fast!");
}

function previous_ship_button(ship) {
  let index;
  let previous_type;
  if (gameOptions.adminShip.includes(ship.type.toString())) {
    admin_ship(ship, true);
  } else if (ship.custom.spectator) {
    spectator_ship(ship);
  } else if (!ship.custom.next_switch || game.step >= ship.custom.next_switch) {
    ship.custom.next_switch = game.step + gameOptions.delays.switch_ship_delay * 60;
    if (ship.type.toString() === gameOptions.shipCodes[0]) previous_type = gameOptions.shipCodes[gameOptions.shipCodes.length - 1];
    else if (gameOptions.shipCodes.indexOf(ship.type.toString()) >= 0) previous_type = gameOptions.shipCodes[(gameOptions.shipCodes.indexOf(ship.type.toString()) - 1) % gameOptions.shipCodes.length];
    ship.custom.last_ship = previous_type;
    ship.set({
      type: previous_type, collider: true, shield: 999,
      crystals: 20 * Math.trunc(previous_type / 100) * Math.trunc(previous_type / 100)
    });
    alert(ship, "", gameOptions.shipInformations.main[previous_type].name, "rgb(55,255,55)");
    update_stats_button(ship);
    reset_afk_timer(ship);
  } else alert(ship, "Hold up! You're clicking too fast!");
}

function spectator_ship(ship, rps = true) {
  if (!ship.custom.spectator_switch || game.step >= ship.custom.spectator_switch) {
    ship.custom.spectator_switch = game.step + gameOptions.delays.spectator_switch_delay * 60;
    if (gameOptions.adminShip.includes(ship.type.toString())) {
      admin_ship(ship, true);
    } else if (ship.custom.spectator) {
      if (ship.custom.isAFK) ship.custom.isAFK = false;
      ship.custom.spectator = false;
      ship.custom.afk_main = true;
      if (ship.custom.last_ship.toString() === gameOptions.spectatorShip[0]) ship.custom.last_ship = gameOptions.shipCodes[0];
      alert(ship, "", gameOptions.shipInformations.main[ship.custom.last_ship].name, "rgb(55,255,55)");
      ship.set({
        type: ship.custom.last_ship, collider: true, shield: 999, stats: ship.custom.stats, vx: 0, vy: 0,
        crystals: 20 * Math.trunc(ship.custom.last_ship / 100) * Math.trunc(ship.custom.last_ship / 100)
      });
      update_stats_button(ship, false, false);
    } else {
      ship.custom.spectator = true;
      ship.custom.last_ship = rps ? ship.type : 605;
      ship.custom.stats = rps ? ship.stats : 66666666;
      ship.custom.afk_main = false;
      rps ? alert(ship, "", gameOptions.shipInformations.spectator[gameOptions.spectatorShip[0]].name, "rgb(255,155,55)") : alert(ship, "Welcome to", gameOptions.Name, "#005cb9", 4000, warning = {v1: 4, v2: 6, h: 1});
      ship.set({
        type: gameOptions.spectatorShip[0], crystals: 0, stats: 0, shield: 999, collider: false
      });
    }
  } else alert(ship, "Hold up! You're clicking too fast!");
}

function admin_ship(ship, off = false) {
  let next_type;
  let collider;
  if (ship.type.toString() === gameOptions.spectatorShip[0]) spectator_ship(ship);
  else {
    if (off === true) next_type = ship.custom.last_admin_ship;
    else {
      if (ship.type.toString() >= gameOptions.adminShip[0] && ship.type.toString() <= gameOptions.adminShip[1]) {
        if (ship.type.toString() === gameOptions.adminShip[1]) next_type = ship.custom.last_admin_ship;
        else next_type = (ship.type + 1).toString();
      } else {
        ship.custom.last_admin_ship = ship.type;
        next_type = gameOptions.adminShip[0];
      }
      if (ship.type.toString() === gameOptions.spectatorShip[0]) collider = true;
      if (ship.custom.last_admin_ship === gameOptions.spectatorShip[0]) collider = false;
    }
    if (next_type <= gameOptions.adminShip[1]) ship.custom.afk_main = false;
    else ship.custom.afk_main = true;
    (gameOptions.adminShip.includes(next_type)) ? alert(ship, "", gameOptions.shipInformations.admin[next_type].name, "rgb(255,55,55)") : alert(ship, "", gameOptions.shipInformations.main[next_type].name, "rgb(55,255,55)");
    ship.set({
      type: next_type, collider: collider, stats: (gameOptions.adminShip.includes(next_type.toString())) ? 0 : 11111111 * Math.trunc(next_type / 100),
      crystals: (gameOptions.adminShip.includes(next_type.toString())) ? 0 : 20 * Math.trunc(next_type / 100) * Math.trunc(next_type / 100)
    });
  }
}

function regen(ship) {
  if (ship.type.toString() === gameOptions.spectatorShip[0] || gameOptions.adminShip.includes(ship.type.toString())) {
    alert(ship, "You can't regenerate", "while using that ship");
    return;
  }
  let level = Math.trunc(ship.type / 100);
  if (!ship.custom.Regenerate || game.step >= ship.custom.Regenerate) {
    ship.custom.Regenerate = game.step + gameOptions.delays.Regenerate_delay * 60;
    let max_crystals = 20 * Math.trunc(ship.type / 100) * Math.trunc(ship.type / 100);
    ship.set({crystals: max_crystals, shield: 999});
  } else alert(ship, "Hold up! You're clicking too fast!");
};

function update_stats_button(ship, op_button = true, allow_stats = true, check_max = false) {
  if (gameOptions.spectatorShip[0] === ship.type.toString() || gameOptions.adminShip.includes(ship.type.toString())) {
    return;
  }
  if (check_max) ship.custom.keep_maxed = (ship.stats === 11111111 * Math.trunc(ship.type / 100)) ? true : false;
  if (allow_stats) ship.set({stats: ship.custom.keep_maxed ? 88888888 : 0});
  if (op_button) {
    Stats.components[1].value = ship.custom.keep_maxed ? "Stats [7]" : "⚠️ Stats [7]";
    ship.setUIComponent(Stats);
  }
}

function Stats_button(ship) {
  if (gameOptions.spectatorShip[0] === ship.type.toString() || gameOptions.adminShip.includes(ship.type.toString())) {
    alert(ship, "You can't interact with the stats", "while using that ship");
    return;
  }
  ship.custom.keep_maxed = ship.stats !== 11111111 * Math.trunc(ship.type / 100);
  update_stats_button(ship);
}


function Teleport_Center(ship, showTXT = true) {
  if (!ship.custom.spawn || game.step >= ship.custom.spawn) {
    ship.custom.spawn = game.step + gameOptions.delays.spawn_zone_delay * 60;
    const posx = getCords(20, {cords: 0});
    const posy = getCords(20, {cords: 0});
    ship.set({ x: posx,  y: posy });
    if (showTXT) {
      alert(ship, "Teleported to", `x: ${posx}, y: ${posy}`, "rgb(55,255,55)");
    }
  } else alert(ship, "Hold up! You're clicking too fast!");
}

// Exit Screen Commands
const gameComponents = [Stats, Warp, Tp_Spawn, next_ship, previous_ship, Info, Square];
const gameComponentsID = ["Center", "Square", "Next", "Previous", "Stats", "Warp", "Box_Exit_screen", "Info"];
function Exit_screen(ship, withMenu = true) {
  if (withMenu) {
    Menu_.components[0].fill = `rgba(255, 55, 55, ${gameOptions.anchorMenu.look.opacity})`;
    Menu_.components[0].stroke = "#FF0000";
    Menu_.components[1].value = "Open [0]";
    Menu_.position = [64.1, 0, 7.6, 4];
    ship.setUIComponent(Menu_);
  }
  gameComponentsID.forEach(id => ship.setUIComponent({ id, visible: false }));
}

function TP_points_button(ship) {
  let level = Math.trunc(ship.type / 100);
  let max_stats = 11111111 * level; 
  if (!ship.custom.TP_points || game.step >= ship.custom.TP_points) {
    ship.custom.TP_points = game.step + gameOptions.delays.TP_points_delay * 60;
    update_stats_button(ship, false, false, true);
    Menu_.components[0].fill = `rgba(200, 200, 200, ${gameOptions.anchorMenu.look.opacity})`;
    Menu_.components[0].stroke = "#FFFFFF";
    Menu_.components[1].value = "Close [0]";
    Menu_.position = [59+gameOptions.anchorMenu.anchor.x, 60+gameOptions.anchorMenu.anchor.y, 10, 5.5];
    ship.setUIComponent(Menu_);
    gameComponents.forEach(component => ship.setUIComponent(component));
  } else alert(ship, "Hold up! You're clicking too fast!");
}

function update_Menu(ship) {
  ship.custom.isOpen ? Exit_screen(ship) : TP_points_button(ship);
  ship.custom.isOpen = !ship.custom.isOpen;
}

// HideShow_Buttons Command
const gameMainComponents = [Regen, Spectate, Menu_];
const gameMainComponentsID = ["Regen", "Spectate", "Menu_", "APC"];
function Manage_Buttons(ship) {
  if (!ship.custom.Mb || game.step >= ship.custom.Mb) {
    ship.custom.Mb = game.step + gameOptions.delays.Mb_delay * 60;
    if (ship.custom.ButtonsShowed) {
      gameMainComponentsID.forEach(id => ship.setUIComponent({ id, visible: false }));
      Exit_screen(ship, false);
    } else {
      if (ship.custom.isOpen) update_Menu(ship);
      if (Menu_.position[0] === 59+gameOptions.anchorMenu.anchor.x && Menu_.position[1] === 60+gameOptions.anchorMenu.anchor.y && Menu_.position[2] === 10 && Menu_.position[3] === 5.5) Exit_screen(ship);
      gameMainComponents.forEach(component => ship.setUIComponent(component));
      setAPC(ship);
    }
    ship.custom.ButtonsShowed = !ship.custom.ButtonsShowed;
    HideShow_Buttons.components[0].value = ship.custom.ButtonsShowed ? "Hide Buttons [2]" : "Show Buttons [2]";
    ship.setUIComponent(HideShow_Buttons);
  } else alert(ship, "Hold up! You're clicking too fast!");
}

function moreEvent(ship) {
  update_Menu(ship);
  const gameHost = game.findShip(Math.min(...game.ships.map(s => s.id)));
  if (gameOptions.spectatorShip[0] !== ship.type.toString() && !gameOptions.adminShip.includes(ship.type.toString())) spectator_ship(ship);
  ship.intermission({
    "Version":gameOptions.Version,
    "Coding Support":`${gameOptions.Support[0]}, ${gameOptions.Support[1]}`,
    "Game Developer":gameOptions.Creator,
    " ":" ",
    "Game Host": gameHost.name === ship.name ? "You" : gameHost.name,
    "Kills": ship.custom.Kills > 0 ? ship.custom.Kills : "None",
    "Deaths": ship.custom.Deaths > 0 ? ship.custom.Deaths : "None"
  });
}

function initShip(ship) {
  game.modding.terminal.echo(`[[g;#fffc50;]\nNew player joined \nIndex: ${game.ships.indexOf(ship)}, Name: ${getPlayerName(ship)}]`);
  ship.custom = {
    init: true, ISidle: false, keep_maxed: true, ButtonsShowed: true, Deaths: 0, Kills: 0, warpIndex: 0, isOpen: false,
    ...ship.custom
  };
  ship.set({type: 605, stats: 66666666, crystals: 720, shield: 999});
  for (const component of gameMainComponents) ship.setUIComponent(component);
  ship.setUIComponent(HideShow_Buttons);
  setAPC(ship);
  Exit_screen(ship);
  Teleport_Center(ship, false);
  spectator_ship(ship, false);
}

function checkBanned(ship) {
  if (gameOptions.BannedList.includes(ship.name.replace(/[\[\]]/g, '|'))) {
    if (ship.custom.init) {
      respawnShip(ship);
      return;
    }
    idle(game.ships.indexOf(ship), false);
    ship.gameover({
      "You are banned from this game": "-",
      "reason": gameOptions.BannedListReasons[gameOptions.BannedList.indexOf(ship.name.replace(/[\[\]]/g, '|'))]
    });
  }
}

function respawnShip(ship) {
  if (!ship.custom.spectator) spectator_ship(ship);
  if (!ship.custom.ButtonsShowed) Manage_Buttons(ship);
  const {x = 0, y = 0} = ship.custom;
  ship.set({
    x: getCords(20, {cords: x}),
    y: getCords(20, {cords: y})
  });
  if (gameOptions.BannedList.includes(ship.name.replace(/[\[\]]/g, '|'))) {
    setTimeout(() => {alert(ship, `Warning!`, "Your name matches with a banned player name.", "rgba(255,55,55,0.8)")}, 3500);
  }
}

this.event = function(event, game) {
  if (!game.custom.launched) {
    if (event.name == "ship_spawned") {
      spectator_ship(event.ship);
      Teleport_Center(event.ship, false);
    }
    return;
  }
  switch (event.name) {
    case "ui_component_clicked":
      if (event.id === "using_subspace" && gameOptions.Enable_antiCheat) {
        game.modding.terminal.echo(`[[g;#ff8770;]\nPlayer: ${getPlayerName(ship)}, index: ${who} treid to join with Subspace activated]`);
        idle(game.ships.indexOf(event.ship), false);
        event.ship.gameover({"Subspace isn't allowed": "in Meg's Dueling"});
      } else if (!event.ship.custom.ISidle) {
        switch (event.id) {
          case "Menu_": update_Menu(event.ship); break;
          case "HideShow_Buttons": Manage_Buttons(event.ship); break;
          case "Regen": regen(event.ship); break;
          case "Spectate": spectator_ship(event.ship); break;
          case "Admin": admin_ship(event.ship); break;
          case "Next": next_ship_button(event.ship); break;
          case "Previous": previous_ship_button(event.ship); break;
          case "Stats": Stats_button(event.ship); break;
          case "Center": Teleport_Center(event.ship); break;
          case "Warp": warp_ship(event.ship, game); break;
          case "Info": moreEvent(event.ship); break;
        }
      }
      break;
    case "ship_spawned":
      checkBanned(event.ship);
      !event.ship.custom.init ? initShip(event.ship) : respawnShip(event.ship);
      break;
    case "ship_destroyed":
      if (event.ship) { event.ship.custom.Deaths++;
        Object.assign(event.ship.custom, {x: event.ship.x, y: event.ship.y});
        if (event.killer) event.killer.custom.Kills++;
      }
      break;
    case "ship_disconnected":
      if (!gameOptions.BannedList.includes(event.ship.name.replace(/[\[\]]/g, '|'))) {
        if (event.ship.custom.ISidle && !event.ship.custom.hasBeenKicked) {
          event.ship.custom.hasBeenKicked = !event.ship.custom.hasBeenKicked;
          ban(game.ships.indexOf(event.ship), "left while in idle mode");
          return;
        }
        game.modding.terminal.echo(`\n[[g;#ff8770;]${event.ship.name.replace(/[\[\]]/g, '|')} just left the game.]`);
      }
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

// Commands
// Moderation commands
function getPlayerName(player) {
  const icon = (player.custom.admin || player.custom.defaultAdmin) ? "⚔️" : (player.name.includes(["Megalodon"])) ? "🦈" : "";
  return `${player.name.replace(/[\[\]]/g, '|')} ${icon}`;
}

game.modding.commands.info = function() {
  const totalPlayers = game.ships.length;
  const bannedPlayers = gameOptions.BannedList.length === 0 ? "None" : gameOptions.BannedList;
  game.modding.terminal.echo(`[[g;#85ff70;]Total amount of aliens] [[gb;#fffc70;]${game.aliens.length}]`);
  game.modding.terminal.echo(`[[g;#85ff70;]Total amount of asteroids] [[gb;#fffc70;]${game.asteroids.length}]`);
  game.modding.terminal.echo(`[[g;#85ff70;]Total amount of players] [[gb;#fffc70;]${totalPlayers}\n]`);
  game.modding.terminal.echo(`[[g;#ff7070;]Banned players: ${bannedPlayers}\n]`);
  game.modding.terminal.echo(`[[g;#70aeff;]⚔️ = Has admin permisions]`);
  game.modding.terminal.echo(`[[g;#70aeff;]🦈 = Megalodon :D]\n`);
  game.modding.terminal.echo("[[gu;#70aeff;]Player's and their index's]");
  for (let i = 0; i < totalPlayers; i++) {
    const player = game.ships[i];
    const color = player.custom.admin || player.custom.defaultAdmin ? "#fffc70" : "#70e4ff";
    game.modding.terminal.echo(`[[g;${color};]\nIndex: ${i}, Name: ${getPlayerName(player)}, Ship type: ${player.type}\nCoordinates: X: ${Math.round(player.x)}, Y: ${Math.round(player.y)}\n]`);
  }
  game.modding.terminal.echo("\n");
};

idle = function(who, showMessage = true) {
  const ship = game.ships[who];
  if (ship.custom.ISidle) {
    modding.terminal.error(new Error(`${ship.name.replace(/[\[\]]/g, '|')} is already frozen.`));
    return;
  }
  ship.set({ idle: true });
  Exit_screen(ship);
  ship.custom.ISidle = true;
  if (ship.type !== 191) spectator_ship(ship);
  if (showMessage) game.modding.terminal.echo(`[[g;#70ffc1;]\nThe player ${getPlayerName(ship)}, index ${who}, has been frozen.]\n[[gi;#ffa770;]INFO] [[gi;#e2ff70;]Type] [[gbi;#70ccff;]unidle()] [[gi;#e2ff70;]to unfreeze a player.]`);
};

unidle = function(who) {
  const ship = game.ships[who];
  if (!ship.custom.ISidle) {
    modding.terminal.error(new Error("This player is not frozen."));
    return;
  }
  ship.set({ idle: false });
  ship.custom.ISidle = false;
  game.modding.terminal.echo(`[[g;#70ffc1;]\nThe player ${getPlayerName(ship)}, index ${who}, has been unfrozen.]`);
};

kick = function(who, reason = "Disturbing duels") {
  const ship = game.ships[who];
  if (!game.ships.includes(ship)) {
    modding.terminal.error(new Error("The index you used doesn't exist, try again with a valid index"));
    return;
  }
  game.ships.forEach(function(ship) {alert(ship, `Player: ${getPlayerName(ship)} has been kicked`, "", "rgba(255,155,55,0.8)")});
  idle(who, false);
  ship.custom.hasBeenKicked = true;
  ship.gameover({
    "You got kicked from the game" : "-",
    "Reason" : reason, 
    "Kills" : ship.custom.Kills, 
    "Deaths" : ship.custom.Deaths
  });
  game.modding.terminal.echo(`[[g;#70ffc1;]\nPlayer: ${getPlayerName(ship)}, index: ${who}, has been kicked]`);
};

ban = function(who, reason = "Disturbing duels") {
  const ship = game.ships[who];
  if (!ship) {
    game.modding.terminal.error(new Error("The index you used doesn't exist, try again with a valid index"));
    return;
  }
  gameOptions.BannedList.push(ship.name.replace(/[\[\]]/g, '|'));
  gameOptions.BannedListReasons.push(reason);
  idle(who, false);
  ship.gameover({
    "You got banned from the game" : "-",
    "Reason" : reason, 
    "Kills" : ship.custom.Kills, 
    "Deaths" : ship.custom.Deaths
  });
  game.modding.terminal.echo(`[[g;#70ffc1;]\nPlayer: ${getPlayerName(ship)}, index: ${who} has successfully been banned]\n[[gi;#ffa770;]INFO] [[gi;#e2ff70;]Type] [[gbi;#70ccff;]banlist] [[gi;#e2ff70;]to see all of the banned players.]`);
  for (const otherShip of game.ships) {
    alert(otherShip, `Player: ${getPlayerName(ship)} has been banned.`, "", "rgba(255,55,55,0.8)");
    if (otherShip.name.replace(/[\[\]]/g, '|') == ship.name.replace(/[\[\]]/g, '|')) {
      setTimeout(() => {alert(otherShip, `Warning!`, "Your name matches with a banned player name.", "rgba(255,55,55,0.8)")}, 3500);
    }
  }
};

game.modding.commands.banlist = function() {
  if (!gameOptions.BannedList.length > 0) {
    game.modding.terminal.error(new Error(`There are no banned players in this game.`));
    return;
  }
  game.modding.terminal.echo(`[[g;#70aeff;]\nBanned player list:]\n\n[[g;#689bdd;]Banned Players Amount: ${gameOptions.BannedList.length}]\n`);
  gameOptions.BannedList.forEach((player, index) => {game.modding.terminal.echo(`[[g;#70e4ff;]Index: ${index}, Name: ${player}, Reason: ${gameOptions.BannedListReasons[index]}]`)});
  game.modding.terminal.echo(`\n[[gi;#ffa770;]INFO] [[gi;#e2ff70;]Type] [[gbi;#70ccff;]unban(index)] [[gi;#e2ff70;]to unban a player.]`);
};

unban = function(index) {
  if (!gameOptions.BannedList.includes(gameOptions.BannedList[index])) {
    modding.terminal.error(new Error("You gave a wrong index or the player that you're trying to unban isn't banned or already got unbanned."));
    return;
  }
  game.ships.forEach(ship => { alert(ship, `Player: ${gameOptions.BannedList[index]} has been unbanned.`, "", "rgba(55,255,55,0.8)")});
  game.modding.terminal.echo(`[[g;#70ffc1;]\nPlayer: ${gameOptions.BannedList[index]}, reason: ${gameOptions.BannedListReasons[index]} , Has successfully been unbanned]`);
  gameOptions.BannedListReasons.splice(index, 1);
  gameOptions.BannedList.splice(index, 1);
};

admin = function(who, duration = Infinity) {
  const ship = game.ships[who];
  clearTimeout(ship.custom.adm);
  if (ship.custom.admin) {
    ship.setUIComponent({id: "Admin", visible: false});
    if (gameOptions.adminShip.includes(ship.type.toString())) admin_ship(ship, true);
    ship.custom.admin = false;
    game.modding.terminal.echo(`[[g;#ff8770;]\nPlayer: ${getPlayerName(ship)}, index: ${who} has had their admin commands removed]`);
  } else {
    if (duration !== Infinity) {
      ship.custom.adm = setTimeout(() => {
        if (gameOptions.adminShip.includes(ship.type.toString())) admin_ship(ship, true);
        ship.setUIComponent({id: "Admin", visible: false});
        ship.custom.admin = false;
        game.modding.terminal.echo(`[[g;#ff8770;]\nPlayer: ${getPlayerName(ship)}, index: ${who} has lost their admin powers]`);
      }, duration * 1000);
    }
    ship.setUIComponent(Admin);
    ship.custom.admin = true;
    game.modding.terminal.echo(`[[g;#70ffc1;]\nPlayer: ${getPlayerName(ship)}, index: ${who}, Duration: ${duration} has been given the admin commands]`);
  }
};

// General commands
game.modding.commands.apc = function() {
  gameOptions.always_pickup_crystals = !gameOptions.always_pickup_crystals;
  game.ships.forEach(ship => {
    if (ship.custom.ButtonsShowed) setAPC(ship);
  });
  const status = gameOptions.always_pickup_crystals ? "ON" : "OFF";
  const color = gameOptions.always_pickup_crystals ? "#70ffc1" : "#ff8770";
  game.modding.terminal.echo(`[[g;${color};]\nAlways Pickup Crystals feature is now ${status}]`);
};

set = function(who, what, max_crystals = 0, max_stats = 0) {
  const ship = game.ships[who];
  if (ship.custom.isAFK) {
    modding.terminal.error(new Error(`${getPlayerName(ship)} is AFK and cannot be switched to another ship.`));
    return;
  }
  if (ship.custom.spectator && what.toString() === gameOptions.spectatorShip[0]) ship.custom.spectator = false;
  if (!max_stats) max_stats = Math.trunc(what / 100) < 7 ? 11111111 * Math.trunc(what / 100) : 0;
  if (!max_crystals) max_crystals = 20 * Math.trunc(what / 100) ** 2;
  const collider = (what == gameOptions.spectatorShip[0]) ? false : (ship.type == gameOptions.spectatorShip[0] && what != gameOptions.spectatorShip[0]) ? true : true;
  ship.set({type: what, crystals: max_crystals, stats: max_stats, shield: 999, collider: collider});
  game.modding.terminal.echo(`[[g;#70ffc1;]\nPlayer ${getPlayerName(ship)} (index: ${who}) has been given:\nShip Type: ${what}, Crystals: ${max_crystals}, Stats: ${max_stats}]`);
}

// Announce command
say = function(text = "", duration = 4) {
  game.ships.forEach(ship => {
    clearTimeout(ship.custom.gameAnnouncement);
    ship.setUIComponent({
      id: "announceText",
      position: [20, 75, 50, 25],
      clickable: false,
      visible: true,
      components: [
        {type: "text",position: [0, 0, 100, 20],color: "#FFFFFF",value: text}
      ]
    });
    ship.custom.gameAnnouncement = setTimeout(() => {
      ship.setUIComponent({
        id: "announceText",
        visible: false
      });
    }, duration * 1000);
  });
  game.modding.terminal.echo(`[[g;#70ffc1;]\nText: ${text} applied]`);
}
