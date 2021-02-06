// varsayilan oyun baslarken yuklenilecek kaynaklari yazalim
"use strict";
var gMotor = gMotor || {};


gMotor.VarsayilanKaynaklar = (function() {

    // basit çizer için gerekenler
    var basitCizimVs = "srcjs/glsl/basitvs.vert";
    var basitCizimFs = "srcjs/glsl/degisikrenk.frag";
    var tekRenkCizer = null;

    // doku çizer için gerekenler
    var dokuCizimVs = "srcjs/glsl/doku.vert";
    var dokuCizimFs = "srcjs/glsl/doku.frag";
    var dokuCizer = null;

    // hareketli grafik cizer için gerekenler
    var hareketliGrafikCizer = null;

    var _cizerYarat = function(sinyal) {
        tekRenkCizer = new BasitCizer(basitCizimVs, basitCizimFs);
        dokuCizer = new DokuCizer(dokuCizimVs, dokuCizimFs);
        hareketliGrafikCizer = new HareketliGrafikCizer(dokuCizimVs, dokuCizimFs);
        sinyal();
    };

    var tekRenkCizerAl = function() {
        return tekRenkCizer;
    };
    var dokuCizerAl = function() {
        return dokuCizer;
    };
    var hareketliGrafikCizerAl = function() {
        return hareketliGrafikCizer;
    }

    var baslat = function(sinyal) {

        // nokta cizer alimi
        gMotor.MetinYukleyici.metniYukle(basitCizimVs,
            gMotor.MetinYukleyici.MetinTipi.TXT);
        gMotor.MetinYukleyici.metniYukle(basitCizimFs,
            gMotor.MetinYukleyici.MetinTipi.TXT);

        // doku cizer alimi
        gMotor.MetinYukleyici.metniYukle(dokuCizimVs,
            gMotor.MetinYukleyici.MetinTipi.TXT);
        gMotor.MetinYukleyici.metniYukle(dokuCizimFs,
            gMotor.MetinYukleyici.MetinTipi.TXT);

        //
        gMotor.KaynakYoneticisi.yuklemeBittiSinyaliKoy(
            function() {
                _cizerYarat(sinyal);
            }
        );
    };
    var metotlar = {
        baslat: baslat,
        tekRenkCizerAl: tekRenkCizerAl,
        dokuCizerAl: dokuCizerAl,
        hareketliGrafikCizerAl: hareketliGrafikCizerAl
    };
    return metotlar;
}());
