var collisionObjects = [];
var decorations = [];
var tiles = [];
var gridWidth = null;
var gridHeight = null;
var bossroom = null;
var room = null;
var instanceCleared = false;
var startCellX = 1;
var startCellY = 1;

function setup() {
    frameRate(60);
    let cnv = createCanvas(900,700);
    cnv.position(windowWidth/2 - cnv.width/2, windowHeight/2 - cnv.height/2);

    imageMode(CORNER)

    grid = new Grid(100, b1);
    player = new Player(bruno, grid.celGrootte);

    player.start(startCellX*grid.celGrootte, startCellY*grid.celGrootte);
    room = 1; 

    newInstance();
}

function draw() {
    move();
    if (keyIsDown(32) && !instanceCleared) {
        instanceCleared = true;
    }
    if (keyIsDown(13) && instanceCleared) {
        room = Math.floor(Math.random()*lvlData['levels']['length']);
        newInstance();
    }
    drawInstance();
    player.load();
}

function move() {
    if (keyIsDown(65) && !player.checkCollisionL(grid.celGrootte,grid.x,grid.y)) {
        if (grid.x < player.x - player.cameraMarginH && grid.x + grid.width >= player.x + player.cameraMarginH) {
            grid.x += grid.step;
        }
        else if (grid.x < player.x){
            player.x -= player.step;
        }
    }

    if (keyIsDown(68) && !player.checkCollisionR(grid.celGrootte,grid.x,grid.y)) {
        if (grid.x + grid.width > player.x + player.cameraMarginH && grid.x <= player.x - player.cameraMarginH) {
            grid.x -= grid.step;
        }
        else if (grid.x + grid.width > player.x) {
            player.x += player.step;
        }
    }

    if (keyIsDown(87) && !player.checkCollisionU(grid.celGrootte,grid.x,grid.y)) {
        if (grid.y < player.y - player.cameraMarginV && grid.y + grid.height >= player.y + player.cameraMarginV) {
            grid.y += grid.step;
        }
        else if (grid.y < player.y){
            player.y -= player.step;
        }
    }

    if (keyIsDown(83) && !player.checkCollisionD(grid.celGrootte,grid.x,grid.y)) {
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

    roomSize(room);
    grid.x = 0;
    grid.y = 0;
    player.start(startCellX*grid.celGrootte, startCellY*grid.celGrootte);

    grid.newInstance();
    player.newInstance();

    grid.achtergrond(gridWidth,gridHeight);
//    grid.teken();

    collisionObjects.length = 0;
    tiles.length = 0;
    loadRoom(room);
    startPos(Math.floor(gridWidth/2),Math.floor(gridHeight/2));

    imgFilter();
}

function startPos(x,y) {
    // x
    if (x*grid.celGrootte > player.cameraMarginH) {
        if(x*grid.celGrootte > grid.width-player.cameraMarginH) {
            player.x = 2*player.cameraMarginH + grid.celGrootte*(x-1) - grid.width;
            grid.x =- (grid.width - 2*player.cameraMarginH);
        }
        else {
            player.x = player.cameraMarginH;
            grid.x =- (x*grid.celGrootte - player.cameraMarginH);
        }
    }
    else {
        player.x = x*grid.celGrootte;
    }

    // y 
        if (y*grid.celGrootte > player.cameraMarginV) {
        if(y*grid.celGrootte > grid.height-player.cameraMarginV) {
            player.y = 2*player.cameraMarginV + grid.celGrootte*(y-1) - grid.height;
            grid.y =- (grid.height - 2*player.cameraMarginV);
        }
        else {
            player.y = player.cameraMarginV;
            grid.y =- (y*grid.celGrootte - player.cameraMarginV);
        }
    }
    else {
        player.y = y*grid.celGrootte;
    }
}

function drawInstance() {
    grid.achtergrond(gridWidth,gridHeight);
    for(var i = 0; i < tiles.length ; i++) {
        tiles[i].draw(grid.celGrootte,grid.x,grid.y);
    }
    for(var b = 0; b < collisionObjects.length ; b++) {
        collisionObjects[b].draw(grid.celGrootte,grid.x,grid.y);
    }
}
