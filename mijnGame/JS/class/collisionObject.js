class collisionObject {
    constructor(x,y,w,h,sprite,isDoor) {
        this.x = x; 
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprite = sprite;
        this.isDoor = isDoor;
    }

    draw(step, gridStepX, gridStepY) {
    image(this.sprite, this.x*step + gridStepX, this.y*step + gridStepY, this.w, this.h);
    }
}
