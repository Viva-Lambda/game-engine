"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vecUyari = exports.esitDegilHatasi = exports.esitHatasi = exports.boyutKontrol = exports.boyutUyarisi = void 0;
function boyutUyarisi(boyut1, boyut2, boyutTuru) {
    var info = "Verili " + boyutTuru + " boyutlari ortusmuyor: ";
    info += "boyut1: " + boyut1;
    info += " boyut2: " + boyut2;
    return info;
}
exports.boyutUyarisi = boyutUyarisi;
function boyutKontrol(verilenBoyut, verilenTur, istenenBuyuk, istenenKucuk) {
    var bytstr = verilenBoyut.toString();
    var istnbstr = istenenBuyuk.toString();
    var istnkstr = istenenKucuk.toString();
    var msj = "Verilen " + verilenTur + ": " + bytstr + " " + istnbstr +
        " den buyuk " + istnkstr + " den kucuk olmali";
    return msj;
}
exports.boyutKontrol = boyutKontrol;
function esitHatasi(b1, b2, msg) {
    if (b1 === b2) {
        throw new Error(msg + " birbirine esit olamaz");
    }
}
exports.esitHatasi = esitHatasi;
function esitDegilHatasi(b1, b2, msg) {
    if (b1 !== b2) {
        throw new Error(msg + " birbirine esit olmalı");
    }
}
exports.esitDegilHatasi = esitDegilHatasi;
function vecUyari(boyut1, boyut2, msg) {
    if (boyut1 !== boyut2) {
        var info = boyutUyarisi(boyut1, boyut2, msg);
        throw new Error(info);
    }
}
exports.vecUyari = vecUyari;
//# sourceMappingURL=Hatalar.js.map