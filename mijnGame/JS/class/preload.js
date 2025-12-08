function preload() {
  b1 = loadImage('assets/tiles/tilea.png');
  bruno = loadImage('assets/sprites/bruno/bruno_portrait.png');
  jos = loadImage('assets/sprites/Jos/pixelJos.png');


  // walls
  wall_1 = loadImage('assets/walls/cornerUL.png');
  wall_2a = loadImage('assets/walls/wallUa.png');
  wall_2b = loadImage('assets/walls/wallUb.png');
  wall_3 = loadImage('assets/walls/cornerUR.png');
  wall_4a = loadImage('assets/walls/wallLa.png');
  wall_4b = loadImage('assets/walls/wallLb.png');
  wall_5a = loadImage('assets/walls/wallRa.png');
  wall_5b = loadImage('assets/walls/wallRb.png');
  wall_6 = loadImage('assets/walls/cornerBL.png');
  wall_7a = loadImage('assets/walls/wallBa.png');
  wall_7b = loadImage('assets/walls/wallBb.png');
  wall_8 = loadImage('assets/walls/cornerBR.png');

// tiles
  tilea = loadImage('assets/tiles/tilea.png');
  tileb = loadImage('assets/tiles/tileb.png');
  tilec = loadImage('assets/tiles/tilec.png');
  tiled = loadImage('assets/tiles/tiled.png');

  lvlData = loadJSON('assets/levels.json?v=' + Date.now());
}