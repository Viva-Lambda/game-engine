"use strict";
// dokular

function DokuBilgisi(yolu, eni, boyu, id) {
    this.yolu = yolu;
    this.eni = eni;
    this.boyu = boyu;
    this.glId = id;
}

gMotor.Dokular = (function() {

    /*
    @param string dokuYolu dokunun oldugu yol
    @param Image img dokunun resim dosyasi
        */
    var _yuklenenResmiIsle = function(dokuYolu, img) {
        let gl = gMotor.AnaMotor.glAl();

        // gl doku objesi
        let dokuID = gl.createTexture();

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
        let dokuInfo = new DokuBilgisi(dokuYolu,
            img.naturalWidth, img.naturalHeight, dokuID);
        gMotor.KaynakYoneticisi.asyncYuklemeTamamlandi(dokuYolu, dokuInfo);
    };
    var dokuYukle = function(dokuYolu) {
        if (!(gMotor.KaynakYoneticisi.kaynakYuklendiMi(dokuYolu))) {
            //
            var img = new Image();
            gMotor.KaynakYoneticisi.asyncYuklemeTalebi(dokuYolu);
            img.onload = function() {
                _yuklenenResmiIsle(dokuYolu, img);
            };
            img.src = dokuYolu;
        } else {
            gMotor.KaynakYoneticisi.kaynakRefArti(dokuYolu);
        }
    };
    var dokuKaldir = function(dokuYolu) {
        let gl = gMotor.AnaMotor.glAl();
        let dokuInfo = gMotor.KaynakYoneticisi.kaynakAl(dokuYolu);
        gl.deleteTexture(dokuInfo.glId);
        gMotor.KaynakYoneticisi.kaynakCikart(dokuYolu);
    };
    var dokuAktif = function(dokuYolu) {
        //
        var gl = gMotor.AnaMotor.glAl();
        var dokuInfo = gMotor.KaynakYoneticisi.kaynakAl(dokuYolu);

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
        let gl = gMotor.AnaMotor.glAl();
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    var dokuBilgisiAl = function(dokuYolu) {
        return gMotor.KaynakYoneticisi.kaynakAl(dokuYolu);
    };

    var metotlar = {
        dokuYukle: dokuYukle,
        dokuKaldir: dokuKaldir,
        dokuBilgisiAl: dokuBilgisiAl,
        dokuAktif: dokuAktif,
        dokuInaktif: dokuInaktif,
    };
    return metotlar;
}());
