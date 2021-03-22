"use strict";
// dokular

function DokuBilgisi(yolu, eni, boyu, id) {
    this.yolu = yolu;
    this.eni = eni;
    this.boyu = boyu;
    this.glId = id;
    this.mPikseller = null;
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
    var dokuPikselleriAl = function(dokuYolu) {
        var dokuBilgisi = dokuBilgisiAl(dokuYolu);
        if (dokuBilgisi.mPikseller === null) {
            //
            let gl = gMotor.AnaMotor.glAl();
            let fb = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D, dokuBilgisi.glId, 0);
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) ===
                gl.FRAMEBUFFER_COMPLETE) {
                let pikseller = new Uint8Array(dokuBilgisi.eni *
                    dokuBilgisi.boyu * 4);
                gl.readPixels(0, 0, dokuBilgisi.eni, dokuBilgisi.boyu,
                    gl.RGBA, gl.UNSIGNED_BYTE, pikseller);
                dokuBilgisi.mPikseller = pikseller;
            } else {
                throw new Error("dokuPikselleriAl çalismadi");
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.deleteFramebuffer(fb);
        }
        return dokuBilgisi.mPikseller;

    };

    var metotlar = {
        dokuYukle: dokuYukle,
        dokuKaldir: dokuKaldir,
        dokuBilgisiAl: dokuBilgisiAl,
        dokuAktif: dokuAktif,
        dokuInaktif: dokuInaktif,
        dokuPikselleriAl: dokuPikselleriAl
    };
    return metotlar;
}());
