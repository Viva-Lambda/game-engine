//
"use strict";

DokuCizilebilir.prototype.pikselleriKoy = function() {
    if (this.mPikseller === null) {
        this.mPikseller = gMotor.Dokular.dokuPikselleriAl(this.mDokum);
    }
};

DokuCizilebilir.prototype._pikselAlphaDegeri = function(x, y) {
    //
    x = x * 4;
    y = y * 4;
    return this.mPikseller[(y * this.mDokuBilgisi.eni) + x + 3];
};
DokuCizilebilir.prototype._indekstenMerkeze = function(donusNoktasi, i, j) {
    //
    let en = this.donusturAl().enAl();
    let boy = this.donusturAl().boyAl();
    let x = i * en / (this.mDokuEn - 1);
    let y = j * boy / (this.mDokuBoy - 1);
    donusNoktasi[0] = this.donusturAl().konumXAl() + (x - (en * 0.5));
    donusNoktasi[1] = this.donusturAl().konumYAl() + (y - (boy * 0.5));
};
DokuCizilebilir.prototype._merkezdenIndekse = function(index, merkez) {
    //
    let delta = [];
    vec2.sub(delta, merkez, this.donusturAl().konumAl());
    index[0] = this.mDokuEn * (delta[0] / this.donusturAl().enAl());
    index[1] = this.mDokuBoy * (delta[1] / this.donusturAl().boyAl());

    // konum bize merkezi veriyor biz ise doku ekseninin basina gitmeye
    // çalisiyoruz
    index[0] += this.mDokuEn / 2;
    index[1] += this.mDokuBoy / 2;
    index[0] = Math.floor(index[0]);
    index[1] = Math.floor(index[1]);
};

DokuCizilebilir.prototype.piksellerDegdiMi = function(oteki, carpmaYeri) {
    //
    let carptiMi = false;
    let xIndex = 0;
    let yIndex;
    let otekiIndex = [0, 0];
    while ((!carptiMi) && (xIndex < this.mDokuEn)) {
        yIndex = 0;
        while ((!carptiMi) && (yIndex < this.mDokuBoy)) {
            if (this._pikselAlphaDegeri(xIndex, yIndex) > 0) {
                //
                this._indekstenMerkeze(carpmaYeri, xIndex, yIndex);
                oteki._merkezdenIndekse(otekiIndex, carpmaYeri);
                let k1 = otekiIndex[0] > 0;
                let k2 = oteki.mDokuEn > otekiIndex[0];
                let k3 = otekiIndex[1] > 0;
                let k4 = oteki.mDokuBoy > otekiIndex[1];
                let uygunKosul = k1 && k2 && k3 && k4;
                if (uygunKosul) {
                    //
                    let oteki_x = otekiIndex[0];
                    let oteki_y = otekiIndex[1];
                    carptiMi = oteki._pikselAlphaDegeri(oteki_x, oteki_y) > 0;
                }
            }
            yIndex++;
        }
        xIndex++;
    }
    return carptiMi;
};
