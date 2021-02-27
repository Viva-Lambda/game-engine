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
    this.mYanKarakterKumesi = null;
    this.yanKarakter = null;

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

    // 2. sahne objelerini yarat
    this.yanKarakter = new YanKarakter(this.doku_hgrafik_yolu);

    // hareketli karakterler
    this.mHareketliKarakterKumesi = new OyunObjesiKumesi();
    for (var i = 0; i < 5; i++) {
        let randomY = Math.random() * 65;
        let birKarakter = new HareketliKarakter(
            this.doku_hgrafik_yolu, randomY
        );
        this.mHareketliKarakterKumesi.ekle(birKarakter);
    }
    // ana karakteri yarat
    this.anaKarakter = new AnaKarakter(this.doku_hgrafik_yolu);

    // font
    this.mesaj = new FontCizilebilir("Durum Mesaji");
    this.mesaj.renkKoy([0, 0, 0, 1]);
    this.mesaj.donusturAl().konumKoy(1, 2);
    this.mesaj.metinBoyuKoy(3);
};


Oyunum.prototype.guncelle = function() {
    this.anaKarakter.guncelle();
    this.mHareketliKarakterKumesi.guncelle();
    this.yanKarakter.guncelle();
};

Oyunum.prototype.ciz = function() {
    // 1. temizle sahneyi
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);

    // 2. kamerayi ayarla
    this.kamera.bakmaProjMatKur();

    // 3. objeleri çiz
    this.anaKarakter.ciz(this.kamera);
    this.mHareketliKarakterKumesi.ciz(this.kamera);
    this.yanKarakter.ciz(this.kamera);
    this.mesaj.ciz(this.kamera);
};
