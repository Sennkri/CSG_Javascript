class bullet {
    constructor(x, y, speed, destinationX, destinationY, size,player) {
        this.x = x + game.player.size/2;
        this.y = y + game.player.size/2;
        this.speed = speed; // niet meer dan 100
        this.size = size;
        this.dx = destinationX - this.x;
        this.dy = destinationY - this.y;
        this.distTarget = sqrt((this.dx * this.dx) + (this.dy * this.dy));
        this.player = player;
        this.hit = null;

    }

    spawnBullet() {
        let gridx = game.grid.x
        let gridy = game.grid.y

        image(bulletSprite,this.x+gridx,this.y+gridy,this.size,this.size)

        if (this.distTarget > 1) {
            this.x += (this.dx / this.distTarget) * this.speed;
            this.y += (this.dy / this.distTarget) * this.speed;
        }

        if (this.player) {
            this.hitEnemy();
        }
        else {
            this.hitPlayer();
        }
        
    }

    
    hitEnemy() {
        let gridx = game.grid.x
        let gridy = game.grid.y

        let enemyList = game.grid.enemies;
        for(let i = 0;i<enemyList.length;i++) {
            if(this.x>enemyList[i].x+gridx && this.x<enemyList[i].x+enemyList[i].w +gridx&&
                this.y>enemyList[i].y+gridy && this.y<enemyList[i].y+enemyList[i].h+gridy) {
                enemyList[i].hp -= 1
                if(enemyList[i].hp <= 0) enemyList.splice(i,1);
                this.hit = true;
            }
        }
    }

    hitPlayer() {
        let gridx = game.grid.x
        let gridy = game.grid.y

        let hitplayer = game.player;
        if(this.x>hitplayer.x +gridx&& this.x<hitplayer.x+hitplayer.size +gridx&&
            this.y>hitplayer.y+ gridy&& this.y<hitplayer.y+hitplayer.size +gridy) {
                hitplayer.hp -= 5
                this.hit = true;
        }

        if (hitplayer.hp <= 0) {
            game.death();
        }
    }

}