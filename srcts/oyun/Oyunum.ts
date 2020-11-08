// oyun kodu
import {gMotor} from "../motor/Motor.js";
import {BasitCizer} from "../motor/BasitCizer.js";
import {V3} from "../motor/yardimcilar.js";

export class Oyunum {
  cizer: BasitCizer;
  constructor(kanvasId: string) {
    gMotor.AnaMotor.glBaslat(kanvasId);
    this.cizer = new BasitCizer("NoktaCizici", "RenkVerici");
    //
    var renk: V3 = {x : 0, y : 0.7, z : 0.3, w : 1};
    gMotor.AnaMotor.kanvasTemizle(renk);

    this.cizer.ciziciAktif();

    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
