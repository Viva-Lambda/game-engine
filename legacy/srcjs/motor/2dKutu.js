// karakter kutusu - 2d kutu

function Kutu2D(merkez, en, boy) {
    this.mMerkez = vec2.fromValues(0, 0);
    this.sinirKoy(merkez, en, boy);
}

Kutu2D.prototype.sinirKoy = function(merkez, en, boy) {
    this.mEn = en;
    this.mBoy = boy;
    this.mMerkez[0] = merkez[0] - (en / 2);
    this.mMerkez[1] = merkez[1] - (boy / 2);
};

/**
Degerlerin bu sekilde ilerlemesi bitwise operatorler için
Ornek:
eSolaCarpma | eYukariCarpma == 4 | 1 == 5

Bu sayede çarpisma durumu kolay anlasilir
    */
Kutu2D.eKutuCarpmaDurumu = Object.freeze({
    eSolaCarpma: 1,
    eSagaCarpma: 2,
    eYukariCarpma: 4,
    eAsagiCarpma: 8,
    eIceri: 16,
    eDisari: 0,
});

Kutu2D.prototype.minX = function() {
    return this.mMerkez[0];
};
Kutu2D.prototype.minY = function() {
    return this.mMerkez[1];
};
Kutu2D.prototype.maxX = function() {
    return this.mMerkez[0] + this.mEn;
};
Kutu2D.prototype.maxY = function() {
    return this.mMerkez[1] + this.mBoy;
};


Kutu2D.prototype.noktayiKapsiyorMu = function(x, y) {
    //
    let k1 = x > this.minX();
    let k2 = x < this.maxX();
    let k3 = y > this.minY();
    let k4 = y < this.maxY();
    return (k1 && k2 && k3 && k4);
};

Kutu2D.prototype.kesisiyorMu = function(digerKutu2D) {
    //
    let k1 = this.minX() < digerKutu2D.maxX();
    let k2 = this.maxX() > digerKutu2D.minX();
    let k3 = this.minY() < digerKutu2D.maxY();
    let k4 = this.maxY() > digerKutu2D.minY();
    return (k1 && k2 && k3 && k4);
};

Kutu2D.prototype.carpmaDurumuAl = function(digerKutu2D) {
    //
    let durum = Kutu2D.eKutuCarpmaDurumu.eDisari;
    if (this.kesisiyorMu(digerKutu2D)) {
        if (digerKutu2D.minX() < this.minX()) {
            durum |= Kutu2D.eKutuCarpmaDurumu.eSolaCarpma;
        }
        if (digerKutu2D.maxX() > this.maxX()) {
            durum |= Kutu2D.eKutuCarpmaDurumu.eSagaCarpma;
        }
        if (digerKutu2D.minY() < this.minY()) {
            durum |= Kutu2D.eKutuCarpmaDurumu.eAsagiCarpma;
        }
        if (digerKutu2D.maxY() > this.maxY()) {
            durum |= Kutu2D.eKutuCarpmaDurumu.eYukariCarpma;
        }

        // diger kutu objenin içinde mi kaliyor ?
        if (durum === Kutu2D.eKutuCarpmaDurumu.eDisari) {
            durum = Kutu2D.eKutuCarpmaDurumu.eIceri;
        }
    }
    return durum;
};
