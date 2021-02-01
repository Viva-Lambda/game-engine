"use strict";
// kamera objesi

function Kamera(merkez, pencereGenisligi, gorusAlaniListesi) {
    //
    this.merkez = merkez; // [x, y]
    this.pgenislik = pencereGenisligi; // x
    this.gorusAlaniListesi = gorusAlaniListesi; // [x,y,genislik, buyukluk]
    this.yakinPlan = 0;
    this.uzakPlan = 1000;

    //
    this.bakmaMat = mat4.create();
    this.projMat = mat4.create();
    this.bakmaProjMat = mat4.create();

    this.arkaPlanRengi = [0.7, 0.7, 0.7, 1];
}

Kamera.prototype.merkezKoy = function(x, y) {
    this.merkez[0] = x;
    this.merkez[1] = y;
};
Kamera.prototype.merkezAl = function() {
    return this.merkez;
};

Kamera.prototype.genislikKoy = function(x) {
    this.pgenislik = x;
};
Kamera.prototype.genislikAl = function(x) {
    return this.pgenislik;
};

Kamera.prototype.gorusAlaniKoy = function(gListesi) {
    if (gListesi.length !== 4) {
        alert("Gorus Alani Listesi 4 elemanli degil");
    }
    this.gorusAlaniListesi = gListesi;
};

Kamera.prototype.arkaPlanRengiKoy = function(renk) {
    if (renk.length !== 4) {
        alert("Renk 4 elemanli degil");
    }
    this.arkaPlanRengi = renk;
};
Kamera.prototype.arkaPlanRengiAl = function() {
    return this.arkaPlanRengi;
};

Kamera.prototype.bakmaProjMatAl = function() {
    return this.bakmaProjMat;
};

Kamera.prototype.bakmaProjMatKur = function() {
    //
    var gl = gMotor.AnaMotor.glAl();
    // gorus alani ile ilgili isler
    gl.viewport(
        this.gorusAlaniListesi[0],
        this.gorusAlaniListesi[1],
        this.gorusAlaniListesi[2],
        this.gorusAlaniListesi[3]);

    gl.scissor(
        this.gorusAlaniListesi[0],
        this.gorusAlaniListesi[1],
        this.gorusAlaniListesi[2],
        this.gorusAlaniListesi[3]);

    gl.clearColor(
        this.arkaPlanRengi[0],
        this.arkaPlanRengi[1],
        this.arkaPlanRengi[2],
        this.arkaPlanRengi[3]);
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    // bakma matrisi ile ilgili isler
    mat4.lookAt(this.bakmaMat,
        [ // hedef
            this.merkez[0],
            this.merkez[1],
            10 // z kordinati
        ],
        [ // konum
            this.merkez[0],
            this.merkez[1],
            0 // z kordinati
        ], [ // tepe
            0, 1, 0
        ]
    );
    var yariGenislik = 0.5 * this.pgenislik;
    var yariUzunluk = yariGenislik * (this.gorusAlaniListesi[3] /
        this.gorusAlaniListesi[2]); // genislik * bakma orani(aspect ratio)

    mat4.ortho(this.projMat,
        -yariGenislik, yariGenislik, -yariUzunluk, yariUzunluk,
        this.yakinPlan, this.uzakPlan);

    mat4.multiply(this.bakmaProjMat, this.projMat, this.bakmaMat);
};
