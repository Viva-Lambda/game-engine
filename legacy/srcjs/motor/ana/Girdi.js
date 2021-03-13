// motor girdi bolumu: Klavye, joystick vs vs
"use strict";
var gMotor = gMotor || {};

gMotor.Girdi = (function() {

    var KlavyeTuslari = {
        // oklar
        Sol: "ArrowLeft",
        Sag: "ArrowRight",
        Yukari: "ArrowUp",
        Asagi: "ArrowDown",
        // alfabe
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
        // sayilar
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
        // son tus
        Escape: "Escape"
    };

    //
    var _oncekiBasiliDurum = [];

    var _tusBasiliMi = [];

    var _tusTiklandiMi = [];

    var _tusBasilir = function(olay) {
        _tusBasiliMi[olay.key] = true;
    };
    var _tusKalkar = function(olay) {
        _tusBasiliMi[olay.key] = false;
    };

    var baslat = function() {
        for (var tus in KlavyeTuslari) {
            _tusBasiliMi[KlavyeTuslari[tus]] = false;
            _tusTiklandiMi[KlavyeTuslari[tus]] = false;
            _oncekiBasiliDurum[KlavyeTuslari[tus]] = false;
        }
        window.addEventListener("keyup", _tusKalkar, false);
        window.addEventListener("keydown", _tusBasilir, false);
    };
    var guncelle = function() {
        for (var tus in KlavyeTuslari) {
            let ktusu = KlavyeTuslari[tus]; // Arrow Right
            _tusTiklandiMi[ktusu] =
                (!_oncekiBasiliDurum[ktusu]) && _tusBasiliMi[ktusu];
            _oncekiBasiliDurum[ktusu] = _tusBasiliMi[ktusu];
        }

    };
    var tusBasiliMi = function(tusKodu) {
        return _tusBasiliMi[tusKodu];
    };
    var tusTiklandiMi = function(tusKodu) {
        return _tusTiklandiMi[tusKodu];
    };
    var metotlar = {
        baslat: baslat,
        guncelle: guncelle,
        tusBasiliMi: tusBasiliMi,
        tusTiklandiMi: tusTiklandiMi,
        tuslar: KlavyeTuslari
    };
    return metotlar;
}());
