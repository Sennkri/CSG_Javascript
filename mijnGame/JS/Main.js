var collisionObjects = [];
var gridWidth = null;
var gridHeight = null

function preload() {
  b1 = loadImage('assets/backgrounds/bg1.png');
  bruno = loadImage('assets/sprites/bruno/bruno_portrait.png');
  jos = loadImage('assets/sprites/Jos/pixelJos.png');

  lvlData = loadJSON('assets/levels.json');
}

function setup() {
    frameRate(60);
    let cnv = createCanvas(900,700);
    cnv.position(windowWidth/2 - cnv.width/2, windowHeight/2 - cnv.height/2);

    grid = new Grid(100, b1, 100/8);
    player = new Player(bruno, grid.celGrootte/8, grid.celGrootte);

    player.start(2*grid.celGrootte, 2*grid.celGrootte);
//    Josgoon = new enemy(grid.x + 500,grid.y + 500);
}

function draw() {
    background("green"); 
    move()

    levelSize("0");

    grid.achtergrond(gridWidth,gridHeight);
    grid.teken();

    loadLevel("0");

    for(var b = 0; b < collisionObjects.length ; b++) {
        collisionObjects[b].draw(100,0,0);
    }

//    Josgoon.tekenEnemy();
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

function levelSize(lvl) {
    gridWidth = lvlData['levels'][lvl]['size']['x']
    gridHeight = lvlData['levels'][lvl]['size']['y']

}

function loadLevel(lvl) {
    let x,y,sprite,layout
    layout = lvlData['levels'][lvl]['layout'];
    x = null;
    y = null;
    sprite = null;

    for (let i=0; i<layout['length']/grid.aantalKolommen; i++) {
        y = i; 
        for (let j=0;j<grid.aantalKolommen;j++) {
            x = j;
            sprite = "wall_" + layout[i*grid.aantalKolommen + j];
            if (sprite !== "wall_0") {
                collisionObjects.push(new collisionObject(x, y, grid.celGrootte, grid.celGrootte, sprite));
            }
        }
    }
}