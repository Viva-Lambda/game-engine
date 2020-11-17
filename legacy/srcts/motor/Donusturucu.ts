// objelerin yerini degistirir, dondurur, buyutup kuçultur
import {V3, derece2Radyan, Mat4} from "../lib/Matrix.js";

export class Donusturme {
  konum: V3 = new V3(0, 0, 0);
  boyut: V3 = new V3(1, 1, 1);
  radyan: number = 0.0;
  constructor() {}
  konumKoy(x: number, y: number) {
    this.konum.x = x;
    this.konum.y = y;
  }
  konumAl(): V3 { return new V3(this.konum.x, this.konum.y, 0); }
  boyutAl(): V3 { return new V3(this.boyut.x, this.boyut.y, 1); }
  boyutKoy(x: number, y: number) { this.boyut = new V3(x, y, 1); }
  radyanKoy(x: number) {
    this.radyan = x;
    while (this.radyan > 2 * Math.PI) {
      this.radyan -= (2 * Math.PI);
    }
    while (this.radyan < -2 * Math.PI) {
      this.radyan += (2 * Math.PI);
    }
  }
  yerDegistirmeMatAl(): Mat4 {
    let yerDegistirmeMat = new Mat4();
    let ykonum = this.konum.genislet();
    ykonum.w = 1.0;
    // TODO: tutmazsa sutun koyacagiz
    yerDegistirmeMat.satirKoy(3, ykonum);
    return yerDegistirmeMat
  }
  dondurZMatAl(): Mat4 {
    let dmz = new Mat4();
    let costheta = Math.cos(this.radyan);
    let sintheta = Math.sin(this.radyan);
    dmz.hucreKoy(0, 0, costheta);
    dmz.hucreKoy(0, 1, -sintheta);
    dmz.hucreKoy(1, 0, sintheta);
    dmz.hucreKoy(1, 1, costheta);
    return dmz;
  }
  dondurYMatAl(): Mat4 {
    let dmz = new Mat4();
    let costheta = Math.cos(this.radyan);
    let sintheta = Math.sin(this.radyan);
    dmz.hucreKoy(0, 0, costheta);
    dmz.hucreKoy(0, 2, sintheta);
    dmz.hucreKoy(2, 0, -sintheta);
    dmz.hucreKoy(2, 2, costheta);
    return dmz;
  }
  dondurXMatAl(): Mat4 {
    let dmz = new Mat4();
    let costheta = Math.cos(this.radyan);
    let sintheta = Math.sin(this.radyan);
    dmz.hucreKoy(1, 1, costheta);
    dmz.hucreKoy(1, 2, -sintheta);
    dmz.hucreKoy(2, 1, sintheta);
    dmz.hucreKoy(2, 2, costheta);
    return dmz;
  }
  boyutMatAl(): Mat4 {
    let boyutMat = new Mat4();
    boyutMat.caprazDoldur(this.boyut.arr);
    return boyutMat;
  }
  dereceKoy(x: number) { this.radyan = derece2Radyan(x); }
  modelMatAl(): Mat4 {
    let modelMat = new Mat4();
    // yer degistirme islemi
    let yerMat = this.yerDegistirmeMatAl();
    yerMat.ic(modelMat);
    let dondurZMat = this.dondurZMatAl();
    dondurZMat.ic(yerMat);
    let boyutMat = this.boyutMatAl();
    boyutMat.ic(dondurZMat);
    modelMat = boyutMat;
    console.log(modelMat);
    return modelMat;
  }
}
