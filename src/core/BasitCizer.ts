// basit cizer objesi
import gMotor from "./Motor";

export default class BasitCizer {
  private _derlenenCizici: WebGLProgram | null;
  private _gCizerKordinatKonumu: GLint | null;

  constructor(noktaCiziciSrc: string, renklendiriciSrc: string) {
    this._derlenenCizici = null;
    this._gCizerKordinatKonumu = null;

    const gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;

    const noktaCizici: WebGLShader = this.ciziciYukleDerle(noktaCiziciSrc, gl.VERTEX_SHADER);
    const renklendirici: WebGLShader = this.ciziciYukleDerle(renklendiriciSrc, gl.FRAGMENT_SHADER);

    const ciziciProgram: WebGLProgram | null = gl.createProgram();
    if (ciziciProgram == null) {
      throw new Error("Cizici program olusturulamadi");
    }

    this._derlenenCizici = ciziciProgram;

    gl.attachShader(this._derlenenCizici, noktaCizici);
    gl.attachShader(this._derlenenCizici, renklendirici);
    gl.linkProgram(this._derlenenCizici);

    if (!gl.getProgramParameter(this._derlenenCizici, gl.LINK_STATUS)) {
      throw new Error("Cizici linklemede hata olustu");
    }

    this._gCizerKordinatKonumu = gl.getAttribLocation(this._derlenenCizici, "kareKoordinati");

    gl.bindBuffer(gl.ARRAY_BUFFER, gMotor.VertexBuffer.gKareNoktaBuffer);
    
    gl.vertexAttribPointer(this._gCizerKordinatKonumu, 3, gl.FLOAT, false, 0, 0);
  }

  set derlenenCizici(s: WebGLProgram) {
    this._derlenenCizici = s;
  }

  get derlenenCizici(): WebGLProgram {
    if (this._derlenenCizici == null) {
      throw new Error("derlenen cizici/shader null");
    }

    return this.derlenenCizici;
  }

  set gCizerKordinatKonumu(g: GLint) {
    this._gCizerKordinatKonumu = g;
  }

  get gCizerKordinatKonumu(): GLint {
    if (this._gCizerKordinatKonumu == null) {
      throw new Error("Nokta nitelik konumu null degerinde");
    }

    return this._gCizerKordinatKonumu;
  }

  ciziciYukleDerle(ciziciKaynagi: string, ciziciTipi: GLenum): WebGLShader {
    const gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;

    const cizici: WebGLShader | null = gl.createShader(ciziciTipi);
    if (cizici == null) {
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
    const gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    gl.useProgram(this._derlenenCizici);

    if (this._gCizerKordinatKonumu == null) {
      throw new Error("gCizerKordinatKonumu null");
    }

    gl.enableVertexAttribArray(this._gCizerKordinatKonumu);
  }
}
