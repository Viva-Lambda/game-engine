// oyun da iliskiye girilebilir obje

function OyunObjesi(cizilebilirObje) {
    this.mCizilebilirOge = cizilebilirObje;
}
OyunObjesi.prototype.donusturAl = function() {
    return this.mCizilebilirOge.donusturAl();
};
OyunObjesi.prototype.guncelle = function() {};
OyunObjesi.prototype.cizilebilirAl = function() {
    return this.mCizilebilirOge;
};
OyunObjesi.prototype.ciz = function(kamera) {
    this.mCizilebilirOge.ciz(kamera);
};
