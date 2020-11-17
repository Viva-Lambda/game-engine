// yardimci arayuz ve fonksiyonlar

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
