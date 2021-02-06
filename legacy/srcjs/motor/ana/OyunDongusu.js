"use strict";
var gMotor = gMotor || {};

gMotor.OyunDongusu = (function() {
    var FPS = 60; // saniyede kaç kare
    var MPF = 1000 / FPS; // bir kare kaç milisaniye.

    // oyun dongusu için zaman degiskenleri
    var oncekiSure = Date.now();
    var gecikenSure;
    var suankiSure;
    var gecenSure;

    var donguCalisiyorMu = false;

    var donguOyun = null;
    var _donguCalistir = function() {
        if (donguCalisiyorMu) {
            // 1. Dongu içerisindeysek tekrar tekrar
            // çagirarak oyunu guncelle.
            requestAnimationFrame(function() {
                _donguCalistir.call(donguOyun);
            });

            // 2. daha onceki guncellemeden bu yana ne kadar sure geçti
            // bunu hesapla
            suankiSure = Date.now();
            gecenSure = suankiSure - oncekiSure;
            oncekiSure = suankiSure;
            gecikenSure += gecenSure;

            // 3. oyunu gerektigi sure kadar guncelle
            // dogru aralikta, ve kullanicidan girdileri al
            while ((gecikenSure >= MPF) && donguCalisiyorMu) {
                gMotor.Girdi.guncelle();
                this.guncelle();
                gecikenSure -= MPF;
            }

            // isler goruldu cizildi
            this.ciz();
        } else {
            // oyun dongusu durdu sahne kalksin
            donguOyun.sahneKaldir();
        }
    };

    //
    var _donguBaslat = function() {
        // 1. zaman degiskenlerini sifirla
        oncekiSure = Date.now();
        gecikenSure = 0.0;

        // 2. artik dongu calismaya basliyor
        donguCalisiyorMu = true;

        // 3. dongu calistir yani oyunu guncelle
        // ve kullanicidan girdi al vs.
        requestAnimationFrame(function() {
            _donguCalistir.call(donguOyun)
        });
    };


    var baslat = function(oyun) {
        donguOyun = oyun;
        // debugger;
        // kare sifirla
        gMotor.KaynakYoneticisi.yuklemeBittiSinyaliKoy(
            function() {
                donguOyun.baslat();
                _donguBaslat();
            }
        );
    };
    var dur = function() {
        donguCalisiyorMu = false;
    };

    var genel = {
        baslat: baslat,
        dur: dur
    };
    return genel;
}());
