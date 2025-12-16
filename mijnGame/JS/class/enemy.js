class enemy {
    constructor(x, y, diff,hp) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100; 
        this.hp = (diff + 1)*hp
        this.enemyBullets = [];
    }

    draw() {
        image(lemoon,this.x+game.grid.x,this.y+game.grid.y,this.w,this.h);
    }
}