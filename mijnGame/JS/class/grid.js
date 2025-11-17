class Grid {
    constructor(r,k,c,bg) {
        this.aantalRijen = r;
        this.aantalKolommen = k;
        this.celGrootte = c;
        this.xRaster = 0;
        this.yRaster = 0;
        this.background = bg;
    }

    teken() {
        push();
        noFill();
        stroke('grey');
        for (var rij = 0;rij < this.aantalRijen;rij++) {
            for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
            rect(kolom*this.celGrootte+this.xRaster,rij*this.celGrootte+this.yRaster,this.celGrootte,this.celGrootte);
            }
        }
        pop();
    }

    achtergrond() {
        image(this.background,this.xRaster,this.yRaster,this.aantalKolommen*this.celGrootte,this.aantalRijen*this.celGrootte);
    }
}