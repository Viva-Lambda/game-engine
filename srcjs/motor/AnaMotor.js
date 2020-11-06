"use strict";

var gMotor = gMotor || {};

gMotor.AnaMotor = (function() {
    //
    var mGL = null;

    //
    var glAl = function() {
        return mGL;
    }

    //
    var glBaslat = function(glCanvasId) {
        //
        var kanvas = document.getElementById(glCanvasId);
        mGL = kanvas.getContext("webgl") ||
            kanvas.getContext("webgl2");
        if (mGL === null) {
            document.write("<br><b>Tarayiciniz WebGL desteklemiyor</b>");
            return;
        }
        gMotor.VertexBuffer.baslat();
    }
    var kanvasTemizle = function(renk) {
        //
        mGL.clearColor(renk[0], renk[1], renk[2], renk[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    }

    var metotlar = {
        glAl: glAl,
        kanvasTemizle: kanvasTemizle,
        glBaslat: glBaslat
    };
    return metotlar;
}());
