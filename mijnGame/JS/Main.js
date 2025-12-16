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
    player = new Player(grid);

    game = new BrunosKerker(player);

    game.start();
}

function draw() {
    game.draw()
}

function imgFilter(type) {
    imgList.push(wall_1,wall_2a,wall_2b,wall_3,wall_4a,wall_4b,wall_5a,wall_5b,wall_6,wall_7a,wall_7b,wall_8,tilea,tileb,tilec,tiled)
    for(var i=0;i<imgList.length;i++) {
        imgList[i].filter(type);
    }
}

function mousePressed() {
    var k = new bullet(player.x, player.y);
    game.kogels.push(k); 
}