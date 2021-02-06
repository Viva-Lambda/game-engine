//
function HareketliGrafikCizilebilir(grafikDokusu) {
    //
    DokuCizilebilir.call(this, grafikDokusu);
    Cizilebilir.prototype._cizerKoy.call(this,
        gMotor.VarsayilanKaynaklar.hareketliGrafikCizerAl()
    );
    // console.log(this.cizici);
    this.mDokuSol = 0.0; // 0 sol - 1 sag
    this.mDokuSag = 1.0;
    this.mDokuUst = 1.0; // 1 ust - 0 alt
    this.mDokuAlt = 0.0;
}
gMotor.AnaMotor.objeyiKalit(HareketliGrafikCizilebilir, DokuCizilebilir);

/* dokularin uv koordinatlarini barindiran liste soyle bir sey:
[0][1]:  Sag Ust
[2][3]:  Sol Ust
[4][5]:  Sag Alt
[6][7]:  Sol Ust
    */
HareketliGrafikCizilebilir.eDokuKoordListesi = Object.freeze({
    Sol: 2,
    Sag: 0,
    Ust: 1,
    Alt: 5,
});

HareketliGrafikCizilebilir.prototype.elemanaUvKoordinatiKoy = function(
    sol, sag, alt, ust) {
    this.mDokuSol = sol;
    this.mDokuSag = sag;
    this.mDokuAlt = alt;
    this.mDokuUst = ust;
};
HareketliGrafikCizilebilir.prototype.elemanaPikselKonumuKoy = function(
    sol, sag, alt, ust) {
    let dokuBilgisi = gMotor.KaynakYoneticisi.kaynakAl(this.dokum);
    let eni = dokuBilgisi.eni;
    let boyu = dokuBilgisi.boyu;

    this.mDokuSol = sol / eni;
    this.mDokuSag = sag / eni;
    this.mDokuAlt = alt / boyu;
    this.mDokuUst = ust / boyu;
};

HareketliGrafikCizilebilir.prototype.elemandanUVKoordinatListesiAl = function() {
    return [
        this.mDokuSag, this.mDokuUst,
        this.mDokuSol, this.mDokuUst,
        this.mDokuSag, this.mDokuAlt,
        this.mDokuSol, this.mDokuAlt,
    ];
};
HareketliGrafikCizilebilir.prototype.ciz = function(renk, bpMat) {
    //
    //console.log(this.cizici);
    this.cizici.dokuKoordinatiKoy(this.elemandanUVKoordinatListesiAl());
    DokuCizilebilir.prototype.ciz.call(this, renk, bpMat);
}
