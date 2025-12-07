class Player {
    constructor(sprite,si) {
        this.sprite = sprite;
        this.x = null;
        this.y = null;
        this.step = si/8;
        this.size = si;
        this.cameraMarginH = null;
        this.cameraMarginV = null;
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
            this.cameraMarginH = 4*this.step*8;
            this.cameraMarginV = 3*this.step*8;
        }
        
        if (bossroom) {
            this.cameraMarginH = 8.5*this.step*8;
            this.cameraMarginV = 6.5*this.step*8;
        }
    }
}