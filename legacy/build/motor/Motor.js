"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motor = void 0;
var Motor = (function () {
    function Motor() {
        this._anaMotor = null;
        this._vertexBuffer = null;
        this._oyunDongusu = null;
    }
    Object.defineProperty(Motor.prototype, "AnaMotor", {
        get: function () {
            if (this._anaMotor == null) {
                throw new Error("motor null");
            }
            return this._anaMotor;
        },
        set: function (amotor) { this._anaMotor = amotor; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Motor.prototype, "VertexBuffer", {
        get: function () {
            if (this._vertexBuffer == null) {
                throw new Error("vertex buffer null");
            }
            return this._vertexBuffer;
        },
        set: function (s) { this._vertexBuffer = s; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Motor.prototype, "OyunDongusu", {
        get: function () {
            if (this._oyunDongusu == null) {
                throw new Error("Oyun dongusu null");
            }
            return this._oyunDongusu;
        },
        set: function (s) { this._oyunDongusu = s; },
        enumerable: false,
        configurable: true
    });
    return Motor;
}());
exports.Motor = Motor;
//# sourceMappingURL=Motor.js.map