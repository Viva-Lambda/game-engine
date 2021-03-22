// beyin objesi
"use strict";

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
