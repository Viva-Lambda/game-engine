// çizilebilir butun objelerin anasi
import {vec4, mat4} from "gl-matrix";
import {BasitCizer} from "./BasitCizer";
import {Donusturme} from "./Donusturucu";
import {gMotor} from "../motor/MotorNesnesi";

export class Cizilebilir {
  cizici: BasitCizer;
  renk: vec4 = vec4.fromValues(1, 1, 1, 1);
  donustur: Donusturme = new Donusturme();
  constructor(_cizici: BasitCizer) { this.cizici = _cizici; }
  ciz(bpMat: mat4): void {

    if (gMotor.AnaMotor === null || gMotor.AnaMotor === undefined) {
      throw new Error("ana motor null cizer de");
    }

    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    this.cizici.ciziciAktif(this.renk, bpMat);
    this.cizici.modelMatKoy(this.donustur.modelMatAl());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  renkKoy(renk: vec4) { this.renk = renk; }
  renkAl(): vec4 { return this.renk; }
}
