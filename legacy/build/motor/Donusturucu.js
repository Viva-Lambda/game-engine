import { V3, derece2Radyan, Mat4 } from "../lib/Matrix.js";
export class Donusturme {
    constructor() {
        this.konum = new V3(0, 0, 0);
        this.boyut = new V3(1, 1, 1);
        this.radyan = 0.0;
    }
    konumKoy(x, y) {
        this.konum.x = x;
        this.konum.y = y;
    }
    konumAl() { return new V3(this.konum.x, this.konum.y, 0); }
    boyutAl() { return new V3(this.boyut.x, this.boyut.y, 1); }
    boyutKoy(x, y) { this.boyut = new V3(x, y, 1); }
    radyanKoy(x) {
        this.radyan = x;
        while (this.radyan > 2 * Math.PI) {
            this.radyan -= (2 * Math.PI);
        }
        while (this.radyan < -2 * Math.PI) {
            this.radyan += (2 * Math.PI);
        }
    }
    yerDegistirmeMatAl() {
        let yerDegistirmeMat = new Mat4();
        let ykonum = this.konum.genislet();
        ykonum.w = 1.0;
        yerDegistirmeMat.satirKoy(3, ykonum);
        return yerDegistirmeMat;
    }
    dondurZMatAl() {
        let dmz = new Mat4();
        let costheta = Math.cos(this.radyan);
        let sintheta = Math.sin(this.radyan);
        dmz.hucreKoy(0, 0, costheta);
        dmz.hucreKoy(0, 1, -sintheta);
        dmz.hucreKoy(1, 0, sintheta);
        dmz.hucreKoy(1, 1, costheta);
        return dmz;
    }
    dondurYMatAl() {
        let dmz = new Mat4();
        let costheta = Math.cos(this.radyan);
        let sintheta = Math.sin(this.radyan);
        dmz.hucreKoy(0, 0, costheta);
        dmz.hucreKoy(0, 2, sintheta);
        dmz.hucreKoy(2, 0, -sintheta);
        dmz.hucreKoy(2, 2, costheta);
        return dmz;
    }
    dondurXMatAl() {
        let dmz = new Mat4();
        let costheta = Math.cos(this.radyan);
        let sintheta = Math.sin(this.radyan);
        dmz.hucreKoy(1, 1, costheta);
        dmz.hucreKoy(1, 2, -sintheta);
        dmz.hucreKoy(2, 1, sintheta);
        dmz.hucreKoy(2, 2, costheta);
        return dmz;
    }
    boyutMatAl() {
        let boyutMat = new Mat4();
        boyutMat.caprazDoldur(this.boyut.arr);
        return boyutMat;
    }
    dereceKoy(x) { this.radyan = derece2Radyan(x); }
    modelMatAl() {
        let modelMat = new Mat4();
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
//# sourceMappingURL=Donusturucu.js.map