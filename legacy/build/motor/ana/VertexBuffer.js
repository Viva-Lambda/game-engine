"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexBuffer = void 0;
var MotorNesne_js_1 = require("../MotorNesne.js");
var VertexBuffer = (function () {
    function VertexBuffer() {
        this._gKareNoktaBuffer = null;
        this.kareKordinatlari = [
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5, -0.5, 0.0
        ];
    }
    Object.defineProperty(VertexBuffer.prototype, "gKareNoktaBuffer", {
        get: function () {
            if (this._gKareNoktaBuffer == null) {
                throw new Error("WebGL buffer olusturulmamis");
            }
            return this._gKareNoktaBuffer;
        },
        set: function (gb) { this._gKareNoktaBuffer = gb; },
        enumerable: false,
        configurable: true
    });
    VertexBuffer.prototype.glVertexRefAl = function () { return this.gKareNoktaBuffer; };
    VertexBuffer.prototype.baslat = function () {
        var gl = MotorNesne_js_1.gMotor.AnaMotor.mGL;
        var gKareNoktaBuffer_ = gl.createBuffer();
        if (gKareNoktaBuffer_ == null) {
            throw new Error("Buffer olusturulamadi");
        }
        this.gKareNoktaBuffer = gKareNoktaBuffer_;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gKareNoktaBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.kareKordinatlari), gl.STATIC_DRAW);
    };
    return VertexBuffer;
}());
exports.VertexBuffer = VertexBuffer;
//# sourceMappingURL=VertexBuffer.js.map