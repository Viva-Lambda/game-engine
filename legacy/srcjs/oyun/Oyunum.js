"use strict";

function Oyunum(kanvasId) {
    this.cizer = null;
    gMotor.AnaMotor.glBaslat(kanvasId);

    this.cizer = new BasitCizer("./srcjs/glsl/basitvs.vert",
        "./srcjs/glsl/degisikrenk.frag");

    // cizilebilirleri olustur
    this.beyazKare = new Cizilebilir(this.cizer);
    this.beyazKare.renkKoy([0, 1, 1, 1]);

    this.kirmiziKare = new Cizilebilir(this.cizer);
    this.kirmiziKare.renkKoy([1, 0, 0, 1]);

    // kanvas temizle
    gMotor.AnaMotor.kanvasTemizle([0, 0.7, 0.3, 1]);

    // matrisleri olustur
    this.beyazKare.donustur.konumKoy(-0.25, 0.25);
    this.beyazKare.donustur.radyanKoy(0.2);
    this.beyazKare.donustur.boyutKoy(1.2, 1.2);
    // beyaz çiz
    this.beyazKare.ciz();

    this.kirmiziKare.donustur.konumKoy(0.25, -0.25);
    this.kirmiziKare.donustur.radyanKoy(-0.7);
    this.kirmiziKare.donustur.boyutKoy(0.4, 0.4);

    // kirmizi çiz
    this.kirmiziKare.ciz();
}
