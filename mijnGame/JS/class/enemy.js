class enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y; 
        this.color = "red";
    }

    tekenEnemy() {
        fill(this.color);     
        image(jos,this.x - 50,this.y - 50,100,100);
    }
}