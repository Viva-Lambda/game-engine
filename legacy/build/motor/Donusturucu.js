import { vec3, vec4, mat4 } from "gl-matrix";
import { derece2Radyan } from "../motor/yardimcilar.js";
export class Donusturme {
    constructor() {
        this.konum = vec4.fromValues(0, 0, 0, 0);
        this.boyut = vec4.fromValues(1, 1, 1, 1);
        this.radyan = 0.0;
    }
    konumKoy(x, y) { this.konum = vec4.fromValues(x, y, 0, 0); }
    konumAl() { return this.konum; }
    konumXAl() { return this.konum[0]; }
    konumYAl() { return this.konum[1]; }
    konumZAl() { return this.konum[2]; }
    konumXKoy(x) { this.konum[0] = x; }
    konumYKoy(y) { this.konum[1] = y; }
    konumZKoy(z) { this.konum[2] = z; }
    konumXArti(x) { this.konum[0] += x; }
    konumYArti(x) { this.konum[1] += x; }
    konumZArti(x) { this.konum[2] += x; }
    boyutAl() { return this.boyut; }
    boyutKoy(x, y) { this.boyut = vec4.fromValues(x, y, 1, 1); }
    boyutXAl() { return this.boyut[0]; }
    boyutYAl() { return this.boyut[1]; }
    boyutZAl() { return this.boyut[2]; }
    boyutXKoy(x) { this.boyut[0] = x; }
    boyutYKoy(y) { this.boyut[1] = y; }
    boyutZKoy(z) { this.boyut[2] = z; }
    boyutXArti(x) { this.boyut[0] += x; }
    boyutYArti(x) { this.boyut[1] += x; }
    boyutZArti(x) { this.boyut[2] += x; }
    boyutArti(x) {
        this.boyutXArti(x);
        this.boyutYArti(x);
    }
    radyanKoy(x) {
        this.radyan = x;
        while (this.radyan > 2 * Math.PI) {
            this.radyan -= (2 * Math.PI);
        }
        while (this.radyan < -2 * Math.PI) {
            this.radyan += (2 * Math.PI);
        }
    }
    dereceKoy(x) { this.radyan = derece2Radyan(x); }
    dereceAl() { return this.radyan * 180.0 / Math.PI; }
    dereceArti(d) { this.radyan += derece2Radyan(d); }
    modelMatAl() {
        let modelMat = mat4.create();
        mat4.translate(modelMat, modelMat, vec3.fromValues(this.konumXAl(), this.konumYAl(), this.konumZAl()));
        mat4.rotateZ(modelMat, modelMat, this.radyan);
        mat4.scale(modelMat, modelMat, vec3.fromValues(this.konumXAl(), this.boyutYAl(), this.boyutZAl()));
        return modelMat;
    }
}
//# sourceMappingURL=Donusturucu.js.map