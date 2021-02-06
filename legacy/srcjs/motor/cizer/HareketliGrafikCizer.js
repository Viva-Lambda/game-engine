// hareketli grafik (sprite) cizer

function HareketliGrafikCizer(noktaCiziciDosyaYolu, renklendiriciDosyaYolu) {
    DokuCizer.call(this, noktaCiziciDosyaYolu, renklendiriciDosyaYolu);

    this.mDokuKoordBuffer = null;
    var ilkDokuKoordinatlari = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];
    let gl = gMotor.AnaMotor.glAl();
    this.mDokuKoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mDokuKoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(ilkDokuKoordinatlari),
        gl.DYNAMIC_DRAW);
}
gMotor.AnaMotor.objeyiKalit(HareketliGrafikCizer, DokuCizer);

HareketliGrafikCizer.prototype.dokuKoordinatiKoy = function(dokuKoord) {
    let gl = gMotor.AnaMotor.glAl();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mDokuKoordBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(dokuKoord));
};

HareketliGrafikCizer.prototype.ciziciAktif = function(renk, bpMat) {
    BasitCizer.prototype.ciziciAktif.call(this, renk, bpMat);
    //
    let gl = gMotor.AnaMotor.glAl();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mDokuKoordBuffer);
    gl.enableVertexAttribArray(this.dokuCizerAttr);
    gl.vertexAttribPointer(this.dokuCizerAttr, 2,
        gl.FLOAT,
        false, 0, 0);
};
