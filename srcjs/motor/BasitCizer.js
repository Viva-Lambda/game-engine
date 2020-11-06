"use strict";
//

function BasitCizer(noktaCiziciId, renklendiriciId) {
    this.derlenenCizici = null;
    this.gCizerKordinatKonumu = null;

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
}

BasitCizer.prototype.ciziciYukleDerle = function(id, ciziciTipi) {
    var ciziciMetni, ciziciKaynagi, derlenenCizici;

    var gl = gMotor.AnaMotor.glAl();

    ciziciMetni = document.getElementById(id);
    ciziciKaynagi = ciziciMetni.firstChild.textContent;
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

BasitCizer.prototype.ciziciAktif = function() {
    var gl = gMotor.AnaMotor.glAl();
    gl.useProgram(this.derlenenCizici);
    gl.enableVertexAttribArray(this.gCizerKordinatKonumu);
}

BasitCizer.prototype.cizerAl = function() {
    return this.derlenenCizici;
}
