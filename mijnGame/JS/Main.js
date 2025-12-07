var collisionObjects = [];
var decorations = [];
var tiles = [];
var gridWidth = null;
var gridHeight = null;
var bossroom = null;
var room = null;
var levelCleared = false;


function preload() {
  b1 = loadImage('assets/tiles/tilea.png');
  bruno = loadImage('assets/sprites/bruno/bruno_portrait.png');
  jos = loadImage('assets/sprites/Jos/pixelJos.png');

  wall_1 = loadImage('assets/walls/cornerUL.png');
  wall_2 = loadImage('assets/walls/wallUa.png');
  wall_3 = loadImage('assets/walls/cornerUR.png');
  wall_4 = loadImage('assets/walls/wallLa.png');
  wall_5 = loadImage('assets/walls/wallRa.png');
  wall_6 = loadImage('assets/walls/cornerBL.png');
  wall_7 = loadImage('assets/walls/wallBa.png');
  wall_8 = loadImage('assets/walls/cornerBR.png');

  lvlData = loadJSON('assets/levels.json?v=' + Date.now());
}

function setup() {
    frameRate(60);
    let cnv = createCanvas(900,700);
    cnv.position(windowWidth/2 - cnv.width/2, windowHeight/2 - cnv.height/2);

    grid = new Grid(100, b1);
    player = new Player(bruno, grid.celGrootte);

    player.start(4*grid.celGrootte, 3*grid.celGrootte);
    room = 0; 
}

function draw() {
    move();
    if (keyIsDown(32) && !levelCleared) {
        levelCleared = true;
    }
    if (keyIsDown(13) && levelCleared) {
        room = Math.floor(Math.random()*4);;
        grid.x = 0;
        grid.y = 0;
        levelCleared = false;
        newInstance();
        player.start(4*grid.celGrootte, 3*grid.celGrootte);
    }
    newInstance();
    player.load();
}

function move() {
    if (keyIsDown(65)) {
        if (grid.x < player.x - player.cameraMarginH && grid.x + grid.width >= player.x + player.cameraMarginH) {
            grid.x += grid.step;
        }
        else if (grid.x < player.x){
            player.x -= player.step;
        }
    }

    if (keyIsDown(68)) {
        if (grid.x + grid.width > player.x + player.cameraMarginH && grid.x <= player.x - player.cameraMarginH) {
            grid.x -= grid.step;
        }
        else if (grid.x + grid.width > player.x) {
            player.x += player.step;
        }
    }

    if (keyIsDown(87)) {
        if (grid.y < player.y - player.cameraMarginV && grid.y + grid.height >= player.y + player.cameraMarginV) {
            grid.y += grid.step;
        }
        else if (grid.y < player.y){
            player.y -= player.step;
        }
    }

    if (keyIsDown(83)) {
        if (grid.y + grid.height > player.y + player.cameraMarginV && grid.y <= player.y - player.cameraMarginV) {
            grid.y -= grid.step;
        }
        else if (grid.y + grid.height > player.y) {
            player.y += player.step;
        }
    }
}

function roomSize(lvl) {
    gridWidth = lvlData['levels'][lvl]['size']['x']
    gridHeight = lvlData['levels'][lvl]['size']['y']

    bossroom = lvlData['levels'][lvl]['bossroom'];
    if (bossroom) {
        grid.celGrootte = 50;
        player.size = 50;
    }
    else {
        grid.celGrootte = 100;
        player.size = 100;
    }
}

function loadRoom(lvl) {
    let x,y,sprite,layout
    layout = lvlData['levels'][lvl]['layout'];
    x = null;
    y = null;
    sprite = null;

    for (let i=0; i<floor(layout['length']/grid.aantalKolommen); i++) {
        y = i; 
        for (let j=0;j<grid.aantalKolommen;j++) {
            x = j;
            if (layout[i*grid.aantalKolommen + j] != 0) {
                sprite = window["wall_" + layout[i*grid.aantalKolommen + j]];
                collisionObjects.push(new collisionObject(x, y, grid.celGrootte, grid.celGrootte, sprite));
            }
            else {
                sprite = "tile" + String.fromCharCode(97 + Math.floor(Math.random()*4));
                tiles.push(new decoration(x,y,grid.celGrootte,grid.celGrootte,sprite));
            }
        }
    }
}

function newInstance() {
    roomSize(room);

    grid.newInstance();
    player.newInstance();

    grid.achtergrond(gridWidth,gridHeight);
//    grid.teken();

    collisionObjects.length = 0;
    tiles.length = 0;

    loadRoom(room);
    
    for(var b = 0; b < collisionObjects.length ; b++) {
        collisionObjects[b].draw(grid.celGrootte,grid.x,grid.y);
    }
}