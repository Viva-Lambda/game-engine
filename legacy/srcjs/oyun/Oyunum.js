"use strict";

function Oyunum() {
    this.sahne_yolu = "kaynaklar/sahne.xml";
    // ses
    this.arkaplan_ses_yolu = "kaynaklar/ses/kuslar.wav";
    this.efekt_ses_yolu = "kaynaklar/ses/efekt.wav";

    // doku, gorsel yolu
    this.doku_makemyday_yolu = "kaynaklar/doku/makemyday.png";
    this.doku_suitup_yolu = "kaynaklar/doku/suitup.png";

    this.kare_listesi = new Array();
    this.kamera = null;

    // doku objeleri
    this.makemyday = null;
    this.suitup = null;
    // cizilebilir diger obje
    this.karakter = null;
}
objeyiKalit(MaviSahne, Sahne);

Oyunum.prototype._baslat = function() {

    let sahne_okuyucu = new SahneOkuyucu(this.sahne_yolu);
    //
    this.kamera = sahne_okuyucu.kameraOku();
    this.kamera.arkaPlanRengi = [0.9, 0.9, 0.9, 1];

    // doku objelerini yarat
    this.makemyday = new DokuCizilebilir(this.doku_makemyday_yolu);
    this.makemyday.renkKoy([1, 0, 0, 0.3]);
    var mday_donusturucu = this.makemyday.donusturAl();
    mday_donusturucu.konumKoy(25, 60);
    mday_donusturucu.boyutKoy(3, 3);

    this.suitup = new DokuCizilebilir(this.doku_makemyday_yolu);
    this.suitup.renkKoy([1, 0, 0, 0.3]);
    var suit_donusturucu = this.suitup.donusturAl();
    this.suitup.donusturAl().konumKoy(25, 60);
    this.suitup.donusturAl().boyutKoy(3, 3);

    // karakteri yarat
    this.karakter = new Cizilebilir();
    this.karakter.renkKoy([0, 0, 1, 1]);
    this.karakter.donusturAl().konumKoy(20, 60);
    this.karakter.donusturAl().boyutKoy(2, 2);

    //
    sahne_okuyucu.kareOkuyucu(this.kare_listesi);

    //
    gMotor.SesKlipleri.arkaPlanSesiOynat(this.arkaplan_ses_yolu);
};


Oyunum.prototype.guncelle = function() {
    var beyazDonustur = this.kare_listesi[0].donusturAl();
    var deltaX = 0.05;
    // beyaz kare hareketi
    if (gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Sag)) {
        if (beyazDonustur.konumXAl() > 30) {
            gMotor.OyunDongusu.dur();
        }
        gMotor.SesKlipleri.sesOynat(this.efekt_ses_yolu);
        beyazDonustur.konumXArti(1);
    }
    if (gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Yukari)) {
        beyazDonustur.dereceArti(1);
    }

    var kirmiziDonustur = this.kare_listesi[1].donusturAl();
    // kirmizi kare hareketi
    var kirmiziKontrol =
        gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Asagi);
    if (kirmiziKontrol) {
        if (kirmiziDonustur.boyutXAl() > 5) {
            kirmiziDonustur.boyutKoy(2, 2);
        }
        gMotor.SesKlipleri.sesOynat(this.efekt_ses_yolu);
        kirmiziDonustur.boyutArti(0.05);
    }
    var r = this.suitup.renkAl();
    var r_alfa = r[3] + deltaX;
    if (r_alfa > 1.0) {
        r_alfa = 0.0;
    }
    r[3] = r_alfa;

};

Oyunum.prototype.ciz = function() {
    //
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);

    this.kamera.bakmaProjMatKur();

    for (var i = 0; i < this.kare_listesi.length; i++) {
        this.kare_listesi[i].ciz(this.kamera.bakmaProjMatAl());
    }
    this.suitup.ciz();
    this.makemyday.ciz();
    this.karakter.ciz();
};

Oyunum.prototype.sahneYukle = function() {
    gMotor.MetinYukleyici.metniYukle(this.sahne_yolu,
        gMotor.MetinYukleyici.MetinTipi.XML);
    gMotor.SesKlipleri.sesYukle(this.arkaplan_ses_yolu);
    gMotor.SesKlipleri.sesYukle(this.efekt_ses_yolu);

    gMotor.Dokular.dokuYukle(this.doku_suitup_yolu);
    gMotor.Dokular.dokuYukle(this.doku_makemyday_yolu);
};

Oyunum.prototype.sahneKaldir = function() {
    //
    //gMotor.MetinYukleyici.metinKaldir(this.sahne_yolu);
    gMotor.SesKlipleri.arkaPlanSesiniDurdur();
    gMotor.SesKlipleri.sesKaldir(this.efekt_ses_yolu);

    gMotor.Dokular.dokuKaldir(this.doku_suitup_yolu);
    gMotor.Dokular.dokuKaldir(this.doku_makemyday_yolu);


    var sonrakiBolum = new MaviSahne();
    gMotor.AnaMotor.sahneBaslat(sonrakiBolum);

};
