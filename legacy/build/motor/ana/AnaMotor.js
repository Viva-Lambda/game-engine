import { gMotor } from "../Motor.js";
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
        this.mGL.clearColor(renk.x, renk.y, renk.z, renk.w);
        this.mGL.clear(this.mGL.COLOR_BUFFER_BIT);
    }
}
gMotor.AnaMotor = new AnaMotor();
//# sourceMappingURL=AnaMotor.js.map