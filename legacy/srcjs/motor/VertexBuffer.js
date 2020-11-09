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
    var glVertexRefAl = function() {
        return gKareNoktaBuffer;
    };

    var baslat = function() {
        var gl = gMotor.AnaMotor.glAl();
        gKareNoktaBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, gKareNoktaBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(kareKordinatlari),
            gl.STATIC_DRAW);
    };

    var metotlar = {
        baslat: baslat,
        glVertexRefAl: glVertexRefAl,
    };
    return metotlar;

}());
