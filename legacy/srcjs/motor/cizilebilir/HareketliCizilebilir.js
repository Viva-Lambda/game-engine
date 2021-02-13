// hareketli çizilebilir

HareketliCizilebilir.eHareketTuru = Object.freeze({
    eSagaHareket: 0, // soldan saga hareket
    eSolaHareket: 1, // sagdan sola hareket
    eSarkacHareket: 2, // once soldan saga sonra sagdan sola hareket
});

function HareketliCizilebilir(doku) {
    HareketliGrafikCizilebilir.call(this, doku);
    Cizilebilir.prototype._cizerKoy.call(this,
        gMotor.VarsayilanKaynaklar.hareketliGrafikCizerAl()
    );
    // genel ayarlar
    this.mDokuElSol = 0.0; // sol kose 
    this.mDokuElUst = 1.0; // ust kose
    this.mDokuEn = 1.0;
    this.mDokuBoy = 1.0;
    this.mDokuEnBosluk = 0.0;
    this.mDokuSayisi = 1;

    // animasyon basina olan ayarlar
    this.mHareketTipi = HareketliCizilebilir.eHareketTuru.eSagaHareket;
    this.mDegisimAraligi = 1;

    // animasyonun su anki durumu
    this.mSuankiHareketIlerleme = -1;
    this.mSuankiDokuElemani = 0;

    // animasyonu baslat
    this._baslat();
}
gMotor.AnaMotor.objeyiKalit(HareketliCizilebilir, HareketliGrafikCizilebilir);

HareketliCizilebilir.prototype.hareketTipiKoy = function(hareketTipi) {
    this.mHareketTipi = hareketTipi;
    this.mSuankiHareketIlerleme = -1;
    this.mSuankiDokuElemani = 0;
    this._baslat();
};
HareketliCizilebilir.prototype._baslat = function() {
    //
    this.mSuankiTik = 0;
    switch (this.mHareketTipi) {
        case HareketliCizilebilir.eHareketTuru.eSagaHareket:
            this.mSuankiDokuElemani = 0;
            this.mSuankiHareketIlerleme = 1;
            break;
        case HareketliCizilebilir.eHareketTuru.eSolaHareket:
            this.mSuankiDokuElemani = this.mDokuSayisi - 1;
            this.mSuankiHareketIlerleme = -1;
            break;
        case HareketliCizilebilir.eHareketTuru.eSarkacHareket:
            this.mSuankiHareketIlerleme = -1 * this.mSuankiHareketIlerleme;
            this.mSuankiDokuElemani += 2 * this.mSuankiHareketIlerleme;
            break;
    }
    this._hareketliGrafikKoy();
};

HareketliCizilebilir.prototype._hareketliGrafikKoy = function() {
    //
    let sol = this.mDokuElSol + (this.mSuankiDokuElemani * (this.mDokuEn +
        this.mDokuEnBosluk));

    HareketliGrafikCizilebilir.prototype.elemanaUvKoordinatiKoy.call(this,
        sol, sol + this.mDokuEn, this.mDokuElUst - this.mDokuBoy,
        this.mDokuElUst);
};

HareketliCizilebilir.prototype.hareketDizisiKoy = function(
    ustPiksel, // ustten bosluk piksel sayisi kadar
    sagPiksel, // sagdan bosluk piksel sayisi kadar
    elemanEnPiksel, // elemanin genisligi piksel sayisi kadar
    elemanBoyPiksel,
    elemanSayisi,
    enBoslukPiksel
) {
    //
    let tinfo = gMotor.KaynakYoneticisi.kaynakAl(this.dokum);
    let en = tinfo.eni;
    let boy = tinfo.boyu;

    //
    this.mDokuSayisi = elemanSayisi;
    this.mDokuElSol = sagPiksel / en;
    this.mDokuElUst = ustPiksel / boy;
    this.mDokuEn = elemanEnPiksel / en;
    this.mDokuBoy = elemanBoyPiksel / boy;
    this.mDokuEnBosluk = enBoslukPiksel / en;

    this._baslat();
};

HareketliCizilebilir.prototype.hareketHiziKoy = function(tikAraligi) {
    this.mDegisimAraligi = tikAraligi;
};
HareketliCizilebilir.prototype.hareketHiziArti = function(delta) {
    this.mDegisimAraligi += delta;
};

HareketliCizilebilir.prototype.hareketiGuncelle = function() {
    this.mSuankiTik++;
    if (this.mSuankiTik >= this.mDegisimAraligi) {
        this.mSuankiTik = 0;
        this.mSuankiDokuElemani += this.mSuankiHareketIlerleme;
        if ((this.mSuankiDokuElemani >= 0) && (this.mSuankiDokuElemani <
                this.mDokuSayisi)) {
            this._hareketliGrafikKoy();
        } else {
            this._baslat();
        }
    }
};
