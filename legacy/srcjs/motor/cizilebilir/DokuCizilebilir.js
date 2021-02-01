"use strict";

function DokuCizilebilir(cizerDokusu) {
    Cizilebilir.call(this);
    Cizilebilir.prototype.renkKoy.call(this, [1, 1, 1, 0]);
    Cizilebilir.prototype._cizerKoy.call(this,
        gMotor.VarsayilanKaynaklar.dokuCizerAl());
    this.dokum = cizerDokusu;
}
gMotor.AnaMotor.objeyiKalit(DokuCizilebilir, Cizilebilir);

DokuCizilebilir.prototype.ciz = function(bpMat) {
    gMotor.Dokular.dokuAktif(this.dokum);
    Cizilebilir.prototype.ciz.call(this, bpMat);
};
DokuCizilebilir.prototype.dokuKoy = function(d) {
    this.dokum = d;
}
DokuCizilebilir.prototype.dokuAl = function() {
    return this.dokum;
}
