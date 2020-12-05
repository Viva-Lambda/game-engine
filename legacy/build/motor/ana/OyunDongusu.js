"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OyunDongusu = void 0;
var FPS = 60;
var MPF = 1000 / FPS;
var oncekiSure = null;
var gecikenSure = null;
var suankiSure = null;
var gecenSure = null;
var donguCalisiyorMu = false;
var oyunum = null;
var _donguCalistir = function () {
    if (donguCalisiyorMu) {
        requestAnimationFrame(function () { _donguCalistir.call(oyunum); });
        if (this === null) {
            throw new Error("Dongunun this'i oyunum degil");
        }
        suankiSure = Date.now();
        if (suankiSure === null || oncekiSure === null || gecikenSure === null) {
            throw new Error("suanki sure veya onceki sure null degerinde");
        }
        gecenSure = suankiSure - oncekiSure;
        oncekiSure = suankiSure;
        gecikenSure += gecenSure;
        while ((gecikenSure >= MPF) && donguCalisiyorMu) {
            this.guncelle();
            gecikenSure -= MPF;
        }
        this.ciz();
    }
};
var baslat = function (oyun) {
    oyunum = oyun;
    oncekiSure = Date.now();
    gecikenSure = 0.0;
    donguCalisiyorMu = true;
    requestAnimationFrame(function () { _donguCalistir.call(oyunum); });
};
var OyunDongusu = (function () {
    function OyunDongusu() {
        this.baslat = baslat;
    }
    return OyunDongusu;
}());
exports.OyunDongusu = OyunDongusu;
//# sourceMappingURL=OyunDongusu.js.map