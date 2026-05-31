/* 
  Small code that is used to put dots on the minimap at the same place of the object in-game.
  
  Notes:
  - If your object has a shape, it will allow the code to work better.
  - Objects that get added after the initialization of the mod will not get generated.
*/

//   Add this line at the very bottom of your mod.
// radarBackground.create();

var radarBackground = {
  excludeObjects: [], // add the ID's of the object you don't want a sport of the radar.
  
  // Don't modify anyting bellow this line
  
  alreadySeenObjects: [],
  zoom: 10 / this.options.map_size,
  offset: settings.map_size * 5,

  radar_background: {
    id: "radar_background",
    components: []
  },
  
  toRadarX: function(x, size) {
    return Math.max((x + this.offset - size) * this.zoom, 0);
  },
  toRadarY: function(y, size) {
    return Math.max((-y + this.offset - size) * this.zoom, 0);
  },
  add: function(type, x, y, width, height, opacity) {
    this.radar_background.components.push({
      type: type,
      position: [this.toRadarX(x, width), this.toRadarY(y, height), width, height],
      fill: "rgba(255,255,255,"+opacity+")"
    });
  },
  
  findShape: function(shape) {
    const mean = shape.reduce((sum, val) => sum + val, 0) / shape.length;
    const variance = shape.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / shape.length;
    const stdDeviation = Math.sqrt(variance);
    return stdDeviation > mean * 0.3 ? "round" : "box";
  },
  
  create: function() {
    game.objects.filter(el => !this.excludeObjects.includes(el.object.id))
    .forEach(el => {
      if (!this.alreadySeenObjects.includes(el.object.id)) {
        let obj = el.object;
        let type = obj.physics?.shape ? this.findShape(obj.physics.shape) : "box";
        this.add(type, obj.position.x, obj.position.y, obj.scale.x, obj.scale.y, "0.6");
        
        this.alreadySeenObjects.push(obj.id);
      }
    });
    game.setUIComponent(this.radar_background);
  }
};
