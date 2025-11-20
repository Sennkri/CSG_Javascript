function preload() {
  b1 = loadImage('assets/backgrounds/bg1.png');
  bruno = loadImage('assets/sprites/bruno/bruno_portrait.png')
}

function setup() {
    frameRate(60);
    let cnv = createCanvas(500, 500);
    cnv.position(windowWidth/2 - cnv.width/2, windowHeight/2 - cnv.height/2);

    grid = new Grid(5, 5, 100, b1);
    player = new Player(bruno, grid.celGrootte, grid.celGrootte);

    player.start(0*grid.celGrootte, 2*grid.celGrootte);
}

function draw() {
    background("green");
    grid.achtergrond();
    grid.teken();

    player.load();
}