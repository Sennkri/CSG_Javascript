class BrunosKerker {
    constructor(player) {
        this.player = player;
        this.grid = player.grid;

        this.instnaceOrder = [0,1,1,2,3,4];
        this.gridWidth = null;
        this.gridHeight = null;
        this.bossroom = null;
        this.room = null;
        this.instanceCleared = false;
        this.startCellX = 1;
        this.startCellY = 1;
        this.initialised = false;
        this.instanceInList = 0;
        this.difficulty = 0;
        this.logoFrame = 0;
        this.creditScreen = false;
        this.creditY = 700;

        this.kogels = [];
    }

    start() {
    this.player.start(this.startCellX*this.grid.celGrootte, this.startCellY*this.grid.celGrootte);
    this.room = this.instnaceOrder[this.instanceInList]; 
    this.newInstance();
    }

    draw() {
        if (this.initialised && !this.creditScreen) {
            this.move();
            window["room" + this.difficulty].setVolume(0.3);
            window["room" + this.difficulty].playMode('untilDone');
            window["room" + this.difficulty].play();
            if (keyIsDown(98) && !this.instanceCleared) {
                this.instanceCleared = true;
                this.instanceInList ++;
            }
            if ((keyIsDown(97) && this.instanceCleared)||(this.instanceCleared && this.player.doorCollisionCheck())) {
                if (this.instanceInList >= this.instnaceOrder.length) {
                    this.instanceInList = 0;
                    window["room" + this.difficulty].stop();
                    this.difficulty++;
                    if (this.difficulty >=3) {
                        this.initialised = false;
                        this.creditScreen = true;
                        background(0)
                    }
                }
                this.room = this.instnaceOrder[this.instanceInList];
                this.newInstance();
            }
            this.drawInstance();
            for (let k of this.kogels) {
                k.spawnBullet();
            }
            this.player.load();
        }

        else if (!this.initialised && this.creditScreen) {
            creditsMusic.setVolume(0.3)
            creditsMusic.playMode('untilDone');
            creditsMusic.play();
            background(0);
            text(credits.join('\n'),450,this.creditY);
            this.creditY-= .3;
        }

        else {
            ambience1.setVolume(0.3)
            ambience1.playMode('untilDone');
            ambience1.play();
            this.logoFrame += 1/10;
            if (this.logoFrame > 11) {
                this.logoFrame = 0;
            }
            image(logoAnim[Math.floor(this.logoFrame)],450-225,50,450,350);
            text('Controls:\nW,A,S,D of Pijltjes om te bewegen\nLinker Muisknop om te Schieten\n\n\n\nDruk op Enter om te beginnen',450,450)
            if (keyIsDown(13)) {
                ambience1.stop();
                this.initialised = true;
            }
        }
    }

    move() {
        if ((keyIsDown(65) || keyIsDown(LEFT_ARROW)) && !this.player.checkCollisionL(this.grid.celGrootte,this.grid.x,grid.y)) {
            if (this.grid.x < this.player.x - this.player.cameraMarginH && this.grid.x + this.grid.width >= this.player.x + this.player.cameraMarginH) {
                this.grid.x += this.grid.step;
            }
            else if (this.grid.x < this.player.x){
                this.player.x -= this.player.step;
            }
        }

        if ((keyIsDown(68) || keyIsDown(RIGHT_ARROW)) && !this.player.checkCollisionR(this.grid.celGrootte,this.grid.x,this.grid.y)) {
            if (this.grid.x + this.grid.width > this.player.x + this.player.cameraMarginH && this.grid.x <= this.player.x - this.player.cameraMarginH) {
                this.grid.x -= this.grid.step;
            }
            else if (this.grid.x + this.grid.width > this.player.x) {
                this.player.x += this.player.step;
            }
        }

        if ((keyIsDown(87) || keyIsDown(UP_ARROW)) && !this.player.checkCollisionU(this.grid.celGrootte,this.grid.x,this.grid.y)) {
            if (this.grid.y < this.player.y - this.player.cameraMarginV && this.grid.y + this.grid.height >= this.player.y + this.player.cameraMarginV) {
                this.grid.y += this.grid.step;
            }
            else if (this.grid.y < this.player.y){
                this.player.y -= this.player.step;
            }
        }

        if ((keyIsDown(83) || keyIsDown(DOWN_ARROW)) && !player.checkCollisionD(this.grid.celGrootte,this.grid.x,this.grid.y)) {
            if (this.grid.y + this.grid.height > this.player.y + this.player.cameraMarginV && this.grid.y <= this.player.y - this.player.cameraMarginV) {
                this.grid.y -= this.grid.step;
            }
            else if (this.grid.y + this.grid.height > this.player.y) {
                this.player.y += this.player.step;
            }
        }
    }

    roomSize(lvl) {
        this.gridWidth = lvlData['levels'][lvl]['size']['x'];
        this.gridHeight = lvlData['levels'][lvl]['size']['y'];

        this.bossroom = lvlData['levels'][lvl]['bossroom'];
        if (this.bossroom) {
            this.grid.celGrootte = 50;
            this.player.size = 50;
        }
        else {
            this.grid.celGrootte = 100;
            this.player.size = 100;
        }
    }

    newInstance() {
        this.instanceCleared = false;

        this.roomSize(this.room);
        this.grid.x = 0;
        this.grid.y = 0;
        this.player.start(this.startCellX*this.grid.celGrootte, this.startCellY*this.grid.celGrootte);

        this.grid.newInstance();
        this.player.newInstance(this.bossroom);

        this.grid.achtergrond(this.gridWidth,this.gridHeight);

        this.grid.collisionObjects.length = 0;
        this.grid.tiles.length = 0;
        this.grid.loadRoom(this.room);
        this.startPos(lvlData['levels'][this.room]['startpositions'][this.player.recentDoor]['x'],lvlData['levels'][this.room]['startpositions'][this.player.recentDoor]['y']);
    }
    startPos(x,y) {
        if (x*this.grid.celGrootte > this.player.cameraMarginH) {
            if(x*this.grid.celGrootte > this.grid.width-this.player.cameraMarginH) {
                this.player.x = 2*this.player.cameraMarginH + this.grid.celGrootte*(x-1) - this.grid.width;
                this.grid.x =- (this.grid.width - 2*this.player.cameraMarginH);
            }
            else {
                this.player.x = this.player.cameraMarginH;
                this.grid.x =- (x*this.grid.celGrootte - this.player.cameraMarginH);
            }
        }
        else {
            this.player.x = x*this.grid.celGrootte;
        }

            if (y*this.grid.celGrootte > this.player.cameraMarginV) {
            if(y*this.grid.celGrootte > this.grid.height-this.player.cameraMarginV) {
                this.player.y = 2*this.player.cameraMarginV + this.grid.celGrootte*(y-1) - this.grid.height;
                this.grid.y =- (this.grid.height - 2*this.player.cameraMarginV);
            }
            else {
                this.player.y = this.player.cameraMarginV;
                this.grid.y =- (y*this.grid.celGrootte - this.player.cameraMarginV);
            }
        }
        else {
            this.player.y = y*this.grid.celGrootte;
        }
    }

    drawInstance() {
        this.player.doorU = false;
        this.player.doorL = false;
        this.player.doorR = false;
        this.player.doorD = false;

        this.grid.achtergrond(this.gridWidth,this.gridHeight);
        for(var i = 0; i < this.grid.tiles.length ; i++) {
            this.grid.tiles[i].draw(this.grid.celGrootte,this.grid.x,this.grid.y);
        }
        for(var b = 0; b < this.grid.collisionObjects.length ; b++) {
            this.grid.collisionObjects[b].draw(this.grid.celGrootte,this.grid.x,this.grid.y);
        }
    }
}