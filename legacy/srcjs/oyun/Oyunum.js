"use strict";

function Oyunum() {
    //
    this.sahne_yolu = "kaynaklar/sahne.xml";
    // ses
    // this.arkaplan_ses_yolu = "kaynaklar/ses/kuslar.wav";
    // this.efekt_ses_yolu = "kaynaklar/ses/efekt.wav";

    // doku, gorsel yolu
    this.doku_portal_yolu = "kaynaklar/doku/minion_portal.png";
    this.doku_collector_yolu = "kaynaklar/doku/minion_collector.png";
    this.doku_hgrafik_yolu = "kaynaklar/doku/minion_sprite.png";
    this.doku_font_yolu = "kaynaklar/doku/fontConsolas.png";

    this.kamera = null;

    // doku objeleri
    this.collector = null;
    this.portal = null;
    // cizilebilir diger obje
    this.anaKarakter = null;
    this.yanKarakter = null;
    this.fontResmi = null;
}
gMotor.AnaMotor.objeyiKalit(Oyunum, Sahne);

Oyunum.prototype.sahneYukle = function() {
    // gMotor.MetinYukleyici.metniYukle(this.sahne_yolu,
    //     gMotor.MetinYukleyici.MetinTipi.XML);

    // ses yukle
    // gMotor.SesKlipleri.sesYukle(this.arkaplan_ses_yolu);
    // gMotor.SesKlipleri.sesYukle(this.efekt_ses_yolu);

    gMotor.Dokular.dokuYukle(this.doku_hgrafik_yolu);
    gMotor.Dokular.dokuYukle(this.doku_font_yolu);
};

Oyunum.prototype.sahneKaldir = function() {
    //
    // gMotor.MetinYukleyici.metniKaldir(this.sahne_yolu);
    // gMotor.SesKlipleri.arkaPlanSesiniDurdur();
    // gMotor.SesKlipleri.sesKaldir(this.efekt_ses_yolu);

    gMotor.Dokular.dokuKaldir(this.doku_hgrafik_yolu);
    gMotor.Dokular.dokuKaldir(this.doku_font_yolu);

    //
    var sonrakiBolum = new MaviSahne();

    gMotor.AnaMotor.sahneBaslat(sonrakiBolum);
};

Oyunum.prototype.baslat = function() {

    // let sahne_okuyucu = new SahneOkuyucu(this.sahne_yolu);

    // 1. kamerayi kur
    //
    this.kamera = new Kamera(
        vec2.fromValues(20, 60),
        20,
        [20, 40, 600, 300]
    );
    this.kamera.arkaPlanRengi = [0.9, 0.9, 0.9, 1];

    // 2. sahne objelerini yarat
    this.collector = new HareketliGrafikCizilebilir(this.doku_hgrafik_yolu);
    this.collector.renkKoy([1, 0, 0, 0.2]);
    this.collector.donusturAl().konumKoy(25, 60);
    this.collector.donusturAl().boyutKoy(3, 3);
    this.collector.elemanaPikselKonumuKoy(130, // sol
        310, // sag
        0, // alt
        180 // ust
    );

    this.portal = new HareketliGrafikCizilebilir(this.doku_hgrafik_yolu);
    this.portal.renkKoy([0, 0, 0, 0.0]);
    this.portal.donusturAl().konumKoy(15, 60);
    this.portal.donusturAl().boyutKoy(3, 3);
    this.portal.elemanaPikselKonumuKoy(315, // sol
        495, // sag
        0, // alt
        180 // ust
    );

    //
    this.fontResmi = new HareketliGrafikCizilebilir(this.doku_font_yolu);
    this.fontResmi.renkKoy([1, 1, 1, 0.0]);
    this.fontResmi.donusturAl().konumKoy(13, 62);
    this.fontResmi.donusturAl().boyutKoy(4, 4);

    this.yanKarakter = new HareketliGrafikCizilebilir(this.doku_hgrafik_yolu);
    this.yanKarakter.renkKoy([1, 1, 1, 0.0]);
    this.yanKarakter.donusturAl().konumKoy(26, 56);
    this.yanKarakter.donusturAl().boyutKoy(5, 2.5);

    // 3. karakteri yarat
    this.anaKarakter = new HareketliGrafikCizilebilir(this.doku_hgrafik_yolu);
    this.anaKarakter.renkKoy([0, 0, 1, 1]);
    this.anaKarakter.donusturAl().konumKoy(20, 60);
    this.anaKarakter.donusturAl().boyutKoy(2, 3);
    this.anaKarakter.elemanaPikselKonumuKoy(0, // sol
        120, // sag
        0, // alt
        180 // ust
    );


    //
    // gMotor.SesKlipleri.arkaPlanSesiOynat(this.arkaplan_ses_yolu);
};


Oyunum.prototype.guncelle = function() {
    let deltaX = 0.05;

    //
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sag)) {
        this.anaKarakter.donusturAl().konumXArti(deltaX);
        if (this.anaKarakter.donusturAl().konumXAl() > 30) {
            this.anaKarakter.donusturAl().konumKoy(12, 60);
        }
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Sol)) {
        this.anaKarakter.donusturAl().konumXArti(-deltaX);
        if (this.anaKarakter.donusturAl().konumXAl() < 11) {
            gMotor.OyunDongusu.dur();
        }
    }
    let r = this.portal.renkAl();
    let r_a = r[3] + deltaX;
    if (r_a > 1) {
        r_a = 0;
    }
    r[3] = r_a;

    // ayni dokuda alt bolgeyi degistirmek için
    let deltaT = 0.001;

    let dokuKoord = this.fontResmi.elemandanUVKoordinatListesiAl();

    let alt = dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Alt] + deltaT;
    let sag = dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Sag] - deltaT;
    if (alt > 1.0) {
        alt = 0;
    }
    if (sag < 0) {
        sag = 1;
    }
    this.fontResmi.elemanaUvKoordinatiKoy(
        dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Sol],
        sag,
        alt,
        dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Ust],
    );

    dokuKoord = this.yanKarakter.elemandanUVKoordinatListesiAl();

    let ust = dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Ust] - deltaT;
    let sol = dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Sol] + deltaT;

    if (sol > 0.5) {
        sol = 0;
    }
    if (ust < 0.5) {
        ust = 1;
    }
    this.yanKarakter.elemanaUvKoordinatiKoy(
        sol,
        dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Sag],
        ust,
        dokuKoord[HareketliGrafikCizilebilir.eDokuKoordListesi.Alt],
    );

};

Oyunum.prototype.ciz = function() {
    // 1. temizle sahneyi
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);

    // 2. kamerayi ayarla
    this.kamera.bakmaProjMatKur();

    // 3. objeleri çiz
    this.portal.ciz(this.kamera.bakmaProjMatAl());
    this.collector.ciz(this.kamera.bakmaProjMatAl());
    this.anaKarakter.ciz(this.kamera.bakmaProjMatAl());
    this.yanKarakter.ciz(this.kamera.bakmaProjMatAl());
    this.fontResmi.ciz(this.kamera.bakmaProjMatAl());
};
