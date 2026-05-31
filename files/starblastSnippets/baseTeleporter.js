/*
Functions used to teleport a certain player to a specific station in game.
Be aware, it teleports the player at the center of the station.

 | Used to get the base coordinates
baseTeleporter.getCoordinates(base)

 | Used to teleport a player to a certain station
baseTeleporter.TP(ship, base)

Thanks jannes ;)
*/

const baseTeleporter = {
  offset: {
    1: 2/2,
    2: 1/3,
    3: 2/3,
    4: 1/2,
    5: 2/2
  },
  getCoordinates: function(base) {
    if (!baseOffsets.hasOwnProperty(base)) return null;
    let offset = baseOffsets[base];
    let radius = (Math.sqrt(2) / 2) * game.options.map_size * 5;
    let angle = (game.step / 216000 + offset) * Math.PI * 2;
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
  },
  TP: function(ship, base) {
    const baseCoordinates = getCoordinates(Object.keys(baseOffsets)[base]);
    if (baseCoordinates) {
      ship.set({x: baseCoordinates[0], y: baseCoordinates[1]});
    }
  }
}

baseTeleporter.getCoordinates(base)

baseTeleporter.TP(ship, base)
