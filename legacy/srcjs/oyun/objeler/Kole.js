// uydu.js objesi
"use strict";

function Kole(hareketliResim, konumY) {
    //
    this.kDelta = 0.2;
    this.mHResim = new HareketliCizilebilir(hareketliResim);
    this.mHResim.renkKoy([1, 1, 1, 0]);
    this.mHResim.donusturAl().konumKoy(Math.random() * 100, konumY);
    this.mHResim.donusturAl().boyutKoy(12, 9.6);
    this.mHResim.hareketDizisiKoy(512,
        0, 204, 164, 5, 0);
    this.mHResim.hareketTipiKoy(HareketliCizilebilir.eHareketTuru.eSarkacHareket);
    this.mHResim.hareketHiziKoy(15);

    OyunObjesi.call(this, this.mHResim);
}
gMotor.AnaMotor.objeyiKalit(Kole, OyunObjesi);

Kole.prototype.guncelle = function() {
    this.mHResim.hareketiGuncelle();

    this.donusturAl().konumXArti(-this.kDelta);

    if (this.donusturAl().konumXAl() < 0) {
        this.donusturAl().konumXKoy(100);
        this.donusturAl().konumYKoy(65 * Math.random());
    }
};
