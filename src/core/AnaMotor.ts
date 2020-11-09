// ana motor diger unsurlari tasiyacak globali olusturur.
import gMotor from "./Motor"
import { V3 } from "./yardimcilar"

export default class AnaMotor {
  private _mGL: WebGLRenderingContext | null;

  constructor() {
    this._mGL = null;
  }

  glBaslat(kanvasId: string): void {
    const kanvas: HTMLCanvasElement | null = document.querySelector(`#${kanvasId}`);

    if (kanvas == null) {
      throw new Error(`İlgili kanvas elementi bulunamadi ${kanvasId}`);
    }

    const gl: WebGLRenderingContext | null = kanvas.getContext("webgl");

    if (gl == null) {
      throw new Error("İlgili bağlam alinamadi");
    }

    this._mGL = gl;
    gMotor.VertexBuffer.baslat();
  }

  set mGL(gl: WebGLRenderingContext) {
    this._mGL = gl;
  }

  get mGL(): WebGLRenderingContext {
    if (this._mGL == null) {
      throw new Error("baglam degeri null");
    }

    return this._mGL;
  }

  kanvasTemizle(renk: V3) {
    if (this._mGL == null) {
      throw new Error("baglam degeri null");
    }

    this._mGL.clearColor(renk.x, renk.y, renk.z, renk.w);
    this._mGL.clear(this._mGL.COLOR_BUFFER_BIT);
  }
}

//
gMotor.AnaMotor = new AnaMotor();
