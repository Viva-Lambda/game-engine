"use strict";
// cizilebilir objelerin anasi

function Cizilebilir(cizici) {
    //
    this.cizici = cizici;
    this.renk = [1, 1, 1, 1];
    this.donustur = new Donustur();
}
Cizilebilir.prototype.donusturAl = function() {
    return this.donustur;
}

Cizilebilir.prototype.ciz = function() {
    var gl = gMotor.AnaMotor.glAl();
    this.cizici.ciziciAktif(this.renk);
    this.cizici.modelMatKoy(this.donustur.modelMatAl());
    console.log("modelmat koy çagirilir");
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Cizilebilir.prototype.renkKoy = function(renk) {
    this.renk = renk;
};
Cizilebilir.prototype.renkAl = function() {
    return this.renk;
};
