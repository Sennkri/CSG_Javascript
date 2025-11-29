class Grid {
    constructor(c,bg,st) {
        this.aantalRijen = null;
        this.aantalKolommen = null;
        this.celGrootte = c;
        this.x = null;
        this.y = null;
        this.background = bg;
        this.step = st;
        this.width = null;
        this.height = null;
    }

/*    start(x, y) {
        this.x += this.celGrootte * x;
        this.y += this.celGrootte * y;
    }*/

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
}