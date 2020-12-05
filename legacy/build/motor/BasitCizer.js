"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasitCizer = void 0;
var MotorNesne_js_1 = require("./MotorNesne.js");
var yardimcilar_js_1 = require("../motor/yardimcilar.js");
var BasitCizer = (function () {
    function BasitCizer(noktaCiziciId, renklendiriciId) {
        this._derlenenCizici = null;
        var gl = MotorNesne_js_1.gMotor.AnaMotor.mGL;
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
        var kordinatAdi = "kareKoordinati";
        var gCizerKordinatKonumu = gl.getAttribLocation(this.derlenenCizici, kordinatAdi);
        if (gCizerKordinatKonumu === null) {
            throw new Error("ilgili kordinat adi: " + kordinatAdi + " bulunamadi");
        }
        this.gCizerKordinatInfo = yardimcilar_js_1.attribInfoYap(kordinatAdi, gCizerKordinatKonumu, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, MotorNesne_js_1.gMotor.VertexBuffer.glVertexRefAl());
        gl.vertexAttribPointer(this.gCizerKordinatInfo.konum, this.gCizerKordinatInfo.boyut, this.gCizerKordinatInfo.tip, this.gCizerKordinatInfo.normalizeMi, this.gCizerKordinatInfo.adim, this.gCizerKordinatInfo.uzaklik);
        var pikselAdi = "uPikselRengi";
        var pixKonumu = gl.getUniformLocation(this.derlenenCizici, pikselAdi);
        if (pixKonumu === null) {
            throw new Error("Piksel konumu bulunamadi");
        }
        this.pikselRengiInfo = yardimcilar_js_1.uniformInfoYap(pikselAdi, pixKonumu);
        var modelAdi = "uModelDonustur";
        var matKonumu = gl.getUniformLocation(this.derlenenCizici, modelAdi);
        if (matKonumu === null) {
            throw new Error("Model matrisi konumu bulunamadi");
        }
        this.modelMatInfo = yardimcilar_js_1.uniformInfoYap(modelAdi, matKonumu);
        var bakmaMatAdi = "uBakmaProj";
        matKonumu = gl.getUniformLocation(this.derlenenCizici, bakmaMatAdi);
        if (matKonumu === null) {
            throw new Error("Bakma matrisi konumu bulunamadi");
        }
        this.bakmaMatInfo = yardimcilar_js_1.uniformInfoYap(bakmaMatAdi, matKonumu);
    }
    Object.defineProperty(BasitCizer.prototype, "derlenenCizici", {
        get: function () {
            if (this._derlenenCizici === null) {
                throw new Error("derlenen cizici/shader null");
            }
            return this._derlenenCizici;
        },
        set: function (s) { this._derlenenCizici = s; },
        enumerable: false,
        configurable: true
    });
    BasitCizer.prototype.ciziciYukleDerle = function (dosyaYolu, ciziciTipi) {
        var gl = MotorNesne_js_1.gMotor.AnaMotor.mGL;
        var xmlSorgu = new XMLHttpRequest();
        xmlSorgu.open("GET", dosyaYolu, false);
        var ciziciKaynagi = null;
        try {
            xmlSorgu.send();
        }
        catch (err) {
            throw new Error("dosya yolundaki çizim kodu yuklenemedi: " + dosyaYolu);
        }
        ciziciKaynagi = xmlSorgu.responseText;
        if (ciziciKaynagi === null) {
            throw new Error("dosya yolundaki çizim kodu metin içermiyor: " +
                dosyaYolu);
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
    };
    BasitCizer.prototype.ciziciAktif = function (renk, bpMat) {
        var gl = MotorNesne_js_1.gMotor.AnaMotor.mGL;
        gl.useProgram(this.derlenenCizici);
        gl.enableVertexAttribArray(this.gCizerKordinatInfo.konum);
        gl.uniform4fv(this.pikselRengiInfo.konum, renk);
        gl.uniformMatrix4fv(this.bakmaMatInfo.konum, false, bpMat);
    };
    BasitCizer.prototype.modelMatKoy = function (mat) {
        var gl = MotorNesne_js_1.gMotor.AnaMotor.mGL;
        gl.uniformMatrix4fv(this.modelMatInfo.konum, false, mat);
    };
    return BasitCizer;
}());
exports.BasitCizer = BasitCizer;
//# sourceMappingURL=BasitCizer.js.map