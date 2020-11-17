import { gMotor } from "../motor/Motor.js";
import { BasitCizer } from "../motor/BasitCizer.js";
import { V4 } from "../lib/Matrix.js";
export class Oyunum {
    constructor(kanvasId) {
        gMotor.AnaMotor.glBaslat(kanvasId);
        this.cizer =
            new BasitCizer("./srcts/glsl/kare.vert", "./srcts/glsl/degisikrenk.frag");
        var renk = new V4(1, 1, 1, 1);
        gMotor.AnaMotor.kanvasTemizle(renk);
        var renk2 = new V4(0, 1, 1, 1);
        this.cizer.ciziciAktif(renk2);
        var gl = gMotor.AnaMotor.mGL;
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}
//# sourceMappingURL=Oyunum.js.map