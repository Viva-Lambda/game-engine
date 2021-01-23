"use strict";

var gMotor = gMotor || {};

var objeyiKalit = function(OzelObje, GenelObje) {
    //
    var prototype = Object.create(OzelObje.prototype);
    prototype.constructor = GenelObje;
    OzelObje.prototype = prototype;
};

var sahneBaslat = function(oyn) {
    console.log("oyun baslat");
    oyn.sahneYukle.call(oyn);
    console.log("oyun baslat2");
    gMotor.OyunDongusu.baslat(oyn);
};

gMotor.AnaMotor = (function() {
    //
    var mGL = null;

    //
    var glAl = function() {
        return mGL;
    }


    //
    var anaUnsurlariBaslat = function(glCanvasId, oyunum) {
        glBaslat(glCanvasId);
        gMotor.VertexBuffer.baslat();
        gMotor.Girdi.baslat();

        // varsayilan kaynaklari baslat
        gMotor.VarsayilanKaynaklar.baslat(
            function() {
                sahneBaslat(oyunum);
            }
        );
    }
    var glBaslat = function(glCanvasId) {
        //
        var kanvas = document.getElementById(glCanvasId);
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
    }
    var kanvasTemizle = function(renk) {
        //
        mGL.clearColor(renk[0], renk[1], renk[2], renk[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    }

    var metotlar = {
        glAl: glAl,
        kanvasTemizle: kanvasTemizle,
        anaUnsurlariBaslat: anaUnsurlariBaslat,
        sahneBaslat: sahneBaslat,
        objeyiKalit: objeyiKalit,
    };
    return metotlar;
}());
