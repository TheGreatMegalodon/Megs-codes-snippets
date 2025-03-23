/*

|                 Meg's ships testing area

|  This mod was created to allow users to test their ships 
|       easily with a clear, customizable interface.


| Developer: Megalodon
| Version: v1.1

*/

/*

|   How to use the mode:

Simply paste all of your code below the delays block,
and fill the ships array with each variable name for the ships.

WARNING, you have to make sure to always have a "tier 1" in order for 
the mode to work properly

|   like so: EXAMPLE BELOW

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

*/

var gameName = "Ship testing area";
var delays = { // delays are in seconds

  spectate: 1, // not less than 1
  swich: 0,
  restore: 0,
  reset: 0,
  stats: 0
  
};

// paste the ships codes below this line:




var ships = [
  // fill this array with the variables defined above
  
  
  
];

//         -- Don't touch anything below --           //

var admins = ['{"name":"AdminToolPrecision","level":1.9,"model":2,"size":1,"zoom":0.5,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"bodies":{"object0":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[17,4],"angle":0,"laser":{"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"angle":0}}},"typespec":{"name":"AdminToolPrecision","level":1.9,"model":2,"code":192,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"shape":[0.802,0.803,0.375,0.227,0.16,0.126,0.107,0.095,0.085,0.078,0.075,0.072,0.071,0.071,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.071,0.072,0.075,0.078,0.085,0.095,0.107,0.126,0.16,0.227,0.375,0.803],"lasers":[{"x":0,"y":-0.8,"z":0,"angle":0,"damage":[1055,1055],"rate":-1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0}],"radius":0.803}}'];
var spec = ['{"name":"Spectator","level":1.9,"model":1,"size":0.025,"zoom":0.05,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[250,250],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1.9,"model":1,"code":191,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[250,250],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}'];
var info = {
  shipTree: { codes: [], tree: {} },
  adminTree: { codes: [], tree: {} },
  spectator: { codes: [], tree: {} }
};

var buttons = {  
  "admin": {
    position: { x: 4-0.3, y: 48 },
    color: { text: "#ffffff", fill: "rgba(255,0,0,0.6)"},
    shortcut: "8"
  },
  "spectate": {
    position: { x: 4-0.3, y: 36 },
    color: { text: "#ffffff", fill: "rgba(206,255,0,0.6)"},
    shortcut: "3"
  },
  "switch_next": {
    position: { x: 4-0.3, y: 30 },
    color: { text: "#ffffff", fill: "rgba(0,183,255,0.6)"},
    shortcut: "1"
  },
  "switch_prev": {
    position: { x: 10+0.3, y: 30 },
    color: { text: "#ffffff", fill: "rgba(0,183,255,0.6)"},
    shortcut: "2"
  },
  "regen": {
    position: { x: 4-0.3, y: 42 },
    color: { text: "#ffffff", fill: "rgba(0,255,16,0.6)"},
    shortcut: "4"
  },
  "reset": {
    position: { x: 10+0.3, y: 42 },
    color: { text: "#ffffff", fill: "rgba(255,255,255,0.6)"},
    shortcut: "5"
  },
  "stats": {
    position: { x: 10+0.3, y: 36 },
    color: { text: "#ffffff", fill: "rgba(255,188,0,0.6)"},
    shortcut: "6"
  }
};

var map =
"     865     39     86     539           6439          7643 \n"+
"399    976     3     987           298      5     298     75\n"+
"  429           532     9    96       99     65     399     \n"+
"          997      4             6 9           754          \n"+
"    7542     9     7       2             329     6     539  \n"+
"98     95   9        7             9             9976     4 \n"+
" 398     6     4             5        8     54      98     5\n"+
"    9     86      3             5             643     97    \n"+
"    4399     7             8             9            7298  \n"+
"75     42            5             6       9     86539    9 \n"+
" 97     5      9             3        6      9      75  9  2\n"+
"   97    75            8        2             32     86     \n"+
"    998                   7             9         9   9976  \n"+
"43     9             2             4             54      9  \n"+
" 65           78                           9      7 4     9 \n"+
"   6     4             6                      98  7  5      \n"+
"    87      4                           6             86    \n"+
"99          6                                   439    9    \n"+
" 4             5                           8             98 \n"+
"  53     9                  3  3              7     4       \n"+
"  976                    33  33  33                   54    \n"+
"86    6                 333      333            99    7     \n"+
" 9                                                 9     7  \n"+
" 42      8            33            33             3        \n"+
"3                    33              33               3     \n"+
"      4    2                                    8           \n"+
" 86      3          33                33             9  64  \n"+
"    7       7                                            9 5\n"+
"9 9         5                                               \n"+
"3     9            33                  33       6           \n"+
"754      9         33                  33               3   \n"+
"   64                                             9        3\n"+
"      7                                              8      \n"+
"9     9             33                33               9    \n"+
"439      7                                         2    98  \n"+
"   32                33              33               9     \n"+
"    4      9          33            33          7     4     \n"+
"  9   5                                                 539 \n"+
"998           3         333      333               9  9     \n"+
"   9                     33  33  33          5             6\n"+
"    2      86               3  3                4     99    \n"+
"4 7  439                                  9             298 \n"+
"875           9                                   865   7 9 \n"+
"        64       9                           3        9    4\n"+
"   987     54                          8             9865   \n"+
"     998           3                      7     4       97  \n"+
"642 9        87       2             4             5429    8 \n"+
"        32       6                          99          7 39\n"+
"  9764     7             4             5             754    \n"+
"  9  87            9             2             399      6   \n"+
"39     8     64            7        9     7       39     75 \n"+
"  2  9 7987     5            97             865     2     98\n"+
"  6539     9                           3            6939 9  \n"+
"  9  64     9      7             8             9875     3   \n"+
"9     75     32         9995        8     53  9   97     4  \n"+
" 99 7  976 9         9        4     9       54     99     75\n"+
"  4298    8     54      98   9        298     5     9998    \n"+
"     3     9       43            64            76999   2    \n"+
"7     42     989       9   29    7       429     96     32  \n"+
" 86    653        9  86       9     864     39     76     43";

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
  {text: "Spectate", icon: "\u0059", key: "L"},

  {text: "Gems", icon: "\u0044", key: "M"},
  {text: "Stats", icon: "\u0078", key: "K"},
  {text: "Hmm", icon: "\u004b", key: "Q"},
  {text: "No Prb", icon: "\u0047", key: "P"},
  
  {text: "Discord", icon: "\u007b", key: "D"},
  {text: "Idiot", icon: "\u0079", key: "I"},
  {text: "Lag", icon: "\u0069", key: "J"}
];

this.options = {
  root_mode: "",
  map_name: gameName,
  soundtrack: "civilisation.mp3",
  starting_ship: 801,
  map_size: 80,
  weapons_store: false,
  reset_tree: true,
  radar_zoom: 1.5,
  asteroids_strength: 1.3,
  crystal_value: 3,
  
  ships: ships.concat(admins.concat(spec)),
  custom_map: map,
  vocabulary: vocabulary
};

const utilities = {
  buildShiptree: function() {
    ships.forEach((str) => {
      const data = JSON.parse(str);
      const stats = info.shipTree;
      stats.tree[data.typespec.code.toString()] = data;
      stats.codes.push(Number(data.typespec.code));
    });
    admins.forEach((str) => {
      const data = JSON.parse(str);
      const stats = info.adminTree;
      stats.tree[data.typespec.code.toString()] = data;
      stats.codes.push(Number(data.typespec.code));
    });
    spec.forEach((str) => {
      const data = JSON.parse(str);
      const stats = info.spectator;
      stats.tree[data.typespec.code.toString()] = data;
      stats.codes.push(Number(data.typespec.code));
    });
  },
  buildButtons: function() {
    Object.entries(buttons).forEach(([key, info]) => {
      buttons[key] = {
        id: key,
        position: [info.position.x, info.position.y, 6, 5],
        clickable: true,
        visible: true,
        shortcut: info.shortcut.toUpperCase(),
        components: [
          { type:  "box", position:[0,0,100,100], fill: info.color.fill},
          { type: "text", position:[0,5,100,50], value: (key.includes("_"))?key.match(/([^_]+)_([^_]+)/)[2]:key, color: info.color.text},
          { type: "text", position:[0,60,100,30], value: `[ ${info.shortcut.toUpperCase()} ]`, color: info.color.text}
        ]
      };
    });
  },
  stateInitialize: function() {
    game.custom.gameLaunched = true;
    game.modding.terminal.echo("[[b;dodgerblue;]\n       Meg's ships testing area ]\n[[i;#fff870;]\n      All credits goes to:  Megalodon\n]");
  },
  alert: function(ship, text1, color) {
    clearTimeout(ship.custom.messager);
    ship.setUIComponent({
      id: "messager", position: [-5, -5, 110, 110], clickable: false, visible: true,
      components: [
        {type: "text", position: [-5, 20, 110, 4], color: color, value: text1}
      ]
    });
    ship.custom.warning = setTimeout(() => {
      ship.setUIComponent({id: "messager",visible: false});
    }, 2000);
  },
  functions: {
    admin: function(ship, select=null) {
      if (select == "add") {
        ship.custom.isAdmin = true;
        ship.setUIComponent(buttons[`admin`]);
        return;
      } else if (select == "remove") {
        ship.custom.isAdmin = false;
        ship.setUIComponent({ id: "admin", visible: false });
        if (info.adminTree.codes.includes(ship.type)) this.reset(ship);
        return;
      }
      if (info.spectator.codes.includes(ship.type) || info.shipTree.codes.includes(ship.type)) {
        nextShip = info.adminTree.codes[0];
      } else {
        let index = info.adminTree.codes.indexOf(ship.type);
        if (index >= 0) nextShip = info.adminTree.codes[(index + 1) % info.adminTree.codes.length];
        ship.custom.lastAdminShip = nextShip;
      }
      ship.set({
        type: nextShip, shield: 999, collider: true,
        stats: ship.custom.keep_maxed ? 11111111 * Math.trunc(nextShip / 100):0,
        crystals: 20 * Math.pow(Math.trunc(nextShip / 100), 2)
      });
    },
    spectate: function(ship) {
      if (!ship.custom.spectate || game.step >= ship.custom.spectate) {
        ship.custom.spectate = game.step + delays.spectate * 60;
        if (ship.custom.spectating) {
          ship.custom.spectating = false;
          nextShip = ship.custom.lastShip;
        } else {
          ship.custom.spectating = true;
          nextShip = info.spectator.codes[0];
          ship.custom.lastShip = ship.type;
        }
        ship.set({
          type: nextShip, shield: 999, 
          collider: !ship.custom.spectating,
          stats: ship.custom.keep_maxed ? 11111111 * Math.trunc(nextShip / 100):0,
          crystals: 20 * Math.pow(Math.trunc(nextShip / 100), 2),
          vx: 0, vy: 0, generator: 0
        });
      } else utilities.alert(ship, "You are being rate limited", "rgba(255,55,55,0.8)");
    },
    switch: function(ship, select) {
      if (!ship.custom.swich || game.step >= ship.custom.swich) {
        ship.custom.swich = game.step + delays.swich * 60;
        if (info.spectator.codes.includes(ship.type) || info.adminTree.codes.includes(ship.type)) {
          this.spectate(ship);
        } else {
          let index = info.shipTree.codes.indexOf(ship.type);
          switch(select) {
            case "next": if (index >= 0) nextShip = info.shipTree.codes[(index + 1) % info.shipTree.codes.length]; break;
            case "prev": if (index !== -1) nextShip = info.shipTree.codes[(index - 1 + info.shipTree.codes.length) % info.shipTree.codes.length]; break;
          }
          ship.custom.lastShip = nextShip;
          ship.set({
            type: nextShip, shield: 9999, collider: true,
            stats: ship.custom.keep_maxed ? 11111111 * Math.trunc(nextShip / 100):0,
            crystals: 20 * Math.pow(Math.trunc(nextShip / 100), 2)
          });
        }
      } else utilities.alert(ship, "You are being rate limited", "rgba(255,55,55,0.8)");
    },
    regen: function(ship) {
      if (!ship.custom.restore || game.step >= ship.custom.restore) {
        ship.custom.restore = game.step + delays.restore * 60;
        ship.set({
          shield: 999,
          stats: ship.custom.keep_maxed ? 11111111 * Math.trunc(ship.type / 100):0,
          crystals: 20 * Math.pow(Math.trunc(ship.type / 100), 2)
        });
      } else utilities.alert(ship, "You are being rate limited", "rgba(255,55,55,0.8)");
    },
    reset: function(ship) {
      if (!ship.custom.reset || game.step >= ship.custom.reset) {
        ship.custom.reset = game.step + delays.reset * 60;
        if (ship.custom.spectating) {
          this.spectate(ship);
        }
        ship.set({
          type: info.shipTree.codes[0], shield: 999,
          stats: ship.custom.keep_maxed ? 11111111 * Math.trunc(info.shipTree.codes[0] / 100):0,
          crystals: 20 * Math.pow(Math.trunc(info.shipTree.codes[0] / 100), 2),
          shield: 999
        });
      } else utilities.alert(ship, "You are being rate limited", "rgba(255,55,55,0.8)");
    },
    stats: function(ship) {
      if (!ship.custom.stats || game.step >= ship.custom.stats) {
        ship.custom.stats = game.step + delays.stats * 60;
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
      } else utilities.alert(ship, "You are being rate limited", "rgba(255,55,55,0.8)");
    }
  }
};

this.event = function(event, game) {
  switch(event.name) {
    case "ui_component_clicked":
      if (!event.id.includes("_")) {
        utilities.functions[event.id](event.ship);
      } else {
        var source = event.id.match(/([^_]+)_([^_]+)/);
        utilities.functions[source[1]](event.ship, source[2]);
      }
      break;
    case "ship_spawned":
      if (!event.ship.custom.init) {
        Object.values(buttons).filter(key => key.id != "admin").forEach(key => event.ship.setUIComponent(key));
        if (!event.ship.custom.isAdmin && event.ship.id === 1) {
          event.ship.custom.isAdmin = true;
          event.ship.setUIComponent(buttons[`admin`]);
        }
      }
      break;
  }
};

utilities.buildShiptree();
utilities.buildButtons();
utilities.stateInitialize();
