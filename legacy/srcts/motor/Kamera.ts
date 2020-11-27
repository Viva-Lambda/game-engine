// kamera objesi
import {vec4, mat4, GLM} from "gl-matrix";

export class Kamera {
  merkez: GLM.IArray;
  pgenislik: number;
  gorusAlaniListesi: GLM.IArray;
  yakinPlan: number = 0;
  uzakPlan: number = 1000;
  bakmaMat = mat4.create();
  projMat = mat4.create();
  bakmaProjMat = mat4.create();
  arkaPlanRengi = vec4.fromValues(0.7, 0.7, 0.7, 1);
  constructor(_merkez: GLM.IArray, pencereGenisligi: number,
              _gorusAlaniListesi: GLM.IArray) {
    this.merkez = _merkez;
    this.pgenislik = pencereGenisligi;
    this.gorusAlaniListesi = _gorusAlaniListesi;
  }

  merkezKoy(x: number, y: number) {
    this.merkez[0] = x;
    this.merkez[1] = y;
  }
  merkezAl() { return this.merkez; }
  genislikKoy(x: number) { this.pgenislik = x; }
  genislikAl() { return this.pgenislik; }
  gorusAlaniKoy(gListe: GLM.IArray) {}
}
