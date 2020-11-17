/*
Cesitli kontroller ve hatalar
 */
export function boyutUyarisi(boyut1: string, boyut2: string,
                             boyutTuru: string): string {
  let info: string = "Verili " + boyutTuru + " boyutlari ortusmuyor: ";
  info += "boyut1: " + boyut1;
  info += " boyut2: " + boyut2;
  return info;
}
export function boyutKontrol(verilenBoyut: number, verilenTur: string,
                             istenenBuyuk: number,
                             istenenKucuk: number): string {
  let bytstr: string = verilenBoyut.toString();
  let istnbstr: string = istenenBuyuk.toString();
  let istnkstr: string = istenenKucuk.toString();
  let msj = "Verilen " + verilenTur + ": " + bytstr + " " + istnbstr +
            " den buyuk " + istnkstr + " den kucuk olmali";
  return msj
}
export function esitHatasi(b1: number, b2: number, msg: string) {
  if (b1 === b2) {
    throw new Error(msg + " birbirine esit olamaz");
  }
}
export function esitDegilHatasi(b1: number, b2: number, msg: string) {
  if (b1 !== b2) {
    throw new Error(msg + " birbirine esit olmalı");
  }
}
export function vecUyari(boyut1: string, boyut2: string, msg: string): void {
  if (boyut1 !== boyut2) {
    var info = boyutUyarisi(boyut1, boyut2, msg);
    throw new Error(info);
  }
}
