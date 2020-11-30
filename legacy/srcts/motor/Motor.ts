//
import {AnaMotor} from "./ana/AnaMotor.js";
import {VertexBuffer} from "./ana/VertexBuffer.js";
import {OyunDongusu} from "./ana/OyunDongusu.js";

export class Motor {
  _anaMotor: AnaMotor | null = null;
  _vertexBuffer: VertexBuffer | null = null;
  _oyunDongusu: OyunDongusu | null = null;
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
  set OyunDongusu(s: OyunDongusu) { this._oyunDongusu = s; }
  get OyunDongusu(): OyunDongusu {
    if (this._oyunDongusu == null) {
      throw new Error("Oyun dongusu null");
    }
    return this._oyunDongusu;
  }
}

export var gMotor = new Motor();
