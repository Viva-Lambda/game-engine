"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gMotor = void 0;
var AnaMotor_1 = require("./ana/AnaMotor");
var OyunDongusu_1 = require("./ana/OyunDongusu");
var VertexBuffer_1 = require("./ana/VertexBuffer");
var Girdi_1 = require("./ana/Girdi");
var MotorObje = (function () {
    function MotorObje() {
        this.AnaMotor = new AnaMotor_1.AnaMotor();
        this.VertexBuffer = new VertexBuffer_1.VertexBuffer();
        this.OyunDongusu = new OyunDongusu_1.OyunDongusu();
        this.Girdi = new Girdi_1.KlavyeGirdi();
    }
    return MotorObje;
}());
exports.gMotor = new MotorObje();
//# sourceMappingURL=MotorNesnesi.js.map