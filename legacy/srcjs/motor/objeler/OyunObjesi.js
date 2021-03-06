// oyun da iliskiye girilebilir obje


function OyunObjesi(cizilebilirObje) {
    this.mCizilebilirOge = cizilebilirObje;
    this.mGorulebilirMi = true;
    this.mOnYonu = vec2.fromValues(0, 1);
    this.mHiz = 0;
}
OyunObjesi.prototype.donusturAl = function() {
    return this.mCizilebilirOge.donusturAl();
};
OyunObjesi.prototype.guncelle = function() {
    let konum = this.donusturAl().konumAl();
    vec2.scaleAndAdd(konum, konum, this.onYonuAl(), this.hizAl());
};
OyunObjesi.prototype.cizilebilirAl = function() {
    return this.mCizilebilirOge;
};
OyunObjesi.prototype.ciz = function(kamera) {
    if (this.mGorulebilirMi) {
        this.mCizilebilirOge.ciz(kamera);
    }
};
OyunObjesi.prototype.hizKoy = function(h) {
    this.mHiz = h;
};
OyunObjesi.prototype.hizAl = function() {
    return this.mHiz;
};
OyunObjesi.prototype.hizYukselt = function() {
    this.mHiz++;
};
OyunObjesi.prototype.hizArti = function(d) {
    this.mHiz += d;
};
OyunObjesi.prototype.gorulebilirKoy = function(g) {
    this.mGorulebilirMi = g;
};
OyunObjesi.prototype.gorulebilirAl = function() {
    return this.mGorulebilirMi;
};

OyunObjesi.prototype.onYonuAl = function() {
    return this.mOnYonu;
};
OyunObjesi.prototype.onYonuKoy = function(y) {
    vec2.normalize(this.mOnYonu, y);
};
OyunObjesi.prototype.dondur2D = function(cikti, yon, radyan) {
    let a = [];
    a[0] = yon[0] * Math.cos(radyan) - yon[1] * Math.sin(radyan);
    a[1] = yon[0] * Math.sin(radyan) + yon[1] * Math.cos(radyan);
    cikti[0] = a[0];
    cikti[1] = a[1];
    return a;
};

OyunObjesi.prototype.dondurYonelt = function(hedefNokta, oran) {
    var yon = [];
    vec2.sub(yon, hedefNokta, this.donusturAl().konumAl());
    let yonUzunlugu = vec2.length(yon);
    if (yonUzunlugu < Number.MIN_VALUE) {
        return null;
    }
    vec2.scale(yon, yon, 1 / yonUzunlugu);

    //
    let mevcutYon = this.onYonuAl();
    let izdusum = vec2.dot(yon, mevcutYon);
    if (izdusum > 0.999) {
        return null;
    }

    // izdusumu duzenle
    if (izdusum > 1) {
        izdusum = 1;
    }
    if (izdusum < -1) {
        izdusum = -1;
    }
    //
    let yon3d = vec3.fromValues(yon[0], yon[1], 0);
    let mevcutYon3d = vec3.fromValues(mevcutYon[0], mevcutYon[1], 0);
    let dikEksen = [];
    vec3.cross(dikEksen, mevcutYon3d, yon3d);

    let radyan = Math.acos(izdusum);

    if (dikEksen[2] < 0) {
        radyan = -radyan;
    }
    radyan *= oran;
    this.dondur2D(this.onYonuAl(), this.onYonuAl(), radyan);
    this.donusturAl().radyanArti(radyan);
};
