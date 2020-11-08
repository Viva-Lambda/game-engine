//
import {AnaMotor} from "./AnaMotor.js";
import {VertexBuffer} from "./VertexBuffer.js";

export class Motor {
  _anaMotor: AnaMotor | null = null;
  _vertexBuffer: VertexBuffer | null = null;
  constructor() {}
  set AnaMotor(amotor: AnaMotor) { this._anaMotor = amotor; }
  get AnaMotor(): AnaMotor {
    if (this._anaMotor == null) {
      throw new Error("motor null");
    }
    return this._anaMotor;
  }
  set VertexBuffer(s: VertexBuffer) { this._vertexBuffer = s; }
  get VertexBuffer(): VertexBuffer {
    if (this._vertexBuffer == null) {
      throw new Error("vertex buffer null");
    }
    return this._vertexBuffer;
  }
}

export var gMotor = new Motor();
