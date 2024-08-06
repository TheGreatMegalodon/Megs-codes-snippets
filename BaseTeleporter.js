/*
Functions used to teleport a certain player to a specific station

thanks jannes ;)
*/

warpShipRangeteam1 = function(ship) {
  x1 = ((Math.sqrt(2)/2)*game.options.map_size*10/2)*Math.cos((game.step/216000+(1/3))*Math.PI*2);
  y1 = ((Math.sqrt(2)/2)*game.options.map_size*10/2)*Math.sin((game.step/216000+(1/3))*Math.PI*2);
  ship.set({x:x1,y:y1,vx:0,vy:0}) ;
  game.addCollectible({code:12,x:-960,y:-999});
} ;

warpShipRangeteam2 = function(ship) {
  x2 = ((Math.sqrt(2)/2)*game.options.map_size*10/2)*Math.cos((game.step/216000+(2/3))*Math.PI*2);
  y2 = ((Math.sqrt(2)/2)*game.options.map_size*10/2)*Math.sin((game.step/216000+(2/3))*Math.PI*2);
  ship.set({x:x2,y:y2,vx:0,vy:0}) ;
} ;

warpShipRangeteam3 = function(ship) {
  x1 = ((Math.sqrt(2)/2)*game.options.map_size*10/2+50)*Math.cos((game.step/216000+(1/2))*Math.PI*2);
  y1 = ((Math.sqrt(2)/2)*game.options.map_size*10/2+50)*Math.sin((game.step/216000+(1/2))*Math.PI*2);
  ship.set({x:x1,y:y1,vx:0,vy:0}) ;
} ;

warpShipRangeteam4 = function(ship) {
  x3 = ((Math.sqrt(2)/2)*game.options.map_size*10/2+50)*Math.cos((game.step/216000+(2/2))*Math.PI*2);
  y3 = ((Math.sqrt(2)/2)*game.options.map_size*10/2+50)*Math.sin((game.step/216000+(2/2))*Math.PI*2);
  ship.set({x:x3,y:y3,vx:0,vy:0}) ;
} ;

warpShipRangeteam5 = function(ship) {
  x4 = ((Math.sqrt(2)/2)*game.options.map_size*10/2)*Math.cos((game.step/216000+(2/3))*Math.PI*2);
  y4 = ((Math.sqrt(2)/2)*game.options.map_size*10/2)*Math.sin((game.step/216000+(2/3))*Math.PI*2);
  ship.set({x:x4,y:y4,vx:0,vy:0}) ;
} ;
