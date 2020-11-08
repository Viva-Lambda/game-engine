import { gMotor } from "./Motor.js";
export class BasitCizer {
    constructor(noktaCiziciId, renklendiriciId) {
        this._derlenenCizici = null;
        this._gCizerKordinatKonumu = null;
        var gl = gMotor.AnaMotor.mGL;
        var noktaCizici = this.ciziciYukleDerle(noktaCiziciId, gl.VERTEX_SHADER);
        var renklendirici = this.ciziciYukleDerle(renklendiriciId, gl.FRAGMENT_SHADER);
        var cizciProgram = gl.createProgram();
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
    get gCizerKordinatKonumu() {
        if (this._gCizerKordinatKonumu === null) {
            throw new Error("Nokta nitelik konumu null degerinde");
        }
        return this._gCizerKordinatKonumu;
    }
    set gCizerKordinatKonumu(g) { this._gCizerKordinatKonumu = g; }
    get derlenenCizici() {
        if (this._derlenenCizici === null) {
            throw new Error("derlenen cizici/shader null");
        }
        return this._derlenenCizici;
    }
    set derlenenCizici(s) { this._derlenenCizici = s; }
    ciziciYukleDerle(elId, ciziciTipi) {
        var gl = gMotor.AnaMotor.mGL;
        let ciziciMetniEl = document.getElementById(elId);
        if (ciziciMetniEl === null) {
            throw new Error("cizici/shader metni bulunamadi: " + elId);
        }
        let ciziciMetniNode = ciziciMetniEl.firstChild;
        if (ciziciMetniNode === null) {
            throw new Error("cizici/shader elemaninin altinda bir sey yok: " + elId);
        }
        let ciziciKaynagi = ciziciMetniNode.textContent;
        if (ciziciKaynagi == null) {
            throw new Error("Cizici kaynagi bos metin: " + ciziciKaynagi);
        }
        var cizici = gl.createShader(ciziciTipi);
        if (cizici === null) {
            throw new Error("cizici/shader olusturulamadi");
        }
        gl.shaderSource(cizici, ciziciKaynagi);
        gl.compileShader(cizici);
        if (!gl.getShaderParameter(cizici, gl.COMPILE_STATUS)) {
            throw new Error("Cizici derlenemedi: " + gl.getShaderInfoLog(cizici));
        }
        return cizici;
    }
    ciziciAktif() {
        var gl = gMotor.AnaMotor.mGL;
        gl.useProgram(this.derlenenCizici);
        gl.enableVertexAttribArray(this.gCizerKordinatKonumu);
    }
}
//# sourceMappingURL=BasitCizer.js.map