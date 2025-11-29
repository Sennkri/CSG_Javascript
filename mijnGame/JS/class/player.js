class Player {
    constructor(sprite, st, si) {
        this.sprite = sprite;
        this.x = null;
        this.y = null;
        this.step = st;
        this.size = si;
        this.cameraMarginH = null;
        this.cameraMarginV = null;
    }

    start(x, y) {
        this.x = x;
        this.y = y;
        this.cameraMarginH = 4*this.step*8;
        this.cameraMarginV = 3*this.step*8;
    }

    load() {
        image(this.sprite, this.x, this.y, this.size, this.size);
    }
}