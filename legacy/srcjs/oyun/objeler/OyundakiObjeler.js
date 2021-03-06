// oyundaki objeler
"use strict";

function YanKarakter(hareketliResim) {
    this.kRefEn = 80;
    this.kRefBoy = 130;
    this.mHResim = new HareketliCizilebilir(hareketliResim);
    this.mHResim.renkKoy([1, 1, 1, 0]);
    this.mHResim.donusturAl().konumKoy(50, 35);
    this.mHResim.donusturAl().boyutKoy(this.kRefEn / 50, this.kRefBoy / 50);
    this.mHResim.elemanaPikselKonumuKoy(510, 595, 23, 153);
    OyunObjesi.call(this, this.mHResim);
}
gMotor.AnaMotor.objeyiKalit(YanKarakter, OyunObjesi);

function AnaKarakter(hareketliResim) {
    this.kDelta = 0.3;
    this.mHResim = new HareketliCizilebilir(hareketliResim);
    this.mHResim.renkKoy([1, 1, 1, 0]);
    this.mHResim.donusturAl().konumKoy(35, 50);
    this.mHResim.donusturAl().boyutKoy(9, 12);
    this.mHResim.elemanaPikselKonumuKoy(0, 120, 0, 180);
    OyunObjesi.call(this, this.mHResim);
}
gMotor.AnaMotor.objeyiKalit(AnaKarakter, OyunObjesi);

AnaKarakter.prototype.guncelle = function() {
    //
    let deltaX = this.kDelta;
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.W)) {
        this.donusturAl().konumYArti(deltaX);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Q)) {
        this.donusturAl().konumXArti(-deltaX);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.S)) {
        this.donusturAl().konumYArti(-deltaX);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.D)) {
        this.donusturAl().konumXArti(deltaX);
    }
};

function HareketliKarakter(hareketliResim, konumY) {
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
gMotor.AnaMotor.objeyiKalit(HareketliKarakter, OyunObjesi);

HareketliKarakter.prototype.guncelle = function() {
    this.mHResim.hareketiGuncelle();

    this.donusturAl().konumXArti(-this.kDelta);

    if (this.donusturAl().konumXAl() < 0) {
        this.donusturAl().konumXKoy(100);
        this.donusturAl().konumYKoy(65 * Math.random());
    }
};
// beyin objesi
function Beyin(hareketliResim) {
    this.kDeltaAci = 1;
    this.kDeltaRadyan = this.kDeltaAci / 180 * Math.PI;
    this.kDeltaHiz = 0.01;
    this.mHResim = new HareketliCizilebilir(hareketliResim);
    this.mHResim.renkKoy([1, 1, 1, 0]);
    this.mHResim.donusturAl().konumKoy(50, 10);
    this.mHResim.donusturAl().boyutKoy(3, 5.6);
    this.mHResim.elemanaPikselKonumuKoy(120, 320, 0, 180);
    OyunObjesi.call(this, this.mHResim);
    this.hizKoy(0.05);
}
gMotor.AnaMotor.objeyiKalit(Beyin, OyunObjesi);

Beyin.prototype.guncelle = function() {
    //
    OyunObjesi.prototype.guncelle.call(this);
    let d = this.donusturAl();
    let y = this.onYonuAl();
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sol)) {
        d.dereceArti(this.kDeltaAci);
        OyunObjesi.prototype.dondur2D(y, y, this.kDeltaRadyan);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sag)) {
        d.dereceArti(-this.kDeltaAci);
        OyunObjesi.prototype.dondur2D(y, y, -this.kDeltaRadyan);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Yukari)) {
        this.hizArti(this.kDeltaHiz);
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Asagi)) {
        this.hizArti(-this.kDeltaHiz);
    }
};
