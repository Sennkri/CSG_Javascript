class gridObject {
    constructor(sprite,x,y) {
        this.x = x*raster.celGrootte+raster.xRaster;
        this.y = y*raster.celGrootte+raster.yRaster;
        this.sprite = sprite;
    }
}

class collisionObject extends gridObject {
    constructor(sprite,x,y,w,h) {
        super(sprite,x,y);
        this.w = w*raster.celGrootte;
        this.h = h*raster.celGrootte;
    }

    draw() {
        image(this.sprite,this.x+raster.xRaster,this.y+raster.yRaster,this.w,this.h);
    }
}

class Speler {
    constructor(sprite,stap) {
        this.x = raster.celGrootte*floor((canvas.width/raster.celGrootte)/2);
        this.y = raster.celGrootte*floor((canvas.height/raster.celGrootte)/2);
        this.sprite = sprite;
        this.hitbox = 10;
        this.stapgrootte = raster.celGrootte*stap
    }

    collideCheckL(collisionLijst) {
        for (var i = 0; i < collisionLijst.length; i++) {
            if (
                this.x > collisionLijst[i].x + raster.xRaster &&
                this.x - this.hitbox < collisionLijst[i].x + collisionLijst[i].w + raster.xRaster &&
                this.y >= collisionLijst[i].y + raster.yRaster &&
                this.y < collisionLijst[i].y + collisionLijst[i].h + raster.yRaster
            ) {
                return true;
            }
        }
        return false;
    }

    collideCheckR(collisionLijst) {
        for (var i = 0; i < collisionLijst.length; i++) {
            if (
                this.x + raster.celGrootte + this.hitbox > collisionLijst[i].x + raster.xRaster &&
                this.x + raster.celGrootte + this.hitbox < collisionLijst[i].x + collisionLijst[i].w + raster.xRaster &&
                this.y >= collisionLijst[i].y + raster.yRaster &&
                this.y < collisionLijst[i].y + collisionLijst[i].h + raster.yRaster
            ) {
                return true;
            }
        }
        return false;
    }
    collideCheckU(collisionLijst) {
        for (var i = 0; i < collisionLijst.length; i++) {
            if (
                this.y - this.hitbox > collisionLijst[i].y + raster.yRaster &&
                this.y - this.hitbox < collisionLijst[i].y + collisionLijst[i].h + raster.yRaster &&
                this.x >= collisionLijst[i].x + raster.xRaster &&
                this.x < collisionLijst[i].x + collisionLijst[i].w + raster.xRaster
            ) {
                return true; 
            }
        }
        return false; 
    }

    collideCheckD(collisionLijst) {
        for (var i = 0; i < collisionLijst.length; i++) {
            if (
                this.y + raster.celGrootte + this.hitbox > collisionLijst[i].y + raster.yRaster &&
                this.y + raster.celGrootte + this.hitbox < collisionLijst[i].y + collisionLijst[i].h + raster.yRaster &&
                this.x >= collisionLijst[i].x + raster.xRaster &&
                this.x < collisionLijst[i].x + collisionLijst[i].w + raster.xRaster
            ) {
                return true; 
            }
        }
        return false; 
    }

    move() {
        if(keyIsDown(RIGHT_ARROW)) {
            if(!speler.collideCheckR(collisionObjects)) {
                raster.xRaster -= this.stapgrootte;
            }
        }
        if(keyIsDown(LEFT_ARROW)) {
            if(!speler.collideCheckL(collisionObjects)) {
                raster.xRaster += this.stapgrootte;
            }
        }
        if(keyIsDown(UP_ARROW)) {
            if(!speler.collideCheckU(collisionObjects)) {
                raster.yRaster += this.stapgrootte;
            }
        }
        if(keyIsDown(DOWN_ARROW)) {
            if(!speler.collideCheckD(collisionObjects)) {
                raster.yRaster -= this.stapgrootte;
            }
        }

        raster.xRaster = constrain(raster.xRaster,-raster.aantalKolommen*raster.celGrootte+this.x+raster.celGrootte,this.x);
        raster.yRaster = constrain(raster.yRaster,-raster.aantalRijen*raster.celGrootte+this.y+raster.celGrootte,this.y);
    }

    draw() {
        image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
    }
}

function preload() {
    skyline = loadImage("images/backgrounds/skyline_2.jpg");
    appel = loadImage("images/sprites/appel_1.png");
    jos = loadImage("images/sprites/Jos100px/Jos_0.png");
}

var collisionObjects = [];

function setup() {
    canvas = createCanvas(900,600);
    canvas.parent('processing');
    frameRate(15);


    raster = new Raster(32,32,100,skyline);
    speler = new Speler(jos,1);
    
    collisionObjects.push(new collisionObject(appel,6,4,2,2));
    collisionObjects.push(new collisionObject(appel,2,2,1,2));
    collisionObjects.push(new collisionObject(appel,10,3,3,2));
    collisionObjects.push(new collisionObject(jos,9,9,2,5));
    collisionObjects.push(new collisionObject(jos,9,2,1,1))
}

function draw() {
    background('darkred');
    raster.achtergrond();
    raster.teken();
    speler.draw();
    for(var b = 0; b < collisionObjects.length ; b++) {
        collisionObjects[b].draw();
    }

    speler.move();
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

