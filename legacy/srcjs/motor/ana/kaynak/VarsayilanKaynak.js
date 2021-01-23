// varsayilan oyun baslarken yuklenilecek kaynaklari yazalim
"use strict";
var gMotor = gMotor || {};


var basitCizimVs = "srcjs/glsl/basitvs.vert";
var basitCizimFs = "srcjs/glsl/degisikrenk.frag";

var dokuCizimVs = "srcjs/glsl/doku.vert";
var dokuCizimFs = "srcjs/glsl/doku.frag";



var tekRenkCizer = null;
var dokuCizer = null;

var _tekrenkCizerAl = function() {
    return tekRenkCizer;
}
var _dokuCizerAl = function() {
    return dokuCizer;
}


var _cizerYarat = function(sinyal) {
    tekRenkCizer = new BasitCizer(basitCizimVs, basitCizimFs);
    dokuCizer = new DokuCizer(dokuCizimVs, dokuCizimFs);
    sinyal();
}
var _baslat = function(sinyal) {

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

    gMotor.KaynakPlani.yuklemeBittiSinyaliKoy(
        function() {
            _cizerYarat(sinyal);
        }
    );
}
gMotor.VarsayilanKaynaklar = (function() {
    var metotlar = {
        baslat: _baslat,
        tekRenkCizerAl: _tekrenkCizerAl,
        dokuCizerAl: _tekrenkCizerAl,
    };
    return metotlar;
}());
