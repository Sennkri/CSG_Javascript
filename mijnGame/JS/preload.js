var imgList = [];
var logoAnim = [];

function preload() {
  bruno = loadImage('assets/sprites/bruno/bruno_portrait.png');

  troonBoven = loadImage('assets/sprites/bruno/bruno_portrait.png');
  troonOnder1 = loadImage('assets/sprites/bruno/bruno_portrait.png');
  troonOnder2 = loadImage('assets/sprites/bruno/bruno_portrait.png');

  lemoon = loadImage('assets/sprites/bruno/image.png');

  //sprites
  playerU = loadImage('assets/sprites/player/U.png');
  playerUL = loadImage('assets/sprites/player/UL.png');
  playerUR = loadImage('assets/sprites/player/UR.png');
  playerL = loadImage('assets/sprites/player/L.png');
  playerR = loadImage('assets/sprites/player/R.png');
  playerD = loadImage('assets/sprites/player/D.png');
  playerDL = loadImage('assets/sprites/player/DL.png');
  playerDR = loadImage('assets/sprites/player/DR.png');
  bulletSprite = loadImage('assets/sprites/bullet.png');
  
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

// doors
  door_d1 = loadImage('assets/doors/doorU.png');
  door_d2 = loadImage('assets/doors/doorL.png');
  door_d3 = loadImage('assets/doors/doorR.png');
  door_d4 = loadImage('assets/doors/doorD.png');

// startscreen and logo (animated)
  startscreen = loadImage('assets/startscreen/startscreen.png');
  for (let i=0;i<12;i++) {
    frame = loadImage('assets/startscreen/logo/logo_'+i+'.png');
    logoAnim.push(frame);
  }
  pFont = loadFont('assets/Tiny5-Regular.ttf')


// levels
  lvlData = loadJSON('assets/levels.json?v=' + Date.now());

// sounds
  soundFormats('mp3')
  room0 = loadSound('assets/sounds/music/room');
  room1 = loadSound('assets/sounds/music/room2');
  room2 = loadSound('assets/sounds/music/room3');
  ambience1 = loadSound('assets/sounds/startscreen');
  creditsMusic = loadSound('assets/sounds/music/credits');

// strings
  credits = loadStrings('assets/credits.txt');
}