// girdi klavye vs için genel obje

interface KlavyeTusu {
  [index: string]: string;
}
interface TusDurumu {
  [index: string]: boolean;
}
export var KlavyeTuslari: KlavyeTusu = {
  Sol : "ArrowLeft",
  Sag : "ArrowRight",
  Yukari : "ArrowUp",
  Asagi : "ArrowDown",
  // alfabe
  A : "A",
  B : "B",
  C : "C",
  D : "D",
  E : "E",
  F : "F",
  G : "G",
  H : "H",
  I : "I",
  J : "J",
  K : "K",
  L : "L",
  M : "M",
  N : "N",
  O : "O",
  P : "P",
  Q : "Q",
  R : "R",
  S : "S",
  T : "T",
  U : "U",
  V : "V",
  W : "W",
  Y : "Y",
  Z : "Z",
  a : "a",
  b : "b",
  c : "c",
  d : "d",
  e : "e",
  f : "f",
  g : "g",
  h : "h",
  i : "i",
  j : "j",
  k : "k",
  l : "l",
  m : "m",
  n : "n",
  o : "o",
  p : "p",
  q : "q",
  r : "r",
  s : "s",
  t : "t",
  u : "u",
  v : "v",
  w : "w",
  y : "y",
  z : "z",
  // sayilar
  Sifir : "Digit0",
  Bir : "Digit1",
  Iki : "Digit2",
  Uc : "Digit3",
  Dort : "Digit4",
  Bes : "Digit5",
  Alti : "Digit6",
  Yedi : "Digit7",
  Sekiz : "Digit8",
  Dokuz : "Digit9",
  // son tus
  Escape : "Escape"
};
var TusDurumlari: TusDurumu = {
  "ArrowLeft" : false,
  "ArrowRight" : false,
  "ArrowUp" : false,
  "ArrowDown" : false,
  // alfabe
  "A" : false,
  "B" : false,
  "C" : false,
  "D" : false,
  "E" : false,
  "F" : false,
  "G" : false,
  "H" : false,
  "I" : false,
  "J" : false,
  "K" : false,
  "L" : false,
  "M" : false,
  "N" : false,
  "O" : false,
  "P" : false,
  "Q" : false,
  "R" : false,
  "S" : false,
  "T" : false,
  "U" : false,
  "V" : false,
  "W" : false,
  "Y" : false,
  "Z" : false,
  "a" : false,
  "b" : false,
  "c" : false,
  "d" : false,
  "e" : false,
  "f" : false,
  "g" : false,
  "h" : false,
  "i" : false,
  "j" : false,
  "k" : false,
  "l" : false,
  "m" : false,
  "n" : false,
  "o" : false,
  "p" : false,
  "q" : false,
  "r" : false,
  "s" : false,
  "t" : false,
  "u" : false,
  "v" : false,
  "w" : false,
  "y" : false,
  "z" : false,
  // sayilar
  "Digit0" : false,
  "Digit1" : false,
  "Digit2" : false,
  "Digit3" : false,
  "Digit4" : false,
  "Digit5" : false,
  "Digit6" : false,
  "Digit7" : false,
  "Digit8" : false,
  "Digit9" : false,
  // son tus
  "Escape" : false
}

var _tuslarBasiliMi: TusDurumu = TusDurumlari;

var _oncekiBasiliDurum: TusDurumu = {};
var _tuslarTiklandiMi: TusDurumu = {};

export class KlavyeGirdi {
  tuslar: KlavyeTusu = KlavyeTuslari;
  constructor() {}
  _tusBasilir(olay: KeyboardEvent) {
    var tdurumu = _tuslarBasiliMi;
    tdurumu[olay.key] = true;
    _tuslarBasiliMi = tdurumu;
  }
  _tusKalkar(olay: KeyboardEvent) { _tuslarBasiliMi[olay.key] = false; }
  tusBasiliMi(tusKodu: string): boolean { return _tuslarBasiliMi[tusKodu]; }
  tusTiklandiMi(tusKodu: string): boolean { return _tuslarTiklandiMi[tusKodu]; }
  guncelle() {
    for (var tus in this.tuslar) {
      // tus index
      let ktusu: string = this.tuslar[tus];
      _tuslarTiklandiMi[ktusu] =
          (!_oncekiBasiliDurum[ktusu]) && _tuslarBasiliMi[ktusu];
      _oncekiBasiliDurum[ktusu] = _tuslarBasiliMi[ktusu];
    }
  }
  baslat(kanvasId: string) {
    var kanvas: HTMLCanvasElement | null =
        document.getElementById(kanvasId) as HTMLCanvasElement;
    if (kanvas == null) {
      throw new Error("Ilgili kanvas elemani bulunamadi: " + kanvasId);
    }
    var oyunBody: HTMLElement | null = document.getElementById("oyun-body");
    if (oyunBody === null) {
      throw new Error("Ilgili oyun body elemani bulunamadi: ");
    }

    window.addEventListener("keyup", this._tusKalkar);
    window.addEventListener("keydown", this._tusBasilir);
  }
}
