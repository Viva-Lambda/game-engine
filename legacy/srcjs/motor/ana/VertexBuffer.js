"use strict";
var gMotor = gMotor || {};

gMotor.VertexBuffer = (function() {
    //
    var gKareNoktaBuffer = null;
    var kareKordinatlari = [
        0.5, 0.5, 0.0, //
        -0.5, 0.5, 0.0, //
        0.5, -0.5, 0.0, //
        -0.5, -0.5, 0.0 //
    ];
    // doku koordinatlari bufferi
    var dokuKoordBuffer = null;

    var dokuKordinatlari = [
        1.0, 1.0, //
        0.0, 1.0, //
        1.0, 0.0, //
        0.0, 0.0, //
    ];
    //
    var glVertexRefAl = function() {
        return gKareNoktaBuffer;
    };
    var glDokuRefAl = function() {
        return dokuKoordBuffer;
    };
    var temizle = function() {
        let gl = gMotor.AnaMotor.glAl();
        gl.deleteBuffer(gKareNoktaBuffer);
        gl.deleteBuffer(dokuKoordBuffer);
    };

    var baslat = function() {
        var gl = gMotor.AnaMotor.glAl();
        // 1. vertex bufferi yarat
        gKareNoktaBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gKareNoktaBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(kareKordinatlari),
            gl.STATIC_DRAW);

        // 2. doku bufferi yarat
        dokuKoordBuffer = gl.createBuffer();
        //
        gl.bindBuffer(gl.ARRAY_BUFFER, dokuKoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dokuKordinatlari),
            gl.STATIC_DRAW);
    };

    var metotlar = {
        baslat: baslat,
        glVertexRefAl: glVertexRefAl,
        glDokuRefAl: glDokuRefAl,
    };
    return metotlar;

}());
