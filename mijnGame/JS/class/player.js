class Player {
    constructor(sprite, st, si) {
        this.sprite = sprite;
        this.x = null;
        this.y = null;
        this.step = st;
        this.size = si;
    }

    start(x, y) {
        this.x = x
        this.y = y
    }

    load() {
        image(this.sprite, this.x, this.y, this.size, this.size);
    }
}