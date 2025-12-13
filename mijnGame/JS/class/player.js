class Player {
    constructor(sprite,si) {
        this.sprite = sprite;
        this.x = null;
        this.y = null;
        this.step = si/8;
        this.size = si;
        this.cameraMarginH = null;
        this.cameraMarginV = null;
        this.hitMargin = 5;
    }

    start(x, y) {
        this.x = x;
        this.y = y;
    }

    load() {
        image(this.sprite, this.x, this.y, this.size, this.size);
    }

    newInstance() {
        this.step = this.size/8;

        if (!bossroom)  {
            this.cameraMarginH = 4*this.size;
            this.cameraMarginV = 3*this.size;
        }
        
        if (bossroom) {
            this.cameraMarginH = 8.5*this.size;
            this.cameraMarginV = 6.5*this.size;
        }
    }

    checkCollisionU(s,x,y) {
        for (var i=0;i<collisionObjects.length;i++) {
            if (this.y-this.size-this.hitMargin<s*collisionObjects[i].y + y+(collisionObjects[i].h-s) &&
                this.y-this.hitMargin>s*collisionObjects[i].y + y - collisionObjects[i].h+(collisionObjects[i].h-s) &&
                this.x-this.size<s*collisionObjects[i].x + x+(collisionObjects[i].w-s) &&
                this.x>s*collisionObjects[i].x + x - collisionObjects[i].w+(collisionObjects[i].w-s)
             ) {
                return true;
             }
        }
        return false;
    }

    checkCollisionL(s,x,y) {
        for (var i=0;i<collisionObjects.length;i++) {
            if (this.x-this.size-this.hitMargin<s*collisionObjects[i].x + x+(collisionObjects[i].w-s) &&
                this.x-this.hitMargin>s*collisionObjects[i].x + x - collisionObjects[i].w+(collisionObjects[i].w-s) &&
                this.y-this.size<s*collisionObjects[i].y + y+(collisionObjects[i].h-s) &&
                this.y>s*collisionObjects[i].y + y - collisionObjects[i].h+(collisionObjects[i].h-s)
             ) {
                return true;
             }
        }
        return false;
    }

    checkCollisionD(s,x,y) {
        for (var i=0;i<collisionObjects.length;i++) {
            if (this.y-this.size+this.hitMargin<s*collisionObjects[i].y + y+(collisionObjects[i].h-s) &&
                this.y+this.hitMargin>s*collisionObjects[i].y + y - collisionObjects[i].h+(collisionObjects[i].h-s) &&
                this.x-this.size<s*collisionObjects[i].x + x+(collisionObjects[i].w-s) &&
                this.x>s*collisionObjects[i].x + x - collisionObjects[i].w+(collisionObjects[i].w-s)
             ) {
                return true;
             }
        }
        return false;
    }

    checkCollisionR(s,x,y) {
        for (var i=0;i<collisionObjects.length;i++) {
            if (this.x-this.size+this.hitMargin<s*collisionObjects[i].x + x+(collisionObjects[i].w-s) &&
                this.x+this.hitMargin>s*collisionObjects[i].x + x - collisionObjects[i].w+(collisionObjects[i].w-s) &&
                this.y-this.size<s*collisionObjects[i].y + y+(collisionObjects[i].h-s) &&
                this.y>s*collisionObjects[i].y + y - collisionObjects[i].h+(collisionObjects[i].h-s)
             ) {
                return true;
             }
        }
        return false;
    }

}