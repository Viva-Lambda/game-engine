// kaynak plani. Oyun kaynaklarini tutar
"use strict";

var gMotor = gMotor || {};

var KaynakGirdisi = function(kaynakAdi) {
    this.kaynak = kaynakAdi;
}


var KaynakPlani = {};

var BekleyenYuklemeler = 0;

var YuklendiSinyali = null;

var _butunYuklemelerOlduMuKontrol = function() {
    console.log("butun oldu mu dis");
    console.log(YuklendiSinyali);
    console.log(BekleyenYuklemeler);
    if ((BekleyenYuklemeler === 0) && (YuklendiSinyali !== null)) {
        console.log("butun oldu mu ic");
        var cagrilacak = YuklendiSinyali;
        cagrilacak();
        YuklendiSinyali = null;
    }
};

var yuklemeBittiSinyaliKoy = function(f) {
    YuklendiSinyali = f;
    _butunYuklemelerOlduMuKontrol();
};

var asyncYuklemeTalebi = function(kaynakAdi) {
    //
    KaynakPlani[kaynakAdi] = new KaynakGirdisi(kaynakAdi);
    BekleyenYuklemeler++;
};

var kaynakYuklendiMi = function(kaynakAdi) {
    return (kaynakAdi in KaynakPlani);
}

var asyncYuklemeTamamlandiSinyali = function(kaynakAdi, yuklenenKaynak) {
    //
    if (!kaynakYuklendiMi(kaynakAdi)) {
        alert("Mevcut kaynak: " + kaynakAdi + " yuklenmemis!");
    }
    KaynakPlani[kaynakAdi].kaynak = yuklenenKaynak;
    // debugger;
    BekleyenYuklemeler--;
    _butunYuklemelerOlduMuKontrol();
};

var kaynakAl = function(kaynakAdi) {
    //
    var k = null;
    if (kaynakAdi in KaynakPlani)
        k = KaynakPlani[kaynakAdi].kaynak;
    console.log(k, "k degeri");
    return k;
};

var kaynakCikart = function(kaynakAdi) {
    //
    if (kaynakAdi in KaynakPlani) {
        delete KaynakPlani[kaynakAdi];
    }
}
gMotor.KaynakPlani = (function() {
    var metotlar = {
        asyncYuklemeTamamlandiSinyali: asyncYuklemeTamamlandiSinyali,
        asyncYuklemeTalebi: asyncYuklemeTalebi,
        yuklemeBittiSinyaliKoy: yuklemeBittiSinyaliKoy,
        kaynakAl: kaynakAl,
        kaynakCikart: kaynakCikart,
        kaynakYuklendiMi: kaynakYuklendiMi
    };
    return metotlar;
}());
//
