export class Motor {
    constructor() {
        this._anaMotor = null;
        this._vertexBuffer = null;
    }
    set AnaMotor(amotor) { this._anaMotor = amotor; }
    get AnaMotor() {
        if (this._anaMotor == null) {
            throw new Error("motor null");
        }
        return this._anaMotor;
    }
    set VertexBuffer(s) { this._vertexBuffer = s; }
    get VertexBuffer() {
        if (this._vertexBuffer == null) {
            throw new Error("vertex buffer null");
        }
        return this._vertexBuffer;
    }
}
export var gMotor = new Motor();
//# sourceMappingURL=Motor.js.map