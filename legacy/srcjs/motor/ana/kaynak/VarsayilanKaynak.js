// varsayilan oyun baslarken yuklenilecek kaynaklari yazalim
"use strict";
var gMotor = gMotor || {};


var basitCizimVs = "srcjs/glsl/basitvs.vert";
var basitCizimFs = "srcjs/glsl/degisikrenk.frag";

var tekRenkCizer = null;

var _tekrenkCizerAl = function() {
    return tekRenkCizer;
}

var _cizerYarat = function(sinyal) {
    tekRenkCizer = new BasitCizer(basitCizimVs, basitCizimFs);
    sinyal();
}
var _baslat = function(sinyal) {
    gMotor.MetinYukleyici.metniYukle(basitCizimVs,
        gMotor.MetinYukleyici.MetinTipi.TXT);
    gMotor.MetinYukleyici.metniYukle(basitCizimFs,
        gMotor.MetinYukleyici.MetinTipi.TXT);

    gMotor.KaynakPlani.yuklemeBittiSinyaliKoy(
        function() {
            _cizerYarat(sinyal);
        }
    );
}
gMotor.VarsayilanKaynaklar = (function() {
    var metotlar = {
        baslat: _baslat,
        tekRenkCizerAl: _tekrenkCizerAl
    };
    return metotlar;
}());
