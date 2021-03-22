"use strict";

function DokuCizilebilir(cizerDokusu) {
    Cizilebilir.call(this);
    Cizilebilir.prototype.renkKoy.call(this, [1, 1, 1, 0]);
    Cizilebilir.prototype._cizerKoy.call(this,
        gMotor.VarsayilanKaynaklar.dokuCizerAl());
    this.mDokum = null;

    // degerleri saklamak için
    this.mDokuBilgisi = null;
    this.mPikseller = null;
    this.mDokuEn = 0;
    this.mDokuBoy = 0;

    this.mDokuSolIndex = 0;
    this.mDokuAltIndex = 0;
    this.dokuKoy(cizerDokusu);

}
gMotor.AnaMotor.objeyiKalit(DokuCizilebilir, Cizilebilir);

DokuCizilebilir.prototype.ciz = function(bpMat) {
    gMotor.Dokular.dokuAktif(this.mDokum);
    Cizilebilir.prototype.ciz.call(this, bpMat);
};
DokuCizilebilir.prototype.dokuKoy = function(dokuYolu) {
    this.mDokum = dokuYolu;
    this.mDokuBilgisi = gMotor.Dokular.dokuBilgisiAl(dokuYolu);
    this.mPikseller = null;
    this.mDokuEn = this.mDokuBilgisi.eni;
    this.mDokuBoy = this.mDokuBilgisi.boyu;
    this.mDokuSolIndex = 0;
    this.mDokuAltIndex = 0;
}
DokuCizilebilir.prototype.dokuAl = function() {
    return this.mDokum;
}
