export function boyutUyarisi(boyut1, boyut2, boyutTuru) {
    let info = "Verili " + boyutTuru + " boyutlari ortusmuyor: ";
    info += "boyut1: " + boyut1;
    info += " boyut2: " + boyut2;
    return info;
}
export function boyutKontrol(verilenBoyut, verilenTur, istenenBuyuk, istenenKucuk) {
    let bytstr = verilenBoyut.toString();
    let istnbstr = istenenBuyuk.toString();
    let istnkstr = istenenKucuk.toString();
    let msj = "Verilen " + verilenTur + ": " + bytstr + " " + istnbstr +
        " den buyuk " + istnkstr + " den kucuk olmali";
    return msj;
}
export function esitHatasi(b1, b2, msg) {
    if (b1 === b2) {
        throw new Error(msg + " birbirine esit olamaz");
    }
}
export function esitDegilHatasi(b1, b2, msg) {
    if (b1 !== b2) {
        throw new Error(msg + " birbirine esit olmalı");
    }
}
export function vecUyari(boyut1, boyut2, msg) {
    if (boyut1 !== boyut2) {
        var info = boyutUyarisi(boyut1, boyut2, msg);
        throw new Error(info);
    }
}
//# sourceMappingURL=Hatalar.js.map