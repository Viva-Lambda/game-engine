import {Motor} from "./Motor";
import {AnaMotor} from "./ana/AnaMotor";
import {OyunDongusu} from "./ana/OyunDongusu";
import {VertexBuffer} from "./ana/VertexBuffer";

export var gMotor: Motor = {
  AnaMotor : new AnaMotor(),
  VertexBuffer : new VertexBuffer(),
  OyunDongusu : new OyunDongusu()
};
