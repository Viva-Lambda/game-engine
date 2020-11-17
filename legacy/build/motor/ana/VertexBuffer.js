import { gMotor } from "../Motor.js";
export class VertexBuffer {
    constructor() {
        this._gKareNoktaBuffer = null;
        this.kareKordinatlari = [
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0,
            0.5, -0.5, 0.0,
            -0.5, -0.5, 0.0
        ];
    }
    get gKareNoktaBuffer() {
        if (this._gKareNoktaBuffer == null) {
            throw new Error("WebGL buffer olusturulmamis");
        }
        return this._gKareNoktaBuffer;
    }
    set gKareNoktaBuffer(gb) { this._gKareNoktaBuffer = gb; }
    glVertexRefAl() { return this.gKareNoktaBuffer; }
    baslat() {
        var gl = gMotor.AnaMotor.mGL;
        var gKareNoktaBuffer_ = gl.createBuffer();
        if (gKareNoktaBuffer_ == null) {
            throw new Error("Buffer olusturulamadi");
        }
        this.gKareNoktaBuffer = gKareNoktaBuffer_;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gKareNoktaBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.kareKordinatlari), gl.STATIC_DRAW);
    }
}
gMotor.VertexBuffer = new VertexBuffer();
//# sourceMappingURL=VertexBuffer.js.map