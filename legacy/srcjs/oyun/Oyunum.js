"use strict";

function Oyunum() {
    //
    this.sahne_yolu = "kaynaklar/sahne.xml";
    // ses
    // this.arkaplan_ses_yolu = "kaynaklar/ses/kuslar.wav";
    // this.efekt_ses_yolu = "kaynaklar/ses/efekt.wav";

    // doku, gorsel yolu
    this.doku_makemyday_yolu = "kaynaklar/doku/makemyday.png";
    this.doku_suitup_yolu = "kaynaklar/doku/suitup.png";

    this.kamera = null;

    // doku objeleri
    this.makemyday = null;
    this.suitup = null;
    // cizilebilir diger obje
    this.karakter = null;
}
gMotor.AnaMotor.objeyiKalit(MaviSahne, Sahne);

Oyunum.prototype.sahneYukle = function() {
    gMotor.MetinYukleyici.metniYukle(this.sahne_yolu,
        gMotor.MetinYukleyici.MetinTipi.XML);

    // ses yukle
    // gMotor.SesKlipleri.sesYukle(this.arkaplan_ses_yolu);
    // gMotor.SesKlipleri.sesYukle(this.efekt_ses_yolu);

    gMotor.Dokular.dokuYukle(this.doku_suitup_yolu);
    gMotor.Dokular.dokuYukle(this.doku_makemyday_yolu);
};

Oyunum.prototype.sahneKaldir = function() {
    //
    //gMotor.MetinYukleyici.metinKaldir(this.sahne_yolu);
    // gMotor.SesKlipleri.arkaPlanSesiniDurdur();
    // gMotor.SesKlipleri.sesKaldir(this.efekt_ses_yolu);

    gMotor.Dokular.dokuKaldir(this.doku_suitup_yolu);
    gMotor.Dokular.dokuKaldir(this.doku_makemyday_yolu);

    //
    var sonrakiBolum = new MaviSahne();
    gMotor.AnaMotor.sahneBaslat(sonrakiBolum);
};

Oyunum.prototype.baslat = function() {

    let sahne_okuyucu = new SahneOkuyucu(this.sahne_yolu);

    // 1. kamerayi kur
    //
    this.kamera = new Kamera(
        vec2.fromValues(20, 60),
        20,
        [20, 40, 600, 300]
    );
    this.kamera.arkaPlanRengi = [0.9, 0.9, 0.9, 1];

    // 2. sahne objelerini yarat
    this.makemyday = new DokuCizilebilir(this.doku_makemyday_yolu);
    this.makemyday.renkKoy([1, 0, 0, 0.3]);
    this.makemyday.donusturAl().konumKoy(25, 60);
    this.makemyday.donusturAl().boyutKoy(3, 3);

    this.suitup = new DokuCizilebilir(this.doku_makemyday_yolu);
    this.suitup.renkKoy([1, 0, 0, 0.3]);
    this.suitup.donusturAl().konumKoy(25, 60);
    this.suitup.donusturAl().boyutKoy(3, 3);

    // 3. karakteri yarat
    this.karakter = new Cizilebilir();
    this.karakter.renkKoy([0, 0, 1, 1]);
    this.karakter.donusturAl().konumKoy(20, 60);
    this.karakter.donusturAl().boyutKoy(2, 2);

    //
    // gMotor.SesKlipleri.arkaPlanSesiOynat(this.arkaplan_ses_yolu);
};


Oyunum.prototype.guncelle = function() {
    var beyazDonustur = this.kare_listesi[0].donusturAl();
    var deltaX = 0.05;

    //
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sag)) {
        this.karakter.donusturAl().konumXArti(deltaX);
        if (this.karakter.donusturAl().boyutXAl() > 30) {
            this.karakter.donusturAl().konumKoy(12, 60);
        }
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sol)) {
        this.karakter.donusturAl().konumXArti(-deltaX);
        if (this.karakter.donusturAl().boyutXAl() < 11) {
            gMotor.OyunDongusu.dur();
        }
    }
    let r = this.suitup.renkAl();
    let r_a = r[3] + deltaX;
    if (r_a > 1) {
        r_a = 0;
    }
    r[3] = r_a;
};

Oyunum.prototype.ciz = function() {
    //
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);

    this.kamera.bakmaProjMatKur();

    this.suitup.ciz(this.kamera.bakmaProjMatAl());
    this.makemyday.ciz(this.kamera.bakmaProjMatAl());
    this.karakter.ciz(this.kamera.bakmaProjMatAl());
};
