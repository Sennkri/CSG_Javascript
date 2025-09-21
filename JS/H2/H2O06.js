var aantalRijenRaster = 15;
var aantalKolommenRaster = 12;
var celGrootte;

var speed;
var spriteJos;
var xJos = 400;
var yJos = 300;
var xRaster = 0;
var yRaster = 0;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  spriteJos = loadImage("images/sprites/Jos100px/Jos_0.png");
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  frameRate(15);
  celGrootte = width / 9;
  xRasterMax = -aantalKolommenRaster * celGrootte + xJos + celGrootte;
  yRasterMax = -aantalRijenRaster * celGrootte + yJos + celGrootte;
}

function draw() {
  speed = celGrootte;
  background('Brown');
  image(brug,xRaster,yRaster,aantalKolommenRaster*celGrootte,aantalRijenRaster*celGrootte);
  tekenRaster();
  tekenObject(0,7,3,3,'green');
  tekenObject(3,6,2,3,'blue');
  tekenObject(1,1,1,1,'red');
  tekenObject(9,7,3,3,'yellow');

  if (keyIsDown(RIGHT_ARROW)) {
    xRaster -= speed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    xRaster += speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaster -= speed;
  }
    if (keyIsDown(UP_ARROW)) {
    yRaster += speed;
  }
  
  xRaster = constrain(xRaster,xRasterMax,xJos);
  yRaster = constrain(yRaster,yRasterMax,yJos)
  image(spriteJos,xJos,yJos);
}

function tekenRaster() {
  push();
  noFill();
  stroke('grey');
  for (var rij = 0;rij < aantalRijenRaster;rij++) {
    for (var kolom = 0;kolom < aantalKolommenRaster;kolom++) {
      rect(kolom*celGrootte+xRaster,rij*celGrootte+yRaster,celGrootte,celGrootte);
    }
  }
  pop();
}

function tekenObject(x, y, w, h, kleur) {
  fill(kleur);
  rect(x*celGrootte+xRaster,y*celGrootte+yRaster,w*celGrootte,h*celGrootte);
}