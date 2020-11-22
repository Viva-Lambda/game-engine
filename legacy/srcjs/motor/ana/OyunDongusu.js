"use strict";
var gMotor = gMotor || {};




var FPS = 60; // saniyede kaç kare
var MPF = 1000 / FPS; // bir kare kaç milisaniye.

var oncekiSure;
var gecikenSure;
var suankiSure;
var gecenSure;

var donguCalisiyorMu = false;

var oyunum = null;

var _donguCalistir = function() {
    if (donguCalisiyorMu) {
        // eger dongu çalisiyor ise
        requestAnimationFrame(function() {
            _donguCalistir.call(oyunum);
        });

        suankiSure = Date.now();
        gecenSure = suankiSure - oncekiSure;
        oncekiSure = suankiSure;
        gecikenSure += gecenSure;

        while ((gecikenSure >= MPF) && donguCalisiyorMu) {
            this.guncelle();
            gecikenSure -= MPF;
        }
        this.ciz();

    }
}
var baslat = function(oyun) {
    oyunum = oyun;

    // kare sifirla
    oncekiSure = Date.now();
    gecikenSure = 0.0;
    donguCalisiyorMu = true;
    requestAnimationFrame(function() {
        _donguCalistir.call(oyunum);
    });
}
gMotor.OyunDongusu = (function() {
    var genel = {
        baslat: baslat
    };
    return genel;
}());
