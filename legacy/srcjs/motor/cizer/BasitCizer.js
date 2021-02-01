"use strict";
//

function BasitCizer(noktaCiziciDosyaYolu, renklendiriciDosyaYolu) {
    this.derlenenCizici = null;
    this.gCizerKordinatKonumu = null;
    this.pikselRengi = null;
    this.modelMatKonumu = null;
    this.bakmaMatKonumu = null;
    //

    let gl = gMotor.AnaMotor.glAl();

    // 1. cizicileri derle yukle
    var noktaCizici = this.ciziciYukleDerle(noktaCiziciDosyaYolu, gl.VERTEX_SHADER);
    var renklendirici = this.ciziciYukleDerle(renklendiriciDosyaYolu, gl.FRAGMENT_SHADER);


    // 2. cizer olustur
    this.derlenenCizici = gl.createProgram();
    gl.attachShader(this.derlenenCizici, noktaCizici);
    gl.attachShader(this.derlenenCizici, renklendirici);
    gl.linkProgram(this.derlenenCizici);

    // 3. cizilenin kontrolu
    if (!gl.getProgramParameter(this.derlenenCizici, gl.LINK_STATUS)) {
        alert("Cizici linklemede hata olustu");
        return null;
    }

    // 4. kare koordinati konumu 
    this.gCizerKordinatKonumu = gl.getAttribLocation(this.derlenenCizici,
        "kareKoordinati");

    // 5. bufferi bagla
    gl.bindBuffer(gl.ARRAY_BUFFER, gMotor.VertexBuffer.glVertexRefAl());

    // 6. vertex attrib pointer için ilgili degerleri girelim
    gl.vertexAttribPointer(this.gCizerKordinatKonumu,
        3, gl.FLOAT, false,
        0,
        0);

    // 7. diger uniformlari koyalim
    this.pikselRengi = gl.getUniformLocation(this.derlenenCizici,
        "uPikselRengi");
    this.modelMatKonumu = gl.getUniformLocation(this.derlenenCizici,
        "uModelDonustur");
    this.bakmaMatKonumu = gl.getUniformLocation(this.derlenenCizici,
        "uBakmaProj");
}

BasitCizer.prototype.ciziciYukleDerle = function(dosyaYolu, ciziciTipi) {
    let ciziciMetni;

    let gl = gMotor.AnaMotor.glAl();

    // 1. Shader metnini al
    let ciziciKaynagi = gMotor.KaynakYoneticisi.kaynakAl(dosyaYolu);
    if (ciziciKaynagi === null) {
        alert("shader kaynagi yuklenemedi: " + dosyaYolu);
        return null;
    }
    // 2. istenen ciziciyi yarat
    let derlenenCizici = gl.createShader(ciziciTipi);

    // 3. ciziciyi derle
    gl.shaderSource(derlenenCizici, ciziciKaynagi);
    gl.compileShader(derlenenCizici);

    // 4. hata kontrolu
    if (!gl.getShaderParameter(derlenenCizici, gl.COMPILE_STATUS)) {
        //
        alert("Cizici derlenemedi: " + gl.getShaderInfoLog(derlenenCizici));
    }
    return derlenenCizici;
};

BasitCizer.prototype.ciziciAktif = function(renk, bpMat) {
    let gl = gMotor.AnaMotor.glAl();
    gl.useProgram(this.derlenenCizici);
    gl.uniformMatrix4fv(this.bakmaMatKonumu, false, bpMat);
    gl.bindBuffer(gl.ARRAY_BUFFER, gMotor.VertexBuffer.glVertexRefAl());
    gl.vertexAttribPointer(this.gCizerKordinatKonumu,
        3, // each element is a 3-float (x,y.z)
        gl.FLOAT, // data type is FLOAT
        false, // if the content is normalized vectors
        0, // number of bytes to skip in between elements
        0); // offsets to the first element
    gl.enableVertexAttribArray(this.gCizerKordinatKonumu);
    //
    gl.uniform4fv(this.pikselRengi, renk);
};
BasitCizer.prototype.modelMatKoy = function(mat) {
    var gl = gMotor.AnaMotor.glAl();
    gl.uniformMatrix4fv(this.modelMatKonumu, false, mat);
};

BasitCizer.prototype.cizerAl = function() {
    return this.derlenenCizici;
}
