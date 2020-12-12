"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnaMotor = void 0;
var MotorNesnesi_1 = require("../MotorNesnesi");
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
        if (MotorNesnesi_1.gMotor.VertexBuffer === null || MotorNesnesi_1.gMotor.VertexBuffer === undefined) {
            throw new Error("ana motor null cizer de");
        }
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
    AnaMotor.prototype.anaUnsurlariBaslat = function (kanvasId) {
        this.glBaslat(kanvasId);
        MotorNesnesi_1.gMotor.VertexBuffer.baslat();
        MotorNesnesi_1.gMotor.Girdi.baslat(kanvasId);
    };
    return AnaMotor;
}());
exports.AnaMotor = AnaMotor;
//# sourceMappingURL=AnaMotor.js.map