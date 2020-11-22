"use strict";

function Oyunum(kanvasId) {
    this.cizer = null;
    this.kamera = null;

    // cizilebilirleri olustur
    this.beyazKare = null;
    this.kirmiziKare = null;
    //
    gMotor.AnaMotor.glBaslat(kanvasId);

    this.oyunuBaslat();
}

Oyunum.prototype.oyunuBaslat = function() {
    // kamera olustur
    this.kamera = new Kamera(
        vec2.fromValues(20, 60),
        20,
        [20, 40, 600, 300]
    );
    this.kamera.arkaPlanRengiKoy([0.8, 0.8, 0.8, 1.0]);

    // cizer olustur
    this.cizer = new BasitCizer(
        "srcjs/glsl/basitvs.vert",
        "srcjs/glsl/degisikrenk.frag"
    );

    // cizilebilirleri olustur
    this.kirmiziKare = new Cizilebilir(this.cizer);
    this.kirmiziKare.renkKoy([0.8, 0.1, 0.1, 1.0]);

    this.beyazKare = new Cizilebilir(this.cizer);
    this.beyazKare.renkKoy([0.8, 0.8, 0.7, 1.0]);

    // bir yere koy objeleri
    this.beyazKare.donustur.konumKoy(20, 60);
    this.beyazKare.donustur.radyanKoy(0.2);
    this.beyazKare.donustur.boyutKoy(5, 5);

    //
    this.kirmiziKare.donustur.konumKoy(20, 60);
    this.kirmiziKare.donustur.radyanKoy(-0.2);
    this.kirmiziKare.donustur.boyutKoy(2, 2);

    gMotor.OyunDongusu.baslat(this);
}

Oyunum.prototype.guncelle = function() {
    var beyazDonustur = this.beyazKare.donustur;
    var deltaX = 0.05;
    if (beyazDonustur.konumXAl() > 30) {
        beyazDonustur.konumKoy(10, 60);
    }
    beyazDonustur.konumXArti(1);
    beyazDonustur.dereceArti(1);

    var kirmiziDonustur = this.kirmiziKare.donustur;
    if (kirmiziDonustur.boyutXAl() > 5) {
        kirmiziDonustur.boyutKoy(2, 2);
    }
    kirmiziDonustur.boyutArti(0.05);
}

Oyunum.prototype.ciz = function() {
    //
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1.0]);

    this.kamera.bakmaProjMatKur();

    this.kirmiziKare.ciz(this.kamera.bakmaProjMatAl());
    this.beyazKare.ciz(this.kamera.bakmaProjMatAl());
}
