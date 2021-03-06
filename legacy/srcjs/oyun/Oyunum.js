"use strict";

function Oyunum() {
    //
    this.sahne_yolu = "kaynaklar/sahne.xml";
    // ses
    // this.arkaplan_ses_yolu = "kaynaklar/ses/kuslar.wav";
    // this.efekt_ses_yolu = "kaynaklar/ses/efekt.wav";
    this.kamera = null;

    // doku, gorsel yolu
    this.doku_hgrafik_yolu = "kaynaklar/doku/minion_sprite.png";

    //
    this.mesaj = null;

    this.anaKarakter = null;
    this.mBeyin = null;

    // hareket modu:
    // A: Ana karakter beyinde
    // Y: Yan karakter beyinde hemen yon degistirmeli
    // K: Yan karakter beyinde yavas yon degistirmeli
    this.mMod = "A";

}
gMotor.AnaMotor.objeyiKalit(Oyunum, Sahne);

Oyunum.prototype.sahneYukle = function() {
    // gMotor.MetinYukleyici.metniYukle(this.sahne_yolu,
    //     gMotor.MetinYukleyici.MetinTipi.XML);

    // ses yukle
    // gMotor.SesKlipleri.sesYukle(this.arkaplan_ses_yolu);
    // gMotor.SesKlipleri.sesYukle(this.efekt_ses_yolu);

    gMotor.Dokular.dokuYukle(this.doku_hgrafik_yolu);
    //
};

Oyunum.prototype.sahneKaldir = function() {
    //
    // gMotor.MetinYukleyici.metniKaldir(this.sahne_yolu);
    // gMotor.SesKlipleri.arkaPlanSesiniDurdur();
    // gMotor.SesKlipleri.sesKaldir(this.efekt_ses_yolu);

    gMotor.Dokular.dokuKaldir(this.doku_hgrafik_yolu);
    //
    var sonrakiBolum = new MaviSahne();

    gMotor.AnaMotor.sahneBaslat(sonrakiBolum);
};
Oyunum.prototype._MetinBaslat = function(font, x, y, renk, metinBoyu) {
    font.renkKoy(renk);
    font.donusturAl().konumKoy(x, y);
    font.metinBoyuKoy(metinBoyu);
};

Oyunum.prototype.baslat = function() {

    // let sahne_okuyucu = new SahneOkuyucu(this.sahne_yolu);

    // 1. kamerayi kur
    //
    this.kamera = new Kamera(
        vec2.fromValues(50, 37.5),
        100,
        [0, 0, 640, 480]
    );
    this.kamera.arkaPlanRengi = [0.9, 0.9, 0.9, 1];

    // 3. beyin yarat
    this.mBeyin = new Beyin(this.doku_hgrafik_yolu);
    console.log("beyin");

    this.anaKarakter = new AnaKarakter(this.doku_hgrafik_yolu);

    // font
    this.mesaj = new FontCizilebilir("Durum Mesaji");
    this.mesaj.renkKoy([0, 0, 0, 1]);
    this.mesaj.donusturAl().konumKoy(1, 2);
    this.mesaj.metinBoyuKoy(3);
};
Oyunum.prototype.ciz = function() {
    // 1. temizle sahneyi
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);

    // 2. kamerayi ayarla
    this.kamera.bakmaProjMatKur();

    // 3. objeleri çiz
    this.anaKarakter.ciz(this.kamera);
    this.mBeyin.ciz(this.kamera);
    this.mesaj.ciz(this.kamera);
    console.log("beyin ciz");
};
Oyunum.prototype.guncelle = function() {
    let mesaj = "Beyin modu: [A: Tuslar, Y: Derhal, K: Yavastan]: ";
    let oran = 1;
    //
    this.anaKarakter.guncelle();

    switch (this.mMod) {
        case "A":
            this.mBeyin.guncelle();
            break;
        case "K":
            oran = 0.02; // yavastan
            break;
        case "Y":
            this.mBeyin.dondurYonelt(
                this.anaKarakter.donusturAl().konumAl(),
                oran);
            OyunObjesi.prototype.guncelle.call(this.mBeyin);
            break;
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.A)) {
        this.mMod = "A";
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.Y)) {
        this.mMod = "Y";
    }
    if (gMotor.Girdi.tusBasiliMi(gMotor.Girdi.tuslar.K)) {
        this.mMod = "K";
    }

    this.mesaj.metinKoy(mesaj + this.mMod);
};
