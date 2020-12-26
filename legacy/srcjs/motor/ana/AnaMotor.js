"use strict";

var gMotor = gMotor || {};

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
        mGL = kanvas.getContext("webgl") ||
            kanvas.getContext("webgl2");
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
        anaUnsurlariBaslat: anaUnsurlariBaslat
    };
    return metotlar;
}());
