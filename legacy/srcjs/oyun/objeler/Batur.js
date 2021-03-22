// batur objesi
"use strict";

function Batur(hareketliResim) {
    this.kDelta = 0.3;
    this.mHResim = new HareketliCizilebilir(hareketliResim);
    this.mHResim.renkKoy([1, 1, 1, 0]);
    this.mHResim.donusturAl().konumKoy(35, 50);
    this.mHResim.donusturAl().boyutKoy(9, 12);
    this.mHResim.elemanaPikselKonumuKoy(0, 120, 0, 180);
    OyunObjesi.call(this, this.mHResim);
}
gMotor.AnaMotor.objeyiKalit(Batur, OyunObjesi);

Batur.prototype.guncelle = function() {
    //
    let deltaX = this.kDelta;
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.W)) {
        this.donusturAl().konumYArti(deltaX);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sol)) {
        this.donusturAl().konumXArti(-deltaX);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Asagi)) {
        this.donusturAl().konumYArti(-deltaX);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sag)) {
        this.donusturAl().konumXArti(deltaX);
    }
};
