class collisionObject {
    constructor(x,y,w,h,sprite) {
        this.x = x; 
        this.y = y;
        this.w = w;
        this.h = h;
        this.sprite = sprite;
    }

    /*draw(step, gridStep) {
    image(this.sprite, this.x*step + gridStep, this.y*step + gridStep, this.w, this.h);
    }*/

    draw(step, gridStepX, gridStepY) {
        let colour = null;

        if (this.sprite == "wall_1") {
            colour = 'green';
        }
        else if (this.sprite == "wall_2") {
            colour = 'red';
        }
        fill(colour);
        rect(this.x*step + gridStepX, this.y*step + gridStepY, this.w, this.h)
        noStroke();
    }
}
