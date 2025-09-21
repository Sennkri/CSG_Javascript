class gridObject {
    constructor(sprite,x,y) {
        this.x = x*celGrootte;
        this.y = y*celGrootte;
        this.sprite = sprite;
    }

    draw() {
        image(this.sprite,this.x,this.y,this.w,this.h);
    }
}

class speler {
    
}

class collisionOject extends gridObject {
    constructor(sprite,x,y,w,h) {
        super(sprite,x,y);
        

    }
}

function preload() {
    skyline = loadImage("images/backgrounds/skyline_2.jpg");
}

function setup() {
    canvas = createCanvas(900,600);
    canvas.parent('processing');
    background('darkred');
    frameRate(15);

    raster = new Raster(6,9,100,skyline);
}

function draw() {
    raster.achtergrond();
    raster.teken();
}

class Raster {
    constructor(r,k,c,bg) {
        this.aantalRijen = r;
        this.aantalKolommen = k;
        this.celGrootte = c;
        this.xRaster = 0;
        this.yRaster = 0;
        this.background = bg;
    }

    teken() {
        push();
        noFill();
        stroke('grey');
        for (var rij = 0;rij < this.aantalRijen;rij++) {
            for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
            rect(kolom*this.celGrootte+this.xRaster,rij*this.celGrootte+this.yRaster,this.celGrootte,this.celGrootte);
            }
        }
        pop();
    }

    achtergrond() {
        image(this.background,this.xRaster,this.yRaster,this.aantalKolommen*this.celGrootte,this.aantalRijen*this.celGrootte);
    }
}
