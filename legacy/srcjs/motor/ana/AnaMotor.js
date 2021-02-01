"use strict";

var gMotor = gMotor || {};

gMotor.AnaMotor = (function() {
    //
    var mGL = null;

    //
    var glAl = function() {
        return mGL;
    };

    var _webglBaslat = function(glCanvasId) {
        //
        let kanvas = document.getElementById(glCanvasId);
        mGL = kanvas.getContext("webgl", {
                alpha: false
            }) ||
            kanvas.getContext("webgl2", {
                alpha: false
            });

        // saydam dokulara izin verir
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);

        // y ekseninde resimi dondur, doku alanina uygun hale gelmesi icin
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);

        //
        if (mGL === null) {
            document.write("<br><b>Tarayiciniz WebGL desteklemiyor</b>");
            return;
        }
    };

    var sahneBaslat = function(oyn) {
        oyn.sahneYukle.call(oyn);
        gMotor.OyunDongusu.baslat(oyn);
    };

    //
    var anaUnsurlariBaslat = function(glCanvasId, oyunum) {
        _webglBaslat(glCanvasId);
        gMotor.VertexBuffer.baslat();
        gMotor.Girdi.baslat();
        gMotor.SesKlipleri.SesOrtaminiBaslat();

        // varsayilan kaynaklari baslat
        gMotor.VarsayilanKaynaklar.baslat(
            function() {
                sahneBaslat(oyunum);
            }
        );
    };
    var kanvasTemizle = function(renk) {
        //
        mGL.clearColor(renk[0], renk[1], renk[2], renk[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };
    var objeyiKalit = function(OzelObje, GenelObje) {
        //
        var prototype = Object.create(GenelObje.prototype);
        prototype.constructor = OzelObje;
        OzelObje.prototype = prototype;
    };

    var metotlar = {
        glAl: glAl,
        kanvasTemizle: kanvasTemizle,
        anaUnsurlariBaslat: anaUnsurlariBaslat,
        sahneBaslat: sahneBaslat,
        objeyiKalit: objeyiKalit,
    };
    return metotlar;
}());
