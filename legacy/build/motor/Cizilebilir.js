"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cizilebilir = void 0;
var gl_matrix_1 = require("gl-matrix");
var Donusturucu_js_1 = require("./Donusturucu.js");
var MotorNesne_js_1 = require("../motor/MotorNesne.js");
var Cizilebilir = (function () {
    function Cizilebilir(_cizici) {
        this.renk = gl_matrix_1.vec4.fromValues(1, 1, 1, 1);
        this.donustur = new Donusturucu_js_1.Donusturme();
        this.cizici = _cizici;
    }
    Cizilebilir.prototype.ciz = function (bpMat) {
        var gl = MotorNesne_js_1.gMotor.AnaMotor.mGL;
        this.cizici.ciziciAktif(this.renk, bpMat);
        this.cizici.modelMatKoy(this.donustur.modelMatAl());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    Cizilebilir.prototype.renkKoy = function (renk) { this.renk = renk; };
    Cizilebilir.prototype.renkAl = function () { return this.renk; };
    return Cizilebilir;
}());
exports.Cizilebilir = Cizilebilir;
//# sourceMappingURL=Cizilebilir.js.map