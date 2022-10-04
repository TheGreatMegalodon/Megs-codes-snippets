// Mod Version : v0.3.3
// Mod creator : Megalodon
// Coding support : Lotus/Notus, Bhpsngum

// What has been added from v0.3.2 :
// - Less bugs.

// Type " help " for more information about the mod and his commands.

// safe zone
const safeZone = {
  x: 0,
  y: 0,
  radius: 50
};

// Ship Codes
var switch_ship_codes = [601,624];
var spectator_ship_code = 191;
var admin_ship_codes = [192,194];

// Delays
var switch_ship_delay = 0.25;
var spectator_switch_delay = 2;
var dueling_arena_delay = 5;
var spawn_zone_delay = 5;
var TP_points_delay = 2;
var Regenerate_delay = 5;
var Stats_delay = 1;

var Ship = {};
// Admin
Ship.Spectator_191 = '{"name":"Spectator","level":1.9,"model":1,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}';
Ship.AdminToolPrecision_192 = '{"name":"AdminToolPrecision","level":1.9,"model":2,"size":1,"zoom":0.5,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"bodies":{"object0":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-30,-30,0,0],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[4],"angle":0,"laser":{"damage":[1055,1055],"rate":10,"speed":[400,400],"number":1}}},"typespec":{"name":"AdminToolPrecision","level":1.9,"model":2,"code":192,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[1000,1000],"acceleration":[350,350]}},"shape":[0.601,0.604,0.373,0.227,0.166,0.129,0.11,0.097,0.085,0.079,0.075,0.073,0.071,0.071,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.071,0.073,0.075,0.079,0.085,0.097,0.11,0.129,0.166,0.227,0.373,0.604],"lasers":[{"x":0,"y":-0.6,"z":0,"angle":0,"damage":[1055,1055],"rate":10,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0}],"radius":0.604}}';
Ship.Admin_Ship_Main_193 = '{"name":"Admin_Ship_Main","level":1.9,"model":3,"size":0.8,"zoom":0.8,"specs":{"shield":{"capacity":[1.25e+67,1.25e+67],"reload":[1.25e+67,1.25e+67]},"generator":{"capacity":[1.25e+67,1.25e+67],"reload":[1.25e+67,1.25e+67]},"ship":{"mass":1.25e+67,"speed":[450,450],"rotation":[200,200],"acceleration":[250,250]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-200,-190,-180,-170,-140,10,140,170,180,160],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8.5,14,17,24,25,26,20,17,10,15,0],"height":[0,5,9,13,20,18,18,15,8,0,10,0],"texture":4,"propeller":true},"back":{"section_segments":10,"offset":{"x":0,"y":80,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,20,2],"height":[3,5,7,10,2],"texture":4,"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-100,"z":13},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-55,-45,-30,-15,-5,60,75],"z":[2,0,0,0,-1,-2,0,0]},"width":[0,11,13,13,10,10,5],"height":[0,10,13,13,10,10,4],"texture":[9,9,9,4]},"laser":{"section_segments":10,"offset":{"x":55,"y":-9,"z":-9.5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,80,124,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,13,13,13,10,15,15,10,0],"height":[0,4,10,10,10,8,10,10,10,0],"texture":[15,31,4],"propeller":true,"laser":{"damage":[10000,10000],"rate":10,"type":1,"speed":[400,400],"number":1}},"laser2":{"section_segments":10,"offset":{"x":95,"y":41,"z":-9.5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,90,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,11,13,13,10,15,15,10,0],"height":[0,4,8,10,10,8,10,10,10,0],"texture":[15,31,4],"propeller":true,"laser":{"damage":[10000,10000],"rate":10,"type":1,"speed":[400,400],"number":1}}},"wings":{"main":{"offset":{"x":0,"y":30,"z":0},"length":[120,25],"width":[180,70,40],"texture":[4,31],"angle":[0,0],"position":[-20,80,120],"doubleside":true,"bump":{"position":25,"size":5}},"tail":{"doubleside":true,"offset":{"x":15,"y":130,"z":10},"length":[40],"width":[69,30],"angle":[50],"position":[0,50],"texture":31,"bump":{"position":10,"size":5}},"side":{"doubleside":true,"offset":{"x":10,"y":-130,"z":10},"length":[40],"width":[60,20],"angle":[-13],"position":[0,50],"texture":31,"bump":{"position":35,"size":3}}},"typespec":{"name":"Admin_Ship_Main","level":1.9,"model":2,"code":192,"specs":{"shield":{"capacity":[1.25e+67,1.25e+67],"reload":[1.25e+67,1.25e+67]},"generator":{"capacity":[1.25e+67,1.25e+67],"reload":[1.25e+67,1.25e+67]},"ship":{"mass":1.25e+67,"speed":[450,450],"rotation":[200,200],"acceleration":[250,250]}},"shape":[3.2,2.939,2.151,1.882,1.704,1.46,0.801,0.787,1.113,1.11,1.086,1.087,1.086,1.553,1.695,1.817,1.96,2.536,3.181,3.575,2.994,2.48,2.138,3.187,3.087,2.966,3.087,3.187,2.138,2.48,2.994,3.575,3.181,2.536,1.96,1.817,1.695,1.553,1.086,1.087,1.086,1.11,1.113,0.787,0.801,1.46,1.704,1.882,2.151,2.939],"lasers":[{"x":0.88,"y":-0.624,"z":-0.152,"angle":0,"damage":[10000,10000],"rate":10,"type":1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.88,"y":-0.624,"z":-0.152,"angle":0,"damage":[10000,10000],"rate":10,"type":1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.52,"y":0.176,"z":-0.152,"angle":0,"damage":[10000,10000],"rate":10,"type":1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.52,"y":0.176,"z":-0.152,"angle":0,"damage":[10000,10000],"rate":10,"type":1,"speed":[400,400],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.575}}';
Ship.Admin_Ship_General_194 = '{"name":"Admin_Ship_General","level":1.9,"model":4,"size":1.2,"zoom":0.55,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[900,900],"acceleration":[350,350]}},"bodies":{"main":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":0,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main2":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":30,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main3":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":60,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main4":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":90,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main5":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":120,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main6":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":150,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main7":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":180,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main8":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":210,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main9":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":240,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main10":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":270,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main11":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":300,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main12":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":330,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main13":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":15,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main14":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":45,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main15":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":75,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main16":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":105,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main17":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":135,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main18":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":165,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main19":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":195,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main20":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":37.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main21":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":255,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main22":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":285,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main23":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":315,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main24":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":345,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main0":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":7.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main30":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":67.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main40":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":97.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main50":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":127.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main60":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":157.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main70":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":187.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main80":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":217.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main90":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":247.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main100":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":277.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main110":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":307.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main120":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":337.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main130":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":22.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main140":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":52.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main150":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":82.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main160":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":112.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main170":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":142.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main180":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":172.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main190":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":202.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main200":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":232.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main210":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":262.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main220":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":292.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main230":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":322.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main240":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":352.5,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}},"main250":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0],"y":[-40,-40,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":17,"angle":585,"laser":{"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"angle":360}}},"typespec":{"name":"Admin_Ship_General","level":1.9,"model":3,"code":193,"specs":{"shield":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"generator":{"capacity":[1e+300,1e+300],"reload":[1e+300,1e+300]},"ship":{"mass":1e+300,"speed":[450,450],"rotation":[900,900],"acceleration":[350,350]}},"shape":[0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961,0.961],"lasers":[{"x":0,"y":-0.96,"z":0,"angle":0,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.48,"y":-0.831,"z":0,"angle":30,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.831,"y":-0.48,"z":0,"angle":60,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.96,"y":0,"z":0,"angle":90,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.831,"y":0.48,"z":0,"angle":120,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.48,"y":0.831,"z":0,"angle":150,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0,"y":0.96,"z":0,"angle":180,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.48,"y":0.831,"z":0,"angle":210,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.831,"y":0.48,"z":0,"angle":240,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.96,"y":0,"z":0,"angle":270,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.831,"y":-0.48,"z":0,"angle":300,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.48,"y":-0.831,"z":0,"angle":330,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.248,"y":-0.927,"z":0,"angle":15,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.679,"y":-0.679,"z":0,"angle":45,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.927,"y":-0.248,"z":0,"angle":75,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.927,"y":0.248,"z":0,"angle":105,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.679,"y":0.679,"z":0,"angle":135,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.248,"y":0.927,"z":0,"angle":165,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.248,"y":0.927,"z":0,"angle":195,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.584,"y":-0.762,"z":0,"angle":37.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.927,"y":0.248,"z":0,"angle":255,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.927,"y":-0.248,"z":0,"angle":285,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.679,"y":-0.679,"z":0,"angle":315,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.248,"y":-0.927,"z":0,"angle":345,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.125,"y":-0.952,"z":0,"angle":7.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.887,"y":-0.367,"z":0,"angle":67.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.952,"y":0.125,"z":0,"angle":97.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.762,"y":0.584,"z":0,"angle":127.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.367,"y":0.887,"z":0,"angle":157.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.125,"y":0.952,"z":0,"angle":187.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.584,"y":0.762,"z":0,"angle":217.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.887,"y":0.367,"z":0,"angle":247.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.952,"y":-0.125,"z":0,"angle":277.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.762,"y":-0.584,"z":0,"angle":307.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.367,"y":-0.887,"z":0,"angle":337.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.367,"y":-0.887,"z":0,"angle":22.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.762,"y":-0.584,"z":0,"angle":52.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.952,"y":-0.125,"z":0,"angle":82.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.887,"y":0.367,"z":0,"angle":112.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.584,"y":0.762,"z":0,"angle":142.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":-0.125,"y":0.952,"z":0,"angle":172.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.367,"y":0.887,"z":0,"angle":202.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.762,"y":0.584,"z":0,"angle":232.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.952,"y":0.125,"z":0,"angle":262.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.887,"y":-0.367,"z":0,"angle":292.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.584,"y":-0.762,"z":0,"angle":322.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.125,"y":-0.952,"z":0,"angle":352.5,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0},{"x":0.679,"y":0.679,"z":0,"angle":585,"damage":[10000,10000],"rate":10,"speed":[400,400],"number":10,"spread":360,"error":0,"recoil":0}],"radius":0.961}}';

// Dueling ship
  // Vanilla ships
Ship.Fly_101 = '{"name":"Fly","level":1,"model":1,"size":1.05,"specs":{"shield":{"capacity":[75,100],"reload":[2,3]},"generator":{"capacity":[40,60],"reload":[10,15]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,130],"acceleration":[100,120]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-65,-60,-50,-20,10,30,55,75,60],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,10,30,25,30,18,15,0],"height":[0,6,8,12,20,20,18,15,0],"propeller":true,"texture":[4,63,10,1,1,1,12,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,30,60],"z":[0,0,0,0,0]},"width":[0,13,17,10,5],"height":[0,18,25,18,5],"propeller":false,"texture":[7,9,9,4,4]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-15,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[5,6],"rate":4,"type":1,"speed":[160,180],"number":1,"error":2.5},"propeller":false,"texture":[3,3,10,3]}},"wings":{"main":{"length":[60,20],"width":[100,50,40],"angle":[-10,10],"position":[0,20,10],"doubleside":true,"offset":{"x":0,"y":10,"z":5},"bump":{"position":30,"size":20},"texture":[11,63]}},"typespec":{"name":"Fly","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[75,100],"reload":[2,3]},"generator":{"capacity":[40,60],"reload":[10,15]},"ship":{"mass":60,"speed":[125,145],"rotation":[110,130],"acceleration":[100,120]}},"shape":[1.368,1.368,1.093,0.965,0.883,0.827,0.791,0.767,0.758,0.777,0.847,0.951,1.092,1.667,1.707,1.776,1.856,1.827,1.744,1.687,1.525,1.415,1.335,1.606,1.603,1.578,1.603,1.606,1.335,1.415,1.525,1.687,1.744,1.827,1.856,1.776,1.707,1.667,1.654,0.951,0.847,0.777,0.758,0.767,0.791,0.827,0.883,0.965,1.093,1.368],"lasers":[{"x":0,"y":-1.365,"z":-0.21,"angle":0,"damage":[5,6],"rate":4,"type":1,"speed":[160,180],"number":1,"spread":0,"error":2.5,"recoil":0}],"radius":1.856}}';
Ship.Odyssey_601 = '{"name":"Odyssey","level":6,"model":1,"size":4,"specs":{"shield":{"capacity":[750,750],"reload":[15,15]},"generator":{"capacity":[330,330],"reload":[150,150]},"ship":{"mass":700,"speed":[45,45],"rotation":[20,20],"acceleration":[150,150]}},"tori":{"circle":{"segments":20,"radius":95,"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],"height":[8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],"texture":[63,63,4,10,4,4,10,4,63,63,63,63,3,10,3,3,10,3,63]}},"bodies":{"main":{"section_segments":20,"offset":{"x":0,"y":-10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-130,-130,-85,-70,-60,-20,-25,40,40,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,40,45,10,12,30,30,40,30,0],"height":[0,20,25,25,10,12,25,25,20,10,0],"texture":[4,15,63,4,4,4,11,10,4,12]},"laser1":{"section_segments":12,"offset":{"x":110,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-20,0,20,30,20],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,3,0],"height":[0,3,5,5,5,3,0],"texture":[12,6,63,63,6,12],"laser":{"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"error":0}},"laser2":{"section_segments":12,"offset":{"x":110,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-25,-30,-20,0,20,30,20],"z":[0,0,0,0,0,0,0]},"width":[0,3,5,5,5,3,0],"height":[0,3,5,5,5,3,0],"texture":[12,6,63,63,6,12],"angle":180,"laser":{"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"error":0}},"cannon":{"section_segments":6,"offset":{"x":0,"y":-115,"z":0},"position":{"x":[0,0,0,0],"y":[-25,-30,-20,0],"z":[0,0,0,0]},"width":[0,15,9,7],"height":[0,10,9,7],"texture":[6,6,6,10],"laser":{"damage":[250,250],"rate":1,"type":1,"speed":[100,100],"number":1,"error":0,"recoil":300}},"cockpit":{"section_segments":10,"offset":{"x":0,"y":0,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-10,0,10,30],"z":[0,0,0,0,0]},"width":[0,12,15,10,0],"height":[0,20,22,18,0],"texture":[9]},"bumpers":{"section_segments":8,"offset":{"x":85,"y":20,"z":0},"position":{"x":[-5,0,5,10,5,0,-5],"y":[-85,-80,-40,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,5,0],"height":[0,20,35,35,25,15,0],"texture":[11,2,63,4,3],"angle":0},"toppropulsors":{"section_segments":10,"offset":{"x":17,"y":50,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,50,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,10,0],"height":[0,10,15,15,15,10,10,15,10,0],"texture":[3,4,10,3,3,63,4],"propeller":true},"bottompropulsors":{"section_segments":10,"offset":{"x":17,"y":50,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,50,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,10,0],"height":[0,10,15,15,15,10,10,15,10,0],"texture":[3,4,10,3,3,63,4],"propeller":true}},"wings":{"topjoin":{"offset":{"x":0,"y":-3,"z":0},"doubleside":true,"length":[100],"width":[20,20],"angle":[25],"position":[0,0,0,50],"texture":[1],"bump":{"position":10,"size":30}},"bottomjoin":{"offset":{"x":0,"y":-3,"z":0},"doubleside":true,"length":[100],"width":[20,20],"angle":[-25],"position":[0,0,0,50],"texture":[1],"bump":{"position":-10,"size":30}}},"typespec":{"name":"Odyssey","level":7,"model":1,"code":701,"specs":{"shield":{"capacity":[750,750],"reload":[15,15]},"generator":{"capacity":[330,330],"reload":[150,150]},"ship":{"mass":700,"speed":[45,45],"rotation":[20,20],"acceleration":[150,150]}},"shape":[11.623,11.646,10.525,8.979,7.873,3.633,3.688,8.551,8.989,8.821,9.353,9.348,9.272,9.272,9.348,9.353,8.977,9.064,9.121,4.686,5.299,6.216,7.781,8.276,8.144,7.775,8.144,8.276,7.781,6.216,5.299,4.686,9.121,9.064,8.977,9.353,9.348,9.272,9.272,9.348,9.353,8.821,8.989,8.551,3.688,3.633,7.873,8.979,10.525,11.646],"lasers":[{"x":8.8,"y":-2.4,"z":0,"angle":0,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-8.8,"y":-2.4,"z":0,"angle":0,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":8.8,"y":2.4,"z":0,"angle":180,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-8.8,"y":2.4,"z":0,"angle":-180,"damage":[20,20],"rate":3,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-11.6,"z":0,"angle":0,"damage":[250,250],"rate":1,"type":1,"speed":[100,100],"number":1,"spread":0,"error":0,"recoil":300}],"radius":11.646}}';
Ship.Shadow_X_3_602 = '{"name":"Shadow X-3","level":6,"model":2,"size":2.5,"specs":{"shield":{"capacity":[400,400],"reload":[12,12]},"generator":{"capacity":[225,225],"reload":[50,50]},"ship":{"mass":300,"speed":[130,130],"rotation":[35,35],"acceleration":[90,90]}},"bodies":{"main":{"section_segments":20,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-130,-128,-115,-70,-40,0,40,70,80,90,100],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,10,20,20,20,20,30,30,30,20,0],"height":[0,5,10,30,20,10,10,15,15,15,10,10],"texture":[12,3,15,4,63,63,4,4,5],"laser":{"damage":[200,200],"rate":1,"type":1,"speed":[200,200],"number":1,"error":0,"recoil":500}},"air":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,-80,-30,-10,10,30,50],"z":[0,0,0,0,0,0,0]},"width":[0,25,35,30,30,32,20],"height":[0,15,10,10,10,10,10,15,15,15,10,10],"texture":[4,3,2,2,2,3]},"back":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,22,2],"height":[3,5,7,8,2],"texture":[63],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-30,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-65,-25,0,25,60,90,100],"z":[0,0,0,0,-10,-8,-10]},"width":[0,10,15,10,20,15,10],"height":[0,15,20,10,10,10,10],"texture":[9,9,9,10,63,3]},"laser":{"section_segments":10,"offset":{"x":90,"y":10,"z":-19},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,10,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[6,4,10,3,4,3,2],"propeller":true,"laser":{"damage":[7,7],"rate":3,"type":1,"speed":[150,150],"number":1}},"laser2":{"section_segments":10,"offset":{"x":50,"y":-20,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,15,12,0],"height":[0,10,15,15,15,10,10,15,5,0],"texture":[6,4,10,3,4,3,2],"propeller":true,"laser":{"damage":[7,7],"rate":4,"type":1,"speed":[150,150],"number":1}}},"wings":{"wings":{"offset":{"x":10,"y":0,"z":0},"length":[35,15,30,25],"width":[100,50,60,30,45],"angle":[-10,20,0,0],"position":[0,0,10,30,-10],"texture":[4],"bump":{"position":-20,"size":15}}},"typespec":{"name":"Shadow X-3","level":7,"model":2,"code":702,"specs":{"shield":{"capacity":[400,400],"reload":[12,12]},"generator":{"capacity":[225,225],"reload":[50,50]},"ship":{"mass":300,"speed":[130,130],"rotation":[35,35],"acceleration":[90,90]}},"shape":[6.5,6.068,4.366,3.971,3.26,2.789,3.571,3.73,3.692,3.514,5.906,5.859,5.721,5.71,5.65,5.425,5.886,6.211,6.384,5.843,3.244,2.675,4.759,5.353,5.344,5.26,5.344,5.353,4.759,2.675,3.244,5.843,6.384,6.211,5.886,5.425,5.65,5.71,5.721,5.859,5.906,3.514,3.692,3.73,3.571,2.789,3.26,3.971,4.366,6.068],"lasers":[{"x":0,"y":-6.5,"z":0,"angle":0,"damage":[200,200],"rate":1,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":500},{"x":4.5,"y":-1,"z":-0.95,"angle":0,"damage":[7,7],"rate":3,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-4.5,"y":-1,"z":-0.95,"angle":0,"damage":[7,7],"rate":3,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.5,"y":-2.5,"z":-1,"angle":0,"damage":[7,7],"rate":4,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.5,"y":-2.5,"z":-1,"angle":0,"damage":[7,7],"rate":4,"type":1,"speed":[150,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":6.5}}';
Ship.Bastion_603 = '{"name":"Bastion","level":6,"model":3,"size":4,"specs":{"shield":{"capacity":[400,400],"reload":[20,20]},"generator":{"capacity":[500,500],"reload":[100,100]},"ship":{"mass":350,"speed":[80,80],"rotation":[15,15],"acceleration":[125,125]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":50,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-50,-20,0,20,40,25],"z":[0,0,0,0,0,0,0]},"width":[0,5,22,18,16,15,0],"height":[0,2,12,16,16,15,0],"texture":[10,1,1,10,8,17],"propeller":true},"thrusters":{"section_segments":8,"offset":{"x":40,"y":43,"z":-24},"position":{"x":[0,0,0,0,0,0],"y":[-25,-20,0,20,40,30],"z":[0,0,0,0,0,0]},"width":[0,8,12,8,8,0],"height":[0,12,12,8,8,0],"texture":[63,2,2,2,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":30,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,-10,0,11,35],"z":[-5,-3,-1,0,0]},"width":[0,5,10,10,0],"height":[0,3,5,7,0],"texture":[9]},"cannon1":{"section_segments":4,"offset":{"x":10,"y":-80,"z":1},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,30,40],"z":[0,0,0,0,0]},"width":[0,2,4,7,3],"height":[0,1,3,6,0],"texture":[17,4],"laser":{"damage":[6,6],"rate":5,"type":1,"speed":[200,200],"number":1}},"cannon2":{"section_segments":4,"offset":{"x":42,"y":-129,"z":8},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,30,40],"z":[0,0,0,0,0]},"width":[0,2,4,7,3],"height":[0,1,3,6,0],"texture":[17,4],"angle":3,"laser":{"damage":[8,8],"rate":4,"type":1,"speed":[180,180],"number":1}},"cannon3":{"section_segments":4,"offset":{"x":75,"y":-105,"z":-8},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,30,40],"z":[0,0,0,0,0]},"width":[0,2,4,7,3],"height":[0,1,3,6,0],"texture":[17,4],"angle":5,"laser":{"damage":[20,20],"rate":1.5,"type":1,"speed":[160,160],"number":1}}},"wings":{"main1":{"doubleside":true,"offset":{"x":9,"y":15,"z":0},"length":[0,15,0,7],"width":[0,160,70,30,30],"angle":[0,20,0,-10],"position":[30,-20,30,30,30],"texture":[13,63,13,8],"bump":{"position":35,"size":5}},"main2":{"doubleside":true,"offset":{"x":30,"y":15,"z":0},"length":[0,15,0,20],"width":[0,80,90,200,30],"angle":[30,30,30,30],"position":[30,30,10,-45,30],"texture":[13,3,13,4],"bump":{"position":35,"size":7}},"main3":{"doubleside":true,"offset":{"x":0,"y":25,"z":-7},"length":[45,35,0,20],"width":[40,40,40,200,40],"angle":[-20,20,-20,-5],"position":[20,30,0,-30,10],"texture":[0,8,13,63],"bump":{"position":35,"size":20}}},"typespec":{"name":"Bastion","level":7,"model":4,"code":704,"specs":{"shield":{"capacity":[400,400],"reload":[20,20]},"generator":{"capacity":[500,500],"reload":[100,100]},"ship":{"mass":350,"speed":[80,80],"rotation":[15,15],"acceleration":[125,125]}},"shape":[4.056,7.244,11.603,11.152,9.19,10.943,9.896,9.163,8.149,7.735,7.473,7.332,7.401,7.615,7.85,8.175,8.679,8.889,9.155,9.588,9.692,7.67,7.338,6.661,7.299,7.214,7.299,6.661,7.338,7.67,9.692,9.588,9.155,8.889,8.679,8.175,7.85,7.615,7.401,7.332,7.473,7.735,8.149,9.163,9.896,10.943,9.19,11.152,11.603,7.244],"lasers":[{"x":0.8,"y":-7.2,"z":0.08,"angle":0,"damage":[6,6],"rate":5,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.8,"y":-7.2,"z":0.08,"angle":0,"damage":[6,6],"rate":5,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.318,"y":-11.119,"z":0.64,"angle":3,"damage":[8,8],"rate":4,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.318,"y":-11.119,"z":0.64,"angle":-3,"damage":[8,8],"rate":4,"type":1,"speed":[180,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":5.93,"y":-9.197,"z":-0.64,"angle":5,"damage":[20,20],"rate":1.5,"type":1,"speed":[160,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-5.93,"y":-9.197,"z":-0.64,"angle":-5,"damage":[20,20],"rate":1.5,"type":1,"speed":[160,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":11.603}}';
Ship.Aries_604 = '{"name":"Aries","level":6,"model":4,"size":4.5,"specs":{"shield":{"capacity":[800,800],"reload":[17,17]},"generator":{"capacity":[350,350],"reload":[175,175]},"ship":{"mass":800,"speed":[40,40],"rotation":[20,20],"acceleration":[150,150]}},"bodies":{"arm":{"section_segments":6,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-85,-70,-60,-10,10,60,70,85,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,20,25,10,12,12,15,20,20,15,0],"height":[0,10,12,8,12,12,8,12,10,5,0],"texture":[4,63,4,4,4,4,4,63,3],"propeller":true},"arm45":{"section_segments":6,"angle":45,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-90,-85,-70,-60,-10,10,60,70,85,90],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,25,10,12,12,10,25,20,0],"height":[0,10,12,8,12,12,8,12,10,0],"texture":[4,63,4,4,4,4,4,63,4]},"arm90":{"section_segments":6,"angle":90,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-90,-85,-70,-60,-10,10,60,70,85,90],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,25,10,12,12,10,25,20,0],"height":[0,10,12,8,12,12,8,12,10,0],"texture":[4,63,4,4,4,4,4,63,4]},"arm135":{"section_segments":6,"angle":-45,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-90,-85,-70,-60,-10,10,60,70,85,90],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,20,25,10,12,12,10,25,20,0],"height":[0,10,12,8,12,12,8,12,10,0],"texture":[4,63,4,4,4,4,4,63,4]},"cockpit":{"section_segments":20,"offset":{"x":0,"y":-10,"z":8},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-50,-35,-25,-15,0,15,25,35,70],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,15,20,25,20,10,15,15,0],"height":[0,10,13,15,15,15,12,10,0],"texture":[6,15,15,1,4,3,3,15]},"topcockpit":{"section_segments":16,"offset":{"x":0,"y":-23,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-10,0,10,30],"z":[0,0,0,0,0]},"width":[0,12,15,10,0],"height":[0,20,22,18,0],"texture":[9]},"cannon":{"section_segments":6,"offset":{"x":0,"y":-63,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-25,-30,-20,0,10,12],"z":[0,0,0,0,0,0]},"width":[0,10,8,7,6,0],"height":[0,5,5,7,6,0],"texture":[6,6,6,10,12],"laser":{"damage":[150,150],"rate":0.7,"type":1,"speed":[110,110],"number":1,"error":0}},"sidecannons":{"section_segments":6,"offset":{"x":45,"y":-45,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[0,-30,-20,0,10,12],"z":[0,0,0,0,-5,-10]},"width":[0,3,5,7,6,0],"height":[0,3,5,7,6,0],"texture":[6,6,15,4,4],"angle":-45,"laser":{"damage":[15,15],"rate":4,"type":1,"speed":[200,200],"number":1,"error":0}},"backsidecannons":{"section_segments":6,"offset":{"x":45,"y":45,"z":7},"position":{"x":[0,0,0,0,0,0],"y":[0,-30,-20,0,10,12],"z":[0,0,0,0,-5,-10]},"width":[0,3,5,7,6,0],"height":[0,3,5,7,6,0],"texture":[6,6,15,4,4],"angle":225,"laser":{"damage":[15,15],"rate":4,"type":1,"speed":[200,200],"number":1,"error":0}}},"wings":{"side_joins":{"offset":{"x":0,"y":0,"z":5},"length":[40,30],"width":[50,30,0],"angle":[30,-10],"position":[0,0,50],"texture":[1,11],"bump":{"position":10,"size":20}}},"typespec":{"name":"Aries","level":7,"model":5,"code":705,"specs":{"shield":{"capacity":[800,800],"reload":[17,17]},"generator":{"capacity":[350,350],"reload":[175,175]},"ship":{"mass":800,"speed":[40,40],"rotation":[20,20],"acceleration":[150,150]}},"shape":[8.386,8.406,7.816,4.278,7.535,7.919,8.431,8.279,7.842,6.772,7.119,7.875,8.096,8.1,7.875,7.119,6.772,7.842,8.279,8.431,7.919,7.535,3.408,7.88,8.184,8.116,8.184,7.88,3.408,7.535,7.919,8.431,8.279,7.842,6.772,7.119,7.875,8.096,8.1,7.875,7.119,6.772,7.842,8.279,8.431,7.919,7.535,4.278,7.816,8.406],"lasers":[{"x":0,"y":-8.37,"z":0,"angle":0,"damage":[150,150],"rate":0.7,"type":1,"speed":[110,110],"number":1,"spread":0,"error":0,"recoil":0},{"x":5.959,"y":-5.959,"z":0.63,"angle":-45,"damage":[15,15],"rate":4,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-5.959,"y":-5.959,"z":0.63,"angle":45,"damage":[15,15],"rate":4,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":5.959,"y":5.959,"z":0.63,"angle":225,"damage":[15,15],"rate":4,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-5.959,"y":5.959,"z":0.63,"angle":-225,"damage":[15,15],"rate":4,"type":1,"speed":[200,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":8.431}}';
Ship.Pulse_Warrior_605 = '{"name":"Pulse-Warrior","level":6,"model":5,"size":1,"specs":{"shield":{"capacity":[150,150],"reload":[9,9]},"generator":{"capacity":[160,160],"reload":[35,35]},"ship":{"mass":60,"speed":[120,120],"rotation":[80,80],"acceleration":[160,160]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-117,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[0,16,15,31,29,63,67,86,147,176,170],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,9,14,17,29,33,42,37,24,0],"height":[0,4,7,10,12,20,24,27,25,17,0],"texture":[17,4,63,4,13,4,3,11,8,13],"propeller":true,"laser":{"damage":[80,80],"rate":2,"type":2,"speed":[165,165],"number":1}},"gun":{"section_segments":12,"offset":{"x":0,"y":-117,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[0,17,18],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,0],"height":[0,4,0],"texture":[17],"propeller":false,"laser":{"damage":[5,5],"rate":10,"type":1,"speed":[130,130],"number":1,"error":4}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-19,"z":24},"position":{"x":[0,0,0,0],"y":[0,10,25,40],"z":[0,-1,-2,-3]},"width":[10,16,16,10],"height":[2,8,8,2],"texture":[9],"propeller":false}},"wings":{"shieldsA":{"doubleside":false,"offset":{"x":-21,"y":-10,"z":-34},"length":[15,15,15,15,15,15,15,15],"width":[16,27,29,162,182,162,29,27,16],"angle":[180,150,120,105,75,60,30,0],"position":[40,40,40,0,0,0,40,40,40],"texture":[63,4,11,1,1,11,4,63],"bump":{"position":26,"size":6}},"shieldsB":{"doubleside":false,"offset":{"x":21,"y":-10,"z":-34},"length":[15,15,15,15,15,15,15,15],"width":[16,27,29,162,182,162,29,27,16],"angle":[0,30,60,75,105,120,150,180],"position":[40,40,40,0,0,0,40,40,40],"texture":[63,4,11,1,1,11,4,63],"bump":{"position":26,"size":6}},"bridge":{"doubleside":true,"offset":{"x":21,"y":-20,"z":0},"length":[40],"width":[30,30],"angle":[0],"position":[-20,30],"texture":[4],"bump":{"position":26,"size":36}}},"typespec":{"name":"Pulse-Warrior","level":7,"model":6,"code":706,"specs":{"shield":{"capacity":[150,150],"reload":[9,9]},"generator":{"capacity":[160,160],"reload":[35,35]},"ship":{"mass":60,"speed":[120,120],"rotation":[80,80],"acceleration":[160,160]}},"shape":[2.34,2.048,1.793,1.487,2.353,2.264,1.947,1.741,1.582,1.48,1.414,1.377,1.361,1.384,1.426,1.509,1.61,1.679,1.785,1.937,2.02,1.21,1.274,1.24,1.201,1.182,1.201,1.24,1.274,1.21,2.02,1.937,1.785,1.679,1.61,1.509,1.426,1.384,1.361,1.377,1.414,1.48,1.582,1.741,1.947,2.264,2.353,1.487,1.793,2.048],"lasers":[{"x":0,"y":-2.34,"z":0,"angle":0,"damage":[80,80],"rate":2,"type":2,"speed":[165,165],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-2.34,"z":0,"angle":0,"damage":[5,5],"rate":10,"type":1,"speed":[130,130],"number":1,"spread":0,"error":4,"recoil":0}],"radius":2.353}}';
Ship.Toscain_606 = '{"name":"Toscain","level":6,"model":6,"size":1.7,"specs":{"shield":{"capacity":[275,350],"reload":[5,8]},"generator":{"capacity":[75,100],"reload":[35,50]},"ship":{"mass":300,"speed":[80,90],"rotation":[50,80],"acceleration":[80,110]}},"bodies":{"front":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-100,-95,-25,0,25],"z":[0,0,0,0,0]},"width":[0,20,40,40,20],"height":[0,10,35,20,5],"texture":[63,11,2,63],"laser":{"damage":[14,30],"rate":1,"type":2,"speed":[150,200],"number":1,"recoil":50,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0],"y":[-70,-70,-25,0,100],"z":[0,0,0,0,9]},"width":[0,10,15,15,10],"height":[0,15,35,20,0],"texture":[9,9,9,4]},"lasers":{"section_segments":8,"angle":15,"offset":{"x":1,"y":-5,"z":-3},"position":{"x":[0,0,0],"y":[-90,-70,-100],"z":[0,0,0]},"width":[5,5,0],"height":[5,5,0],"texture":[6],"laser":{"damage":[3.75,6],"rate":2,"type":1,"speed":[100,130],"number":2,"angle":45,"error":0}},"motor":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[10,20,30,100,95],"z":[0,0,0,0,0]},"width":[0,40,50,50,0],"height":[0,10,15,20,0],"texture":[63,63,10,4]},"propulsors":{"section_segments":8,"offset":{"x":25,"y":0,"z":0},"position":{"x":[0,0,0],"y":[30,105,100],"z":[0,0,0]},"width":[15,15,0],"height":[10,10,0],"texture":[12],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":30,"y":80,"z":0},"length":[70,20],"width":[80,20],"angle":[0,0],"position":[-20,0],"texture":[11],"bump":{"position":20,"size":10}},"winglets":{"doubleside":true,"offset":{"x":98,"y":81,"z":-20},"length":[20,50,20],"width":[20,35,20],"angle":[90,90,90],"position":[0,0,0,0],"texture":[63],"bump":{"position":30,"size":50}}},"typespec":{"name":"Toscain","level":5,"model":8,"code":508,"specs":{"shield":{"capacity":[275,350],"reload":[5,8]},"generator":{"capacity":[75,100],"reload":[35,50]},"ship":{"mass":300,"speed":[80,90],"rotation":[50,80],"acceleration":[80,110]}},"shape":[3.4,3.354,3.556,2.748,2.336,2.055,1.858,1.732,1.634,1.548,1.462,1.404,1.371,1.36,1.241,1.161,1.723,4.485,5.01,4.795,4.111,3.842,3.82,3.753,3.634,3.407,3.634,3.753,3.82,3.842,4.111,4.795,5.01,4.485,1.723,1.161,1.241,1.353,1.371,1.404,1.462,1.548,1.634,1.732,1.858,2.055,2.336,2.748,3.556,3.354],"lasers":[{"x":0,"y":-3.4,"z":0,"angle":0,"damage":[14,30],"rate":1,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":50},{"x":-0.846,"y":-3.454,"z":-0.102,"angle":15,"damage":[3.75,6],"rate":2,"type":1,"speed":[100,130],"number":2,"spread":45,"error":0,"recoil":0},{"x":0.846,"y":-3.454,"z":-0.102,"angle":-15,"damage":[3.75,6],"rate":2,"type":1,"speed":[100,130],"number":2,"spread":45,"error":0,"recoil":0}],"radius":5.01}}';
Ship.Advanced_Fighter_607 = '{"name":"Advanced-Fighter","level":6,"model":7,"size":2,"specs":{"shield":{"capacity":[200,350],"reload":[4,6]},"generator":{"capacity":[120,200],"reload":[50,60]},"ship":{"mass":400,"speed":[70,80],"rotation":[30,50],"acceleration":[70,100]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-100,-80,-90,-50,0,50,100,90],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,15,25,40,25,20,0],"height":[0,5,10,30,25,20,10,0],"propeller":true,"texture":[4,4,1,1,10,1,1],"laser":{"damage":[90,150],"rate":1,"type":2,"speed":[180,240],"number":1,"recoil":150,"error":0}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-35,"z":33},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-20,10,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,12,15,10,0],"height":[0,12,18,12,0],"propeller":false,"texture":[7,9,9,7]},"side_propellers":{"section_segments":10,"offset":{"x":30,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-50,-20,0,20,80,70],"z":[0,0,0,0,0,0]},"width":[15,20,10,25,10,0],"height":[10,15,15,10,5,0],"angle":0,"propeller":true,"texture":[3,63,4,10,3]},"cannons":{"section_segments":12,"offset":{"x":70,"y":50,"z":-30},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,15,10,0],"height":[0,5,15,15,10,5,0],"angle":0,"propeller":false,"texture":[4,4,10,4,63,4],"laser":{"damage":[6,12],"rate":3,"type":1,"speed":[100,150],"number":1,"error":0}},"cannons2":{"section_segments":12,"offset":{"x":95,"y":50,"z":-40},"position":{"x":[0,0,0,0],"y":[-50,-20,40,50],"z":[0,0,0,0]},"width":[2,5,5,2],"height":[2,15,15,2],"angle":0,"propeller":false,"texture":6,"laser":{"damage":[4,10],"rate":3,"type":1,"speed":[100,150],"number":1,"error":0}}},"wings":{"main":{"length":[100,30,20],"width":[100,50,40,30],"angle":[-25,20,25],"position":[30,70,50,50],"bump":{"position":-20,"size":20},"offset":{"x":0,"y":0,"z":0},"texture":[11,11,63],"doubleside":true},"winglets":{"length":[40],"width":[40,20,30],"angle":[10,-10],"position":[-50,-70,-65],"bump":{"position":0,"size":30},"texture":63,"offset":{"x":0,"y":0,"z":0}}},"typespec":{"name":"Advanced-Fighter","level":2,"model":1,"code":201,"specs":{"shield":{"capacity":[200,350],"reload":[4,6]},"generator":{"capacity":[120,200],"reload":[50,60]},"ship":{"mass":400,"speed":[70,80],"rotation":[30,50],"acceleration":[70,100]}},"shape":[4,3.65,3.454,3.504,3.567,2.938,1.831,1.707,1.659,1.943,1.92,1.882,1.896,3.96,5.654,5.891,6.064,5.681,5.436,5.573,5.122,4.855,4.675,4.626,4.479,4.008,4.479,4.626,4.675,4.855,5.122,5.573,5.436,5.681,6.064,5.891,5.654,3.96,3.88,1.882,1.92,1.943,1.659,1.707,1.831,2.938,3.567,3.504,3.454,3.65],"lasers":[{"x":0,"y":-4,"z":0.4,"angle":0,"damage":[90,150],"rate":1,"type":2,"speed":[180,240],"number":1,"spread":0,"error":0,"recoil":150},{"x":2.8,"y":0,"z":-1.2,"angle":0,"damage":[6,12],"rate":3,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.8,"y":0,"z":-1.2,"angle":0,"damage":[6,12],"rate":3,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":3.8,"y":0,"z":-1.6,"angle":0,"damage":[4,10],"rate":3,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-3.8,"y":0,"z":-1.6,"angle":0,"damage":[4,10],"rate":3,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":6.064}}';
Ship.Payload_608 = '{"name":"Payload","level":6,"model":8,"size":1.5,"specs":{"shield":{"capacity":[200,300],"reload":[4,6]},"generator":{"capacity":[150,230],"reload":[45,70]},"ship":{"mass":200,"speed":[85,120],"rotation":[40,60],"acceleration":[45,65]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-80,-70,-50,-40,0,40,50,80,85],"z":[-5,-5,-3,0,0,0,10,10,10]},"width":[4,11,14,8,10,10,12,10,0],"height":[0,5,6,8,12,10,8,9,0],"texture":[63,4,4,3,3,13,2,13],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-55,"z":12},"position":{"x":[0,0,0,0],"y":[-20,0,10],"z":[-4,0,6]},"width":[5,10,5],"height":[0,7,0],"texture":[9]},"uwings":{"section_segments":8,"offset":{"x":25,"y":10,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-44,-43,-45,-40,10,30,40,50,40],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,8,10,12,10,14,12,0],"height":[0,8,10,12,14,12,16,12,0],"texture":[13,13,4,3,4,3,4,13],"propeller":true},"main_cannon":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,-20,-10,0,20,50,55],"z":[-10,-10,-10,-10,0,0,0]},"width":[0,8,12,10,15,12,0],"height":[0,5,10,10,10,8,0],"angle":0,"laser":{"damage":[110,190],"rate":1,"type":2,"speed":[70,90],"recoil":750,"number":1},"propeller":false,"texture":[111,4,63,3,4,13]},"side_cannons":{"section_segments":10,"offset":{"x":70,"y":20,"z":-10},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-55,-10,0,20,35,30],"z":[0,0,0,0,0,0,0,0]},"width":[0,3,7,12,10,5,0],"height":[0,3,5,7,5,3,0],"laser":{"damage":[6,12],"rate":7.5,"type":1,"speed":[40,80],"number":1,"error":20},"propeller":true,"texture":[13,3,4,63,4,13]}},"wings":{"main":{"length":[50,25,20,10,10,16,2,2],"width":[60,60,50,50,55,60,5,60,0],"angle":[-10,-10,-10,-10,-10,-10,-10,-10],"position":[-10,10,5,-5,-20,-35,-30,-40,-30],"doubleside":true,"offset":{"x":0,"y":10,"z":10},"bump":{"position":0,"size":10},"texture":[4,8,3,63,4,3,63,63]},"winglets":{"length":[30,10],"width":[30,20,0],"angle":[15,10],"position":[0,10,35],"doubleside":true,"offset":{"x":5,"y":60,"z":20},"bump":{"position":0,"size":10},"texture":[4,63]}},"typespec":{"name":"Payload","level":6,"model":9,"code":609,"specs":{"shield":{"capacity":[200,300],"reload":[4,6]},"generator":{"capacity":[150,230],"reload":[45,70]},"ship":{"mass":200,"speed":[85,120],"rotation":[40,60],"acceleration":[45,65]}},"shape":[2.403,2.354,1.869,0.835,1.243,1.362,1.443,1.406,1.303,4.322,4.239,4.094,4.009,3.929,3.222,3.018,2.765,2.778,2.784,2.14,2.086,2.988,3.139,2.474,2.472,2.55,2.472,2.474,3.139,2.988,2.086,2.14,2.784,2.778,2.765,3.018,3.222,3.502,4.009,4.094,4.239,4.322,1.303,1.406,1.443,1.362,1.243,0.835,1.869,2.354],"lasers":[{"x":0,"y":-0.6,"z":0,"angle":0,"damage":[110,190],"rate":1,"type":2,"speed":[70,90],"number":1,"spread":0,"error":0,"recoil":750},{"x":2.1,"y":-1.05,"z":-0.3,"angle":0,"damage":[6,12],"rate":7.5,"type":1,"speed":[40,80],"number":1,"spread":0,"error":20,"recoil":0},{"x":-2.1,"y":-1.05,"z":-0.3,"angle":0,"damage":[6,12],"rate":7.5,"type":1,"speed":[40,80],"number":1,"spread":0,"error":20,"recoil":0}],"radius":4.322}}';
Ship.Scorpion_609 = '{"name":"Scorpion","level":6,"model":9,"size":2,"specs":{"shield":{"capacity":[225,400],"reload":[5,7]},"generator":{"capacity":[80,175],"reload":[38,50]},"ship":{"mass":450,"speed":[75,90],"rotation":[50,70],"acceleration":[80,100]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-40,-30,0,50,100,120,110],"z":[-10,-5,0,0,0,0,20,20]},"width":[0,12,20,15,25,10,5],"height":[0,10,15,25,15,10,5],"texture":[1,4,63,11,11,4],"propeller":false},"tail":{"section_segments":14,"offset":{"x":0,"y":70,"z":50},"position":{"x":[0,0,0,0,0,0],"y":[-70,-25,-10,20,40,50],"z":[0,0,0,0,-10,-20]},"width":[0,5,35,25,5,5],"height":[0,5,25,20,5,5],"texture":[6,4,63,10,4],"laser":{"damage":[50,100],"rate":0.9,"type":2,"speed":[170,230],"number":1,"angle":0,"error":0,"recoil":100}},"cockpit":{"section_segments":8,"offset":{"x":13,"y":-44,"z":12},"position":{"x":[-5,0,0,0,0],"y":[-15,-5,0,5,15],"z":[0,0,0,1,0]},"width":[0,8,10,8,0],"height":[0,5,5,5,0],"texture":[6,5],"propeller":false},"deco":{"section_segments":8,"offset":{"x":70,"y":0,"z":-10},"position":{"x":[0,0,0,10,-5,0,0,0],"y":[-115,-80,-100,-60,-30,-10,20,0],"z":[0,0,0,0,0,0,0,0]},"width":[1,5,10,15,15,20,10,0],"height":[1,5,15,20,35,30,10,0],"texture":[6,6,1,1,11,2,12],"laser":{"damage":[2,3],"rate":1.8,"type":1,"speed":[130,170],"number":2,"angle":5,"error":0},"propeller":true},"wingends":{"section_segments":8,"offset":{"x":105,"y":-80,"z":-10},"position":{"x":[0,2,4,2,0],"y":[-20,-10,0,10,20],"z":[0,0,0,0,0]},"width":[2,3,6,3,2],"height":[5,15,22,17,5],"texture":4,"angle":0,"propeller":false}},"wings":{"main":{"length":[80,30],"width":[40,30,20],"angle":[-10,20],"position":[30,-50,-80],"texture":63,"bump":{"position":30,"size":10},"offset":{"x":0,"y":0,"z":0}},"font":{"length":[80,30],"width":[20,15],"angle":[-10,20],"position":[-20,-40],"texture":4,"bump":{"position":30,"size":10},"offset":{"x":0,"y":0,"z":0}}},"typespec":{"name":"Scorpion","level":2,"model":2,"code":202,"specs":{"shield":{"capacity":[225,400],"reload":[5,7]},"generator":{"capacity":[80,175],"reload":[38,50]},"ship":{"mass":450,"speed":[75,90],"rotation":[50,70],"acceleration":[80,100]}},"shape":[3.6,2.846,2.313,2.192,5.406,5.318,5.843,5.858,5.621,4.134,3.477,3.601,3.622,3.464,3.351,3.217,1.458,1.391,1.368,1.37,1.635,2.973,3.47,3.911,4.481,4.804,4.481,3.911,3.47,2.973,1.635,1.37,1.368,1.391,1.458,3.217,3.351,3.464,3.622,3.601,3.477,4.134,5.621,5.858,5.843,5.318,5.406,2.192,2.313,2.846],"lasers":[{"x":0,"y":0,"z":2,"angle":0,"damage":[50,100],"rate":0.9,"type":2,"speed":[170,230],"number":1,"spread":0,"error":0,"recoil":100},{"x":2.8,"y":-4.6,"z":-0.4,"angle":0,"damage":[2,3],"rate":1.8,"type":1,"speed":[130,170],"number":2,"spread":5,"error":0,"recoil":0},{"x":-2.8,"y":-4.6,"z":-0.4,"angle":0,"damage":[2,3],"rate":1.8,"type":1,"speed":[130,170],"number":2,"spread":5,"error":0,"recoil":0}],"radius":5.858}}';
Ship.H_Mercury_610 = '{"name":"H-Mercury","level":6,"model":10,"size":2.2,"specs":{"shield":{"capacity":[250,350],"reload":[6,8]},"generator":{"capacity":[100,150],"reload":[45,60]},"ship":{"mass":275,"speed":[75,95],"rotation":[50,60],"acceleration":[55,90]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-65,-70,-60,-40,0,50,110,100],"z":[0,0,0,0,0,0,0,0]},"width":[1,5,10,20,30,25,10,0],"height":[1,5,10,15,25,20,10,0],"texture":[6,4,4,63,11,63,12],"propeller":true,"laser":{"damage":[4,7],"rate":8,"type":1,"speed":[100,150],"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-20,"z":35},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,-10,0,15,25],"z":[0,0,0,0,0]},"width":[0,10,12,10,5],"height":[0,10,13,12,5],"texture":[9,9,4,4],"propeller":false},"arms":{"section_segments":8,"offset":{"x":60,"y":0,"z":-10},"position":{"x":[0,0,0,5,10,0,0,-10],"y":[-85,-70,-80,-30,0,30,100,90],"z":[0,0,0,0,0,0,0,0]},"width":[1,5,6,15,15,15,10,0],"height":[1,5,6,20,30,25,10,0],"texture":[6,4,4,4,4,4,12],"angle":1,"propeller":true,"laser":{"damage":[2,4],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0}},"canon":{"section_segments":12,"offset":{"x":100,"y":27,"z":5},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,7,3,5,0],"height":[0,5,15,15,3,5,0],"angle":3,"laser":{"damage":[4,8],"rate":1,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,10,4,4,4]}},"wings":{"main":{"offset":{"x":0,"y":-15,"z":20},"length":[60,40],"width":[60,30,20],"angle":[-20,10],"position":[30,50,30],"texture":[11,11],"bump":{"position":30,"size":10}},"font":{"length":[60],"width":[20,15],"angle":[-10,20],"position":[-20,-40],"texture":[63],"bump":{"position":30,"size":10},"offset":{"x":0,"y":0,"z":0}},"font2":{"offset":{"x":0,"y":40,"z":8},"length":[60],"width":[20,15],"angle":[-10,20],"position":[20,40],"texture":[63],"bump":{"position":30,"size":10}}},"typespec":{"name":"H-Mercury","level":6,"model":10,"code":610,"specs":{"shield":{"capacity":[250,350],"reload":[6,8]},"generator":{"capacity":[100,150],"reload":[45,60]},"ship":{"mass":275,"speed":[75,95],"rotation":[50,60],"acceleration":[55,90]}},"shape":[3.086,3.088,2.59,2.24,2.004,4.566,4.489,4.168,3.955,3.818,3.747,4.587,4.622,4.713,4.854,4.959,5.317,5.372,4.412,4.987,5.408,5.207,3.941,3.8,4.86,4.849,4.86,3.8,3.941,5.207,5.408,4.987,4.412,5.372,5.317,4.959,4.854,4.713,4.622,4.587,3.747,3.818,3.955,4.168,4.489,4.566,2.004,2.24,2.59,3.088],"lasers":[{"x":0,"y":-3.08,"z":0.88,"angle":0,"damage":[4,7],"rate":8,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.575,"y":-3.739,"z":-0.44,"angle":1,"damage":[2,4],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.575,"y":-3.739,"z":-0.44,"angle":-1,"damage":[2,4],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":4.285,"y":-1.009,"z":0.22,"angle":3,"damage":[4,8],"rate":1,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-4.285,"y":-1.009,"z":0.22,"angle":-3,"damage":[4,8],"rate":1,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.408}}';
Ship.Marauder_611 = '{"name":"Marauder","level":6,"model":11,"size":1.4,"specs":{"shield":{"capacity":[210,350],"reload":[8,11]},"generator":{"capacity":[85,160],"reload":[25,40]},"ship":{"mass":250,"speed":[70,110],"rotation":[60,80],"acceleration":[80,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-20,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-65,-75,-55,-40,0,30,60,80,90,80],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,18,23,30,25,25,30,35,0],"height":[0,5,10,12,12,20,15,15,15,0],"texture":[6,4,1,10,1,1,11,12,17],"propeller":true,"laser":{"damage":[10,16],"rate":10,"type":1,"speed":[170,200],"recoil":0,"number":1,"error":0}},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-85,"z":22},"position":{"x":[0,0,0,0,0,0],"y":[15,35,60,95,125],"z":[-1,-2,-1,-1,3]},"width":[5,12,14,15,5],"height":[0,12,15,15,0],"texture":[8.98,8.98,4]},"outriggers":{"section_segments":10,"offset":{"x":25,"y":0,"z":-10},"position":{"x":[-5,-5,8,-5,0,0,0,0,0,0],"y":[-100,-125,-45,0,30,40,70,80,100,90],"z":[10,10,5,5,0,0,0,0,0,0,0,0]},"width":[0,6,10,10,15,15,15,15,10,0],"height":[0,10,20,25,25,25,25,25,20,0],"texture":[13,4,4,63,4,18,4,13,17],"laser":{"damage":[4,8],"rate":3,"type":1,"speed":[110,140],"recoil":0,"number":1,"error":0},"propeller":true},"intake":{"section_segments":12,"offset":{"x":25,"y":-5,"z":10},"position":{"x":[0,0,5,0,-3,0,0,0,0,0],"y":[-10,-30,-5,35,60,70,85,100,85],"z":[0,-6,0,0,0,0,0,0,0,0]},"width":[0,5,10,10,15,10,10,5,0],"height":[0,15,15,20,20,15,15,5,0],"texture":[6,4,63,4,63,18,4,17]}},"wings":{"main":{"length":[20,70,35],"width":[50,55,40,20],"angle":[0,-20,0],"position":[20,20,70,25],"texture":[3,18,63],"doubleside":true,"bump":{"position":30,"size":15},"offset":{"x":0,"y":0,"z":13}},"spoiler":{"length":[20,45,0,5],"width":[40,40,20,30,0],"angle":[0,20,90,90],"position":[60,60,80,80,90],"texture":[10,11,63],"doubleside":true,"bump":{"position":30,"size":18},"offset":{"x":0,"y":0,"z":30}},"font":{"length":[37],"width":[40,15],"angle":[-10],"position":[0,-45],"texture":[63],"doubleside":true,"bump":{"position":30,"size":10},"offset":{"x":35,"y":-20,"z":10}},"shields":{"doubleside":true,"offset":{"x":12,"y":60,"z":-15},"length":[0,15,45,20],"width":[30,30,65,65,30,30],"angle":[30,30,90,150],"position":[10,10,0,0,10],"texture":[4],"bump":{"position":0,"size":4}}},"typespec":{"name":"Marauder","level":2,"model":3,"code":203,"specs":{"shield":{"capacity":[210,350],"reload":[8,11]},"generator":{"capacity":[85,160],"reload":[25,40]},"ship":{"mass":250,"speed":[70,110],"rotation":[60,80],"acceleration":[80,120]}},"shape":[2.665,3.563,3.573,2.856,2.359,2.03,2.85,2.741,2.228,1.71,1.404,1.199,1.11,3.408,3.491,3.521,3.44,3.385,3.439,3.481,3.181,2.932,2.962,2.944,2.85,2.244,2.85,2.944,2.962,2.932,3.181,3.481,3.439,3.385,3.44,3.521,3.491,3.408,1.11,1.199,1.404,1.71,2.228,2.741,2.85,2.03,2.359,2.856,3.573,3.563],"lasers":[{"x":0,"y":-2.66,"z":0.28,"angle":0,"damage":[10,16],"rate":10,"type":1,"speed":[170,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.56,"y":-3.5,"z":-0.28,"angle":0,"damage":[4,8],"rate":3,"type":1,"speed":[110,140],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.56,"y":-3.5,"z":-0.28,"angle":0,"damage":[4,8],"rate":3,"type":1,"speed":[110,140],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.573}}';
Ship.Condor_612 = '{"name":"Condor","level":6,"model":12,"size":1.5,"specs":{"shield":{"capacity":[225,400],"reload":[7,10]},"generator":{"capacity":[70,130],"reload":[30,48]},"ship":{"mass":200,"speed":[75,105],"rotation":[50,70],"acceleration":[80,120]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-110,-95,-100,-100,-45,-40,-25,-23,15,20,55,80,100,90],"z":[-10,-9,-8,-7,-6,-4,-2,0,0,0,0,0,0,0]},"width":[0,2,5,10,25,27,27,25,25,27,40,35,30,0],"height":[0,2,5,10,25,27,27,25,25,27,20,15,10,0],"texture":[6,2,3,10,5,63,5,2,5,3,63,11,4],"propeller":true,"laser":{"damage":[30,60],"rate":2,"type":2,"speed":[150,200],"number":1,"angle":0,"error":0}},"cannons":{"section_segments":12,"offset":{"x":75,"y":30,"z":-25},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,10,10,0],"height":[0,5,15,15,10,5,0],"angle":0,"laser":{"damage":[3,6],"rate":4,"type":1,"speed":[100,130],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-60,"z":8},"position":{"x":[0,0,0,0],"y":[-25,-8,20,65],"z":[0,0,0,0]},"width":[0,10,10,0],"height":[0,12,15,5],"texture":[9]}},"wings":{"back":{"offset":{"x":0,"y":25,"z":10},"length":[90,40],"width":[70,50,30],"angle":[-30,40],"position":[0,20,0],"texture":[11,63],"doubleside":true,"bump":{"position":10,"size":20}},"front":{"offset":{"x":0,"y":55,"z":10},"length":[90,40],"width":[70,50,30],"angle":[-30,-40],"position":[-60,-20,-20],"texture":[11,63],"doubleside":true,"bump":{"position":10,"size":10}}},"typespec":{"name":"Condor","level":2,"model":4,"code":204,"specs":{"shield":{"capacity":[225,400],"reload":[7,10]},"generator":{"capacity":[70,130],"reload":[30,48]},"ship":{"mass":200,"speed":[75,105],"rotation":[50,70],"acceleration":[80,120]}},"shape":[3.3,3.015,2.45,1.959,1.658,1.477,1.268,1.11,1.148,1.237,2.34,2.448,2.489,3.283,3.363,3.501,3.586,3.333,3.496,3.502,3.154,2.52,3.016,3.132,3.054,3.006,3.054,3.132,3.016,2.52,3.154,3.502,3.496,3.333,3.586,3.501,3.363,3.283,2.49,2.448,2.34,1.237,1.148,1.11,1.268,1.477,1.658,1.959,2.45,3.015],"lasers":[{"x":0,"y":-3.3,"z":0,"angle":0,"damage":[30,60],"rate":2,"type":2,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":2.25,"y":-0.6,"z":-0.75,"angle":0,"damage":[3,6],"rate":4,"type":1,"speed":[100,130],"number":1,"spread":0,"error":0,"recoil":0},{"x":-2.25,"y":-0.6,"z":-0.75,"angle":0,"damage":[3,6],"rate":4,"type":1,"speed":[100,130],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.586}}';
Ship.A_Speedster_613= '{"name":"A-Speedster","level":6,"model":13,"size":1.5,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-95,0,0,70,65],"z":[0,0,0,0,0,0]},"width":[0,10,40,20,20,0],"height":[0,5,30,30,15,0],"texture":[6,11,5,63,12],"propeller":true,"laser":{"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"recoil":50,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,12]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":45},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":-10,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"winglets":{"offset":{"x":0,"y":-40,"z":10},"doubleside":true,"length":[45,10],"width":[5,20,30],"angle":[50,-10],"position":[90,80,50],"texture":[4],"bump":{"position":10,"size":30}}},"typespec":{"name":"A-Speedster","level":2,"model":5,"code":205,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"shape":[3,2.914,2.408,1.952,1.675,1.49,1.349,1.263,1.198,1.163,1.146,1.254,1.286,1.689,2.06,2.227,2.362,2.472,2.832,3.082,3.436,3.621,3.481,2.48,2.138,2.104,2.138,2.48,3.481,3.621,3.436,3.082,2.832,2.472,2.362,2.227,2.06,1.689,1.286,1.254,1.146,1.163,1.198,1.263,1.349,1.49,1.675,1.952,2.408,2.914],"lasers":[{"x":0,"y":-3,"z":0,"angle":0,"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.16,"y":-0.277,"z":1.35,"angle":-10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-1.16,"y":-0.277,"z":1.35,"angle":10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.621}}';
Ship.Rock_Tower_614 = '{"name":"Rock-Tower","level":6,"model":14,"size":2.1,"specs":{"shield":{"capacity":[300,500],"reload":[8,11]},"generator":{"capacity":[75,115],"reload":[35,45]},"ship":{"mass":450,"speed":[75,90],"rotation":[50,70],"acceleration":[80,90]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-90,-85,-70,-60,-20,-25,40,85,70],"z":[-10,-8,-5,0,0,0,0,0,0]},"width":[0,40,45,10,12,30,30,20,0],"height":[0,10,12,8,12,10,25,20,0],"texture":[4,63,4,4,4,11,10,12],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":30,"z":20},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-20,0,10,20,30],"z":[0,0,0,0,0,0]},"width":[0,10,15,15,10,5],"height":[0,10,15,15,10,5],"texture":9,"propeller":false},"dimeds_banhammer":{"section_segments":6,"offset":{"x":25,"y":-70,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-20,-10,-20,0,10,12],"z":[0,0,0,0,0,0]},"width":[0,0,5,7,6,0],"height":[0,0,5,7,6,0],"texture":[6,6,6,10,12],"angle":0,"laser":{"damage":[4,6],"rate":8,"type":1,"speed":[150,230],"number":1,"error":5}},"propulsors":{"section_segments":8,"offset":{"x":30,"y":50,"z":0},"position":{"x":[0,0,5,5,0,0,0],"y":[-45,-50,-20,0,20,50,40],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,0],"height":[0,15,20,25,20,10,0],"texture":[11,2,3,4,5,12],"angle":0,"propeller":true}},"wings":{"main":{"length":[55,15],"width":[60,40,30],"angle":[-10,20],"position":[30,40,30],"texture":63,"doubleside":true,"offset":{"x":0,"y":20,"z":-5},"bump":{"position":30,"size":20}},"finalizer_fins":{"length":[20],"width":[20,10],"angle":[-70],"position":[-42,-30],"texture":63,"doubleside":true,"offset":{"x":35,"y":-35,"z":0},"bump":{"position":0,"size":30}}},"typespec":{"name":"Rock-Tower","level":2,"model":6,"code":206,"specs":{"shield":{"capacity":[300,500],"reload":[8,11]},"generator":{"capacity":[75,115],"reload":[35,45]},"ship":{"mass":450,"speed":[75,90],"rotation":[50,70],"acceleration":[80,90]}},"shape":[3.78,3.758,3.974,3.976,3.946,3.508,1.532,1.64,1.556,1.426,1.347,1.298,1.269,1.764,1.894,2.075,3.269,3.539,3.933,3.989,4.058,4.127,4.524,4.416,3.634,3.577,3.634,4.416,4.524,4.127,4.058,3.989,3.933,3.539,3.269,2.075,1.894,1.764,1.68,1.298,1.347,1.426,1.556,1.64,1.532,3.508,3.946,3.976,3.974,3.758],"lasers":[{"x":1.05,"y":-3.78,"z":-0.42,"angle":0,"damage":[4,6],"rate":8,"type":1,"speed":[150,230],"number":1,"spread":0,"error":5,"recoil":0},{"x":-1.05,"y":-3.78,"z":-0.42,"angle":0,"damage":[4,6],"rate":8,"type":1,"speed":[150,230],"number":1,"spread":0,"error":5,"recoil":0}],"radius":4.524}}';
Ship.Barracuda_615 = '{"name":"Barracuda","level":6,"model":15,"size":2.4,"specs":{"shield":{"capacity":[300,400],"reload":[8,12]},"generator":{"capacity":[100,150],"reload":[8,14]},"ship":{"mass":675,"speed":[70,90],"rotation":[30,45],"acceleration":[130,150],"dash":{"rate":2,"burst_speed":[160,200],"speed":[120,150],"acceleration":[70,70],"initial_energy":[50,75],"energy":[20,30]}}},"bodies":{"body":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-90,-100,-60,-10,0,20,50,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,20,25,35,40,40,35,30,0],"height":[0,5,40,45,40,60,70,60,30,0],"texture":[10,2,10,2,3,13,13,63,12],"propeller":true},"front":{"section_segments":8,"offset":{"x":0,"y":-20,"z":0},"position":{"x":[0,0,0,0,0],"y":[-90,-85,-70,-60,-20],"z":[0,0,0,0,0]},"width":[0,40,45,10,12],"height":[0,15,18,8,12],"texture":[8,63,4,4,4],"propeller":true},"propeller":{"section_segments":10,"offset":{"x":40,"y":40,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,15,15,10,10,20,15,0],"height":[0,10,15,15,15,10,10,18,8,0],"texture":[4,4,10,3,3,63,4,63,12],"propeller":true},"sides":{"section_segments":6,"angle":90,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-80,-75,-60,-50,-10,10,50,60,75,80],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,30,35,10,12,12,10,35,30,0],"height":[0,10,12,8,12,12,8,12,10,0],"texture":[4,63,4,4,4,4,4,63,4]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":30},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-20,0,10,30,50],"z":[0,0,0,0,0,0]},"width":[0,12,18,20,15,0],"height":[0,20,22,24,20,0],"texture":[9]}},"wings":{"top":{"doubleside":true,"offset":{"x":0,"y":20,"z":15},"length":[70],"width":[70,30],"angle":[90],"position":[0,30],"texture":[63],"bump":{"position":10,"size":30}},"top2":{"doubleside":true,"offset":{"x":0,"y":51,"z":5},"length":[70],"width":[50,20],"angle":[90],"position":[0,60],"texture":[63],"bump":{"position":10,"size":30}}},"typespec":{"name":"Barracuda","level":2,"model":7,"code":207,"specs":{"shield":{"capacity":[300,400],"reload":[8,12]},"generator":{"capacity":[100,150],"reload":[8,14]},"ship":{"mass":675,"speed":[70,90],"rotation":[30,45],"acceleration":[130,150],"dash":{"rate":2,"burst_speed":[160,200],"speed":[120,150],"acceleration":[70,70],"initial_energy":[50,75],"energy":[20,30]}}},"shape":[5.28,5.25,5.332,5.393,4.944,1.997,1.745,1.556,1.435,3.587,3.81,3.779,3.838,3.84,3.779,3.81,3.587,3.205,3.571,3.9,5.132,5.888,5.835,5.551,4.886,5.808,4.886,5.551,5.835,5.888,5.132,3.9,3.571,3.205,3.587,3.81,3.779,3.838,3.84,3.779,3.81,3.587,1.435,1.556,1.745,1.997,4.944,5.393,5.332,5.25],"lasers":[],"radius":5.888}}';
Ship.O_Defender_616 = '{"name":"O-Defender","level":6,"model":16,"size":2.2,"specs":{"shield":{"capacity":[400,550],"reload":[10,13]},"generator":{"capacity":[70,100],"reload":[25,40]},"ship":{"mass":500,"speed":[70,80],"rotation":[30,40],"acceleration":[60,80]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0],"y":[-90,-88,0,90,91],"z":[0,0,0,0,0]},"width":[5,6,25,10,20],"height":[2,10,40,20,20],"texture":[63,1,10],"propeller":true,"laser":{"damage":[35,60],"rate":2,"type":2,"speed":[130,180],"number":1,"angle":0,"error":0}},"side":{"section_segments":10,"offset":{"x":50,"y":0,"z":0},"position":{"x":[-40,-5,15,25,20,0,-50],"y":[-100,-70,-40,-10,20,50,90],"z":[0,0,0,0,0,0,0]},"width":[5,20,20,20,20,20,5],"height":[15,25,30,30,30,25,0],"texture":[0,1,2,3,4,63]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,30,40],"z":[0,0,0,0,0]},"width":[0,5,10,10,0],"height":[0,5,10,12,0],"texture":[9]},"top_propulsor":{"section_segments":15,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0],"y":[80,95,100,90],"z":[0,0,0,0]},"width":[5,20,10,0],"height":[5,15,5,0],"propeller":true,"texture":[1,63,12]},"bottom_propulsor":{"section_segments":15,"offset":{"x":0,"y":0,"z":-10},"position":{"x":[0,0,0,0],"y":[80,95,100,90],"z":[0,0,0,0]},"width":[5,20,10,0],"height":[5,15,5,0],"propeller":true,"texture":[1,63,12]}},"wings":{"join":{"offset":{"x":0,"y":20,"z":0},"length":[80,0],"width":[130,50],"angle":[-1],"position":[0,-30],"texture":[8],"bump":{"position":-20,"size":15}}},"typespec":{"name":"O-Defender","level":2,"model":8,"code":208,"specs":{"shield":{"capacity":[400,550],"reload":[10,13]},"generator":{"capacity":[70,100],"reload":[25,40]},"ship":{"mass":500,"speed":[70,80],"rotation":[30,40],"acceleration":[60,80]}},"shape":[4.409,4.448,4.372,4.204,4.119,4.136,4.174,4.107,4.066,4.094,4.073,4.141,4.16,4.062,4.015,3.966,3.83,3.76,3.742,3.591,3.502,3.494,3.575,4.291,4.422,4.409,4.422,4.291,3.575,3.494,3.502,3.591,3.742,3.76,3.83,3.966,4.015,4.062,4.16,4.141,4.073,4.094,4.066,4.107,4.174,4.136,4.119,4.204,4.372,4.448],"lasers":[{"x":0,"y":-3.96,"z":0,"angle":0,"damage":[35,60],"rate":2,"type":2,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.448}}';
  // SDC
Ship.Vampire_617 = '{"name":"Vampire","designer":"nex","level":6,"model":17,"size":1.5,"specs":{"shield":{"capacity":[230,275],"reload":[6,9]},"generator":{"capacity":[190,225],"reload":[35,50]},"ship":{"mass":170,"speed":[120,130],"rotation":[90,90],"acceleration":[120,120]}},"bodies":{"main_DOESNOTSHOOT":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-35,-45,-15,10,30,45,70,100,90],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,15,25,15,15,25,20,0],"height":[0,6,13,17,13,13,17,13,0],"texture":[3,11,1,63,4,3,8,17],"propeller":true},"boris":{"section_segments":8,"offset":{"x":20,"y":30,"z":-5},"position":{"x":[0,0,-1,0,0,0,10,0,0],"y":[-105,-97,-80,-60,-20,0,20,50,40],"z":[-6.6,-10,-10,-10,0,0,0,0,0]},"width":[0,7,10,10,8,14,15,15,0],"height":[0,6,8,12,8,13,13,13,0],"texture":[6,4,1,10,8,4,13,17],"propeller":false,"angle":5,"laser":{"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"error":25,"angle":0,"recoil":15}},"propeller":{"section_segments":8,"offset":{"x":24,"y":25,"z":-5},"position":{"x":[0,0],"y":[41,40],"z":[0,0]},"width":[15,0],"height":[11,0],"texture":[69],"propeller":true,"angle":5},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-1,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-40,-25,-5,20,30,20],"z":[0,0,0,3,0,0]},"width":[0,9,12,17,10,0],"height":[0,8,12,14,13,0],"texture":[3,9,9,4],"propeller":false}},"wings":{"holy_moly_its_goku":{"offset":{"x":29,"y":44,"z":0},"length":[25,30],"width":[60,35,20],"angle":[-30,-20],"position":[0,10,25],"texture":[11,4],"doubleside":true,"bump":{"position":0,"size":10}},"what_no_way":{"offset":{"x":5,"y":45,"z":0},"length":[30,30],"width":[60,35,20],"angle":[30,20],"position":[0,15,35],"texture":[11,4],"doubleside":true,"bump":{"position":0,"size":10}},"teeth":{"offset":{"x":8,"y":-60,"z":-19},"length":[10,-10,25],"width":[15,15,55,25],"angle":[-30,-30,-20],"position":[10,3,-20,10],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}},"backteeth":{"offset":{"x":33,"y":60,"z":-10},"length":[30,-10,30],"width":[25,15,55,20],"angle":[-28,-20,-30],"position":[-20,-30,-40,-10],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}},"somanyteeth":{"offset":{"x":15,"y":10,"z":-5},"length":[10,-10,25],"width":[15,15,55,20],"angle":[30,30,50],"position":[-10,-20,-30,0],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}}},"typespec":{"name":"Vampire","level":6,"model":20,"code":620,"specs":{"shield":{"capacity":[230,275],"reload":[6,9]},"generator":{"capacity":[190,225],"reload":[35,50]},"ship":{"mass":170,"speed":[120,130],"rotation":[90,90],"acceleration":[120,120]}},"shape":[1.829,3.234,2.747,2.384,2.136,1.76,1.481,1.028,0.933,0.896,0.885,1.531,1.62,1.758,1.943,2.226,2.604,2.82,3.244,3.348,3.231,3.146,2.667,3.059,3.054,3.006,3.054,3.059,2.667,3.146,3.231,3.348,3.244,2.82,2.604,2.226,1.943,1.758,1.62,1.531,0.885,0.896,0.933,1.028,1.481,1.76,2.136,2.384,2.747,3.234],"lasers":[{"x":0.325,"y":-2.238,"z":-0.15,"angle":5,"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"spread":0,"error":25,"recoil":15},{"x":-0.325,"y":-2.238,"z":-0.15,"angle":-5,"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"spread":0,"error":25,"recoil":15}],"radius":3.348}}';
Ship.Mk47_618 = '{"name":"Mk47","level":6,"model":18,"size":1.52,"specs":{"shield":{"capacity":[200,250],"reload":[8,10]},"generator":{"capacity":[105,170],"reload":[30,50]},"ship":{"mass":150,"speed":[70,160],"rotation":[60,75],"acceleration":[100,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-10,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-65,-75,-55,-40,-5,0,30,35,70,65],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,14,18,20,23,20,20,20,0],"height":[0,5,10,11,11,11,10,12,6,0],"texture":[6,4,2,11,5,10,5,18,17],"propeller":true,"laser":{"damage":[6,10],"rate":10,"type":2,"speed":[170,200],"recoil":0,"number":1,"error":2}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-80,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[15,35,60,85,90],"z":[-1,-2,-1,-4,0]},"width":[0,8,10,6,0],"height":[0,8,10,10,0],"texture":[8.98,8.98,4]},"intake":{"section_segments":12,"angle":0,"offset":{"x":15,"y":5,"z":-2},"position":{"x":[6,6,6,-4,0,0,0,0],"y":[-25,-30,-5,30,45,65,60],"z":[-2,-2,-2,0,0,0,0,0]},"width":[0,5,10,10,13,8,0],"height":[0,6,11,12,12,8,0],"texture":[6,4,63,4,63,17],"propeller":1,"laser":{"damage":[6,8],"angle":2,"rate":4,"type":2,"speed":[140,180],"recoil":0,"number":1,"error":5}}},"wings":{"main":{"length":[10,30,20],"width":[0,55,40,20],"angle":[0,-20,0],"position":[20,20,40,15],"texture":[3,11,63],"doubleside":true,"bump":{"position":10,"size":15},"offset":{"x":0,"y":15,"z":1}},"font":{"length":[25],"width":[30,10],"angle":[-10],"position":[0,15],"texture":[63],"doubleside":true,"bump":{"position":10,"size":15},"offset":{"x":5,"y":-65,"z":-7}}},"typespec":{"name":"Mk47","level":6,"model":19,"code":619,"specs":{"shield":{"capacity":[200,250],"reload":[8,10]},"generator":{"capacity":[105,170],"reload":[30,50]},"ship":{"mass":150,"speed":[70,160],"rotation":[60,75],"acceleration":[100,140]}},"shape":[2.589,2.59,2.205,2.04,1.933,1.679,1.097,1.088,1.015,0.968,0.939,0.926,0.941,0.942,0.916,1.902,2.016,2.151,2.199,2.285,2.415,2.559,2.465,2.237,2.166,1.827,2.166,2.237,2.465,2.559,2.415,2.285,2.199,2.151,2.016,1.902,0.916,0.939,0.942,0.926,0.939,0.968,1.015,1.088,1.097,1.679,1.933,2.04,2.205,2.59],"lasers":[{"x":0,"y":-2.584,"z":-0.061,"angle":0,"damage":[6,10],"rate":10,"type":2,"speed":[170,200],"number":1,"spread":0,"error":2,"recoil":0},{"x":0.638,"y":-0.76,"z":-0.061,"angle":0,"damage":[6,8],"rate":4,"type":2,"speed":[140,180],"number":1,"spread":2,"error":5,"recoil":0},{"x":-0.638,"y":-0.76,"z":-0.061,"angle":0,"damage":[6,8],"rate":4,"type":2,"speed":[140,180],"number":1,"spread":2,"error":5,"recoil":0}],"radius":2.59}}';
Ship.Phantom_619 = '{"name":"Phantom","level":6,"model":19,"size":1.55,"zoom":0.8,"specs":{"shield":{"capacity":[130,190],"reload":[8,10]},"generator":{"capacity":[140,210],"reload":[30,43]},"ship":{"mass":150,"speed":[110,140],"rotation":[40,62],"acceleration":[130,150]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-70,-60,-30,0,20,55,75,95,85],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,14,17,14,18,14,10,0],"height":[0,5,10,13,15,15,10,8,0],"texture":[1,3,4,3,8,4,8,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-65,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-5,0,20,40,50,70,85],"z":[-7,-5,0,0,3,4,3,5]},"width":[0,5,8,9,9,6,0],"height":[0,8,10,8,8,8,0],"texture":[3,9,9,2,3,4,3,2]},"cannons":{"section_segments":8,"offset":{"x":30,"y":45,"z":-15},"position":{"x":[0,0,0,0,-10,-25],"y":[-75,-70,-53,-25,-10,0],"z":[0,0,0,0,0,0]},"width":[0,5,6,8,10,0],"height":[0,3,5,6,8,0],"angle":1,"laser":{"damage":[5,10],"rate":10,"type":1,"speed":[160,190],"number":1},"propeller":0,"texture":[6,3,3,3,1,3,1,3,1,3]},"cannons2":{"section_segments":8,"offset":{"x":25,"y":33,"z":-15},"position":{"x":[0,0,0,0,-10,-25],"y":[-75,-70,-53,-25,-10,0],"z":[0,0,0,0,0,0]},"width":[0,5,6,8,10,0],"height":[0,3,5,6,8,0],"angle":1,"laser":{"damage":[2,5],"rate":10,"type":1,"speed":[140,160],"number":1},"propeller":0,"texture":[6,3,3,3,1,3,1,3,1,3]},"body":{"section_segments":8,"offset":{"x":20,"y":0,"z":-5},"position":{"x":[-5,-3,0,0,0,0,-3,-5],"y":[-25,-20,-10,0,20,40,60,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,10,12,10,12,8,0],"height":[0,4,6,8,9,10,10,0],"texture":[1,3,1,3,4,4,17],"propeller":true}},"wings":{"w":{"offset":{"x":-3,"y":40,"z":0},"length":[12,8,20,10],"width":[90,40,80,70,85],"angle":[10,-15,-10,0],"position":[-30,-60,-60,-10,15],"texture":[4,63,4,63],"bump":{"position":10,"size":10}},"plswork":{"doubleside":true,"offset":{"x":5,"y":-25,"z":4},"length":[20,40],"width":[60,35,15],"angle":[15,-20],"position":[0,45,80],"texture":[63,4],"bump":{"position":10,"size":5}},"top":{"doubleside":true,"offset":{"x":10,"y":30,"z":5},"length":[30],"width":[50,30],"angle":[60],"position":[0,50],"texture":[3],"bump":{"position":10,"size":10}}},"typespec":{"name":"Phantom","level":6,"model":18,"code":618,"specs":{"shield":{"capacity":[130,190],"reload":[8,10]},"generator":{"capacity":[140,210],"reload":[30,43]},"ship":{"mass":150,"speed":[110,140],"rotation":[40,62],"acceleration":[130,150]}},"shape":[2.635,2.448,1.929,1.813,1.568,1.476,1.405,1.304,1.296,1.211,1.155,1.139,1.21,1.313,1.463,1.534,1.633,2.154,2.63,2.727,2.675,3.335,2.501,3.045,2.499,2.485,2.499,3.045,2.501,3.335,2.675,2.727,2.63,2.154,1.633,1.534,1.463,1.313,1.21,1.139,1.155,1.211,1.296,1.304,1.405,1.476,1.568,1.813,1.929,2.448],"lasers":[{"x":0.889,"y":-0.93,"z":-0.465,"angle":1,"damage":[5,10],"rate":10,"type":1,"speed":[160,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.889,"y":-0.93,"z":-0.465,"angle":-1,"damage":[5,10],"rate":10,"type":1,"speed":[160,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.734,"y":-1.302,"z":-0.465,"angle":1,"damage":[2,5],"rate":10,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.734,"y":-1.302,"z":-0.465,"angle":-1,"damage":[2,5],"rate":10,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.335}}';
  // SDC first version
Ship.Contraband_620 = '{"name":"Contraband","level":6,"model":20,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-80,-20,0,15,20,60,65,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,24,26,20,20,20,20,25,12,0],"height":[0,5,25,25,20,15,15,15,20,10,0],"texture":[1,2,4,63,5,10,5,63,4,17],"propeller":true,"laser":{"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"recoil":250,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-55,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,5,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"cannons":{"section_segments":12,"offset":{"x":18,"y":65,"z":20},"position":{"x":[0,0,0,0,0],"y":[-50,-45,-20,-5,5],"z":[0,0,0,0,0]},"width":[0,5,7,8,0],"height":[0,5,7,8,0],"angle":0,"laser":{"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,63,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":20,"z":0},"length":[37,0],"width":[20,70],"angle":[0],"position":[-95,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":25,"y":52,"z":0},"length":[35],"width":[10,10],"angle":[0],"position":[0,0,0,50],"texture":[8],"doubleside":1,"bump":{"position":0,"size":0}},"wing1":{"doubleside":true,"offset":{"x":50,"y":52,"z":-36},"length":[0,30,20,30],"width":[0,0,100,100,0],"angle":[110,70,90,110],"position":[0,0,0,0,0],"texture":[63],"bump":{"position":0,"size":5}}},"typespec":{"name":"Contraband","level":6,"model":15,"code":615,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"shape":[2.72,2.573,2.079,1.758,1.578,1.455,1.368,1.312,1.283,1.278,1.269,1.222,1.193,1.961,2.033,2.148,2.313,2.561,2.818,3.145,3.625,3.791,3.803,3.701,3.223,3.206,3.223,3.701,3.803,3.791,3.625,3.145,2.818,2.561,2.313,2.148,2.033,1.961,1.193,1.222,1.269,1.278,1.283,1.312,1.368,1.455,1.578,1.758,2.079,2.573],"lasers":[{"x":0,"y":-2.56,"z":0,"angle":0,"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"number":1,"spread":0,"error":0,"recoil":250},{"x":0.576,"y":0.48,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.576,"y":0.48,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.803}}';
Ship.C_Speedster_621 = '{"name":"C-Speedster","level":6,"model":21,"size":1.4,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[150,200],"reload":[20,35]},"ship":{"mass":155,"speed":[100,125],"rotation":[55,75],"acceleration":[95,145]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-85,-80,-50,0,0,70,65],"z":[0,0,0,0,0,0,0]},"width":[0,10,21,28,20,20,0],"height":[0,7,16,25,20,15,0],"texture":[63,4,11,5,18,12],"propeller":true,"laser":{"damage":[25,65],"rate":3,"type":1,"speed":[160,200],"number":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-50,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,8,10,10,0],"height":[0,10,12,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"tops":{"section_segments":12,"offset":{"x":15,"y":45,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-40,-25,0,15,40,35],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,13,11,6,0],"height":[0,5,9,8,6,5,0],"propeller":1,"angle":0,"texture":[5,4,10,63,4,17]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"join1":{"offset":{"x":0,"y":20,"z":0},"length":[37],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":0,"y":50,"z":0},"length":[30],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}}},"typespec":{"name":"C-Speedster","level":6,"model":14,"code":614,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[150,200],"reload":[20,35]},"ship":{"mass":155,"speed":[100,125],"rotation":[55,75],"acceleration":[95,145]}},"shape":[2.38,2.312,2.007,1.668,1.485,1.388,1.314,1.274,1.253,1.179,1.113,1.066,1.042,1.043,1.487,1.656,1.757,1.903,1.92,2.239,2.689,3.102,3.328,3.238,2.423,1.964,2.423,3.238,3.328,3.102,2.689,2.239,1.92,1.903,1.757,1.656,1.487,1.043,1.042,1.066,1.113,1.179,1.253,1.274,1.314,1.388,1.485,1.668,2.007,2.312],"lasers":[{"x":0,"y":-2.38,"z":0,"angle":0,"damage":[25,65],"rate":3,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.328}}';
Ship.B_Speedster_622 = '{"name":"B-Speedster","level":6,"model":22,"size":1.6,"specs":{"shield":{"capacity":[250,350],"reload":[8,10]},"generator":{"capacity":[90,150],"reload":[25,40]},"ship":{"mass":210,"speed":[90,100],"rotation":[50,70],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-100,-95,0,0,60,85,75],"z":[0,0,0,0,0,0,0]},"width":[0,10,40,20,22,15,0],"height":[0,5,30,30,20,15,0],"texture":[6,18,5,11,15,17],"propeller":true,"laser":{"damage":[48,94],"rate":1,"type":2,"speed":[185,240],"recoil":70,"number":1,"error":0}},"core":{"vertical":true,"angle":180,"section_segments":[30,90,150,210,270,330],"offset":{"x":0,"y":-5,"z":-40},"position":{"x":[0,0,0,0,0,0,0],"y":[-40,-40,-43,-40,-30,0,0],"z":[0,0,0,0,0,0,0]},"width":[1,13,18,23,30,30,0],"height":[1,13,18,23,30,30,0],"texture":[16.9,4.9,63,3.9,9.9,0.9,11.9]},"ye":{"vertical":true,"section_segments":12,"offset":{"x":0,"y":38,"z":-40},"position":{"x":[0,0,0],"y":[-10,-3,-1],"z":[0,0,0]},"width":[0,5,0],"height":[0,5,0],"texture":[5]},"shield":{"section_segments":12,"offset":{"x":30,"y":-40,"z":0},"position":{"x":[-6,0,0,0,0,-4],"y":[-70,-60,-10,15,30,40],"z":[0,0,0,0,0,0]},"width":[0,3,3,3,3,0],"height":[0,5,5,8,3,0],"texture":63,"angle":16},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,17]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":0,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}}},"typespec":{"name":"B-Speedster","level":6,"model":13,"code":613,"specs":{"shield":{"capacity":[250,350],"reload":[8,10]},"generator":{"capacity":[90,150],"reload":[25,40]},"ship":{"mass":210,"speed":[90,100],"rotation":[50,70],"acceleration":[100,130]}},"shape":[3.384,3.353,3.037,2.443,2.076,1.832,1.659,1.541,1.458,1.406,1.378,1.341,1.248,1.801,2.197,2.375,2.52,2.637,3.021,3.288,3.665,3.862,3.713,2.623,2.758,2.725,2.758,2.623,3.713,3.862,3.665,3.288,3.021,2.637,2.52,2.375,2.197,1.801,1.248,1.341,1.378,1.406,1.458,1.541,1.659,1.832,2.076,2.443,3.037,3.353],"lasers":[{"x":0,"y":-3.2,"z":0,"angle":0,"damage":[48,94],"rate":1,"type":2,"speed":[185,240],"number":1,"spread":0,"error":0,"recoil":70},{"x":0.96,"y":-0.32,"z":0.96,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-0.96,"y":-0.32,"z":0.96,"angle":0,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.862}}';
  // Mcst
Ship.Bolt_623 = '{"name":"Bolt","level":6,"model":23,"size":1.5,"zoom":0.85,"specs":{"shield":{"capacity":[180,250],"reload":[6,8]},"generator":{"capacity":[80,130],"reload":[49,70]},"ship":{"mass":200,"speed":[135,165],"rotation":[55,75],"acceleration":[120,180]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-115,-125,-115,-100,-55,5,40,60,85,95,90],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,8,12,25,35,30,30,25,17.5,0],"height":[0,3,7,10,15,20,20,20,15,10,0],"texture":[6,6,10,4,3,63,4,11,12,17],"propeller":true,"laser":{"damage":[35,46],"rate":2,"speed":[165,210],"number":1,"recoil":10,"type":1}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-40,"z":6},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-20,10,35,60,120],"z":[0,0,0,3,8,13]},"width":[0,10,17,17,14,0],"height":[0,15,20,20,15,0],"propeller":false,"texture":[9,9,9,10,4]},"cannons":{"section_segments":12,"offset":{"x":20,"y":-34,"z":-2},"position":{"x":[-5,1,3,0,0,0,0,0],"y":[-70,-55,-40,-20,0,20,30,20],"z":[0,0,0,0,0,0,0,0]},"width":[0,4,5,8,8,8,3,0],"height":[0,4,5,7,7,7,3,0],"texture":[6,2,63,4,63,6,12],"angle":0,"laser":{"damage":[6,8],"rate":5,"type":1,"speed":[130,200],"number":1,"error":5}},"propulsors":{"section_segments":10,"offset":{"x":30,"y":20,"z":-17},"position":{"x":[-10,-7.5,-5,-5,-2.5,0,0,0,0,0,0],"y":[-55,-45,-30,0,10,20,25,50,70,80,70],"z":[10,7.5,6,3,0,0,0,0,0,0,0]},"width":[0,5,10,15,15,15,15,20,20,15,0],"height":[0,5,10,15,15,15,15,15,15,10,0],"texture":[63,4,11,4,2,3,63,2,12,16.9],"propeller":true}},"wings":{"main":{"doubleside":true,"offset":{"x":20,"y":40,"z":10},"length":[40,25],"width":[60,40,30],"angle":[-10,-10],"position":[-10,15,20],"texture":[11,63],"bump":{"position":0,"size":5}},"front":{"doubleside":true,"offset":{"x":5,"y":-90,"z":5},"length":[14,11,20],"width":[25,45,45,25,25,25],"angle":[0,0,0,0,0],"position":[10,25,65,35],"texture":[3,63,4],"bump":{"position":0,"size":5}},"winglets":{"doubleside":true,"offset":{"x":0,"y":67,"z":10},"length":[33,30],"width":[35,30,20],"angle":[35,-15],"position":[0,30,10],"texture":[63,8],"bump":{"position":10,"size":5}}},"typespec":{"name":"Bolt","level":6,"model":17,"code":617,"specs":{"shield":{"capacity":[180,250],"reload":[6,8]},"generator":{"capacity":[80,130],"reload":[49,70]},"ship":{"mass":200,"speed":[135,165],"rotation":[55,75],"acceleration":[120,180]}},"shape":[3.154,3.152,3.002,2.571,1.97,2.52,2.349,2.054,1.665,1.355,1.154,1.074,1.082,1.112,1.163,1.242,2.872,3.113,3.379,3.286,3.106,3.217,3.331,3.456,3.49,3.457,3.49,3.456,3.331,3.217,3.106,3.286,3.379,3.113,2.872,1.242,1.163,1.112,1.082,1.074,1.154,1.355,1.665,2.054,2.349,2.52,1.97,2.571,3.002,3.152],"lasers":[{"x":0,"y":-3.15,"z":0,"angle":0,"damage":[35,46],"rate":2,"type":1,"speed":[165,210],"number":1,"spread":0,"error":0,"recoil":10},{"x":0.45,"y":-3.12,"z":-0.06,"angle":0,"damage":[6,8],"rate":5,"type":1,"speed":[130,200],"number":1,"spread":0,"error":5,"recoil":0},{"x":-0.45,"y":-3.12,"z":-0.06,"angle":0,"damage":[6,8],"rate":5,"type":1,"speed":[130,200],"number":1,"spread":0,"error":5,"recoil":0}],"radius":3.49}}';
Ship.Space_Dragster_624 = '{"name":"Space-Dragster","level":6,"model":24,"size":2,"zoom":0.9,"specs":{"shield":{"capacity":[200,300],"reload":[5,8]},"generator":{"capacity":[100,155],"reload":[54,64]},"ship":{"mass":230,"speed":[140,200],"rotation":[45,57],"acceleration":[80,130]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-150,-145,-110,-90,-30,10,50,70,65],"z":[0,0,0,0,0,0,0,0,0]},"width":[5,10,12.5,15,20,20,20,15,0],"height":[0,5,17,20,30,30,20,15,0],"texture":[11,2,3,11,63,4,12,17,17],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":22.5},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,70],"z":[3,0,0,0,-1,4]},"width":[0,10,12,10,0],"height":[0,13,15,12,0],"texture":[9,9,9,2]},"side_propulsors":{"section_segments":12,"offset":{"x":40,"y":10,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-25,-30,-10,0,20,30,50,60,54],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,15,15,15,15,15,10,0],"height":[0,5,20,20,20,20,20,10,0],"propeller":true,"texture":[17,3,4,10,2,3,15,17]},"boink":{"section_segments":10,"offset":{"x":20,"y":10,"z":0},"position":{"x":[-10,-5,-2,0,0,0,0,0,0,-6],"y":[-130,-105,-50,-25,-5,5,15,30,60,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,15,15,15,15,15,15,10,0],"height":[0,5,10,10,10,10,10,10,10,0],"propeller":false,"texture":[4,4,3,2,1,63,4,4,63]},"cannons":{"section_segments":12,"offset":{"x":15,"y":-70,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-45,-20,0,5,20,30,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,7,10,9,7,5,0],"height":[0,5,7,10,9,7,5,0],"angle":0,"laser":{"damage":[7,12.5],"rate":10,"type":1,"speed":[140,190],"number":1,"angle":0,"error":0},"propeller":false,"texture":[6,4,10,63,4,63]}},"wings":{"winglets":{"offset":{"x":0,"y":-45,"z":0},"doubleside":true,"length":[45,20],"width":[50,60,50],"angle":[0,0],"position":[90,75,70],"texture":[4],"bump":{"position":10,"size":10}},"space_spoiler":{"offset":{"x":5,"y":30,"z":15},"doubleside":true,"length":[20,30],"width":[40,40,20],"angle":[50,0],"position":[0,40,40],"texture":[63,4],"bump":{"position":10,"size":10}}},"typespec":{"name":"Space-Dragster","level":6,"model":16,"code":616,"specs":{"shield":{"capacity":[200,300],"reload":[5,8]},"generator":{"capacity":[100,155],"reload":[54,64]},"ship":{"mass":230,"speed":[140,200],"rotation":[45,57],"acceleration":[80,130]}},"shape":[5.604,5.467,4.388,3.141,2.619,2.265,2.027,1.804,1.66,1.975,2.012,2.085,2.196,2.62,2.682,2.793,2.962,3.208,3.28,3.324,3.572,3.729,3.666,3.67,3.437,3.206,3.437,3.67,3.666,3.729,3.572,3.324,3.28,3.208,2.962,2.793,2.682,2.62,2.6,2.085,2.012,1.975,1.66,1.804,2.027,2.265,2.619,3.141,4.388,5.467],"lasers":[{"x":0.6,"y":-4.8,"z":-0.2,"angle":0,"damage":[7,12.5],"rate":10,"type":1,"speed":[140,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.6,"y":-4.8,"z":-0.2,"angle":0,"damage":[7,12.5],"rate":10,"type":1,"speed":[140,190],"number":1,"spread":0,"error":0,"recoil":0}],"radius":5.604}}';

var ships = [];
for (let ship in Ship) ships.push(Ship[ship]); 

var vocabulary = [
  { text: "You", icon:"\u004e", key:"O" },
  { text: "Me", icon:"\u004f", key:"E" },
  { text: "Wait", icon:"\u0048", key:"T" },
  { text: "Yes", icon:"\u004c", key:"Y" },

  { text: "No", icon:"\u004d", key:"N" },
  { text: "Hello", icon:"\u0045", key:"H" },
  { text: "Sorry", icon:"\u00a1", key:"S" },
  { text: "Thanks", icon:"\u0041", key:"X" },

  { text: "Attack", icon:"\u0049", key:"A" },
  { text: "Follow Me", icon:"\u0050", key:"F" },
  { text: "Good Game", icon:"\u00a3", key:"G" },
  { text: "Spectate", icon:"\u0059", key:"L" },

  { text: "Gems", icon:"\u0044", key:"M" },
  { text: "Stats", icon:"\u0078", key:"K" },
  { text: "Hmm", icon:"\u004b", key:"Q" },
  { text: "No Prb", icon:"\u0047", key:"P" },
  
  { text: "Discord", icon:"\u007b", key:"D" },
  { text: "Idiot", icon:"\u0079", key:"I" },
  { text: "Arena", icon:"\u00be", key:"B" }, 
  { text: "Lag", icon:"\u0069", key:"J" }
];

var map =
"                                                            6 7     2 3   7 7 8 2 3 4     8 9    3     7 8   3 4 5   8 9     4              4     8 9                                                   \n"+
"                                                  7 8 9     4       9    3 4     8 9   4 5 6 8 9 9     6      9     5 6   9 9 2   5 6     2       7                                                     \n"+
"                  79                               4 5   8 9 2 4 5 6   9 2 3          9 9     6 7   9 2   5 6                    2 3   6 7 8   3 4   7 8                            97                  \n"+
"                  997                                           2 3   6 7 8 9 3 3   7 7            6 7     3     7 8   3 4     8 9            8 9   3 4                            799                  \n"+
"                  997                           7 8   3 4     8 9            8 9   3 4 5 7 8 9   4 5            4       9 9   5 6   9 9     5                                      799                  \n"+
"                 9997                                8 9 9 3 4 5 6 8 9 2   5              5     9 2   5 6     9       6      9       6 7   2 3   6 7 8                             7999                 \n"+
"                 997                                 6      9     5 6 7 9 2 3   6 7     3              2     7     2 3     7       4      7       4 5                               799                 \n"+
"                 997                              2 3     7 8     4      7     3 4   7 8 9   3 4     8              8     4 5   8 9     5       9      5                            799                 \n"+
"                9997                             7 8     4 5   8 9 9   4 5            4     8 9   4 5     9                      6     9 2   5 6 7   2 3                            7999                \n"+
"                997                              6      9     5 5   9 9 2   5 6     2              2     6     9 2     7                      3     7 8                              799                \n"+
"               9997                             2     6 7     3      6     2 3   6 7 8   3 4     8              8     3 4   7 8   3 4                                                7999               \n"+
"               997                             7     3 4   7 8   3 4 5     9      4     8 9   3 4     8                      5     9 9   5 6   9 9 2                                  799               \n"+
"              9997                                        4 5     9 9   5 6   9 9                    5 6   9       6     9                2     6 7   2 3                             7999              \n"+
"             9997                               5 6 7   9 2            9 2     6 7   2 3   6 7                    3     7 8     3     7                8                               7999             \n"+
"            9997                                 2 3   6 7   2 3     7 8            7       4 5   8     3                      8     4 5     9     5 6                                  7999            \n"+
"          99997                                8              8 9   4 5   8 9     5              5       9     5     9                      6     9 2 3   7                              79999          \n"+
"        999997                              4 5 6   9 9     6              6     9 2   5 6     2              2       7     3     7                      3                                799999        \n"+
"     99999977                                2     6 7   9 2     6 7     3              3     7 8   3                      8       4     8     4       9 2                                 77999999     \n"+
"  799999977                                               8     3 4   7 8     4                      9     5     9                      5       2     6 7                                    779999997  \n"+
"  9999777                                   5   8       5              5     9 9   5 6     9                            2     6                      3                                         7779999  \n"+
"   777                                         5 6   9 2     6       2              2     6 7   2 3                                  8     3       8       5                                      777   \n"+
"                                                      7     3 4   7 8     3                      8     4     8     4                              5     9 2 3                                           \n"+
"                                            8     3                4     8 9   4 5     9                            9     5     9                        7                                              \n"+
"                                           4 5     9     5     9 2                    6 7   9 2     6     2                            3     7                                                          \n"+
"                                         2              2 3     7     3     7                      3     7                                          9 9   4 5 6                                         \n"+
"                                          8   3       8              8       4     8     4       9              9     5                                    2 3                                          \n"+
"                                               9     5     9       5              5       2     6     9                      6     2                     8                                              \n"+
"                                                            6     2     6 7     3              3                                                8       5     9 9                                       \n"+
"                                          2 3                            4     8     3       8              8                                          9     5 6 7                                      \n"+
"                                           8     4     8                              9     5     9                      6                                                                              \n"+
"                                                        6     9     5       2                      7     3     7                      3                   8 9     5                                     \n"+
"                                      9                              3     7     3       8              8                                          9       6     9 2                                    \n"+
"                                       7     3     7                              9     4     9 9   4                5                                          6     2                                 \n"+
"                                   4                      9     5       9     5                6     2     6     9                                    7     3 4                                         \n"+
"                                    2     6                            6     2       7     3                            3     7                              9 9   5 6                                  \n"+
"                                         3                                          4     8 9     5                                        5                        2     6                             \n"+
"                               3                      8             9     5                      9     5                                                2 3     7                                       \n"+
"                                9           9                      6       2     6     2                      7     3                                    8     4 5   8 9                                \n"+
"                                                                                3             4     8                            8                                    6     9                           \n"+
"                           3                                          4                      9                                                6             7                                           \n"+
"                            9     4     8                                    6     9                      6                                          8     3 4     8     4       9                      \n"+
"                                                     6                      2             3     7                      4                                          5     9       6 7                     \n"+
"                       2                                          3     7                8       5     9                            9     5             6                      3     7                  \n"+
"                        8     4     8                                    5     9     5                6                                                3       8     3               5                  \n"+
"8                   5                            5                              7     3     7     2                                                           4     8       5     9 2                   \n"+
"7              7                                              3             3                      8     4     8                                          9                      6 7     3              \n"+
" 4 7 7     3              3                                          4     8                                                5                              7     3     7                 9    3 4     8 \n"+
"    4 5   8     4                      9                                          2     6                                                3                              4     8     4 5 6   9 2         \n"+
"  2              2                                  6                   3                      8     3                                                9                              2 3   6 7   9 3    \n"+
" 7 8   3                                                         4             4                            5     9                                          2     6               8              8     \n"+
"4     8 9   3 4                    8                                          9                   6                            7                                    4     8     4 4     9 9     5       \n"+
"2     6      9     5     9                      6                   2                      7     3                                          4                                    9     5 6 7 9 2     6  \n"+
"   2 3     7                                                 3             4     8                      4     8                                          9     5                       4      7     3 4 \n"+
"  7 8   3 4     8                                        8                9                   5                            6                                    3     7     3       8 9     4           \n"+
"  5      9     4     8                                          9     5                                                                 3                                    9     5 6   9 9 2   5      \n"+
" 2 3 5 6                          6                                    3     7     3                                                                 9             9                      6     2 3   6 \n"+
"      3 4   7     3                            3                                                9                                                                 7             7     3 4 5            4\n"+
"6          4                                                9             9                                  6                                          7                      4 5     9 9   5 6   9 9  \n"+
" 5 6 6   9              9                                          2                                                                                           9     5                      9 2     6   \n"+
"  2     6 7   2                      7                            7                   4                                              7 9                                    7     2 3     7 8           \n"+
"8 9    3       8                                  4     8             9                                                                             7                              8 9   4 5   8 9     5\n"+
" 6   9 9            9                                          2     6                                                                                     8     4                              6     9 \n"+
"    6 7   9                      6                                                                                                 9                              2     6     9       7 7     3         \n"+
"    4      7     3           3                4                   8                                                                             6                              8     3 4   7 8     4    \n"+
" 8 9     5                                9                9                                                                                           8     3                              5     9 2   \n"+
"5 6   9 9     6                                        6                                                                                                      9     5     9       6       3             \n"+
"3            2     6                                          8     3                                                                 9                   6                7     3 4   7 8 9   3 4     8\n"+
" 9 3 4                          4                                                                                                                  7                   3                4     8 9   4 5 \n"+
"    9 2   5     9                            9                                                                                                                  5             5     9 2                 \n"+
"  7      2     6                                          7                                                                                                                  2       7 8   3 4   7 8    \n"+
" 4 4   8              8     3                                                                                                                                      3                      8       4 5   \n"+
"9     4 5   8                            9                                                                                                                                5     9       5              5\n"+
"7    9       6                                        6                                                                                           5                              6     2 3   6 7     3  \n"+
"   7 8            7                                                                                                                                      6     2                              4     8 9 \n"+
"  4 5   8 9   3                4                                                                                                                                      4     8       5              5    \n"+
"  2      5     9           9                                                                                                                  4                              6     9 2   5 6     2      \n"+
" 7   2 3                                7                                                                                                                  9                              3     7 8   3 \n"+
"4   7 8     4                                        4                                                                                                      8     3     7               9              9\n"+
"           9     4                                                                                                                                                             9     5 6     9     5 6  \n"+
" 9 2     6                    2                                                                                                                  5                   9                      6 7   2 3   \n"+
"6 7 8   3     7                            8     3                                                                                                            3                   7       4             \n"+
"5      8     4                                                                                                                                                             8             9     5 6     9\n"+
" 3   6                    9                                                                                                                                      9                      6       2     6 \n"+
"    2 3   6                            7                                                                                                                                3     7       3              3  \n"+
"   7       4                                        4                                                                                                                  8             8     4       9    \n"+
" 5 6            5                                 5                                                                                                  5       9                      5       2     6 7   \n"+
"2 3   6 7   9                                                                                                                                                       2     6                      3      \n"+
"       3     7           7                                                                                                                                                 4     8     3     7 8       5\n"+
"   8                                  5                                                                                                                  8                              9     5     9 2 \n"+
"  5 6   9                                          2                                                                                                            9     5             6                7  \n"+
"         7     3     7                                                                                                                                                       7     3             3      \n"+
" 9                                4                                                                                                                                8                      4     9 9     \n"+
"5     9                                        9                                                                                                            9             9                            2\n"+
"     6     2                                                                                   5555  5555                                                                6                   3       8  \n"+
" 3                4     8                                                                     55999  99955                                                     7                      4     8       4   \n"+
"              8     4                5                                                       5599      9955                                             8             9     5                      9    \n"+
"6   9     5                      9                3                                          599        995                                                          6             6     2              \n"+
"     7                                        7                                              59          95                                                7     2                3             4     8 \n"+
" 4                                                                                           59          95                                                       8     4     8                9       6\n"+
"9 9   4                      9                                                                                                                                           2     6     9     5            \n"+
"       2                                  7                                                                                                            6             7                            7     \n"+
"                                                       4                                     59          95                                                   8     3             4                     \n"+
"  4 5                                                                                        59          95                                               4                5     9                     6\n"+
"   9     5     9                                                                             599        995                                                            9     6          3     7       3 \n"+
" 7                          7                                                                5599      9955                                                  3                      7     3     7    8  \n"+
"4     8                                  4                                                    55999  99955                                            4     8       4     8                      5     9\n"+
"     5                                                                                         5555  5555                                                          9     5       9                      \n"+
"                  2                                                                                                                                      2                      7     2             3   \n"+
"  7     3                      8                                                                                                                                4     8     3                4     8 9  \n"+
" 4                                          5     9                                                                                                                    5     9     5     9              \n"+
"              9                                                                                                                                            5       2                3           2     7 \n"+
"8   2                      7                                                                                                                                3     7     3       8                      4\n"+
"     8                                  5                                                                                                                                9     4     8                  \n"+
"                                                     2                                                                                                 5       9                      6     2     6     \n"+
"2 3     7                                         5                                                                                                  5  2     6     2 3     7                      4    \n"+
" 8     4     8                                                                                                                                                       8     4     8 9                    \n"+
"                          5                                                                                                                                9                      5     9     5       2 \n"+
"3   6     2                            2                                                                                                                  6 7     2     6                      3     7 8\n"+
"   3 4                                              8                                                                                                            7     3 4     8     4                  \n"+
" 9              9     4                                                                                                                                8     4                5     9             9     \n"+
"5 6   9                            2                                                                                                                    6     9     6     9                      6 7    \n"+
"       7                                        8                                                                                                                    3     7     3     7                \n"+
"            8                                                                                                                                            3 4     8                      5     9     5   \n"+
"  9 9                    5                                                                                                                                9     5 6   9 9     6                      2  \n"+
"   6     2                            3                                                                                                                                7     2 3   6                    \n"+
" 4                                                 9                                                                                                 3       8                      4     8     4       \n"+
"9     5                                                                                                                                               9     4 5   8 9     5                      9     6\n"+
"     9     6                                                                                                                                                       6     2 3   6 7     2                \n"+
"                        3                                    9                                                                             6             7       4              3     8     3       8   \n"+
"  4     8                            9     4                                                                                                            4 5     9     4                      9     5    \n"+
" 9 2   5                                                2                                                                                                      5     9 2     6     2     6              \n"+
"              7     2                                          4                                                                                           2                      7 8     4     8     3 \n"+
"4   8 8                          8                                                                                                                          8     4     8       4              4 5     9\n"+
"     5     9                                  6                                                                                                                  9       5     9     5                  \n"+
"          6                                                3                                                                                           9       6              6       3     7     3     \n"+
"7 8     3              3                                          5                                                                                     7     3     7 8     4              4       9    \n"+
" 5     9     4                      9                                                                                                 3                              5     9     4 5     9              \n"+
"                                                 7                                                                                                 9       6                      2     6     2 3     7 \n"+
"  2 3                                        3                4                                                                                           2     6 7     3                      8     4  \n"+
"   8 9   4     8                                          9                                                                                                      4     8 9   4 5     9                  \n"+
"                5           5                                    27                                                                  7   4                                    9     6     9 2     6     \n"+
"2     6                                  3                                                                                                            2       7     2     6                7     3 4   7\n"+
"     3 4     8                                        8                                                                 6                                          7 8     4     8     4                \n"+
"            5     9                                          2     6                                                                 4                   8       5              5 6   9 9     6     9   \n"+
"  6 6     2                    6                                    3     7     3                                                                 9             2     6       2              2     6 7  \n"+
"   3     7     3                            4                                                9                                                                 7       3     7 8   3       8            \n"+
"        4       9                                        9             2                                  6                                          8                      4       9     5     9 9     \n"+
"6     9              9                                          3     7                                                4                                    9     5       2              9       7     2\n"+
"     7     2 3                    7                                          9     4                                                9                              3     7 8   3 3     8              7 \n"+
"            8     4     8     4                5                                                9                                                7                              9     4 5   8 9     5   \n"+
"8 9                                                                                                          7                                          9     4       9       6              6     2 3  \n"+
" 6 7   9 3   6 7     2                                  7                      4                                          5                                    2     6 7   2 3     7                    \n"+
"              3 4   7     3                                          4                      9                                          2     6             7                8     4 5   8 9     4       \n"+
"9   4       9                          9                                    6                            7                                          8     4       9     4 5                    9 2   5 6\n"+
"                 2                                  6                                                                 4                                          5 6   9 2     6 7   2 3                \n"+
"                7 8     3                                  8     4                                                                 9                                          3     7 8                 \n"+
"                       8     4                                    9     5     9                                                                 7             8     4       9                           \n"+
"                     6                    9                                                7                                                                 5       9     6 6   9 2                    \n"+
"                    3     7                            7                                                4                                          6                      2       7                     \n"+
"                           4                                  9     5                                                2                                    7     3       8       5                       \n"+
"                                5                                          7     2                                                8                              9     5 6   9 9                        \n"+
"                            2                      7                   3                      8                                                5                                                        \n"+
"                             8           8                      4                                          5     9                                    7     2       7       4                           \n"+
"                                                      5                      9                                                7                              8     4 5   8                              \n"+
"                                                             7     2                      7                                                4                                                            \n"+
"                               3     7                                    4     8                      5                                          6     2       7     2 3                               \n"+
"                                      5     9     4                                                                 2                                          4     8                                  \n"+
"                                                   2     6     2                                                                 8                                                                      \n"+
"                                         3                      8     4     8                                          9                      5             6     2 3                                   \n"+
"                                        8                                    5           5                                          6                      3       8                                    \n"+
"                                               9     5                                                2                                          4                                                      \n"+
"                                     2     6                7     3     7                                    4     8                                          9                                         \n"+
"                                            4     8     4                5     9     4                              6     9     6     9                        7                                        \n"+
"                                                 5       9     5     9                            2             2                3     7     3     7                                                    \n"+
"                                         7     2              2             3                            3     8       4                            5     9                                             \n"+
"                                              7     3       8              8                                          9     5                                                                           \n"+
"                                                     9     5     9                      5             6     2                      7     2                                                              \n"+
"                                           9                      7     2     6                      3       8     4     8                      4     8                                                 \n"+
"                                            8   2 3     7                            8     4                      9       5     9     5                                                                 \n"+
"   777                                           8     4 5   8 9     5                            5     9       6              6                   2                                              777   \n"+
"  9999777                                      6              6     9     6                              7     3     7 8     4              3             4                                    7779999  \n"+
"  799999977                                 2 3     7       3              3     7     3                              5     9     4                      9                                   779999997  \n"+
"     99999977                                8     3 4   8 8     4                      9     5     9     5 5                      2     6     2                                           77999999     \n"+
"        999997                                                  9 2   5 6     9     6                6     2 3   6 7   2 3                      8     3                                   799999        \n"+
"          99997                                 6 7   2 3                    7     2       7     3                4     8 9   4 5   8 9                                                  79999          \n"+
"            9997                               3       8 9   3 4   8 8                    4     8 9     5     9                      5     9     5       2                              7999            \n"+
"             9997                                           9       5     9     5       9              9 2   6 7     2 3   6 7                    3     7                              7999             \n"+
"              9997                                9 2     6       3      6       3     7     2       7              7     3 4     8     4                                             7999              \n"+
"               997                                 7     3 4   7 8     4              3       8     4     8 9     5              5     9 9     5     9                                799               \n"+
"               9997                              5              5     9 9   4 5     9              9       6     9 2   6 7     2              2     6                                7999               \n"+
"                997                             9     5 6     2              2     6     2 3     7              7       3     7 8   3 4     8                                        799                \n"+
"                9997                                 2 3   6 7 8   3 4     8              8     3 4   7 8     4       9      4       9     5     9                                  7999                \n"+
"                 997                                        4     8 9   4 5   8 9       5              5     9 2   5 6 7   9 3     7      9       6                                 799                 \n"+
"                 997                              5 6     9       6      9     5 6   9 2   5 6       3      6       3     7 8   2 3   6 7              7                            799                 \n"+
"                 9997                            9 2   6 6 7   2 3   6 7              7     3 4   7 8 9 3 3 4     8       5      8     4 5   8 9   4                               7999                 \n"+
"                  997                                         7 8   3 4 5   8 9   4 5                    9 9   4 5 6 8 9 2   5 6              6     9                              799                  \n"+
"                  997                           5   8 9     5              5 6   9 9 2   5 6   9 2       7            6 7   2 3 4 6 7 8   2                                        799                  \n"+
"                  79                                 6 7   9 2   6 6     2 3            2     6 7 8   3 4   7 8 9   4 4            3 4   7 8   3 4                                  97                  \n"+
"                                                   3      7       3 4   7 8   3 4     8 9            8     4 5 5   9 9 2 4 5 6   9 2            9     5                                                 \n"+
"                                                7 8     4       9      4       9     5 6 7 9 9 2   5 6     2      5     9 2 3   6 7   2 3     7                                                         ";

this.options = {
  // Game Options
  map_name: "Meg's Dueling v0.3.3",
  max_level: 6,
  max_players: 20,
  starting_ship: 613,
  starting_ship_maxed: true,
  map_size: 200,
  speed_mod: 1.2,
  weapons_store: false,
  radar_zoom: 3,
  reset_tree: true,
  
  // Asteroids
  crystal_value: 0.2,
  asteroids_strength: 1.5,
  
  // Others Options
  soundtrack: "argon.mp3", //civilisation.mp3 | procedurality.mp3 | argon.mp3 | crystals.mp3
  vocabulary: vocabulary,
  ships: ships,
  custom_map: map,
};

var ship_instructor = function(ship, message, character = "Lucina", delay = 0, hide_after = 0) {
  if (!ship || !message || !message.length) {
    return;
  }
  let instructor_func;
  if (hide_after) {
    instructor_func = function() {
      ship.showInstructor();
      ship.instructorSays(message, character);
      setTimeout(() => { ship.hideInstructor() }, hide_after * 650);
    };
  } else {
    instructor_func = function() {
      ship.showInstructor();
      ship.instructorSays(message, character);
    };
  }
  setTimeout(instructor_func, delay * 650);
};

this.tick = function(game) {
for (let ship of game.ships) {
  let max_crystals = 20 * Math.trunc(ship.type / 100)*Math.trunc(ship.type / 100);
  if (ship.custom.crystals_last_updated != ship.last_updated && ship.crystals >= max_crystals) {
    ship.set({crystals: max_crystals - 1});
    ship.custom.crystals_last_updated = ship.last_updated;
  }
  if (ship.custom.invulnerable_last_updated != ship.last_updated && ([admin_ship_codes].includes(ship.type) || dist2points(ship.x, ship.y, safeZone.x, safeZone.y) <= safeZone.radius)) {
    ship.set({invulnerable:100});
    ship.custom.invulnerable_last_updated = ship.last_updated;
  }
  if (game.step % 15 === 0) {
    if (ship.custom.init !== true) {
      ship.custom.init = true;
        ship_instructor(ship, "GET SOME TIPS!\nPush [9] to regen and max your ship", "Zoltar");
        ship_instructor(ship, "Push [8] to become spectator, [8] to exit it", "Zoltar", 5);
        ship_instructor(ship, "Push [0] to open the menu", "Zoltar", 10, 5);
        ship.setUIComponent({ 
          id: "radar_background",
          visible: true,
          components: [
            {type:"round",position:[46,46,8,8],fill:"rgba(0, 255, 0, 0.30)",stroke:"rgba(0, 255, 0, 0.70)",width:1.5},
            {type:"round",position:[89,89,21,21],fill:"rgba(255, 0, 0, 0.20)",stroke:"rgba(255, 0, 0, 0.70)",width:1.5},
            {type:"round",position:[-10,-10,21,21],fill:"rgba(255, 0, 0, 0.20)",stroke:"rgba(255, 0, 0, 0.70)",width:1.5},
            {type:"round",position:[89,-10,21,21],fill:"rgba(255, 0, 0, 0.20)",stroke:"rgba(255, 0, 0, 0.70)",width:1.5},
            {type:"round",position:[-10,89,21,21],fill:"rgba(255, 0, 0, 0.20)",stroke:"rgba(255, 0, 0, 0.70)",width:1.5},
            ]
        });
        ship.setUIComponent(Menu_);
        ship.setUIComponent(Regen);
        ship.setUIComponent(Spectate);
      }
      var level = Math.trunc(ship.type / 100);
      if (level < 7) {
        var max_stats = 11111111 * level;
        if (ship.custom.keep_maxed) {
          if (ship.stats != max_stats) {
            ship.set({stats:max_stats});
          }
        }
      } else if (ship.stats > 0) {
        ship.set({stats:0});
      }
    }
  }
  if (!game.custom.admin && game.ships[0]) {
    game.custom.admin = true;
    game.ships[0].setUIComponent(Admin);
  }
};

// Delays
switch_ship_delay *= 60;
spectator_switch_delay *= 60;
dueling_arena_delay *= 60;
spawn_zone_delay *= 60;
TP_points_delay *= 60;
Regenerate_delay *= 60;
Stats_delay *= 60;

var next_ship_button = function(ship) {
  if (ship.custom.spectator) {
    spectator_ship(ship);
  } else if (!ship.custom.next_switch || game.step >= ship.custom.next_switch) {
    ship.custom.next_switch = game.step + switch_ship_delay;
    var next_type;
    if (ship.type >= switch_ship_codes[0] && ship.type <= switch_ship_codes[1]) {
      if (ship.type === switch_ship_codes[1]) {
        next_type = switch_ship_codes[0];
      } else {
        next_type = ship.type + 1;
      }
    } else {
      next_type = ship.custom.last_ship || switch_ship_codes[0];
    }
    ship.custom.last_ship = next_type;
    ship.set({type: next_type, collider: true, shield: 999, crystals: 720});
  }
};

var previous_ship_button = function(ship) {
  if (ship.custom.spectator) {
    spectator_ship(ship);
  } else if (!ship.custom.next_switch || game.step >= ship.custom.next_switch) {
    ship.custom.next_switch = game.step + switch_ship_delay;
    var next_type;
    if (ship.type >= switch_ship_codes[0] && ship.type <= switch_ship_codes[1]) {
      if (ship.type === switch_ship_codes[0]) {
        next_type = switch_ship_codes[1];
      } else {
        next_type = ship.type - 1;
      }
    } else {
      next_type = ship.custom.last_ship || switch_ship_codes[0];
    }
    ship.custom.last_ship = next_type;
    ship.set({type: next_type, collider: true, shield: 999, crystals: 720});
  }
};

var spectator_ship = function(ship) {
  if (!ship.custom.spectator_switch || game.step >= ship.custom.spectator_switch) {
    ship.custom.spectator_switch = game.step + spectator_switch_delay;
    if (ship.custom.spectator) {
      ship.custom.spectator = false;
      if (!ship.custom.last_ship) {
        ship.custom.last_ship = switch_ship_codes[0];
      }
      ship.set({type: ship.custom.last_ship, collider: true, shield: 999, crystals: 720, stats: 88888888});
    } else {
      ship.custom.spectator = true;
      ship.custom.last_ship = ship.type;
      ship.set({type: spectator_ship_code, crystals: 0, stats: 88888888, shield: 999, collider: false});
    }
  }
};

var dist2points = function (x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
};

var admin_ship = function(ship) {
  var next_type;
  if (ship.type >= admin_ship_codes[0] && ship.type <= admin_ship_codes[1]) {
    if (ship.type === admin_ship_codes[1]) {
      next_type = switch_ship_codes[0];
    } else {
      next_type = ship.type + 1;
    }
  } else {
    next_type = admin_ship_codes[0];
  }
  ship.set({type: next_type});
};

var regen = function(ship){
  var level = Math.trunc(ship.type / 100);
  var cargo = 1280;
  if (!ship.custom.Regenerate || game.step >= ship.custom.Regenerate) {
    ship.custom.Regenerate = game.step + Regenerate_delay;
    switch (level) {
      case 1: crystals = 20; break; 
      case 2: crystals = 80; break; 
      case 3: crystals = 180; break; 
      case 4: crystals = 320; break; 
      case 5: crystals = 500; break; 
      case 6: crystals = 720; break; 
      case 7: crystals = 980; break;
    } ship.set({crystals: cargo - 1, shield: 999});
  }
};

var dueling_arena = function(ship) {
  var x = [...new Array(51)].map((j, i) => 975 + i);
  var y = [...new Array(51)].map((j, i) => 975 + i);
  if (!ship.custom.dueling || game.step >= ship.custom.dueling) {
    ship.custom.dueling = game.step + dueling_arena_delay;
    if (ship.type != 191) {
      ship.set({x: x[~~(Math.random()*x.length)], y: y[~~(Math.random()*y.length)]});
      spectator_ship(ship);
    } else {
      ship.set({x: x[~~(Math.random()*x.length)], y: y[~~(Math.random()*y.length)]});
    }
  }
};

var spawn_zone = function(ship) {
  var x = (Math.random() - 0.5) * game.options.map_size * 0.4;
  var y = (Math.random() - 0.5) * game.options.map_size * 0.4;
  if (!ship.custom.spawn || game.step >= ship.custom.spawn) {
    ship.custom.spawn = game.step + spawn_zone_delay;
    ship.set({x: x, y: y});
  }
};

var what_if_ship_spawned = function(ship) {
  const { x = 0, y = 0 } = ship.custom;
  var xx = [...new Array(41)].map((j, i) => x - 30 + i);
  var yy = [...new Array(41)].map((j, i) => y - 30 + i);
  ship.set({x: xx[~~(Math.random()*xx.length)],y: yy[~~(Math.random()*yy.length)],collider: true, crystals: 720, stats: 88888888});
  spectator_ship(ship);
  game.modding.terminal.echo("\n | List of players and their IDs:\n");
  for (let i=0; i<game.ships.length; i++){ 
    game.modding.terminal.echo(" | id: "+i+", Name: "+game.ships[i].name+", Type: "+game.ships[i].type+"\n | Coordinates: X: "+game.ships[i].x+", Y: "+game.ships[i].y); 
  }
  game.modding.terminal.echo("\n");
};

var Stats_button = function(ship) {
  var stats = ship.stats;
  var level = Math.trunc(ship.type / 100);
  var max = 11111111 * level;
  if (!ship.custom.stats || game.step >= ship.custom.stats) {
    ship.custom.stats = game.step + Stats_delay;
    if (level < 7) {
      if (stats == max) {
        ship.custom.keep_maxed = false;
        ship.set({stats:0});
        ship.setUIComponent({
          id: "Stats",
          visible: false
        });
        ship.setUIComponent(Stats2);
      } else {
        ship.custom.keep_maxed = true;
        ship.set({stats:max, shield: 999, generator: 999});
        ship.setUIComponent(Stats);
        ship.setUIComponent({
          id: "Stats2",
          visible: false
        });
      }
    }
  }
};

// Exit Screen Commands

var Exit_screen = function(ship) {
  ship.setUIComponent(Menu_);
  ship.setUIComponent({
    id: "Square",
    visible: false
  });
  ship.setUIComponent({
    id: "TPArena",
    visible: false
  });        
  ship.setUIComponent({
    id: "TPSpawn",
    visible: false
  });
  ship.setUIComponent({
    id: "next_ship",
    visible: false
  });
  ship.setUIComponent({
    id: "previous_ship",
    visible: false
  });
  ship.setUIComponent({
    id: "Stats",
    visible: false
  });
  ship.setUIComponent({      
    id: "Box_Exit_screen",
    visible: false
  });
  ship.setUIComponent({
    id: "Stats2",
    visible: false
  });
};

var TP_points_button = function(ship) {
  var level = Math.trunc(ship.type / 100);
  var max_stats = 11111111 * level;
  if (!ship.custom.TP_points || game.step >= ship.custom.TP_points) {
    ship.custom.TP_points = game.step + TP_points_delay;
    if (ship.stats > 0) {
      ship.setUIComponent(Stats);
    } else {
      ship.setUIComponent(Stats2);
    }
    ship.setUIComponent(TPArena);
    ship.setUIComponent(TPSpawn);
    ship.setUIComponent(next_ship);
    ship.setUIComponent(previous_ship);
    ship.setUIComponent(Box_Exit_screen);
    ship.setUIComponent(Square);
    ship.setUIComponent({
      id: "Menu_",
      visible: false
    });
  }
};

// Admin buttons

var Admin = { 
  id: "Admin",
  position: [21,0,7.2,4],
  clickable: true,
  visible: true,
  shortcut: "1",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(255, 255, 255, 0.40)",stroke:"#FFFFFF",width:8},
    { type: "text",position:[0,20,100,60],value:"Admin [1]",color:"#FFFFFF"},
  ]
};

// Buttons

var Spectate = {
  id: "Spectate",
  position: [72.2,4.8,7.6,4],
  clickable: true,
  visible: true,
  shortcut: "8",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(40, 40, 215, 0.40)",stroke:"#2828D7",width:8},
    { type: "text",position:[0,20,100,60],value:"Spectate [8]",color:"#ffffff"},
  ]
};

var Regen = {
  id: "Regen",
  position: [72.2,0,7.6,4],
  clickable: true,
  visible: true,
  shortcut: "9",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(0, 255, 0, 0.40)",stroke:"#00FF00",width:8},
    { type: "text",position:[0,20,100,60],value:"Regen [9]",color:"#ffffff"},
  ]
};

var Menu_ = {
  id: "Menu_",
  position: [64.1,0,7.6,4],
  clickable: true,
  visible: true,
  shortcut: "0",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(255, 0, 0, 0.40)",stroke:"#FF0000",width:8},
    { type: "text",position:[0,20,100,60],value:"Menu [0]",color:"#ffffff"},
  ]
};

// Teleportation&Switch Screen

var Square = {
  id: "Square",
  position: [30,30,40,40],
  clickable: false,
  visible: true,
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(255,255,255, 0.20)",stroke:"#FFFFFF",width:12},
    { type:"box",position:[0,0,100,15],stroke:"#FFFFFF",width:6},
    { type:"round",position:[34,24,32,55],stroke:"#FFFFFF",width:5},
    { type: "text",position:[30,-2,40,20],value:"Actions Menu",color:"#FFFFFF"},
  ]
};

var TPArena = {
  id: "TPArena",
  position: [58,39,10,5.5],
  clickable: true,
  visible: true,
  shortcut: "6",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(255, 0, 0, 0.50)",stroke:"rgb(255, 0, 0)",width:9},
    { type: "text",position:[0,17,100,62],value:"Arena [5]",color:"#ffffff"},
  ]
};

var TPSpawn = {
  id: "TPSpawn",
  position: [58,46,10,5.5],
  clickable: true,
  visible: true,
  shortcut: "5",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(0, 255, 0, 0.50)",stroke:"rgb(0, 255, 0)",width:9},
    { type: "text",position:[0,17,100,62],value:"Spawn [6]",color:"#ffffff"},
  ]
};

var next_ship = {
  id: "next_ship",
  position: [32,39,10,5.5],
  clickable: true,
  visible: true,
  shortcut: "3",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(0, 148, 255, 0.50)",stroke:"rgb(0, 148, 255)",width:9},
    { type: "text",position:[0,17,100,62],value:"Next [3]",color:"#ffffff"},
  ]
};

var previous_ship = {
  id: "previous_ship",
  position: [32,46,10,5.5],
  clickable: true,
  visible: true,
  shortcut: "4",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(0, 148, 255, 0.50)",stroke:"rgb(0, 148, 255)",width:9},
    { type: "text",position:[0,17,100,62],value:"Previous [4]",color:"#ffffff"},
  ]
};

var Stats = {
  id: "Stats",
  position: [32,53,10,5.5],
  clickable: true,
  visible: true,
  shortcut: "7",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(255, 232, 0, 0.50)",stroke:"rgb(255, 232, 0)",width:9},
    { type: "text",position:[0,17,100,62],value:"Stats [7]",color:"#ffffff"},
  ]
};

var Stats2 = {
  id: "Stats2",
  position: [32,53,10,5.5],
  clickable: true,
  visible: true,
  shortcut: "7",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(255, 232, 0, 0.50)",stroke:"rgb(255, 232, 0)",width:9},
    { type: "text",position:[0,17,100,62],value:"⚠️Stats [7]",color:"#ffffff"},
  ]
};

var Box_Exit_screen = {
  id: "Box_Exit_screen",
  position: [58,61,10,5.5],
  clickable: true,
  visible: true,
  shortcut: "0",
  components: [
    { type:"box",position:[0,0,100,100],fill:"rgba(255,255,255, 0.40)",stroke:"#ffffff",width:9},
    { type: "text",position:[0,17,100,62],value:"Exit [0]",color:"#ffffff"},
  ]
};

this.event = function(event){
  var ship = event.ship; 
  switch (event.name){
    case "ui_component_clicked":
      var component = event.id;
      if (component == "Menu_"){
        TP_points_button(ship);
      }  if (component == "component"){
      }  else if (component == "Box_Exit_screen"){
        Exit_screen(ship);
      }  else if (component == "Regen"){
        regen(ship);
      }  else if (component == "Spectate"){
        spectator_ship(ship);
      }  else if (component == "Admin"){
        admin_ship(ship);
      }  else if (component == "TPArena"){
        dueling_arena(ship);
      }  else if (component == "TPSpawn"){
        spawn_zone(ship);
      }  else if (component == "next_ship"){
        next_ship_button(ship);
      }  else if (component == "previous_ship"){
        previous_ship_button(ship);
      }  else if (component == "Stats"){
        Stats_button(ship);
      }  else if (component == "Stats2"){
        Stats_button(ship);
      }  break;
    case "ship_spawned":
      what_if_ship_spawned(ship);
    break;
    case "ship_destroyed":
      Object.assign(ship.custom, { x: ship.x, y: ship.y });
    break;
   }
};

// Spawn
var Dueling_Safe_area = {
  id: "Dueling_Safe_area",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive:"https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/Middle_Safe_Area_2.png",
};
game.setObject({
  id: "Dueling_Safe_area",
  type: Dueling_Safe_area,
  position:{x:0,y:0,z:-3.5},
  scale:{x:117,y:117,z:0},
  rotation:{x:3.12,y:0,z:0}
});

// 3D Obj
var lost_sector_aries = {
  id: "lost_sector_aries",
  obj: "https://starblast.io/lost_sector/LostSector_Aries_HardEdges.obj",
  diffuse: "https://starblast.io/lost_sector/LostSector_Aries_LostSector_Aries_Diffuse.jpg",
  bump: "https://starblast.io/lost_sector/LostSector_Aries_LostSector_Aries_Height.jpg",
  specular: "https://starblast.io/lost_sector/LostSector_Aries_LostSector_Aries_Specular.jpg",
  shininess: 0,
  emissiveColor: 0,
  specularColor: 0x3fcf00,
  transparent: false
};
game.setObject({
  id: "lost_sector_aries",
  type: lost_sector_aries,
  position: {x:-4, y:6, z:-90},
  scale: {x:2, y:2, z:3},
  rotation: {x:0.4, y:0.2, z:Math.PI}
});

// Dueling arena
var MapCenter = {
  id: "MapCenter",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive:"https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/megs_dueling_center_arena_nocircle.png",
};
game.setObject({
  id: "MapCenter",
  type: MapCenter,
  position:{x:1000,y:1000,z:-15},
  scale:{x:100,y:100,z:0},
  rotation:{x:Math.PI,y:0,z:0}
});

var DuelingArena_Left = {
  id: "DuelingArena_Left",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive:"https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/Entrance_Dueling_Arena_Bottom_and_left.png",
};
game.setObject({
  id: "DuelingArena_Left",
  type: DuelingArena_Left,
  position:{x:803.5,y:1000,z:-2},
  scale:{x:50,y:17.5,z:0},
  rotation:{x:Math.PI,y:0,z:Math.PI/2}
});

var DuelingArena_Right = {
  id: "DuelingArena_Right",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive:"https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/Entrance_Dueling_Arena_Top_and_right.png",
};
game.setObject({
  id: "DuelingArena_Right",
  type: DuelingArena_Right,
  position:{x:1196,y:1000,z:-2},
  scale:{x:50,y:17.5,z:0},
  rotation:{x:Math.PI,y:0,z:Math.PI/2}
});

var DuelingArena_Bottom = {
  id: "DuelingArena_Bottom",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive:"https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/Entrance_Dueling_Arena_Bottom_and_left.png",
};
game.setObject({
  id: "DuelingArena_Bottom",
  type: DuelingArena_Bottom,
  position:{x:1000,y:803,z:-2},
  scale:{x:50,y:17.5,z:0},
  rotation:{x:Math.PI,y:0,z:0}
});

var DuelingArena_Top = {
  id: "DuelingArena_Top",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive:"https://raw.githubusercontent.com/TheGreatMegalodon/Dueling-Component/main/Dueling_Component/Entrance_Dueling_Arena_Top_and_right.png",
};
game.setObject({
  id: "DuelingArena_Top",
  type: DuelingArena_Top,
  position:{x:1000,y:1196,z:-2},
  scale:{x:50,y:17.5,z:0},
  rotation:{x:Math.PI,y:0,z:0}
});

// 3D Obj
var construction_bleu = {
  id: "construction_bleu",
  obj: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/Constructor.obj",
  diffuse: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_lambert_texture_blue2.png",
  emissive:"https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_emissive_texture.png",
  shininess: 0,
  emissiveColor: 0x0041ff,
  specularColor: 0x0041ff,
  transparent: false,
  bump: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_lambert_texture_blue.png"
};
game.setObject({
  id: "construction_bleu",
  type: construction_bleu,
  position:{x:1080,y:970,z:-30},
  scale:{x:8,y:8,z:8},
  rotation:{x:0,y:-0.4,z:1}
});

var construction_vert = {
  id: "construction_vert",
  obj: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/Constructor.obj",
  diffuse: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_lambert_texture_blue2.png",
  emissive:"https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_emissive_texture.png",
  shininess: 0,
  emissiveColor: 0x3fcf00,
  specularColor: 0x3fcf00,
  transparent: false,
  bump: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_lambert_texture_blue.png"
};
game.setObject({
  id: "construction_vert",
  type: construction_vert,
  position:{x:950,y:1070,z:-30},
  scale:{x:8,y:8,z:8},
  rotation:{x:0.4,y:-0.2,z:2}
});

var construction_rouge = {
  id: "construction_rouge",
  obj: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/Constructor.obj",
  diffuse: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_lambert_texture_blue2.png",
  emissive:"https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_emissive_texture.png",
  shininess: 0,
  emissiveColor: 0xff0000,
  specularColor: 0xff0000,
  transparent: false,
  bump: "https://raw.githubusercontent.com/StarblastFinalizer/StarblastModding/master/ship_lambert_texture_blue.png"
};
game.setObject({
  id: "construction_rouge",
  type: construction_rouge,
  position:{x:940,y:930,z:-30},
  scale:{x:8,y:8,z:8},
  rotation:{x:0.2,y:0.4,z:5}
});

// Commands
// Moderation commands
game.modding.commands.info = function(){
  game.modding.terminal.echo(" | Total amount of aliens: "+game.aliens.length)
  game.modding.terminal.echo(" | Total amount of asteroids: "+game.asteroids.length)
  game.modding.terminal.echo(" | Total amount of players: "+game.ships.length)
  game.modding.terminal.echo("\n | List of players and their IDs:\n");
  for (let i=0; i<game.ships.length; i++){
    game.modding.terminal.echo(" | id: "+i+", Name: "+game.ships[i].name+", Type: "+game.ships[i].type+", Alive: "+game.ships[i].alive+"\n | Coordinates: X: "+game.ships[i].x+", Y: "+game.ships[i].y); 
  }
  game.modding.terminal.echo("\n");
};

idle = function(who){
  game.modding.terminal.echo("the player: "+game.ships[who].name+", id: "+who+" has been blocked\n");
  game.ships[who].set({idle: true});
  Exit_screen(game.ships[who]);
  if (game.ships[who].type == 191) {
    game.ships[who].setUIComponent({
      id: "Spectate",
      visible: false
    });
  } else {
    spectator_ship(game.ships[who]);
    game.ships[who].setUIComponent({
      id: "Spectate",
      visible: false
    });
  }
  game.ships[who].setUIComponent({
    id: "Menu_",
    visible: false
  });
  game.ships[who].setUIComponent({
    id: "Regen",
    visible: false
  });
};

unidle = function(who){
  game.ships[who].setUIComponent(Menu_);
  game.ships[who].setUIComponent(Spectate);
  game.ships[who].setUIComponent(Regen);
  game.ships[who].set({idle: false});
  game.modding.terminal.echo("the player: "+game.ships[who].name+", id: "+who+" has been unblocked\n");
};

kick = function(who,reason="Disturbing duels"){
  game.ships[who].gameover({"You were kicked for : ":reason,"Your name: ":game.ships[who].name,"Score: ":game.ships[who].score});
  game.modding.terminal.echo(" | Player: "+game.ships[who].name+", id: "+who+" Has successfully been kicked\n");
};

// General commands
set = function(who,what,crystals,stats=88888888){
  var level = Math.trunc(what / 100);
  var cargo = 1280;
  if (crystals === undefined) {
    switch (level) {
      case 1: crystals = 20; break; 
      case 2: crystals = 80; break; 
      case 3: crystals = 180; break; 
      case 4: crystals = 320; break; 
      case 5: crystals = 500; break; 
      case 6: crystals = 720; break; 
      case 7: crystals = 980; break;
    }
  }
  game.ships[who].set({type:what,crystals:crystals,stats:stats});
  game.modding.terminal.echo(" | Player: "+game.ships[who].name+", id: "+who+" Has successfully been given:");
  game.modding.terminal.echo(" | Type: "+what+", Crystals: "+crystals+", Stats: "+stats+"\n");
};

crystals = function(who,crystals){
  game.ships[who].set({crystals:crystals});
  game.modding.terminal.echo(" | Player: "+game.ships[who].name+", id: "+who+" Has successfully been given:");
  game.modding.terminal.echo(" | Crystals: "+crystals+"\n");
};

// Teleportation commands
tpto = function(who,towho){
  ship = game.ships[towho];
  game.ships[who].set({x:ship.x,y:ship.y});
  game.modding.terminal.echo(" | Player: "+game.ships[who].name+", id: "+who+" Has successfully been TP to:");
  game.modding.terminal.echo(" | Player: "+game.ships[towho].name+", id: "+towho+", coordinates: X: "+game.ships[towho].x+", Y:"+game.ships[towho].y+"\n");
};

tp = function(who,xx,yy){
  game.ships[who].set({x:xx,y:yy});
  game.modding.terminal.echo(" | Player: "+game.ships[who].name+", id: "+who+" Has successfully been TP to:");
  game.modding.terminal.echo(" | Coordinates: X: "+xx+", Y:"+yy+"\n");
};

tpall = function(x,y){
  var x = [...new Array(21)].map((j, i) => x - 10 + i)
  var y = [...new Array(21)].map((j, i) => y - 10 + i)
  for (let ship of game.ships) {
    ship.set({x: x[~~(Math.random()*x.length)], y: y[~~(Math.random()*y.length)]});
  }
  for (i=0;i<game.ships.length;i++) {
  game.modding.terminal.echo(" | Player: "+game.ships[i].name+", id: "+i);
  }
  game.modding.terminal.echo(" | Has been successfully TP to:");
  game.modding.terminal.echo(" | Coordinates: X: "+x[~~(Math.random()*x.length)]+", Y:"+y[~~(Math.random()*y.length)]+"\n");
};

// Announce command
say = function(text=""){
  for (i=0;i<game.ships.length;i++)
  {
    ship = game.ships[i];
    ship.setUIComponent({
      id: "announceText",
      position: [20,75,50,25],
      clickable: false,
      visible: true,
      components: [
        {type: "text", position: [0,0,100,20], color: "#FFFFFF", value: text},
        ]
    });
  }
  game.modding.terminal.echo(" | Text applyed\n");
};

// Commands Annex

game.modding.commands.help = function(){
  game.modding.terminal.echo("Mod by ⮞ Megalodon");
  game.modding.terminal.echo("Coding support ⮞ Lotus, Bhpsngum\n");
  game.modding.terminal.echo(" | info ⮞ "+"Gives informations about the game.");
  game.modding.terminal.echo(" | helpgeneral ⮞ "+"very useful stuff.");
  game.modding.terminal.echo(" | helpmoderation ⮞ "+"Every moderation related commands");
};
game.modding.commands.helpmoderation = function(){
  game.modding.terminal.echo(" | idle(who) ⮞ "+"Makes a specific player stuck in one position.")
  game.modding.terminal.echo(" | unidle(who) ⮞ "+"Makes a specific player free.")
  game.modding.terminal.echo(" | kick(id,reason) ⮞ "+"To kick someone from the game.\n")
};
game.modding.commands.helpgeneral = function(){
  game.modding.terminal.echo(" | set(who,type,crystals,stats) ⮞ "+"Replace: game.ships[0].set({});.");
  game.modding.terminal.echo(" | crystals(who,crystals) ⮞ "+"To give a certain amout of crystals to someone.");
  game.modding.terminal.echo(" | tpto(who,towho) ⮞ "+"To teleport a player to another player.");
  game.modding.terminal.echo(" | tp(who,x,y) ⮞ "+"To teleport someone.");
  game.modding.terminal.echo(" | tpall(x,y) ⮞ "+"To teleports everyone.");
  game.modding.terminal.echo(" | say(hello) ⮞ "+"To make an announcement to the players while playing.\n");
};
