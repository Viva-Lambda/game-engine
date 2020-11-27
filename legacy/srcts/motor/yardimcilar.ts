// yardimci arayuz ve fonksiyonlar
import {GLM} from "gl-matrix";

export interface UniformInfo {
  isim: string;
  konum: WebGLUniformLocation;
}
export function uniformInfoYap(ad: string,
                               k: WebGLUniformLocation): UniformInfo {
  return {isim : ad, konum : k};
}
export interface AttribInfo {
  isim: string;
  konum: GLint;
  boyut: number;
  tip: GLenum;
  normalizeMi: boolean;
  adim: number;
  uzaklik: number;
}
export function attribInfoYap(ad: string, knm: GLint, byt: number, tip: GLenum,
                              nmi: boolean, adm: number,
                              uzk: number): AttribInfo {
  return {
    isim : ad,
    konum : knm,
    boyut : byt,
    tip : tip,
    normalizeMi : nmi,
    adim : adm,
    uzaklik : uzk
  };
}

export function glmdenListeAl(vecMat: GLM.IArray): Array<number> {
  var cikti: Array<number> = [];
  for (var index in vecMat) {
    cikti.push(vecMat[index]);
  }
  return cikti;
}
export function derece2Radyan(aciDerece: number): number {
  /* Derece ile gelen açı radyana donusur

     @aciDerece derece ile ifade edilen aci

   */
  var pi = Math.PI;
  return aciDerece * pi / 180;
}
export function vecMatBoyutKontrol(vecMat: GLM.IArray, istenenBoyut: number,
                                   mesaj: string): boolean {
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
