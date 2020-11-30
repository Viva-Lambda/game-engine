// çizilebilir butun objelerin anasi
import {vec4, GLM} from "gl-matrix";
import {BasitCizer} from "./BasitCizer.js";
import {Donusturme} from "./Donusturucu.js";
import {vecMatBoyutKontrol} from "../motor/yardimcilar.js";
import {gMotor} from "../motor/Motor.js";

export class Cizilebilir {
  cizici: BasitCizer;
  renk: GLM.IArray = vec4.fromValues(1, 1, 1, 1);
  donustur: Donusturme = new Donusturme();
  constructor(_cizici: BasitCizer) { this.cizici = _cizici; }
  ciz(bpMat: GLM.IArray): void {
    vecMatBoyutKontrol(bpMat, 16, "bpMat 4x4 matris degil");
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    this.cizici.ciziciAktif(this.renk, bpMat);
    this.cizici.modelMatKoy(this.donustur.modelMatAl());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  renkKoy(renk: GLM.IArray) {
    vecMatBoyutKontrol(renk, 4, "renk vec4 degil");
    this.renk = renk;
  }
  renkAl(): GLM.IArray { return this.renk; }
}
