import { gMotor } from "../Motor.js";
import { vecMatBoyutKontrol } from "../yardimcilar.js";
export class AnaMotor {
    constructor() {
        this._mGL = null;
    }
    glBaslat(kanvasId) {
        var kanvas = document.getElementById(kanvasId);
        if (kanvas == null) {
            throw new Error("Ilgili kanvas elemani bulunamadi: " + kanvasId);
        }
        var gl = kanvas.getContext("webgl");
        if (gl == null) {
            throw new Error("Ilgili baglam alinamadi ");
        }
        this.mGL = gl;
        gMotor.VertexBuffer.baslat();
    }
    set mGL(gl) { this._mGL = gl; }
    get mGL() {
        if (this._mGL == null) {
            throw new Error("baglam degeri null");
        }
        return this._mGL;
    }
    kanvasTemizle(renk) {
        vecMatBoyutKontrol(renk, 4, "renk vec4 degil");
        this.mGL.clearColor(renk[0], renk[1], renk[2], renk[3]);
        this.mGL.clear(this.mGL.COLOR_BUFFER_BIT);
    }
}
gMotor.AnaMotor = new AnaMotor();
//# sourceMappingURL=AnaMotor.js.map