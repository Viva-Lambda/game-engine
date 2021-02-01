// kaynak plani. Oyun kaynaklarini tutar
"use strict";

var gMotor = gMotor || {};

gMotor.KaynakYoneticisi = (function() {

    /** Kaynaklar içerisinde bir kaynagi temsil eden obje

      @param {string} kaynakAdi kaynagin bulundugu dosya yolu
    */
    var KaynakGirdisi = function(kaynakAdi) {
        this.kaynak = kaynakAdi;
        this.refSayisi = 1;
    };

    /** Kaynaklari içinde barindiran obje*/
    var Kaynaklar = {};

    /** Kaynak planinin toplam yuklemesi gereken obje */
    var BekleyenYuklemeler = 0;

    /** Bir yuklemenin sonunda çagrilacak islem*/
    var YuklendiSinyali = null;

    var asyncYuklemeTalebi = function(kaynakAdi) {
        //
        Kaynaklar[kaynakAdi] = new KaynakGirdisi(kaynakAdi);
        BekleyenYuklemeler++;
    };

    var asyncYuklemeTamamlandi = function(kaynakAdi, yuklenenKaynak) {
        //
        if (!kaynakYuklendiMi(kaynakAdi)) {
            alert("Mevcut kaynak: " + kaynakAdi + " yuklenmemis!");
        }
        Kaynaklar[kaynakAdi].kaynak = yuklenenKaynak;
        // debugger;
        BekleyenYuklemeler--;
        _butunYuklemelerOlduMuKontrol();
    };

    /** bekleyen yukleme kalip kalmadigini denetler */
    var _butunYuklemelerOlduMuKontrol = function() {
        if ((BekleyenYuklemeler === 0) && (YuklendiSinyali !== null)) {
            var cagrilacak = YuklendiSinyali;
            cagrilacak();
            YuklendiSinyali = null;
        }
    };

    var yuklemeBittiSinyaliKoy = function(f) {
        YuklendiSinyali = f;
        _butunYuklemelerOlduMuKontrol();
    };

    var kaynakAl = function(kaynakAdi) {
        //
        var k = null;
        if (kaynakAdi in Kaynaklar) {
            k = Kaynaklar[kaynakAdi].kaynak;
        } else {
            alert("ilgili kaynak: " + kaynakAdi + " Kaynak Plani yok");
        }
        return k;
    };


    /** kaynagin referansini arttir

    Kaynak çok buyuk olasilikla baska bir yerden çagriliyor ve bunun uzerine biz
    de ilgili referansini arttriyoruz.
        */
    var kaynakRefArti = function(kaynakAdi) {
        Kaynaklar[kaynakAdi].refSayisi += 1;
    }

    var kaynakYuklendiMi = function(kaynakAdi) {
        return (kaynakAdi in Kaynaklar);
    }

    /** dosya yolu verilen kaynagi eger referansi sifirlanmissa kaldirir

    @param {string} kaynakAdi ilgili kaynagin dosya yolu
        */
    var kaynakCikart = function(kaynakAdi) {
        //
        var ref_sayisi = 0;
        if (kaynakAdi in Kaynaklar) {
            Kaynaklar[kaynakAdi].refSayisi -= 1;
            ref_sayisi = Kaynaklar[kaynakAdi].refSayisi;
            if (ref_sayisi === 0) {
                delete Kaynaklar[kaynakAdi];
            }
        }
        return ref_sayisi;
    };
    var metotlar = {
        asyncYuklemeTamamlandi: asyncYuklemeTamamlandi,
        asyncYuklemeTalebi: asyncYuklemeTalebi,
        yuklemeBittiSinyaliKoy: yuklemeBittiSinyaliKoy,
        kaynakAl: kaynakAl,
        kaynakCikart: kaynakCikart,
        kaynakRefArti: kaynakRefArti,
        kaynakYuklendiMi: kaynakYuklendiMi
    };
    return metotlar;
}());
