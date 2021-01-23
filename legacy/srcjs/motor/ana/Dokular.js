"use strict";
// dokular

function DokuBilgisi(yolu, eni, boyu, id) {
    this.yolu = adi;
    this.eni = eni;
    this.boyu = boyu;
    this.glId = id;
}
var _yuklenenResmiIsle = function(dokuYolu, img) {
    var gl = gMotor.AnaMotor.glAl();

    // gl doku objesi
    var dokuID = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, dokuID);

    //
    gl.texImage2D(gl.TEXTURE_2D, // doku tipi
        0, // mipmap seviyesi
        gl.RGBA, // resmin formati
        gl.RGBA, // doku formati
        gl.UNSIGNED_BYTE, // doku koordinat tipi
        img // doku verisi yani resim
    );

    gl.generateMipmap(gl.TEXTURE_2D);

    //
    gl.bindTexture(gl.TEXTURE_2D, null);

    //
    var dokuInfo = new DokuBilgisi(dokuYolu,
        img.naturalWidth, img.naturalHeight, dokuID);
    gMotor.KaynakPlani.asyncYuklemeTamamlandiSinyali(dokuYolu, dokuInfo);
};
var dokuAktif = function(dokuYolu) {
    //
    var gl = gMotor.AnaMotor.glAl();
    var dokuInfo = gMotor.KaynakPlani.kaynakAl(dokuYolu);

    gl.bindTexture(gl.TEXTURE_2D, dokuInfo.glId);

    // boyut asimi veya resmin kucuk gelmesi gibi durumlarda ne olacak
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    //
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR);

    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
    //     gl.NEAREST);

};
var dokuInaktif = function() {
    var gl = gMotor.AnaMotor.glAl();
    gl.bindTexture(gl.TEXTURE_2D, null);
};
var dokuBilgisiAl = function(dokuYolu) {
    return gMotor.KaynakPlani.kaynakAl(dokuYolu);
};
var dokuYukle = function(dokuYolu) {
    if (!(gMotor.KaynakPlani.kaynakYuklendiMi(dokuYolu))) {
        //
        var img = new Image();
        gMotor.KaynakPlani.asyncYuklemeTalebi(dokuYolu);
        img.onload = function() {
            _yuklenenResmiIsle(dokuYolu, img);
        };
        img.src = dokuYolu;
    } else {
        gMotor.KaynakPlani.kaynakRefArti(dokuYolu);
    }
};
var dokuKaldir = function(dokuYolu) {
    var gl = gMotor.AnaMotor.glAl();
    var dokuInfo = gMotor.KaynakPlani.kaynakAl(dokuYolu);
    gl.deleteTexture(dokuInfo.glId);
    gMotor.KaynakPlani.kaynakCikart(dokuYolu);
};
gMotor.Dokular = (function() {
    var metotlar = {
        dokuYukle: dokuYukle,
        dokuKaldir: dokuKaldir,
        dokuBilgisiAl: dokuBilgisiAl,
        dokuAktif: dokuAktif,
        dokuInaktif: dokuInaktif,
    };
    return metotlar;
}());
