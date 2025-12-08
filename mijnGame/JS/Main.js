var collisionObjects = [];
var decorations = [];
var tiles = [];
var gridWidth = null;
var gridHeight = null;
var bossroom = null;
var room = null;
var instanceCleared = false;

function setup() {
    frameRate(60);
    let cnv = createCanvas(900,700);
    cnv.position(windowWidth/2 - cnv.width/2, windowHeight/2 - cnv.height/2);

    imageMode(CENTER)

    grid = new Grid(100, b1);
    player = new Player(bruno, grid.celGrootte);


    player.start(4*grid.celGrootte, 3*grid.celGrootte);
    room = 0; 

    newInstance();
}

function draw() {
    move();
    if (keyIsDown(32) && !instanceCleared) {
        instanceCleared = true;
    }
    if (keyIsDown(13) && instanceCleared) {
        room = Math.floor(Math.random()*4);;
        newInstance();
    }
    drawInstance();
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
                if ([1,3,6,8].includes(layout[i*grid.aantalKolommen + j])) {
                    sprite = window["wall_" + layout[i*grid.aantalKolommen + j]];
                }
                else {
                    sprite = window["wall_" + layout[i*grid.aantalKolommen + j] + String.fromCharCode(97 + Math.floor(Math.random()*2))];
                }
                collisionObjects.push(new collisionObject(x, y, grid.celGrootte, grid.celGrootte, sprite));
            }
            else {
                sprite = window["tile" + String.fromCharCode(97 + Math.floor(Math.random()*4))];
                tiles.push(new decoration(x,y,grid.celGrootte,grid.celGrootte,sprite));
            }
        }
    }
}

function newInstance() {
    instanceCleared = false;
    player.start(4*grid.celGrootte, 3*grid.celGrootte);

    roomSize(room);
    grid.x = 0 + grid.celGrootte/2;
    grid.y = 0 + grid.celGrootte/2;

    grid.newInstance();
    player.newInstance();

    grid.achtergrond(gridWidth,gridHeight);
//    grid.teken();

    collisionObjects.length = 0;
    tiles.length = 0;

    loadRoom(room);
}

function drawInstance() {
    grid.achtergrond(gridWidth,gridHeight);
    for(var b = 0; b < collisionObjects.length ; b++) {
        collisionObjects[b].draw(grid.celGrootte,grid.x,grid.y);
    }
    for(var i = 0; i < tiles.length ; i++) {
        tiles[i].draw(grid.celGrootte,grid.x,grid.y);
    }
}