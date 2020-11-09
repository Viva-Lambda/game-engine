// vertext buffer objesi
import {gMotor} from "./Motor.js";

export class VertexBuffer {
  _gKareNoktaBuffer: WebGLBuffer | null = null;
  kareKordinatlari: Array<number> = [
    0.5, 0.5, 0.0,  //
    -0.5, 0.5, 0.0, //
    0.5, -0.5, 0.0, //
    -0.5, -0.5, 0.0 //
  ];
  get gKareNoktaBuffer(): WebGLBuffer {
    if (this._gKareNoktaBuffer == null) {
      throw new Error("WebGL buffer olusturulmamis");
    }
    return this._gKareNoktaBuffer;
  }
  set gKareNoktaBuffer(gb: WebGLBuffer) { this._gKareNoktaBuffer = gb; }
  glVertexRefAl(): WebGLBuffer { return this.gKareNoktaBuffer; }
  baslat(): void {
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    //
    var gKareNoktaBuffer_: WebGLBuffer | null = gl.createBuffer();
    if (gKareNoktaBuffer_ == null) {
      throw new Error("Buffer olusturulamadi");
    }
    this.gKareNoktaBuffer = gKareNoktaBuffer_;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.gKareNoktaBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.kareKordinatlari),
                  gl.STATIC_DRAW);
  }
}

gMotor.VertexBuffer = new VertexBuffer();
