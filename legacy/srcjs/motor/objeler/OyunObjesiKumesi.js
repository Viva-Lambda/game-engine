// oyun objelerini içinde barindiran derlem

function OyunObjesiKumesi() {
    this.mKume = [];
}
OyunObjesiKumesi.prototype.elemanSayisi = function() {
    return this.mKume.length;
};
OyunObjesiKumesi.prototype.elemaniAl = function(index) {
    if (index < 0) {
        throw new Error("Oyun kumesi indeksi 0'dan kuçuk");
    } else if (index >= this.elemanSayisi()) {
        throw new Error("Oyun kumesi indeksi kumenin eleman sayisindan buyuk");
    }
    return this.mKume[index];
};

OyunObjesiKumesi.prototype.ekle = function(eleman) {
    this.mKume.push(eleman);
};

OyunObjesiKumesi.prototype.ciz = function(kamera) {
    for (var i = 0; i < this.elemanSayisi(); i++) {
        this.mKume[i].ciz(kamera);
    }
};
OyunObjesiKumesi.prototype.guncelle = function() {
    for (var i = 0; i < this.elemanSayisi(); i++) {
        this.mKume[i].guncelle();
    }
}
