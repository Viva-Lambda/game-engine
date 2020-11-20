import { Donusturme } from "./Donusturucu.js";
import { V4 } from "../lib/Matrix.js";
import { gMotor } from "../motor/Motor.js";
export class Cizilebilir {
    constructor(_cizici) {
        this.renk = new V4(1, 1, 1, 1);
        this.donustur = new Donusturme();
        this.cizici = _cizici;
    }
    ciz() {
        var gl = gMotor.AnaMotor.mGL;
        this.cizici.ciziciAktif(this.renk);
        this.cizici.modelMatKoy(this.donustur.modelMatAl());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
//# sourceMappingURL=Cizilebilir.js.map