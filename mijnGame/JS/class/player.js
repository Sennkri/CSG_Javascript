class Player {
    constructor(sprite,si,grid) {
        this.sprite = sprite;
        this.x = null;
        this.y = null;
        this.step = si/8;
        this.size = si;
        this.cameraMarginH = null;
        this.cameraMarginV = null;
        this.hitMargin = 5;
        
        this.recentDoor = "down";

        this.doorU = false;
        this.doorL = false;
        this.doorR = false;
        this.doorD = false;

        this.grid = grid;
    }

    start(x, y) {
        this.x = x;
        this.y = y;
    }

    load() {
        image(this.sprite, this.x, this.y, this.size, this.size);
    }

    newInstance(bs) {
        this.step = this.size/8;

        if (!bs)  {
            this.cameraMarginH = 4*this.size;
            this.cameraMarginV = 3*this.size;
        }
        
        else {
            this.cameraMarginH = 8.5*this.size;
            this.cameraMarginV = 6.5*this.size;
        }
    }

    checkCollisionU(s,x,y) {
        for (var i=0;i<this.grid.collisionObjects.length;i++) {
            if (this.y-this.size-this.hitMargin<s*this.grid.collisionObjects[i].y + y+(this.grid.collisionObjects[i].h-s) &&
                this.y-this.hitMargin>s*this.grid.collisionObjects[i].y + y - this.grid.collisionObjects[i].h+(this.grid.collisionObjects[i].h-s) &&
                this.x-this.size<s*this.grid.collisionObjects[i].x + x+(this.grid.collisionObjects[i].w-s) &&
                this.x>s*this.grid.collisionObjects[i].x + x - this.grid.collisionObjects[i].w+(this.grid.collisionObjects[i].w-s)
             ) {
                if (this.grid.collisionObjects[i].isDoor) {
                    this.doorU = true;
                }
                else {
                    this.doorU = false;
                }
                return true;
             }
        }
        this.doorU = false;
        return false;
    }

    checkCollisionL(s,x,y) {
        for (var i=0;i<this.grid.collisionObjects.length;i++) {
            if (this.x-this.size-this.hitMargin<s*this.grid.collisionObjects[i].x + x+(this.grid.collisionObjects[i].w-s) &&
                this.x-this.hitMargin>s*this.grid.collisionObjects[i].x + x - this.grid.collisionObjects[i].w+(this.grid.collisionObjects[i].w-s) &&
                this.y-this.size<s*this.grid.collisionObjects[i].y + y+(this.grid.collisionObjects[i].h-s) &&
                this.y>s*this.grid.collisionObjects[i].y + y - this.grid.collisionObjects[i].h+(this.grid.collisionObjects[i].h-s)
             ) {
                if (this.grid.collisionObjects[i].isDoor) {
                    this.doorL = true;
                }
                else {
                    this.doorL = false;
                }
                return true;
             }
        }
        this.doorL = false;
        return false;
    }

    checkCollisionD(s,x,y) {
        for (var i=0;i<this.grid.collisionObjects.length;i++) {
            if (this.y-this.size+this.hitMargin<s*this.grid.collisionObjects[i].y + y+(this.grid.collisionObjects[i].h-s) &&
                this.y+this.hitMargin>s*this.grid.collisionObjects[i].y + y - this.grid.collisionObjects[i].h+(this.grid.collisionObjects[i].h-s) &&
                this.x-this.size<s*this.grid.collisionObjects[i].x + x+(this.grid.collisionObjects[i].w-s) &&
                this.x>s*this.grid.collisionObjects[i].x + x - this.grid.collisionObjects[i].w+(this.grid.collisionObjects[i].w-s)
             ) {
                if (this.grid.collisionObjects[i].isDoor) {
                    this.doorD = true;
                }
                else {
                    this.doorD = false;
                }
                return true;
             }
        }
        this.doorD = false;
        return false;
    }

    checkCollisionR(s,x,y) {
        for (var i=0;i<this.grid.collisionObjects.length;i++) {
            if (this.x-this.size+this.hitMargin<s*this.grid.collisionObjects[i].x + x+(this.grid.collisionObjects[i].w-s) &&
                this.x+this.hitMargin>s*this.grid.collisionObjects[i].x + x - this.grid.collisionObjects[i].w+(this.grid.collisionObjects[i].w-s) &&
                this.y-this.size<s*this.grid.collisionObjects[i].y + y+(this.grid.collisionObjects[i].h-s) &&
                this.y>s*this.grid.collisionObjects[i].y + y - this.grid.collisionObjects[i].h+(this.grid.collisionObjects[i].h-s)
             ) {
                if (this.grid.collisionObjects[i].isDoor) {
                    this.doorR = true;
                }
                else {
                    this.doorR = false;
                }
                return true;
             }
        }
        this.doorR = false;
        return false;
    }

    doorCollisionCheck() {
        if (this.doorU) {
            this.recentDoor = "down";
            return true;
        }
        if (this.doorL) {
            this.recentDoor = "right";
            return true;
        }
        if (this.doorR) {
            this.recentDoor = "left";
            return true;
        }
        if (this.doorD) {
            this.recentDoor = "up";
            return true;
        }
    }
}