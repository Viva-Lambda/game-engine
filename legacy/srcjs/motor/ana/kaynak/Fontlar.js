// fontlari yukle
"use strict";

function KarakterBilgisi() {
    this.mDokuKoordSol = 0;
    this.mDokuKoordSag = 1;
    this.mDokuKoordAlt = 0;
    this.mDokuKoordUst = 1;

    // karakter
    this.mKarakterEn = 1;
    this.mKarakterBoy = 1;
    this.mKarakterEnBosluk = 0;
    this.mKarakterBoyBosluk = 0;

    //
    this.mKarakterGorusOrani = 1;
}

var gMotor = gMotor || {};

gMotor.Fontlar = (function() {
    var _yuklenenFontuSakla = function(fontKaynagiAdi) {
        let fontAdi = fontKaynagiAdi.slice(0, -4); // ".fnt" sil
        let fontInfo = gMotor.KaynakYoneticisi.kaynakAl(fontKaynagiAdi);
        fontInfo.FontResmi = fontAdi + ".png";
        gMotor.KaynakYoneticisi.asyncYuklemeTamamlandi(fontAdi, fontInfo);
    };
    var fontKaldir = function(fontAdi) {
        gMotor.KaynakYoneticisi.kaynakCikart(fontAdi);
        if (!gMotor.KaynakYoneticisi.kaynakYuklendiMi(fontAdi)) {
            //
            let fontKaynagiAdi = fontAdi + ".fnt";
            let dokuKaynagiAdi = fontAdi + ".png";
            gMotor.Dokular.dokuKaldir(dokuKaynagiAdi);
            gMotor.MetinYukleyici.metinKaldir(fontKaynagiAdi);
        }
    };
    var fontYukle = function(fontAdi) {

        if (!(gMotor.KaynakYoneticisi.kaynakYuklendiMi(fontAdi))) {
            //
            let fontKaynagiAdi = fontAdi + ".fnt";
            let dokuKaynagiAdi = fontAdi + ".png";

            // yukleme istegini yolla
            gMotor.KaynakYoneticisi.asyncYuklemeTalebi(fontAdi);

            gMotor.Dokular.dokuYukle(dokuKaynagiAdi);
            gMotor.MetinYukleyici.metniYukle(fontKaynagiAdi,
                gMotor.MetinYukleyici.MetinTipi.XML,
                _yuklenenFontuSakla);
        } else {
            //
            gMotor.KaynakYoneticisi.kaynakRefArti(fontAdi);
        }
    };
    var karakterBilgisiAl = function(fontAdi, birKarakter) {
        //
        let info = null;
        let finfo = gMotor.KaynakYoneticisi.kaynakAl(fontAdi);
        //
        let ortakYol = "font/common";
        //
        let ortakInfo = finfo.evaluate(ortakYol, finfo, null,
            XPathResult.ANY_TYPE, null);
        ortakInfo = ortakInfo.iterateNext();
        if (ortakInfo === null) {
            return info;
        }
        let karakterBoyu = ortakInfo.getAttribute("base");
        let karakterYolu = "font/chars/char[@id=" + birKarakter + "]";
        let karakterInfo = finfo.evaluate(karakterYolu, finfo, null,
            XPathResult.ANY_TYPE, null);
        karakterInfo = karakterInfo.iterateNext();
        if (karakterInfo === null) {
            return karakterInfo;
        }
        //
        info = new KarakterBilgisi();
        let dokuBilgisi = gMotor.Dokular.dokuBilgisiAl(finfo.FontResmi);
        let solPiksel = Number(karakterInfo.getAttribute("x"));
        let sagPiksel = solPiksel + Number(karakterInfo.getAttribute("width")) - 1;
        let ustPiksel = (dokuBilgisi.boyu - 1) -
            Number(karakterInfo.getAttribute("y"));
        let altPiksel = ustPiksel - Number(karakterInfo.getAttribute("height")) + 1;

        info.mDokuKoordSol = solPiksel / (dokuBilgisi.eni - 1);
        info.mDokuKoordUst = ustPiksel / (dokuBilgisi.boyu - 1);
        info.mDokuKoordSag = sagPiksel / (dokuBilgisi.eni - 1);
        info.mDokuKoordAlt = altPiksel / (dokuBilgisi.boyu - 1);

        // karakter degerleri
        let karakterEni = karakterInfo.getAttribute("xadvance");
        info.mKarakterEn = karakterInfo.getAttribute("width") / karakterEni;
        info.mKarakterBoy = karakterInfo.getAttribute("height") / karakterBoyu;
        info.mKarakterEnBosluk = karakterInfo.getAttribute("xoffset") / karakterEni;
        info.mKarakterBoyBosluk = karakterInfo.getAttribute("yoffset") / karakterBoyu;
        info.mKarakterGorusOrani = karakterEni / karakterBoyu;
        return info;
    };
    //
    var metotlar = {
        karakterBilgisiAl: karakterBilgisiAl,
        fontYukle: fontYukle,
        fontKaldir: fontKaldir,
    };
    return metotlar;
}());
