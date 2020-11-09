// ana motor diger unsurlari tasiyacak globali olusturur.
import {gMotor} from "./Motor.js";
import {V3} from "./yardimcilar.js";

export class AnaMotor {
  _mGL: WebGLRenderingContext | null = null;
  constructor() {}
  glBaslat(kanvasId: string): void {
    var kanvas: HTMLCanvasElement | null =
        document.getElementById(kanvasId) as HTMLCanvasElement;
    if (kanvas == null) {
      throw new Error("Ilgili kanvas elemani bulunamadi: " + kanvasId);
    }
    var gl: WebGLRenderingContext | null = kanvas.getContext("webgl");
    if (gl == null) {
      throw new Error("Ilgili baglam alinamadi ");
    }
    this.mGL = gl;
    gMotor.VertexBuffer.baslat();
  }
  set mGL(gl: WebGLRenderingContext) { this._mGL = gl; }
  get mGL(): WebGLRenderingContext {
    if (this._mGL == null) {
      throw new Error("baglam degeri null");
    }
    return this._mGL;
  }
  kanvasTemizle(renk: V3) {
    this.mGL.clearColor(renk.x, renk.y, renk.z, renk.w);
    this.mGL.clear(this.mGL.COLOR_BUFFER_BIT);
  }
}
gMotor.AnaMotor = new AnaMotor();
