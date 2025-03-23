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
  rotation: {x:0.4, y:0.2, z:3.14}
});
