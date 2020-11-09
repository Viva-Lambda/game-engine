// basit cizer objesi
import {gMotor} from "./Motor.js";

export class BasitCizer {
  //
  _derlenenCizici: WebGLProgram | null = null;
  _gCizerKordinatKonumu: GLint | null = null;
  constructor(noktaCiziciId: string, renklendiriciId: string) {
    //
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    var noktaCizici: WebGLShader =
        this.ciziciYukleDerle(noktaCiziciId, gl.VERTEX_SHADER);
    var renklendirici: WebGLShader =
        this.ciziciYukleDerle(renklendiriciId, gl.FRAGMENT_SHADER);
    var cizciProgram: WebGLProgram | null = gl.createProgram();
    if (cizciProgram === null) {
      throw new Error("Cizici program olusturulamadi");
    }
    this.derlenenCizici = cizciProgram;
    gl.attachShader(this.derlenenCizici, noktaCizici);
    gl.attachShader(this.derlenenCizici, renklendirici);
    gl.linkProgram(this.derlenenCizici);
    if (!gl.getProgramParameter(this.derlenenCizici, gl.LINK_STATUS)) {
      throw new Error("Cizici linklemede hata olustu");
    }
    this.gCizerKordinatKonumu =
        gl.getAttribLocation(this.derlenenCizici, "kareKoordinati");

    gl.bindBuffer(gl.ARRAY_BUFFER, gMotor.VertexBuffer.glVertexRefAl());

    gl.vertexAttribPointer(this.gCizerKordinatKonumu, 3, gl.FLOAT, false, 0, 0);
  }
  get gCizerKordinatKonumu(): GLint {
    if (this._gCizerKordinatKonumu === null) {
      throw new Error("Nokta nitelik konumu null degerinde");
    }
    return this._gCizerKordinatKonumu;
  }
  set gCizerKordinatKonumu(g: GLint) { this._gCizerKordinatKonumu = g; }
  get derlenenCizici(): WebGLProgram {
    if (this._derlenenCizici === null) {
      throw new Error("derlenen cizici/shader null");
    }
    return this._derlenenCizici;
  }
  set derlenenCizici(s: WebGLProgram) { this._derlenenCizici = s; }
  ciziciYukleDerle(elId: string, ciziciTipi: GLenum): WebGLShader {
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    let ciziciMetniEl: HTMLElement | null = document.getElementById(elId);
    if (ciziciMetniEl === null) {
      throw new Error("cizici/shader metni bulunamadi: " + elId);
    }
    let ciziciMetniNode: Node | null = ciziciMetniEl.firstChild;
    if (ciziciMetniNode === null) {
      throw new Error("cizici/shader elemaninin altinda bir sey yok: " + elId);
    }
    let ciziciKaynagi: string | null = ciziciMetniNode.textContent;
    if (ciziciKaynagi == null) {
      throw new Error("Cizici kaynagi bos metin: " + ciziciKaynagi);
    }

    var cizici: WebGLShader | null = gl.createShader(ciziciTipi);
    if (cizici === null) {
      throw new Error("cizici/shader olusturulamadi");
    }

    gl.shaderSource(cizici, ciziciKaynagi);
    gl.compileShader(cizici);
    // hata kontrolu
    if (!gl.getShaderParameter(cizici, gl.COMPILE_STATUS)) {
      throw new Error("Cizici derlenemedi: " + gl.getShaderInfoLog(cizici));
    }
    return cizici;
  }
  ciziciAktif(): void {
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    gl.useProgram(this.derlenenCizici);
    gl.enableVertexAttribArray(this.gCizerKordinatKonumu);
  }
}
