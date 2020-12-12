// ana motor diger unsurlari tasiyacak globali olusturur.
import {gMotor} from "../MotorNesnesi";
import {vec4} from "gl-matrix";

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
    if (gMotor.VertexBuffer === null || gMotor.VertexBuffer === undefined) {
      throw new Error("ana motor null cizer de");
    }
  }
  set mGL(gl: WebGLRenderingContext) { this._mGL = gl; }
  get mGL(): WebGLRenderingContext {
    if (this._mGL == null) {
      throw new Error("baglam degeri null");
    }
    return this._mGL;
  }
  kanvasTemizle(renk: vec4) {
    this.mGL.clearColor(renk[0], renk[1], renk[2], renk[3]);
    this.mGL.clear(this.mGL.COLOR_BUFFER_BIT);
  }
  anaUnsurlariBaslat(kanvasId: string) {
    this.glBaslat(kanvasId);
    gMotor.VertexBuffer.baslat();
    gMotor.Girdi.baslat(kanvasId);
  }
}
