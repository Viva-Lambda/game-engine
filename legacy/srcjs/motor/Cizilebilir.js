"use strict";
// cizilebilir objelerin anasi

function Cizilebilir(cizici) {
    //
    this.cizici = cizici; // null
    this.renk = [1, 1, 1, 1];
    this.donustur = new Donustur();
}
Cizilebilir.prototype.donusturAl = function() {
    return this.donustur;
}

Cizilebilir.prototype.ciz = function(bpMat) {
    var gl = gMotor.AnaMotor.glAl();
    this.cizici.ciziciAktif(this.renk, bpMat);
    this.cizici.modelMatKoy(this.donustur.modelMatAl());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Cizilebilir.prototype.renkKoy = function(renk) {
    this.renk = renk;
};
Cizilebilir.prototype.renkAl = function() {
    return this.renk;
};
