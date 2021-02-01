// ses kliplerini yönetmek için obje
"use strict";

var gMotor = gMotor || {};

gMotor.SesKlipleri = (function() {
    var SesSinyali = null;
    var ArkaplanSesi = null;

    /** Ses ortamini baslat AudioContext ile konusmamizi saglar*/
    var SesOrtaminiBaslat = function() {
        //
        try {
            var SesOrtami = window.AudioContext || window.webkitAudioContext;
            SesSinyali = new SesOrtami();
        } catch (hata) {
            alert("Tarayici ses desteklemiyor");
        }
    };
    //
    var sesYukle = function(klipAdi) {
        if (SesSinyali === null) {
            SesOrtaminiBaslat();
        }
        if (!gMotor.KaynakPlani.kaynakYuklendiMi(klipAdi)) {
            //
            gMotor.KaynakPlani.asyncYuklemeTalebi(klipAdi);

            // async kaynak yukle
            var sorgu = new XMLHttpRequest();
            sorgu.onreadystatechange = function() {
                //
                if ((sorgu.readyState === 4) && (sorgu.status !== 200)) {
                    //
                    alert(klipAdi + " yuklenemedi");
                }
            };
            sorgu.open("GET", klipAdi, true);

            sorgu.responseType = "arraybuffer";

            // yukleme
            sorgu.onload = function() {
                //
                SesSinyali.decodeAudioData(sorgu.response,
                    function(b) {
                        gMotor.KaynakPlani.asyncYuklemeTamamlandiSinyali(klipAdi,
                            b);
                    }
                );
            };
            sorgu.send();
        } else {
            gMotor.KaynakPlani.kaynakRefArti(klipAdi);
        }
    };
    var sesKaldir = function(klipAdi) {
        gMotor.KaynakPlani.kaynakCikart(klipAdi);
    };

    var sesOynat = function(klipAdi) {
        //
        var klipBilgi = gMotor.KaynakPlani.kaynakAl(klipAdi);
        if (klipBilgi !== null) {
            var sesKaynagi = SesSinyali.createBufferSource();
            sesKaynagi.buffer = klipBilgi;
            sesKaynagi.connect(SesSinyali.destination);
            sesKaynagi.start(0);
        }
    };

    var arkaPlanSesiniDurdur = function() {
        //
        if (ArkaplanSesi !== null) {
            ArkaplanSesi.stop(0);
            ArkaplanSesi = null;
        }
    };

    var arkaPlanSesiCaliyorMu = function() {
        return (ArkaplanSesi !== null);
    }

    var arkaPlanSesiOynat = function(klipAdi) {
        //
        var klipBilgi = gMotor.KaynakPlani.kaynakAl(klipAdi);
        if (klipBilgi !== null) {
            // caliyorsa durdur
            arkaPlanSesiniDurdur();
            ArkaplanSesi = SesSinyali.createBufferSource();
            ArkaplanSesi.buffer = klipBilgi;
            ArkaplanSesi.connect(SesSinyali.destination);
            ArkaplanSesi.loop = true;
            ArkaplanSesi.start(0);

        }
    };
    var metotlar = {
        SesOrtaminiBaslat: SesOrtaminiBaslat,
        sesYukle: sesYukle,
        sesKaldir: sesKaldir,
        sesOynat: sesOynat,
        arkaPlanSesiOynat: arkaPlanSesiOynat,
        arkaPlanSesiniDurdur: arkaPlanSesiniDurdur,
        arkaPlanSesiCaliyorMu: arkaPlanSesiCaliyorMu,
    };
    return metotlar;
}());
