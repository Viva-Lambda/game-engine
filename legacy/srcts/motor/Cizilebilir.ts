// çizilebilir butun objelerin anasi
import {BasitCizer} from "./BasitCizer.js";
import {V4} from "../lib/Matrix.js";

export class Cizilebilir {
  cizici: BasitCizer;
  renk: V4 = new V4(1, 1, 1, 1);
  constructor(_cizici: BasitCizer) { this.cizici = _cizici; }
}
