"use strict";
//

function BasitCizer(noktaCiziciId, renklendiriciId) {
    this.derlenenCizici = null;
    this.gCizerKordinatKonumu = null;
    this.pikselRengi = null;
    this.modelMatKonumu = null;
    //

    var gl = gMotor.AnaMotor.glAl();

    var noktaCizici = this.ciziciYukleDerle(noktaCiziciId, gl.VERTEX_SHADER);
    var renklendirici = this.ciziciYukleDerle(renklendiriciId, gl.FRAGMENT_SHADER);


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
}

BasitCizer.prototype.ciziciYukleDerle = function(dosyaYolu, ciziciTipi) {
    var ciziciMetni, ciziciKaynagi, derlenenCizici;

    var gl = gMotor.AnaMotor.glAl();

    // dosya yolundan yukleme
    var xmlSorgu = new XMLHttpRequest();
    xmlSorgu.open("GET", dosyaYolu, false);
    try {
        xmlSorgu.send();
    } catch (hata) {
        alert("dosya yolundaki çizim kodu yuklenemedi: " + dosyaYolu);
        return null;
    }
    ciziciKaynagi = xmlSorgu.responseText;
    if (ciziciKaynagi === null) {
        alert("dosya yolundaki çizim kodu metin içermiyor: " + dosyaYolu);
        return null;
    }
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

BasitCizer.prototype.ciziciAktif = function(renk) {
    var gl = gMotor.AnaMotor.glAl();
    gl.useProgram(this.derlenenCizici);
    gl.enableVertexAttribArray(this.gCizerKordinatKonumu);
    gl.uniform4fv(this.pikselRengi, renk);
}
BasitCizer.prototype.modelMatKoy = function(mat) {
    console.log(mat);
    var gl = gMotor.AnaMotor.glAl();
    gl.uniformMatrix4fv(this.modelMatKonumu, false, mat);
};

BasitCizer.prototype.cizerAl = function() {
    return this.derlenenCizici;
}
