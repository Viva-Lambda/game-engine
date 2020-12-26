"use strict";
var gMotor = gMotor || {};

var FPS = 60; // saniyede kaç kare
var MPF = 1000 / FPS; // bir kare kaç milisaniye.

var oncekiSure;
var gecikenSure;
var suankiSure;
var gecenSure;

var donguCalisiyorMu = false;

var donguOyun = null;

var _donguBaslat = function() {
    //
    oncekiSure = Date.now();
    gecikenSure = 0.0;
    donguCalisiyorMu = true;
    requestAnimationFrame(function() {
        _donguCalistir.call(donguOyun)
    });
};

var _donguCalistir = function() {
    if (donguCalisiyorMu) {
        // eger dongu çalisiyor ise
        requestAnimationFrame(function() {
            _donguCalistir.call(donguOyun);
        });

        suankiSure = Date.now();
        gecenSure = suankiSure - oncekiSure;
        oncekiSure = suankiSure;
        gecikenSure += gecenSure;

        while ((gecikenSure >= MPF) && donguCalisiyorMu) {
            gMotor.Girdi.guncelle();
            this.guncelle();
            gecikenSure -= MPF;
        }
        this.ciz();
    }
};
var baslat = function(oyun) {
    donguOyun = oyun;
    // kare sifirla
    gMotor.KaynakPlani.yuklemeBittiSinyaliKoy(
        function() {
            donguOyun._baslat();
            _donguBaslat();
        }
    );
};
gMotor.OyunDongusu = (function() {
    var genel = {
        baslat: baslat
    };
    return genel;
}());
