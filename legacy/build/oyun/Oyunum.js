import { gMotor } from "../motor/Motor.js";
import { BasitCizer } from "../motor/BasitCizer.js";
export class Oyunum {
    constructor(kanvasId) {
        gMotor.AnaMotor.glBaslat(kanvasId);
        this.cizer = new BasitCizer("NoktaCizici", "RenkVerici");
        var renk = { x: 0, y: 0.7, z: 0.3, w: 1 };
        gMotor.AnaMotor.kanvasTemizle(renk);
        this.cizer.ciziciAktif();
        var gl = gMotor.AnaMotor.mGL;
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
//# sourceMappingURL=Oyunum.js.map