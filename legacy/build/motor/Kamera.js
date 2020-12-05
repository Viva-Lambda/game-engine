"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kamera = void 0;
var gl_matrix_1 = require("gl-matrix");
var MotorNesne_js_1 = require("../motor/MotorNesne.js");
var Kamera = (function () {
    function Kamera(_merkez, pencereGenisligi, _gorusAlaniListesi) {
        this.yakinPlan = 0;
        this.uzakPlan = 1000;
        this.bakmaMat = gl_matrix_1.mat4.create();
        this.projMat = gl_matrix_1.mat4.create();
        this.bakmaProjMat = gl_matrix_1.mat4.create();
        this._arkaPlanRengi = gl_matrix_1.vec4.fromValues(0.7, 0.7, 0.7, 1);
        if (_merkez.length !== 3) {
            throw new Error("merkez 3 boyutlu degil");
        }
        this.merkez = gl_matrix_1.vec3.fromValues(_merkez[0], _merkez[1], _merkez[2]);
        this.pgenislik = pencereGenisligi;
        if (_gorusAlaniListesi.length !== 4) {
            throw new Error("gorusAlaniListesi 4 boyutlu degil");
        }
        this.gorusAlaniListesi =
            gl_matrix_1.vec4.fromValues(_gorusAlaniListesi[0], _gorusAlaniListesi[1], _gorusAlaniListesi[2], _gorusAlaniListesi[3]);
    }
    Kamera.prototype.merkezKoy = function (x, y) {
        this.merkez[0] = x;
        this.merkez[1] = y;
    };
    Kamera.prototype.merkezAl = function () { return this.merkez; };
    Kamera.prototype.genislikKoy = function (x) { this.pgenislik = x; };
    Kamera.prototype.genislikAl = function () { return this.pgenislik; };
    Kamera.prototype.gorusAlaniKoy = function (gListe) { this.gorusAlaniListesi = gListe; };
    Object.defineProperty(Kamera.prototype, "arkaPlanRengi", {
        get: function () { return this._arkaPlanRengi; },
        set: function (renk) { this._arkaPlanRengi = renk; },
        enumerable: false,
        configurable: true
    });
    Kamera.prototype.bakmaProjMatKur = function () {
        var gl = MotorNesne_js_1.gMotor.AnaMotor.mGL;
        gl.viewport(this.gorusAlaniListesi[0], this.gorusAlaniListesi[1], this.gorusAlaniListesi[2], this.gorusAlaniListesi[3]);
        gl.scissor(this.gorusAlaniListesi[0], this.gorusAlaniListesi[1], this.gorusAlaniListesi[2], this.gorusAlaniListesi[3]);
        gl.clearColor(this.arkaPlanRengi[0], this.arkaPlanRengi[1], this.arkaPlanRengi[2], this.arkaPlanRengi[3]);
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);
        gl_matrix_1.mat4.lookAt(this.bakmaMat, [
            this.merkez[0],
            this.merkez[1],
            10
        ], [
            this.merkez[0],
            this.merkez[1],
            0
        ], [
            0, 1, 0
        ]);
        var yariGenislik = 0.5 * this.pgenislik;
        var yariUzunluk = yariGenislik *
            (this.gorusAlaniListesi[3] /
                this.gorusAlaniListesi[2]);
        gl_matrix_1.mat4.ortho(this.projMat, -yariGenislik, yariGenislik, -yariUzunluk, yariUzunluk, this.yakinPlan, this.uzakPlan);
        gl_matrix_1.mat4.multiply(this.bakmaProjMat, this.projMat, this.bakmaMat);
    };
    return Kamera;
}());
exports.Kamera = Kamera;
//# sourceMappingURL=Kamera.js.map