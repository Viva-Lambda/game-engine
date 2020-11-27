// objelerin yerini degistirir, dondurur, buyutup kuçultur
import {vec3, vec4, mat4, GLM} from "gl-matrix";
import {derece2Radyan, vecMatBoyutKontrol} from "../motor/yardimcilar.js";

export class Donusturme {
  konum: GLM.IArray = vec4.fromValues(0, 0, 0, 0);
  boyut: GLM.IArray = vec4.fromValues(1, 1, 1, 1);
  radyan: number = 0.0;
  constructor() {}
  konumKoy(x: number, y: number) { this.konum = vec4.fromValues(x, y, 0, 0); }
  konumAl(): GLM.IArray { return this.konum; }
  //
  konumXAl(): number { return this.konum[0]; }
  konumYAl(): number { return this.konum[1]; }
  konumZAl(): number { return this.konum[2]; }
  //
  konumXKoy(x: number) { this.konum[0] = x; }
  konumYKoy(y: number) { this.konum[1] = y; }
  konumZKoy(z: number) { this.konum[2] = z; }
  //
  konumXArti(x: number) { this.konum[0] += x; }
  konumYArti(x: number) { this.konum[1] += x; }
  konumZArti(x: number) { this.konum[2] += x; }

  boyutAl(): GLM.IArray { return this.boyut; }
  boyutKoy(x: number, y: number) { this.boyut = vec4.fromValues(x, y, 1, 1); }

  boyutXAl(): number { return this.boyut[0]; }
  boyutYAl(): number { return this.boyut[1]; }
  boyutZAl(): number { return this.boyut[2]; }
  boyutXKoy(x: number) { this.boyut[0] = x; }
  boyutYKoy(y: number) { this.boyut[1] = y; }
  boyutZKoy(z: number) { this.boyut[2] = z; }
  //
  boyutXArti(x: number) { this.boyut[0] += x; }
  boyutYArti(x: number) { this.boyut[1] += x; }
  boyutZArti(x: number) { this.boyut[2] += x; }

  radyanKoy(x: number) {
    this.radyan = x;
    while (this.radyan > 2 * Math.PI) {
      this.radyan -= (2 * Math.PI);
    }
    while (this.radyan < -2 * Math.PI) {
      this.radyan += (2 * Math.PI);
    }
  }
  dereceKoy(x: number) { this.radyan = derece2Radyan(x); }
  dereceAl(): number { return this.radyan * 180.0 / Math.PI; }
  dereceArti(d: number) { this.radyan += derece2Radyan(d); }
  modelMatAl(): GLM.IArray {
    let modelMat = mat4.create();
    mat4.translate(
        modelMat, modelMat,
        vec3.fromValues(this.konumXAl(), this.konumYAl(), this.konumZAl()));
    mat4.rotateZ(modelMat, modelMat, this.radyan);
    mat4.scale(
        modelMat, modelMat,
        vec3.fromValues(this.konumXAl(), this.boyutYAl(), this.boyutZAl()));
    return modelMat;
  }
}
