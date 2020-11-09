import AnaMotor from "./AnaMotor";
import VertexBuffer from "./VertexBuffer";

export default abstract class Motor {
  private static _anaMotor: AnaMotor | null = null;
  private static _vertexBuffer: VertexBuffer | null = null;

  static set AnaMotor(amotor: AnaMotor) {
    this._anaMotor = amotor;
  }

  static get AnaMotor(): AnaMotor {
    if (this._anaMotor == null) {
      throw new Error("motor null");
    }

    return this._anaMotor;
  }

  static set VertexBuffer(vbuffer: VertexBuffer) {
    this._vertexBuffer = vbuffer;
  }

  static get VertexBuffer(): VertexBuffer {
    if (this._vertexBuffer == null) {
      throw new Error("vertex buffer null");
    }

    return this._vertexBuffer;
  }
}
