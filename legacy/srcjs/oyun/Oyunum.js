"use strict";

function Oyunum() {
    //
    this.sahne_yolu = "kaynaklar/sahne.xml";
    // ses
    // this.arkaplan_ses_yolu = "kaynaklar/ses/kuslar.wav";
    // this.efekt_ses_yolu = "kaynaklar/ses/efekt.wav";
    this.kamera = null;

    // doku, gorsel yolu
    this.mPaketYolu = "kaynaklar/doku/minion_sprite.png";
    this.mToplayiciYolu = "kaynaklar/doku/minion_collector.png";
    this.mPortalYolu = "kaynaklar/doku/minion_portal.png";

    //
    this.mesaj = null;

    this.mToplayici = null;
    this.mPortal = null;
    this.mPaket = null;

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

    gMotor.Dokular.dokuYukle(this.mToplayiciYolu);
    gMotor.Dokular.dokuYukle(this.mPaketYolu);
    gMotor.Dokular.dokuYukle(this.mPortalYolu);
    //
};

Oyunum.prototype.sahneKaldir = function() {
    //
    // gMotor.MetinYukleyici.metniKaldir(this.sahne_yolu);
    // gMotor.SesKlipleri.arkaPlanSesiniDurdur();
    // gMotor.SesKlipleri.sesKaldir(this.efekt_ses_yolu);

    gMotor.Dokular.dokuKaldir(this.mToplayiciYolu);
    gMotor.Dokular.dokuKaldir(this.mPaketYolu);
    gMotor.Dokular.dokuKaldir(this.mPortalYolu);
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
    this.mPaket = new Paket(this.mPaketYolu);
    this.mPaket.mGorulebilirMi = false;

    this.mToplayici = new DokuObjesi(this.mToplayiciYolu,
        50, 30, 30, 30);

    this.mPortal = new DokuObjesi(this.mPortalYolu, 70, 30, 10, 10);

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
    this.mToplayici.ciz(this.kamera);
    this.mPaket.ciz(this.kamera);
    this.mPortal.ciz(this.kamera);
    //
    this.mesaj.ciz(this.kamera);
};
Oyunum.prototype.guncelle = function() {
    let mesaj = "carpma yok";
    let oran = 1;
    //
    this.mToplayici.guncelle(
        gMotor.Girdi.tuslar.Z,
        gMotor.Girdi.tuslar.S,
        gMotor.Girdi.tuslar.Q,
        gMotor.Girdi.tuslar.D,
    );
    this.mPortal.guncelle(
        gMotor.Girdi.tuslar.Yukari,
        gMotor.Girdi.tuslar.Asagi,
        gMotor.Girdi.tuslar.Sol,
        gMotor.Girdi.tuslar.Sag,
    );

    let degmeNoktasi = [];
    if (this.mPortal.piksellerDegdiMi(this.mToplayici, degmeNoktasi)) {
        //
        mesaj = "Carpti: (" + degmeNoktasi[0].toString() + " " +
            degmeNoktasi.toString() + ")";
        this.mPaket.mGorulebilirMi = true;
        this.mPaket.donusturAl().konumXKoy(degmeNoktasi[0]);
        this.mPaket.donusturAl().konumYKoy(degmeNoktasi[1]);
        console.log(mesaj);
    } else {
        //
        this.mPaket.mGorulebilirMi = false;
    }
    this.mesaj.metinKoy(mesaj);
};
