// basit cizer objesi
import {gMotor} from "./Motor.js";
import {GLM} from "gl-matrix";
import {
  UniformInfo,
  AttribInfo,
  attribInfoYap,
  uniformInfoYap,
  glmdenListeAl
} from "../motor/yardimcilar.js";

export class BasitCizer {
  //
  _derlenenCizici: WebGLProgram | null = null;
  gCizerKordinatInfo: AttribInfo;
  pikselRengiInfo: UniformInfo;
  modelMatInfo: UniformInfo;
  bakmaMatInfo: UniformInfo;
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
    let kordinatAdi = "kareKoordinati";
    let gCizerKordinatKonumu =
        gl.getAttribLocation(this.derlenenCizici, kordinatAdi);
    if (gCizerKordinatKonumu === null) {
      throw new Error("ilgili kordinat adi: " + kordinatAdi + " bulunamadi");
    }
    this.gCizerKordinatInfo = attribInfoYap(kordinatAdi, gCizerKordinatKonumu,
                                            3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gMotor.VertexBuffer.glVertexRefAl());

    gl.vertexAttribPointer(
        this.gCizerKordinatInfo.konum, this.gCizerKordinatInfo.boyut,
        this.gCizerKordinatInfo.tip, this.gCizerKordinatInfo.normalizeMi,
        this.gCizerKordinatInfo.adim, this.gCizerKordinatInfo.uzaklik);
    //
    let pikselAdi = "uPikselRengi";
    let pixKonumu: WebGLUniformLocation | null =
        gl.getUniformLocation(this.derlenenCizici, pikselAdi);

    if (pixKonumu === null) {
      throw new Error("Piksel konumu bulunamadi");
    }
    this.pikselRengiInfo = uniformInfoYap(pikselAdi, pixKonumu);
    let modelAdi = "uModelDonustur";
    let matKonumu: WebGLUniformLocation | null =
        gl.getUniformLocation(this.derlenenCizici, modelAdi);
    if (matKonumu === null) {
      throw new Error("Model matrisi konumu bulunamadi");
    }
    this.modelMatInfo = uniformInfoYap(modelAdi, matKonumu);
    let bakmaMatAdi = "uBakmaProj";
    matKonumu = gl.getUniformLocation(this.derlenenCizici, bakmaMatAdi);
    if (matKonumu === null) {
      throw new Error("Bakma matrisi konumu bulunamadi");
    }
    this.bakmaMatInfo = uniformInfoYap(bakmaMatAdi, matKonumu);
  }
  get derlenenCizici(): WebGLProgram {
    if (this._derlenenCizici === null) {
      throw new Error("derlenen cizici/shader null");
    }
    return this._derlenenCizici;
  }
  set derlenenCizici(s: WebGLProgram) { this._derlenenCizici = s; }
  ciziciYukleDerle(dosyaYolu: string, ciziciTipi: GLenum): WebGLShader {
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    let xmlSorgu = new XMLHttpRequest();
    xmlSorgu.open("GET", dosyaYolu, false);
    let ciziciKaynagi: string | null = null;

    try {
      xmlSorgu.send();
    } catch (err) {
      throw new Error("dosya yolundaki çizim kodu yuklenemedi: " + dosyaYolu);
    }
    ciziciKaynagi = xmlSorgu.responseText;
    if (ciziciKaynagi === null) {
      throw new Error("dosya yolundaki çizim kodu metin içermiyor: " +
                      dosyaYolu);
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
  ciziciAktif(renk: GLM.IArray, bpMat: GLM.IArray): void {
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    gl.useProgram(this.derlenenCizici);
    gl.enableVertexAttribArray(this.gCizerKordinatInfo.konum);
    // piksel rengi
    gl.uniform4fv(this.pikselRengiInfo.konum, glmdenListeAl(renk));
    // projeksiyon matrisi
    gl.uniformMatrix4fv(this.bakmaMatInfo.konum, false, glmdenListeAl(bpMat));
  }
  modelMatKoy(mat: GLM.IArray): void {
    var gl: WebGLRenderingContext = gMotor.AnaMotor.mGL;
    gl.uniformMatrix4fv(this.modelMatInfo.konum, false, glmdenListeAl(mat));
  }
}
