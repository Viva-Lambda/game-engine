//
import {AnaMotor} from "./ana/AnaMotor";
import {VertexBuffer} from "./ana/VertexBuffer";
import {OyunDongusu} from "./ana/OyunDongusu";
import {KlavyeGirdi} from "./ana/Girdi";

/*
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
*/
export interface Motor {
  AnaMotor?: AnaMotor | null;
  VertexBuffer?: VertexBuffer | null;
  OyunDongusu?: OyunDongusu | null;
  Girdi?: KlavyeGirdi | null;
}

// export var gMotor = new Motor();
