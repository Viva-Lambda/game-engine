import { vec4 } from "gl-matrix";
import { Donusturme } from "./Donusturucu.js";
import { vecMatBoyutKontrol } from "../motor/yardimcilar.js";
import { gMotor } from "../motor/Motor.js";
export class Cizilebilir {
    constructor(_cizici) {
        this.renk = vec4.fromValues(1, 1, 1, 1);
        this.donustur = new Donusturme();
        this.cizici = _cizici;
    }
    ciz(bpMat) {
        vecMatBoyutKontrol(bpMat, 16, "bpMat 4x4 matris degil");
        var gl = gMotor.AnaMotor.mGL;
        this.cizici.ciziciAktif(this.renk, bpMat);
        this.cizici.modelMatKoy(this.donustur.modelMatAl());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    renkKoy(renk) {
        vecMatBoyutKontrol(renk, 4, "renk vec4 degil");
        this.renk = renk;
    }
    renkAl() { return this.renk; }
}
//# sourceMappingURL=Cizilebilir.js.map