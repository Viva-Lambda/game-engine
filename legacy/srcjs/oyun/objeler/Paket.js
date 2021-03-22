// paket objesi
"use strict";

function Paket(hareketliResim) {
    this.kRefEn = 80;
    this.kRefBoy = 130;
    this.mHResim = new HareketliCizilebilir(hareketliResim);
    this.mHResim.renkKoy([1, 1, 1, 0]);
    this.mHResim.donusturAl().konumKoy(50, 35);
    this.mHResim.donusturAl().boyutKoy(this.kRefEn / 50, this.kRefBoy / 50);
    this.mHResim.elemanaPikselKonumuKoy(510, 595, 23, 153);
    OyunObjesi.call(this, this.mHResim);
}
gMotor.AnaMotor.objeyiKalit(Paket, OyunObjesi);

Paket.prototype.guncelle = function() {
    //
    let deltaX = this.kDelta;
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Yukari)) {
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

    if (this.mGorulebilirMi) {
        this.donusturAl().konumYArti(-deltaX);
    }
};
