"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnaMotor = void 0;
var MotorNesne_js_1 = require("../MotorNesne.js");
var AnaMotor = (function () {
    function AnaMotor() {
        this._mGL = null;
    }
    AnaMotor.prototype.glBaslat = function (kanvasId) {
        var kanvas = document.getElementById(kanvasId);
        if (kanvas == null) {
            throw new Error("Ilgili kanvas elemani bulunamadi: " + kanvasId);
        }
        var gl = kanvas.getContext("webgl");
        if (gl == null) {
            throw new Error("Ilgili baglam alinamadi ");
        }
        this.mGL = gl;
        MotorNesne_js_1.gMotor.VertexBuffer.baslat();
    };
    Object.defineProperty(AnaMotor.prototype, "mGL", {
        get: function () {
            if (this._mGL == null) {
                throw new Error("baglam degeri null");
            }
            return this._mGL;
        },
        set: function (gl) { this._mGL = gl; },
        enumerable: false,
        configurable: true
    });
    AnaMotor.prototype.kanvasTemizle = function (renk) {
        this.mGL.clearColor(renk[0], renk[1], renk[2], renk[3]);
        this.mGL.clear(this.mGL.COLOR_BUFFER_BIT);
    };
    return AnaMotor;
}());
exports.AnaMotor = AnaMotor;
//# sourceMappingURL=AnaMotor.js.map