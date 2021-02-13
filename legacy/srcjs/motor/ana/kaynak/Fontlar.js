// fontlari yukle

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
        let ortakYol = "font/ortak";
    };
    //
    var metotlar = function() {};
    return metotlar;
}());
