import {AnaMotor} from "./ana/AnaMotor";
import {OyunDongusu} from "./ana/OyunDongusu";
import {VertexBuffer} from "./ana/VertexBuffer";
import {KlavyeGirdi} from "./ana/Girdi";

class MotorObje {
  AnaMotor = new AnaMotor();
  VertexBuffer = new VertexBuffer();
  OyunDongusu = new OyunDongusu();
  Girdi = new KlavyeGirdi();
  constructor() {}
}

export var gMotor = new MotorObje();
