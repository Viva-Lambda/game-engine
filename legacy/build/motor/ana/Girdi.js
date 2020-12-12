"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KlavyeGirdi = exports.KlavyeTuslari = void 0;
exports.KlavyeTuslari = {
    Sol: "ArrowLeft",
    Sag: "ArrowRight",
    Yukari: "ArrowUp",
    Asagi: "ArrowDown",
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
    H: "H",
    I: "I",
    J: "J",
    K: "K",
    L: "L",
    M: "M",
    N: "N",
    O: "O",
    P: "P",
    Q: "Q",
    R: "R",
    S: "S",
    T: "T",
    U: "U",
    V: "V",
    W: "W",
    Y: "Y",
    Z: "Z",
    a: "a",
    b: "b",
    c: "c",
    d: "d",
    e: "e",
    f: "f",
    g: "g",
    h: "h",
    i: "i",
    j: "j",
    k: "k",
    l: "l",
    m: "m",
    n: "n",
    o: "o",
    p: "p",
    q: "q",
    r: "r",
    s: "s",
    t: "t",
    u: "u",
    v: "v",
    w: "w",
    y: "y",
    z: "z",
    Sifir: "Digit0",
    Bir: "Digit1",
    Iki: "Digit2",
    Uc: "Digit3",
    Dort: "Digit4",
    Bes: "Digit5",
    Alti: "Digit6",
    Yedi: "Digit7",
    Sekiz: "Digit8",
    Dokuz: "Digit9",
    Escape: "Escape"
};
var TusDurumlari = {
    "ArrowLeft": false,
    "ArrowRight": false,
    "ArrowUp": false,
    "ArrowDown": false,
    "A": false,
    "B": false,
    "C": false,
    "D": false,
    "E": false,
    "F": false,
    "G": false,
    "H": false,
    "I": false,
    "J": false,
    "K": false,
    "L": false,
    "M": false,
    "N": false,
    "O": false,
    "P": false,
    "Q": false,
    "R": false,
    "S": false,
    "T": false,
    "U": false,
    "V": false,
    "W": false,
    "Y": false,
    "Z": false,
    "a": false,
    "b": false,
    "c": false,
    "d": false,
    "e": false,
    "f": false,
    "g": false,
    "h": false,
    "i": false,
    "j": false,
    "k": false,
    "l": false,
    "m": false,
    "n": false,
    "o": false,
    "p": false,
    "q": false,
    "r": false,
    "s": false,
    "t": false,
    "u": false,
    "v": false,
    "w": false,
    "y": false,
    "z": false,
    "Digit0": false,
    "Digit1": false,
    "Digit2": false,
    "Digit3": false,
    "Digit4": false,
    "Digit5": false,
    "Digit6": false,
    "Digit7": false,
    "Digit8": false,
    "Digit9": false,
    "Escape": false
};
var _tuslarBasiliMi = TusDurumlari;
var _oncekiBasiliDurum = {};
var _tuslarTiklandiMi = {};
var KlavyeGirdi = (function () {
    function KlavyeGirdi() {
        this.tuslar = exports.KlavyeTuslari;
    }
    KlavyeGirdi.prototype._tusBasilir = function (olay) {
        var tdurumu = _tuslarBasiliMi;
        tdurumu[olay.key] = true;
        _tuslarBasiliMi = tdurumu;
    };
    KlavyeGirdi.prototype._tusKalkar = function (olay) { _tuslarBasiliMi[olay.key] = false; };
    KlavyeGirdi.prototype.tusBasiliMi = function (tusKodu) { return _tuslarBasiliMi[tusKodu]; };
    KlavyeGirdi.prototype.tusTiklandiMi = function (tusKodu) { return _tuslarTiklandiMi[tusKodu]; };
    KlavyeGirdi.prototype.guncelle = function () {
        for (var tus in this.tuslar) {
            var ktusu = this.tuslar[tus];
            _tuslarTiklandiMi[ktusu] =
                (!_oncekiBasiliDurum[ktusu]) && _tuslarBasiliMi[ktusu];
            _oncekiBasiliDurum[ktusu] = _tuslarBasiliMi[ktusu];
        }
    };
    KlavyeGirdi.prototype.baslat = function (kanvasId) {
        var kanvas = document.getElementById(kanvasId);
        if (kanvas == null) {
            throw new Error("Ilgili kanvas elemani bulunamadi: " + kanvasId);
        }
        var oyunBody = document.getElementById("oyun-body");
        if (oyunBody === null) {
            throw new Error("Ilgili oyun body elemani bulunamadi: ");
        }
        window.addEventListener("keyup", this._tusKalkar);
        window.addEventListener("keydown", this._tusBasilir);
    };
    return KlavyeGirdi;
}());
exports.KlavyeGirdi = KlavyeGirdi;
//# sourceMappingURL=Girdi.js.map