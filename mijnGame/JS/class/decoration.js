class decoration {
    constructor(x, y, w, h, sprite) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.sprite = sprite;
    }

 draw(step, gridStepX, gridStepY) {
    image(this.sprite, this.x*step + gridStepX, this.y*step + gridStepY, this.width, this.height);
    }
}


