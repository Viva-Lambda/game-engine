export function uniformInfoYap(ad, k) {
    return { isim: ad, konum: k };
}
export function attribInfoYap(ad, knm, byt, tip, nmi, adm, uzk) {
    return {
        isim: ad,
        konum: knm,
        boyut: byt,
        tip: tip,
        normalizeMi: nmi,
        adim: adm,
        uzaklik: uzk
    };
}
export function glmdenListeAl(vecMat) {
    var cikti = [];
    for (var index in vecMat) {
        cikti.push(vecMat[index]);
    }
    return cikti;
}
export function derece2Radyan(aciDerece) {
    var pi = Math.PI;
    return aciDerece * pi / 180;
}
export function vecMatBoyutKontrol(vecMat, istenenBoyut, mesaj) {
    var elemanSayisi = 0;
    var indeksler = "";
    for (var index in vecMat) {
        indeksler += " " + index.toString();
        elemanSayisi++;
    }
    if (elemanSayisi !== istenenBoyut) {
        throw new Error(mesaj + " elemanlar: " + indeksler);
    }
    return true;
}
//# sourceMappingURL=yardimcilar.js.map