// doku shader'i ile arayuz
"use strict";

function DokuCizer(noktaCiziciDosyaYolu, renklendiriciDosyaYolu) {
    //
    BasitCizer.call(this, noktaCiziciDosyaYolu, renklendiriciDosyaYolu);
    this.dokuCizerAttr = null;

    let gl = gMotor.AnaMotor.glAl();

    this.dokuCizerAttr = gl.getAttribLocation(this.derlenenCizici,
        "dokuKoordinati");
}

gMotor.AnaMotor.objeyiKalit(DokuCizer, BasitCizer);

DokuCizer.prototype.ciziciAktif = function(renk, kamera) {
    BasitCizer.prototype.ciziciAktif.call(this, renk, kamera);

    let gl = gMotor.AnaMotor.glAl();
    gl.bindBuffer(gl.ARRAY_BUFFER, gMotor.VertexBuffer.glDokuRefAl());
    gl.enableVertexAttribArray(this.dokuCizerAttr);
    gl.vertexAttribPointer(this.dokuCizerAttr, 2,
        gl.FLOAT,
        false, 0, 0);
}
