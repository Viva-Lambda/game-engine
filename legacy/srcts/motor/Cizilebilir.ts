// çizilebilir butun objelerin anasi
import {BasitCizer} from "./BasitCizer.js";
import {Donusturme} from "./Donusturucu.js";
import {V4} from "../lib/Matrix.js";
import {gMotor} from "../motor/Motor.js";

export class Cizilebilir {
  cizici: BasitCizer;
  renk: V4 = new V4(1, 1, 1, 1);
  donustur: Donusturme = new Donusturme();
  constructor(_cizici: BasitCizer) { this.cizici = _cizici; }
  ciz(): void {
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    this.cizici.ciziciAktif(this.renk);
    this.cizici.modelMatKoy(this.donustur.modelMatAl());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
