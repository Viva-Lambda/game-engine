// vertext buffer objesi
import gMotor from "./Motor";

export default class VertexBuffer {
  private _gKareNoktaBuffer: WebGLBuffer | null;
  private kareKordinatlari: Array<number>;

  constructor() {
    this._gKareNoktaBuffer = null;
    this.kareKordinatlari = [
      0.5, 0.5, 0.0,  //
      -0.5, 0.5, 0.0, //
      0.5, -0.5, 0.0, //
      -0.5, -0.5, 0.0 //
    ]
  }

  get gKareNoktaBuffer(): WebGLBuffer {
    if (this._gKareNoktaBuffer == null) {
      throw new Error("WebGL buffer olusturulmamis");
    }

    return this._gKareNoktaBuffer;
  }

  set gKareNoktaBuffer(gb: WebGLBuffer) {
    this._gKareNoktaBuffer = gb;
  }

  baslat(): void {
    const gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    const gKareNoktaBuffer: WebGLBuffer | null = gl.createBuffer();

    if (gKareNoktaBuffer == null) {
      throw new Error("Buffer Oluşturulamadı");
    }

    this.gKareNoktaBuffer = gKareNoktaBuffer;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.gKareNoktaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.kareKordinatlari), gl.STATIC_DRAW);
  }
}

//
gMotor.VertexBuffer = new VertexBuffer();
