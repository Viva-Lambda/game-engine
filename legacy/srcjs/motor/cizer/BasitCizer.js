"use strict";
//

function BasitCizer(noktaCiziciDosyaYolu, renklendiriciDosyaYolu) {
    this.derlenenCizici = null;
    this.gCizerKordinatKonumu = null;
    this.pikselRengi = null;
    this.modelMatKonumu = null;
    this.bakmaMatKonumu = null;
    //

    var gl = gMotor.AnaMotor.glAl();

    console.log("yukle derle oncesi");
    var noktaCizici = this.ciziciYukleDerle(noktaCiziciDosyaYolu, gl.VERTEX_SHADER);
    var renklendirici = this.ciziciYukleDerle(renklendiriciDosyaYolu, gl.FRAGMENT_SHADER);


    // cizer olustur
    this.derlenenCizici = gl.createProgram();
    gl.attachShader(this.derlenenCizici, noktaCizici);
    gl.attachShader(this.derlenenCizici, renklendirici);
    gl.linkProgram(this.derlenenCizici);

    if (!gl.getProgramParameter(this.derlenenCizici, gl.LINK_STATUS)) {
        alert("Cizici linklemede hata olustu");
        return null;
    }
    this.gCizerKordinatKonumu = gl.getAttribLocation(this.derlenenCizici,
        "kareKoordinati");

    gl.bindBuffer(gl.ARRAY_BUFFER, gMotor.VertexBuffer.glVertexRefAl());

    gl.vertexAttribPointer(this.gCizerKordinatKonumu,
        3, gl.FLOAT, false,
        0,
        0);
    // çizici derlendi artik rengi koyabiliriz
    this.pikselRengi = gl.getUniformLocation(this.derlenenCizici,
        "uPikselRengi");
    this.modelMatKonumu = gl.getUniformLocation(this.derlenenCizici,
        "uModelDonustur");
    this.bakmaMatKonumu = gl.getUniformLocation(this.derlenenCizici,
        "uBakmaProj");
}

BasitCizer.prototype.ciziciYukleDerle = function(dosyaYolu, ciziciTipi) {
    var ciziciMetni, ciziciKaynagi, derlenenCizici;

    var gl = gMotor.AnaMotor.glAl();

    // dosya yolundan yukleme
    console.log("kaynak al oncesi");
    ciziciKaynagi = gMotor.KaynakPlani.kaynakAl(dosyaYolu);
    //
    derlenenCizici = gl.createShader(ciziciTipi);

    //
    gl.shaderSource(derlenenCizici, ciziciKaynagi);
    gl.compileShader(derlenenCizici);

    // hata kontrolu
    if (!gl.getShaderParameter(derlenenCizici, gl.COMPILE_STATUS)) {
        //
        alert("Cizici derlenemedi: " + gl.getShaderInfoLog(derlenenCizici));
    }
    return derlenenCizici;
}

BasitCizer.prototype.ciziciAktif = function(renk, bpMat) {
    var gl = gMotor.AnaMotor.glAl();
    gl.useProgram(this.derlenenCizici);
    gl.enableVertexAttribArray(this.gCizerKordinatKonumu);
    //
    gl.uniformMatrix4fv(this.bakmaMatKonumu, false, bpMat);
    gl.uniform4fv(this.pikselRengi, renk);
}
BasitCizer.prototype.modelMatKoy = function(mat) {
    var gl = gMotor.AnaMotor.glAl();
    gl.uniformMatrix4fv(this.modelMatKonumu, false, mat);
};

BasitCizer.prototype.cizerAl = function() {
    return this.derlenenCizici;
}
