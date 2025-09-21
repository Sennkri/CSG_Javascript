var aantalRijenRaster = 6;
var aantalKolommenRaster = 9;
var celGrootte;
var rij;
var kolom;

var spriteJos;
var xJos;
var yJos;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  spriteJos = loadImage("images/sprites/Jos100px/Jos_0.png");
}

function setup() {
  canvas = createCanvas(901,601);
  canvas.parent('processing');
  celGrootte = width / aantalKolommenRaster;
}

function draw() {
  xJos = 4*celGrootte;
  yJos = 3*celGrootte;
  background(brug);
  tekenRaster();
  image(spriteJos,xJos,yJos)


}

function tekenRaster() {
  push();
  noFill();
  stroke('grey');
  for (var rij = 0;rij < aantalRijenRaster;rij++) {
    for (var kolom = 0;kolom < aantalKolommenRaster;kolom++) {
      rect(kolom*celGrootte,rij*celGrootte,celGrootte,celGrootte);
    }
  }
  pop();
}

function Oefenshi(x,y,w,h,kleur) {
  rect(x,y,w,h);
  fill(kleur);  
}