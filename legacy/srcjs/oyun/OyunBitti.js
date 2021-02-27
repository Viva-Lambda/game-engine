// oyun bitti sahnesi

function OyunBitti() {
    this.mKamera = null;
    this.mMesaj = null;
}
gMotor.AnaMotor.objeyiKalit(OyunBitti, Sahne);

OyunBitti.prototype.baslat = function() {
    this.kamera = new Kamera(
        vec2.fromValues(50, 33),
        100,
        [0, 0, 600, 400]
    );
    this.kamera.arkaPlanRengi = [0.9, 0.9, 0.9, 1];

    this.mMesaj = new FontCizilebilir("!!!!Oyun Bitti!!!");
    this.mMesaj.renkKoy([0, 0, 0, 1]);
    this.mMesaj.donusturAl().konumKoy(22, 32);
    this.mMesaj.metinBoyuKoy(12);

};
OyunBitti.prototype.ciz = function() {
    gMotor.AnaMotor.kanvasTemizle([0.9, 0.9, 0.9, 1]);
    this.mKamera.bakmaProjMatKur();
    this.mMesaj.ciz(this.mKamera.bakmaProjMatAl());
};
OyunBitti.prototype.update = function() {
    gMotor.OyunDongusu.dur();
};
OyunBitti.prototype.sahneKaldir = function() {
    gMotor.AnaMotor.temizle();
}
