// kamera objesi
import {vec4, mat4, GLM} from "gl-matrix";
import {vecMatBoyutKontrol} from "../motor/yardimcilar.js";
import {gMotor} from "../motor/Motor.js";

export class Kamera {
  merkez: GLM.IArray;
  pgenislik: number;
  gorusAlaniListesi: GLM.IArray;
  yakinPlan: number = 0;
  uzakPlan: number = 1000;
  bakmaMat = mat4.create();
  projMat = mat4.create();
  bakmaProjMat = mat4.create();
  _arkaPlanRengi: GLM.IArray = vec4.fromValues(0.7, 0.7, 0.7, 1);
  constructor(_merkez: GLM.IArray, pencereGenisligi: number,
              _gorusAlaniListesi: GLM.IArray) {
    vecMatBoyutKontrol(_merkez, 2, "merkez vec2 degil");
    this.merkez = _merkez;
    this.pgenislik = pencereGenisligi;
    vecMatBoyutKontrol(_gorusAlaniListesi, 4, "gorusAlaniListesi vec4 degil");
    this.gorusAlaniListesi = _gorusAlaniListesi;
  }
  merkezKoy(x: number, y: number) {
    this.merkez[0] = x;
    this.merkez[1] = y;
  }
  merkezAl() { return this.merkez; }
  genislikKoy(x: number) { this.pgenislik = x; }
  genislikAl() { return this.pgenislik; }
  gorusAlaniKoy(gListe: GLM.IArray) {
    vecMatBoyutKontrol(gListe, 4, "gorus alani istenen boyutta degil");
    this.gorusAlaniListesi = gListe;
  }
  get arkaPlanRengi(): GLM.IArray { return this._arkaPlanRengi; }
  set arkaPlanRengi(renk: GLM.IArray) {
    vecMatBoyutKontrol(renk, 4, "arka plan rengi vec4 degil");
    this._arkaPlanRengi = renk;
  }
  bakmaProjMatKur() {
    var gl = gMotor.AnaMotor.mGL;
    gl.viewport(this.gorusAlaniListesi[0], this.gorusAlaniListesi[1],
                this.gorusAlaniListesi[2], this.gorusAlaniListesi[3]);
    gl.scissor(this.gorusAlaniListesi[0], this.gorusAlaniListesi[1],
               this.gorusAlaniListesi[2], this.gorusAlaniListesi[3]);

    gl.clearColor(this.arkaPlanRengi[0], this.arkaPlanRengi[1],
                  this.arkaPlanRengi[2], this.arkaPlanRengi[3]);
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    //
    mat4.lookAt(this.bakmaMat,
        [ // hedef
            this.merkez[0],
            this.merkez[1],
            10 // z kordinati
        ],
        [ // konum
            this.merkez[0],
            this.merkez[1],
            0 // z kordinati
        ], [ // tepe
            0, 1, 0
        ]
    );
    var yariGenislik = 0.5 * this.pgenislik;
    var yariUzunluk =
        yariGenislik *
        (this.gorusAlaniListesi[3] /
         this.gorusAlaniListesi[2]); // genislik * bakma orani(aspect ratio)

    mat4.ortho(this.projMat, -yariGenislik, yariGenislik, -yariUzunluk,
               yariUzunluk, this.yakinPlan, this.uzakPlan);

    mat4.multiply(this.bakmaProjMat, this.projMat, this.bakmaMat);
  }
}
