// fontlari barindiran çizilebilir obje

function FontCizilebilir(metin) {
    this.mFont = gMotor.VarsayilanKaynaklar.varsayilanFontuAl();
    this.mBuKarakter = new HareketliCizilebilir(this.mFont + ".png");
    this.donustur = new Donustur();
    this.metin = metin;
}

FontCizilebilir.prototype.ciz = function(kamera) {
    //
    let karakterGenislik = this.donustur.enAl() / this.metin.length;
    let karakterBoy = this.donustur.boyAl();
    let karakterYkonum = this.donustur.konumYAl();
    let karakterXkonum = this.donustur.konumXAl() - (
        (karakterGenislik / 2) + (karakterGenislik * 0.5)
    );
    var karakterIndex, birKarakter, karakterBilgisi, boyutX, boyutY;
    var xOffset, yOffset;
    for (karakterIndex = 0; karakterIndex < this.metin.length; karakterIndex++) {
        //
        birKarakter = this.metin.charCodeAt(karakterIndex);
        karakterBilgisi = gMotor.Fontlar.karakterBilgisiAl(this.mFont, birKarakter);
        //
        this.mBuKarakter.elemanaUvKoordinatiKoy(
            karakterBilgisi.mDokuKoordSol,
            karakterBilgisi.mDokuKoordSag,
            karakterBilgisi.mDokuKoordAlt,
            karakterBilgisi.mDokuKoordUst);
        //
        boyutX = karakterGenislik * karakterBilgisi.mKarakterEn;
        boyuty = karakterBoy * karakterBilgisi.mKarakterBoy;
        this.mBuKarakter.donusturAl().konumKoy(
            karakterXkonum - xOffset,
            karakterYkonum - yOffset);
        this.mBuKarakter.ciz(kamera);
        karakterXkonum += karakterGenislik;
    }
};
FontCizilebilir.prototype.donusturAl = function() {
    return this.donustur;
};
FontCizilebilir.prototype.metinAl = function() {
    return this.metin;
};
FontCizilebilir.prototype.metinBoyuKoy = function(b) {
    //
    var karakterBilgisi = gMotor.Fontlar.karakterBilgisiAl(
        this.mFont, "A".charCodeAt(0));
    var en = b * karakterBilgisi.mKarakterGorusOrani;
    this.donusturAl().boyutKoy(en * this.metin.length, b);
};
FontCizilebilir.prototype.metinKoy = function(m) {
    this.metin = m;
    this.metinBoyuKoy(this.donusturAl().boyAl());
};
FontCizilebilir.prototype.fontKoy = function(f) {
    this.mFont = f;
    this.mBuKarakter.dokuKoy(this.mFont + ".png");
};
FontCizilebilir.prototype.fontAl = function() {
    return this.mFont;
};
FontCizilebilir.prototype.renkKoy = function(r) {
    this.mBuKarakter.renkKoy(r);
};
FontCizilebilir.prototype.renkAl = function() {
    this.mBuKarakter.renkAl();
};
