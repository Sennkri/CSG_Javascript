class bullet {
    constructor(x, y) {
        this.x = x + player.size/2;
        this.y = y + player.size/2;
        this.speed = 10;
        this.dx = mouseX - this.x;
        this.dy = mouseY - this.y;
        this.distMouse = sqrt((this.dx * this.dx) + (this.dy * this.dy));
    }

    spawnBullet() {
        image(bulletSprite,this.x,this.y,30,30)
        if (this.distMouse > 1) {
            this.x += (this.dx / this.distMouse) * this.speed;
            this.y += (this.dy / this.distMouse) * this.speed;
        }
    }
}