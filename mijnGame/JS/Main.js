var collisionObjects = [];
var instnaceOrder = [0,1,1,2,3,4];
var decorations = [];
var tiles = [];
var gridWidth = null;
var gridHeight = null;
var bossroom = null;
var room = null;
var instanceCleared = false;
var startCellX = 1;
var startCellY = 1;
var recentDoor = null;
var initialised = false;
var instanceInList = 0;
var difficulty = 0;
var logoFrame = 0;
var creditScreen = false;
var creditY = 500;

function setup() {
    frameRate(60);
    let cnv = createCanvas(900,700);
    cnv.position(windowWidth/2 - cnv.width/2, windowHeight/2 - cnv.height/2);

    fill(255)
    stroke(0);
    strokeWeight(6)
    textSize(24);
    textFont(pFont);
    textAlign(CENTER);

    imageMode(CORNER);
    imgFilter(OPAQUE);

    grid = new Grid(100,startscreen);
    player = new Player(bruno, grid.celGrootte);

    player.start(startCellX*grid.celGrootte, startCellY*grid.celGrootte);
    room = instnaceOrder[instanceInList]; 

    recentDoor = "down";
    newInstance();
}

function draw() {
    if (initialised && !creditScreen) {
        move();
        window["room" + difficulty].setVolume(0.3);
        window["room" + difficulty].playMode('untilDone');
        window["room" + difficulty].play();
        if (keyIsDown(32) && !instanceCleared) {
            instanceCleared = true;
            instanceInList ++;
        }
        if ((keyIsDown(13) && instanceCleared)||(instanceCleared && doorCollisionCheck())) {
            if (instanceInList >= instnaceOrder.length) {
                instanceInList = 0;
                window["room" + difficulty].stop();
                difficulty++;
                if (difficulty >=3) {
                    initialised = false;
                    creditScreen = true;
                }
            }
            room = instnaceOrder[instanceInList];
            newInstance();
        }
        drawInstance();
        player.load();
    }

    else if (!initialised && creditScreen) {
        background(0);
        text(credits.join('\n'),450,creditY);
        creditY--;
    }

    else {
        ambience1.setVolume(0.3)
        ambience1.playMode('untilDone');
        ambience1.play();
        logoFrame += 1/10;
        if (logoFrame > 11) {
            logoFrame = 0;
        }
        image(logoAnim[Math.floor(logoFrame)],450-225,50,450,350);
        text('Controls:\nW,A,S,D om te bewegen\nLinker Muisknop om te Schieten\n\n\n\nDruk op Enter om te beginnen',450,450)
        if (keyIsDown(13)) {
            ambience1.stop();
            initialised = true;
        }
    }
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
    gridWidth = lvlData['levels'][lvl]['size']['x'];
    gridHeight = lvlData['levels'][lvl]['size']['y'];

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
    let x,y,sprite,layout,isDoor
    layout = lvlData['levels'][lvl]['layout'];
    x = null;
    y = null;
    sprite = null;
    isDoor = null;
    for (let i=0; i<floor(layout['length']/grid.aantalKolommen); i++) {
        y = i; 
        for (let j=0;j<grid.aantalKolommen;j++) {
            x = j;
            if (layout[i*grid.aantalKolommen + j] != 0) {
                if ([1,3,6,8].includes(layout[i*grid.aantalKolommen + j])) {
                    sprite = window["wall_" + layout[i*grid.aantalKolommen + j]];
                    isDoor = false;
                }
                else if (["d1","d2","d3","d4"].includes(layout[i*grid.aantalKolommen + j])) {
                    sprite = window["door_" + layout[i*grid.aantalKolommen + j]]
                    isDoor = true;
                }
                else {
                    sprite = window["wall_" + layout[i*grid.aantalKolommen + j] + String.fromCharCode(97 + Math.floor(Math.random()*2))];
                    isDoor = false;
                }
                collisionObjects.push(new collisionObject(x, y, grid.celGrootte, grid.celGrootte, sprite, isDoor));
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
    startPos(lvlData['levels'][room]['startpositions'][recentDoor]['x'],lvlData['levels'][room]['startpositions'][recentDoor]['y']);
}

function startPos(x,y) {
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
    player.doorU = false;
    player.doorL = false;
    player.doorR = false;
    player.doorD = false;

    grid.achtergrond(gridWidth,gridHeight);
    for(var i = 0; i < tiles.length ; i++) {
        tiles[i].draw(grid.celGrootte,grid.x,grid.y);
    }
    for(var b = 0; b < collisionObjects.length ; b++) {
        collisionObjects[b].draw(grid.celGrootte,grid.x,grid.y);
    }
}

function doorCollisionCheck() {
    if (player.doorU) {
        recentDoor = "down";
        return true;
    }
    if (player.doorL) {
        recentDoor = "right";
        return true;
    }
    if (player.doorR) {
        recentDoor = "left";
        return true;
    }
    if (player.doorD) {
        recentDoor = "up";
        return true;
    }
}

function imgFilter(type) {
    imgList.push(wall_1,wall_2a,wall_2b,wall_3,wall_4a,wall_4b,wall_5a,wall_5b,wall_6,wall_7a,wall_7b,wall_8,tilea,tileb,tilec,tiled)
    for(var i=0;i<imgList.length;i++) {
        imgList[i].filter(type);
    }
}