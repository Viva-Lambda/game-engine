"use strict";

function Oyunum(kanvasId) {
    this.cizer = null;
    gMotor.AnaMotor.glBaslat(kanvasId);
    var gl = gMotor.AnaMotor.glAl();

    this.kamera = new Kamera(vec2.fromValues(20, 60), 20, [20, 40, 600, 300]);

    this.cizer = new BasitCizer("./srcjs/glsl/basitvs.vert",
        "./srcjs/glsl/degisikrenk.frag");

    // cizilebilirleri olustur
    this.beyazKare = new Cizilebilir(this.cizer);
    this.beyazKare.renkKoy([0, 1, 1, 1]);

    this.kirmiziKare = new Cizilebilir(this.cizer);
    this.kirmiziKare.renkKoy([1, 0, 0, 1]);

    //
    this.solUstKare = new Cizilebilir(this.cizer);
    this.solUstKare.renkKoy([0.9, 0.1, 0.1, 1]);
    //
    this.solAltKare = new Cizilebilir(this.cizer);
    this.solAltKare.renkKoy([0.1, 0.1, 0.1, 1]);

    // sag 
    this.sagUstKare = new Cizilebilir(this.cizer);
    this.sagUstKare.renkKoy([0.1, 0.8, 0.1, 1.0]);
    //
    this.sagAltKare = new Cizilebilir(this.cizer);
    this.sagAltKare.renkKoy([0.1, 0.1, 0.8, 1.0]);

    // kanvas temizle
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1]);

    //
    this.kamera.bakmaProjMatKur();
    var bakmaProjMat = this.kamera.bakmaProjMatAl();

    //

    // matrisleri olustur
    this.beyazKare.donustur.konumKoy(20, 60);
    this.beyazKare.donustur.radyanKoy(0.2);
    this.beyazKare.donustur.boyutKoy(5, 5);
    // beyaz çiz
    this.beyazKare.ciz(bakmaProjMat);

    this.kirmiziKare.donustur.konumKoy(20, 60);
    this.kirmiziKare.donustur.boyutKoy(2, 2);
    // kirmizi çiz
    this.kirmiziKare.ciz(bakmaProjMat);

    // sol ust
    this.solUstKare.donustur.konumKoy(10, 65);
    this.solUstKare.ciz(bakmaProjMat);

    // sag ust
    this.sagUstKare.donustur.konumKoy(30, 65);
    this.sagUstKare.ciz(bakmaProjMat);

    //
    this.solAltKare.donustur.konumKoy(30, 55);
    this.solAltKare.ciz(bakmaProjMat);
}
