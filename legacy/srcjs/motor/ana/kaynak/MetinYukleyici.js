// metin dosyalari (shader, sahne tasviri vs) yukleyici
"use strict";
var gMotor = gMotor || {};



gMotor.MetinYukleyici = (function() {

    var MetinTipi = Object.freeze({
        XML: 0,
        TXT: 1
    });

    var metniYukle = function(metinAdi, metinTipi, sinyal) {
        //
        if (!(gMotor.KaynakYoneticisi.kaynakYuklendiMi(metinAdi))) {
            //
            gMotor.KaynakYoneticisi.asyncYuklemeTalebi(metinAdi);

            // xhttp req
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                //
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(metinAdi + " yuklenemedi");
                }
            };
            req.open("GET", metinAdi, true);
            req.setRequestHeader("Content-Type", "text/xml");

            req.onload = function() {
                var dosyaIci = null;
                if (metinTipi === MetinTipi.XML) {
                    var dom_analiz = new DOMParser();
                    dosyaIci = dom_analiz.parseFromString(req.responseText,
                        "text/xml");
                } else {
                    dosyaIci = req.responseText;
                }
                gMotor.KaynakYoneticisi.asyncYuklemeTamamlandi(metinAdi,
                    dosyaIci);
                if ((sinyal !== null) && (sinyal !== undefined)) {
                    sinyal(metinAdi);
                }
            };
            req.send();
        } else {
            if ((sinyal !== null) && (sinyal !== undefined)) {
                sinyal(metinAdi);
            }

        }
    };
    var metinKaldir = function(metinAdi) {
        gMotor.KaynakYoneticisi.kaynakCikart(metinAdi);
    };
    var metotlar = {
        metniYukle: metniYukle,
        metniKaldir: metinKaldir,
        MetinTipi: MetinTipi
    };
    return metotlar;
}());
