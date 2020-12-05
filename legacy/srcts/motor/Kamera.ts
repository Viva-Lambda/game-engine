// kamera objesi
import {vec3, vec4, mat4} from "gl-matrix";
import {gMotor} from "../motor/MotorNesnesi";

export class Kamera {
  merkez: vec3;
  pgenislik: number;
  gorusAlaniListesi: vec4;
  yakinPlan: number = 0;
  uzakPlan: number = 1000;
  bakmaMat = mat4.create();
  projMat = mat4.create();
  bakmaProjMat = mat4.create();
  _arkaPlanRengi: vec4 = vec4.fromValues(0.7, 0.7, 0.7, 1);
  constructor(_merkez: vec3 | Array<number>, pencereGenisligi: number,
              _gorusAlaniListesi: vec4 | Array<number>) {
    if (_merkez.length !== 3) {
      throw new Error("merkez 3 boyutlu degil");
    }
    this.merkez = vec3.fromValues(_merkez[0], _merkez[1], _merkez[2]);
    this.pgenislik = pencereGenisligi;

    if (_gorusAlaniListesi.length !== 4) {
      throw new Error("gorusAlaniListesi 4 boyutlu degil");
    }
    this.gorusAlaniListesi =
        vec4.fromValues(_gorusAlaniListesi[0], _gorusAlaniListesi[1],
                        _gorusAlaniListesi[2], _gorusAlaniListesi[3]);
  }
  merkezKoy(x: number, y: number) {
    this.merkez[0] = x;
    this.merkez[1] = y;
  }
  merkezAl() { return this.merkez; }
  genislikKoy(x: number) { this.pgenislik = x; }
  genislikAl() { return this.pgenislik; }
  gorusAlaniKoy(gListe: vec4) { this.gorusAlaniListesi = gListe; }
  get arkaPlanRengi(): vec4 { return this._arkaPlanRengi; }
  set arkaPlanRengi(renk: vec4) { this._arkaPlanRengi = renk; }
  bakmaProjMatKur() {
    if (gMotor.AnaMotor === null || gMotor.AnaMotor === undefined) {
      throw new Error("ana motor null cizer de");
    }

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
