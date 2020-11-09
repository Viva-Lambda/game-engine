import gMotor from "../core/Motor";
import AnaMotor from "../core/AnaMotor";
import VertexBuffer from "../core/VertexBuffer";
import BasitCizer from  "../core/BasitCizer";
import { V3 } from "../core/yardimcilar";
import NoktaCizici from "../shaders/NoktaCizici.vert";
import RenkVerici from "../shaders/RenkVerici.frag";

export default class Oyunum {
  cizer: BasitCizer;

  constructor(kanvasId: string) {
    gMotor.AnaMotor = new AnaMotor();
    gMotor.VertexBuffer = new VertexBuffer();

    gMotor.AnaMotor.glBaslat(kanvasId);

    this.cizer = new BasitCizer(NoktaCizici, RenkVerici);

    const renk: V3 = { x: 0, y: 0.7, z: 0.3, w: 1 };
    gMotor.AnaMotor.kanvasTemizle(renk);
    
    this.cizer.ciziciAktif();

    const gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
