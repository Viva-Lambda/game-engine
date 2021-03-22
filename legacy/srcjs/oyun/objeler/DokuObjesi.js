// doku sahibi obje
"use strict";

function DokuObjesi(doku, x, y, en, boy) {
    //
    this.kDelta = 0.2;

    this.mDoku = new DokuCizilebilir(doku);
    this.mDoku.renkKoy([1, 1, 1, 0.1]);
    this.mDoku.donusturAl().konumKoy(x, y);
    this.mDoku.donusturAl().boyutKoy(x, y);
    OyunObjesi.call(this, this.mDoku);
}
gMotor.AnaMotor.objeyiKalit(DokuObjesi, OyunObjesi);
//
DokuObjesi.prototype.guncelle = function(yukari, asagi, sag, sol) {
    let d = this.mDoku.donusturAl();
    if (gMotor.Girdi.tusBasiliMi(sol)) {
        d.konumXArti(-this.kDelta);
    }
    if (gMotor.Girdi.tusBasiliMi(sag)) {
        d.konumXArti(this.kDelta);
    }
    if (gMotor.Girdi.tusBasiliMi(yukari)) {
        d.konumYArti(this.kDelta);
    }
    if (gMotor.Girdi.tusBasiliMi(asagi)) {
        d.konumYArti(-this.kDelta);
    }
};
