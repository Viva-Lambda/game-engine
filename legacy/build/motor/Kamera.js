import { vec4, mat4 } from "gl-matrix";
import { vecMatBoyutKontrol } from "../motor/yardimcilar.js";
import { gMotor } from "../motor/Motor.js";
export class Kamera {
    constructor(_merkez, pencereGenisligi, _gorusAlaniListesi) {
        this.yakinPlan = 0;
        this.uzakPlan = 1000;
        this.bakmaMat = mat4.create();
        this.projMat = mat4.create();
        this.bakmaProjMat = mat4.create();
        this._arkaPlanRengi = vec4.fromValues(0.7, 0.7, 0.7, 1);
        vecMatBoyutKontrol(_merkez, 2, "merkez vec2 degil");
        this.merkez = _merkez;
        this.pgenislik = pencereGenisligi;
        vecMatBoyutKontrol(_gorusAlaniListesi, 4, "gorusAlaniListesi vec4 degil");
        this.gorusAlaniListesi = _gorusAlaniListesi;
    }
    merkezKoy(x, y) {
        this.merkez[0] = x;
        this.merkez[1] = y;
    }
    merkezAl() { return this.merkez; }
    genislikKoy(x) { this.pgenislik = x; }
    genislikAl() { return this.pgenislik; }
    gorusAlaniKoy(gListe) {
        vecMatBoyutKontrol(gListe, 4, "gorus alani istenen boyutta degil");
        this.gorusAlaniListesi = gListe;
    }
    get arkaPlanRengi() { return this._arkaPlanRengi; }
    set arkaPlanRengi(renk) {
        vecMatBoyutKontrol(renk, 4, "arka plan rengi vec4 degil");
        this._arkaPlanRengi = renk;
    }
    bakmaProjMatKur() {
        var gl = gMotor.AnaMotor.mGL;
        gl.viewport(this.gorusAlaniListesi[0], this.gorusAlaniListesi[1], this.gorusAlaniListesi[2], this.gorusAlaniListesi[3]);
        gl.scissor(this.gorusAlaniListesi[0], this.gorusAlaniListesi[1], this.gorusAlaniListesi[2], this.gorusAlaniListesi[3]);
        gl.clearColor(this.arkaPlanRengi[0], this.arkaPlanRengi[1], this.arkaPlanRengi[2], this.arkaPlanRengi[3]);
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);
        mat4.lookAt(this.bakmaMat, [
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
        mat4.ortho(this.projMat, -yariGenislik, yariGenislik, -yariUzunluk, yariUzunluk, this.yakinPlan, this.uzakPlan);
        mat4.multiply(this.bakmaProjMat, this.projMat, this.bakmaMat);
    }
}
//# sourceMappingURL=Kamera.js.map