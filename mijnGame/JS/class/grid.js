class Grid {
    constructor(c,bg) {
        this.aantalRijen = null;
        this.aantalKolommen = null;
        this.celGrootte = c;
        this.x = null;
        this.y = null;
        this.background = bg;
        this.step = c/8;
        this.width = null;
        this.height = null;

        this.decorations = [];
        this.tiles = [];
        this.collisionObjects = [];
        this.enemies = [];
    }

    newInstance() {
        this.step = this.celGrootte/8;
    }

    teken() {
        push();
        noFill();
        stroke('grey');
        for (var rij = 0;rij < this.aantalRijen;rij++) {
            for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
            rect(kolom*this.celGrootte+this.x,rij*this.celGrootte+this.y,this.celGrootte,this.celGrootte);
            }
        }
        pop();
    }

    achtergrond(k,r) {
        this.aantalKolommen = k;
        this.aantalRijen = r;

        this.width = (this.aantalKolommen-1)*this.celGrootte;
        this.height = (this.aantalRijen-1)*this.celGrootte;

        image(this.background,this.x,this.y,this.aantalKolommen*this.celGrootte,this.aantalRijen*this.celGrootte);
    }

    loadRoom(lvl) {
        let x,y,sprite,layout,isDoor,chance;
        layout = lvlData['levels'][lvl]['layout'];
        x = null;
        y = null;
        sprite = null;
        isDoor = null;
        chance = 7;
        for (let i=0; i<floor(layout['length']/this.aantalKolommen); i++) {
            y = i; 
            for (let j=0;j<this.aantalKolommen;j++) {
                x = j;
                if (layout[i*this.aantalKolommen + j] != 0) {
                    if ([1,3,6,8].includes(layout[i*this.aantalKolommen + j])) {
                        sprite = window["wall_" + layout[i*this.aantalKolommen + j]];
                        isDoor = false;
                    }
                    else if (["d1","d2","d3","d4"].includes(layout[i*this.aantalKolommen + j])) {
                        sprite = window["door_" + layout[i*this.aantalKolommen + j]]
                        isDoor = true;
                    }
                    else {
                        sprite = window["wall_" + layout[i*this.aantalKolommen + j] + String.fromCharCode(97 + Math.floor(Math.random()*2))];
                        isDoor = false;
                    }
                    this.collisionObjects.push(new collisionObject(x, y, this.celGrootte, this.celGrootte, sprite, isDoor));
                }
                else {
                    sprite = window["tile" + String.fromCharCode(97 + Math.floor(Math.random()*4))];
                    this.tiles.push(new collisionObject(x,y,this.celGrootte,this.celGrootte,sprite));
                    if (Math.floor(Math.random()*chance) == 1 && !game.bossroom && this.enemies.length < 4 + game.difficulty) {
                        chance += 3;
                        this.enemies.push(new enemy(x*this.celGrootte,y*this.celGrootte,game.difficulty,1));
                    }
                }
            }
        }
    }
}