"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donusturme = void 0;
var gl_matrix_1 = require("gl-matrix");
var yardimcilar_1 = require("../motor/yardimcilar");
var Donusturme = (function () {
    function Donusturme() {
        this.konum = gl_matrix_1.vec4.fromValues(0, 0, 0, 0);
        this.boyut = gl_matrix_1.vec4.fromValues(1, 1, 1, 1);
        this.radyan = 0.0;
    }
    Donusturme.prototype.konumKoy = function (x, y) { this.konum = gl_matrix_1.vec4.fromValues(x, y, 0, 0); };
    Donusturme.prototype.konumAl = function () { return this.konum; };
    Donusturme.prototype.konumXAl = function () { return this.konum[0]; };
    Donusturme.prototype.konumYAl = function () { return this.konum[1]; };
    Donusturme.prototype.konumZAl = function () { return this.konum[2]; };
    Donusturme.prototype.konumXKoy = function (x) { this.konum[0] = x; };
    Donusturme.prototype.konumYKoy = function (y) { this.konum[1] = y; };
    Donusturme.prototype.konumZKoy = function (z) { this.konum[2] = z; };
    Donusturme.prototype.konumXArti = function (x) { this.konum[0] += x; };
    Donusturme.prototype.konumYArti = function (x) { this.konum[1] += x; };
    Donusturme.prototype.konumZArti = function (x) { this.konum[2] += x; };
    Donusturme.prototype.boyutAl = function () { return this.boyut; };
    Donusturme.prototype.boyutKoy = function (x, y) { this.boyut = gl_matrix_1.vec4.fromValues(x, y, 1, 1); };
    Donusturme.prototype.boyutXAl = function () { return this.boyut[0]; };
    Donusturme.prototype.boyutYAl = function () { return this.boyut[1]; };
    Donusturme.prototype.boyutZAl = function () { return this.boyut[2]; };
    Donusturme.prototype.boyutXKoy = function (x) { this.boyut[0] = x; };
    Donusturme.prototype.boyutYKoy = function (y) { this.boyut[1] = y; };
    Donusturme.prototype.boyutZKoy = function (z) { this.boyut[2] = z; };
    Donusturme.prototype.boyutXArti = function (x) { this.boyut[0] += x; };
    Donusturme.prototype.boyutYArti = function (x) { this.boyut[1] += x; };
    Donusturme.prototype.boyutZArti = function (x) { this.boyut[2] += x; };
    Donusturme.prototype.boyutArti = function (x) {
        this.boyutXArti(x);
        this.boyutYArti(x);
    };
    Donusturme.prototype.radyanKoy = function (x) {
        this.radyan = x;
        while (this.radyan > 2 * Math.PI) {
            this.radyan -= (2 * Math.PI);
        }
        while (this.radyan < -2 * Math.PI) {
            this.radyan += (2 * Math.PI);
        }
    };
    Donusturme.prototype.dereceKoy = function (x) { this.radyan = yardimcilar_1.derece2Radyan(x); };
    Donusturme.prototype.dereceAl = function () { return this.radyan * 180.0 / Math.PI; };
    Donusturme.prototype.dereceArti = function (d) { this.radyan += yardimcilar_1.derece2Radyan(d); };
    Donusturme.prototype.modelMatAl = function () {
        var modelMat = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.translate(modelMat, modelMat, gl_matrix_1.vec3.fromValues(this.konumXAl(), this.konumYAl(), this.konumZAl()));
        gl_matrix_1.mat4.rotateZ(modelMat, modelMat, this.radyan);
        gl_matrix_1.mat4.scale(modelMat, modelMat, gl_matrix_1.vec3.fromValues(this.konumXAl(), this.boyutYAl(), this.boyutZAl()));
        return modelMat;
    };
    return Donusturme;
}());
exports.Donusturme = Donusturme;
//# sourceMappingURL=Donusturucu.js.map