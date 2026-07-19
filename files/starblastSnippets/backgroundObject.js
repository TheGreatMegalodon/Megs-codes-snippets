
/*
This code is used to easily load, display, and safely remove custom 3D textured planes 

example usage: backgroundObject.add("https://raw.githubusercontent.com/.../images/SAWgamelogo.png", {x:0, y:0, z:-10}, {x:0, y:0, z:0}, {x:5, y:5, z:1}); 
Creates and displays the image in the game.

backgroundObject.add(url, position, rotation, scale);
                      ^       ^        ^       ^
                      |       |        |       | This is the scale object {x, y, z} to resize your image.
                      |       |        | This is the rotation object {x, y, z} to rotate the image.
                      |       | This is the position object {x, y, z} to place the image in the space.
                      | This is the direct raw link to the image. The filename will automatically become the object ID ("SAWgamelogo").

example usage: backgroundObject.remove("SAWgamelogo");
This line removes the object safely from the map and the game.

backgroundObject.remove(id);
                        ^
                        | This is the ID of the object you want to delete (extracted from the image filename without its extension).
*/

const backgroundObject = {
  objects: new Map(),
  
  add: function(url, position, rotation, scale) {
    const wholeUrl = new URL(url);
    const fileName = wholeUrl.pathname.split('/').pop();
    const id = fileName.split('.').shift();
    
    const image = {
      id: id,
      type: {
        id: id,
        obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
        emissive: url
      },
      position: { x: position.x, y: position.y, z: position.z },
      rotation: { x: rotation.x, y: rotation.y, z: rotation.z },
      scale: { x: scale.x, y: scale.y, z: scale.z },
    };
    
    this.objects.set(id, image);
    game.setObject(image);
  },
  
  remove: function(id) {
    const image = this.objects.get(id);

    if (!image) {
      return; 
    }
    
    image.scale.x = 0;
    image.scale.y = 0;
    image.scale.z = 0;
    
    game.setObject(image);
    game.removeObject(id);
    
    this.objects.delete(id);
  }
};