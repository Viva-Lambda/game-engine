"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.derece2Radyan = exports.attribInfoYap = exports.uniformInfoYap = void 0;
function uniformInfoYap(ad, k) {
    return { isim: ad, konum: k };
}
exports.uniformInfoYap = uniformInfoYap;
function attribInfoYap(ad, knm, byt, tip, nmi, adm, uzk) {
    return {
        isim: ad,
        konum: knm,
        boyut: byt,
        tip: tip,
        normalizeMi: nmi,
        adim: adm,
        uzaklik: uzk
    };
}
exports.attribInfoYap = attribInfoYap;
function derece2Radyan(aciDerece) {
    var pi = Math.PI;
    return aciDerece * pi / 180;
}
exports.derece2Radyan = derece2Radyan;
//# sourceMappingURL=yardimcilar.js.map