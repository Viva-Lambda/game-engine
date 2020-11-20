// matriks kutuphanesi
import {vecUyari, boyutKontrol, boyutUyarisi} from "./Hatalar.js";
export function derece2Radyan(aciDerece: number): number {
  /* Derece ile gelen açı radyana donusur

     @aciDerece derece ile ifade edilen aci

   */
  var pi = Math.PI;
  return aciDerece * pi / 180;
}

export function rad2derece(rad: number): number {
  /*
     radyan olarak gelen açi dereceye donusur
   */
  return rad * 180 / Math.PI;
}
function aralikMatriksi(eskiMin: number, eskiMaks: number, yeniMin: number,
                        yeniMaks: number): Array<number> {
  let yf = yeniMaks - yeniMin;
  let ef = eskiMaks - eskiMin;
  let arr: Array<number> = [];
  arr.push(yf / ef);
  arr.push(-1 * eskiMin * yf / ef);
  arr.push(yeniMin);
  arr.push(0);
  return arr;
}

function aralikDegistir(i: number, eskiMin: number, eskiMaks: number,
                        yeniMin: number, yeniMaks: number) {
  /*
     eski aralikta bulunan @i yeni araliga çekilir. Araliklar [x,y] olarak
     aliniyor
   */
  if (i <= eskiMin || i >= eskiMaks) {
    throw new Error("Vektor verilen eski aralikta degil: " + i.toString() +
                    " aralik min:" + eskiMin.toString() + " aralik maks:" +
                    eskiMaks.toString());
  }
  let eski = (i - eskiMin) / (eskiMaks - eskiMin);
  let yeni = ((yeniMaks - yeniMin) * eski) + yeniMin;
  return yeni;
  /*
     ((yeniMaks - yeniMin)*(i - eskiMin) / (eskiMaks - eskiMin))
     yf = yeniMaks - yeniMin
     ef = eskiMaks - eskiMin
     (i * yf - eskiMin *yf) / ef
     i* yf/ef
   i1,i2,i3  [i1 * yf/ef,
              -1 * eskiMin * yf /ef,
              yeniMin, ,
              0
              ]
    i1, i2, i3, 1  [i1*yf/ef,           i2*yf/ef,         i3*yf/ef
    k1, k2, k3, 1  [i1*-1 * emin*yf/ef, i2*-1*emin*yf/ef, i3*-1*emin*yf/ef,
    p1, p2, p3, 1  [i1*ymin,            i2*ymin,          i3*ymin
    l1, l2, l3, 1  [0,                  0,                0
    [i1*yf/ef (x),           i2*yf/ef (y), i3*yf/ef (z),      0 (w)
    [i1*-1 * emin*yf/ef, i2*-1*emin*yf/ef, i3*-1*emin*yf/ef,  0
    [i1*ymin,            i2*ymin,          i3*ymin,           0
    [0,                  0,                0,                 1

   */
}
function mapMulti(arr: Array<number>, args: Array<Array<number>>,
                  fn: (i: [ number, Array<number>]) => number): Array<number> {
  /*
     argumanlarin liste olarak verildigi bir map fonksiyonu
     @arr in her bir elemanina farkli degerler alan fn fonksiyonunu uygulamak
     için
   */
  let anahtarlar = [...args[0].keys() ];
  if (arr.length !== anahtarlar.length) {
    throw new Error("Uygulanacak arguman sayisi listenin eleman sayisindan" +
                    "farkli: eleman sayisi: " + arr.length.toString() + " " +
                    "arguman sayisi: " + anahtarlar.length.toString());
  }
  let argumanlar: Array<[ number, Array<number>]> = [];
  for (var indeks of anahtarlar) {
    var asarr: Array<number> = [];
    for (var arguman of args) {
      asarr.push(arguman[indeks]);
    }
    argumanlar.push([ arr[indeks], asarr ]);
  }
  return argumanlar.map(fn);
}
/*
function identityYap(boyut: number): Array<Array<number>> {

  //  Verili boyutta satir tabanli birim matrisi yapar

  // identity matrix verili boyutta yapar
  var mat: Array<Array<number>> = new Array(boyut);
  for (var i: number = 0; i < boyut; i++) {
    var satir: Array<number> = new Array(boyut);
    mat[i] = satir;
    for (var k = 0; k < boyut; k++) {
      if (i === k) {
        mat[i][k] = 1;
      } else {
        mat[i][k] = 0;
      }
    }
  }
  return mat;
}
*/

abstract class V {
  /*
     N boyutlu vektor objesi
   */
  abstract uzunluk: number;
  abstract kopyala(): V;
  abstract set arr(arr: Array<number>);
  abstract get arr(): Array<number>;
  static genislet(v: V): Array<number> {
    /* Vektoru arttirilmis vektore (augmented vector) donusturur.
     */
    let liste = v.arr;
    liste.push(1.0);
    return liste;
  }
  static aralikDegistir(v: V, eskiler: [ Array<number>, Array<number>],
                        yeniler: [ Array<number>, Array<number>]): V {
    /*
       Vektorun degerini eski araliktan yeni araliga degistir
     */
    let vkp = v.kopyala();
    let eskimin = eskiler[0];
    let eskimaks = eskiler[1];
    let yenimin = yeniler[0];
    let yenimaks = yeniler[1];
    let argumanlar = [ eskimin, eskimaks, yenimin, yenimaks ];
    var fn = function(karr: [ number, Array<number>]) {
      let k = karr[0];
      let arr = karr[1];
      return aralikDegistir(k, arr[0], arr[1], arr[2], arr[3]);
    };
    let vkparr = vkp.arr;
    vkparr = mapMulti(vkparr, argumanlar, fn);
    vkp.arr = vkparr;
    return vkp;
  }
  aralikDegistir(eskiler: [ Array<number>, Array<number>],
                 yeniler: [ Array<number>, Array<number>]): V {
    return V.aralikDegistir(this, eskiler, yeniler);
  }
  genislet(): V { return this; }
  static mapfn(v: V, fn: (n: number) => number): Array<number> {
    /*
       Vektorun elemanlarina bir fonksiyon uygular
     */
    let a = v.arr;
    return a.map(fn);
  }
  mapfn(fn: (n: number) => number): void { this.arr = V.mapfn(this, fn); }
  static mapMulti(v: V, argumanlar: Array<Array<number>>,
                  fn: (n: [ number, Array<number>]) => number): Array<number> {
    /*
     */
    let varr = v.arr;
    return mapMulti(varr, argumanlar, fn);
  }
  mapMulti(argumanlar: Array<Array<number>>,
           fn: (n: [ number, Array<number>]) => number): void {
    /*
     */
    this.arr = mapMulti(this.arr, argumanlar, fn);
  }
  static aralikMatriksi(eskiler: [ Array<number>, Array<number>],
                        yeniler: [ Array<number>, Array<number>]):
      Array<Array<number>> {
    /*
       V için aralik listeleri al
     */
    let eskimin = eskiler[0];
    let eskimaks = eskiler[1];
    let yenimin = yeniler[0];
    let yenimaks = yeniler[1];
    let anahtarlar = [...eskimin.keys() ];
    let argumanlar = [ eskimin, eskimaks, yenimin, yenimaks ];
    let sonuc: Array<Array<number>> = [];
    for (var a of anahtarlar) {
      //
      let emin = argumanlar[0][a];
      let emaks = argumanlar[1][a];
      let ymin = argumanlar[2][a];
      let ymaks = argumanlar[3][a];
      let arr = aralikMatriksi(emin, emaks, ymin, ymaks);
      sonuc.push(arr);
    }
    return sonuc;
  }
  aralikMatriksi(eskiler: [ Array<number>, Array<number>],
                 yeniler: [ Array<number>, Array<number>]):
      Array<Array<number>> {
    return V.aralikMatriksi(eskiler, yeniler);
  }

  static nokta(v1: V, v2: V): number { return V.ic(v1, v2); }
  nokta(v: V) { this.ic(v); }

  static skalerCarp(v1: V, v2: V): number { return V.ic(v1, v2); }
  skalerCarp(v: V) { this.ic(v); }
  static ic(v1: V, v2: V): number {
    /*
       Iki vektoru carpar, skaler/nokta/ic carpim
     */
    // ic carpim
    let v1len = v1.uzunluk;
    let v2len = v2.uzunluk;
    vecUyari(v1len.toString(), v2len.toString(), "ic carpim boyutu");
    var sayac = 0;
    for (var i = 0; i < v1len; i++) {
      sayac += v1.arr[i] * v2.arr[i];
    }
    return sayac;
  };
  static negatif(v: V): V {
    // unsurlarin negatif halini alan vektor
    let varr = v.arr.map((a) => { return -1 * a; });
    v.arr = varr;
    return v;
  }
  negatif(): void { this.arr = V.negatif(this).arr; }
  static sayiIslemi(v: V, s: number,
                    islem: "toplama" | "cikarma" | "carpma" | "bolme"): V {
    /*
       Vektorun unsurlarini bir sayi ile topla | cikar | carp | bol
     */
    var fn = function(i: number) {
      let res: number;
      switch (islem) {
      case "toplama": {
        res = i + s;
        break;
      }
      case "cikarma": {
        res = i - s;
        break;
      }
      case "carpma": {
        res = i * s;
        break;
      }
      case "bolme": {
        if (s === 0) {
          throw new Error("Bolme islemi için sifir payda verilmis.");
        }
        res = i / s;
        break;
      }
      default: { res = i + s; }
      }
      return res;
    };
    let v2 = v.kopyala();
    v2.mapfn(fn);
    return v2;
  }
  static vecIslemi(v1: V, v2: V,
                   islem: "toplama" | "cikarma" | "carpma" | "bolme"): V {
    let arr = new Array(v1.uzunluk);
    let v1len = v1.uzunluk;
    let v2len = v2.uzunluk;
    vecUyari(v1len.toString(), v2len.toString(), islem + " boyutu");

    for (var i = 0; i < v1.uzunluk; i++) {
      switch (islem) {
      case "toplama": {
        arr[i] = v1.arr[i] + v2.arr[i];
        break;
      }
      case "cikarma": {
        arr[i] = v1.arr[i] - v2.arr[i];
        break;
      }
      case "carpma": {
        arr[i] = v1.arr[i] * v2.arr[i];
        break;
      }
      case "bolme": {
        if (v2.arr[i] === 0) {
          throw new Error("Bolme islemi için sifir payda verilmis.");
        }
        arr[i] = v1.arr[i] / v2.arr[i];
        break;
      }
      }
    }
    let v3 = v1.kopyala();
    v3.arr = arr;
    return v3;
  }
  static topla(v: V, el: number | V): V {
    if (el instanceof V) {
      return V.vecIslemi(v, el, "toplama");
    } else {
      return V.sayiIslemi(v, el, "toplama");
    }
  }
  static cikar(v: V, el: number | V): V {
    if (el instanceof V) {
      return V.vecIslemi(v, el, "cikarma");
    } else {
      return V.sayiIslemi(v, el, "cikarma");
    }
  }
  static carp(v: V, el: number | V): V {
    if (el instanceof V) {
      return V.vecIslemi(v, el, "carpma");
    } else {
      return V.sayiIslemi(v, el, "carpma");
    }
  }
  static bol(v: V, el: number | V): V {
    if (el instanceof V) {
      return V.vecIslemi(v, el, "bolme");
    } else {
      return V.sayiIslemi(v, el, "bolme");
    }
  }
  ic(v: V): number { return V.ic(this, v); }
  topla(el: number | V): void { this.arr = V.topla(this, el).arr; }
  cikar(el: number | V): void { this.arr = V.cikar(this, el).arr; }
  carp(el: number | V): void { this.arr = V.carp(this, el).arr; };
  bol(el: number): void { this.arr = V.bol(this, el).arr; };
}
export class V2 extends V {
  _x: number;
  _y: number;
  uzunluk: number = 2;
  constructor(x: number, y: number) {
    super();
    this._x = x;
    this._y = y;
  }
  kopyala() { return new V2(this._x, this._y); }
  get x(): number { return this._x; }
  get y(): number { return this._y; }
  genislet(): V3 {
    let arr = V.genislet(this);
    let v = new V3(0, 0, 0);
    v.arr = arr;
    return v;
  }
  get normalize(): V2 {
    var buyukluk = this.norm;
    return new V2(this.x / buyukluk, this.y / buyukluk);
  }
  get norm(): number {
    var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    let buyukluk = Math.sqrt(toplam);
    if (buyukluk === 0) {
      buyukluk = 1;
    }
    return buyukluk;
  }
  set x(val: number) { this._x = val; }
  set y(val: number) { this._y = val; }
  get arr(): Array<number> { return [ this.x, this.y ]; }
  set arr(ar: Array<number>) {
    this.x = ar[0];
    this.y = ar[1];
  }
}
export class V3 extends V2 {
  _z: number;
  uzunluk: number = 3;
  constructor(x: number, y: number, z: number) {
    super(x, y);
    this._z = z;
  }
  kopyala() { return new V3(this._x, this._y, this._z); }
  get z(): number { return this._z; }
  get norm(): number {
    var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    toplam += Math.pow(this.z, 2);
    if (toplam === 0) {
      return 1;
    }
    var buyukluk = Math.sqrt(toplam);
    return buyukluk;
  }
  get normalize(): V3 {
    var buyukluk = this.norm;
    return new V3(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk);
  }
  set z(val) { this._z = val; }
  get arr(): Array<number> { return [ this.x, this.y, this.z ]; }
  set arr(ar: Array<number>) {
    this.x = ar[0];
    this.y = ar[1];
    this.z = ar[2];
  }
  genislet(): V4 {
    let arr = V.genislet(this);
    let v = new V4(0, 0, 0, 0);
    v.arr = arr;
    return v;
  }
  static caprazCarp(v1: V3, v2: V3): V3 {
    var v1len = v1.uzunluk;
    if (v1len !== 3) {
      throw new Error("Capraz carpim için 3 boyut lazim: " + v1len.toString());
    }
    var v2len = v2.uzunluk;
    vecUyari(v1len.toString(), v2len.toString(), "capraz carpim boyutu");
    let x = v1.y * v2.z - v1.z * v2.y;
    let y = v1.z * v2.x - v1.x * v2.z;
    let z = v1.x * v2.y - v1.y * v2.x;
    return new V3(x, y, z);
  }
  caprazCarp(v: V3): void { this.arr = V3.caprazCarp(this, v).arr; }
}
export class V4 extends V3 {
  _w: number;
  uzunluk: number = 4;
  constructor(x: number, y: number, z: number, w: number) {
    super(x, y, z);
    this._w = w;
  }
  kopyala() { return new V4(this._x, this._y, this._z, this._w); }
  set w(val: number) { this._w = val; }
  get w(): number { return this._w; }
  get normalize() {
    var buyukluk = this.norm;
    return new V4(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk,
                  this.w / buyukluk);
  }
  get norm() {
    var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    toplam += Math.pow(this.z, 2) + Math.pow(this.w, 2);
    let buyukluk = Math.sqrt(toplam);
    if (buyukluk === 0) {
      buyukluk = 1;
    }
    return buyukluk;
  }
  get arr(): Array<number> { return [ this.x, this.y, this.z, this.w ]; }
  set arr(ar: Array<number>) {
    this.x = ar[0];
    this.y = ar[1];
    this.z = ar[2];
    this.w = ar[3];
  }
  genislet(): V5 {
    let arr = V.genislet(this);
    let v = new V5(0, 0, 0, 0, 0);
    v.arr = arr;
    return v;
  }
}
export class V5 extends V4 {
  uzunluk: number = 5;
  _a: number;
  constructor(x: number, y: number, z: number, w: number, a: number) {
    super(x, y, z, w);
    this._a = a;
  }
  kopyala() { return new V5(this._x, this._y, this._z, this._w, this._a); }
  set a(val: number) { this._a = val; }
  get a(): number { return this._a; }
  get normalize() {
    var buyukluk = this.norm;
    return new V5(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk,
                  this.w / buyukluk, this.a / buyukluk);
  }
  get norm() {
    var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    toplam += Math.pow(this.z, 2) + Math.pow(this.w, 2);
    toplam += Math.pow(this.a, 2);
    let buyukluk = Math.sqrt(toplam);
    if (buyukluk === 0) {
      buyukluk = 1;
    }
    return buyukluk;
  }
  get arr(): Array<number> { return [ this.x, this.y, this.z, this.w ]; }
  set arr(ar: Array<number>) {
    this.x = ar[0];
    this.y = ar[1];
    this.z = ar[2];
    this.w = ar[3];
    this.a = ar[4];
  }
}
abstract class Mat {
  abstract satir_sayisi: number;
  abstract sutun_sayisi: number;
  abstract kopyala(): Mat;
  abstract set arr(arr: Array<Array<number>>);
  abstract get arr(): Array<Array<number>>;

  static mapfn(mat: Mat, fn: (n: number) => number): Array<Array<number>> {
    let a = mat.arr;
    return a.map((ar) => { return ar.map(fn); });
  }
  static mapMulti(mat: Mat, argumanlar: Array<Array<number>>,
                  fn: (i: [ number, Array<number>]) => number):
      Array<Array<number>> {
    let a = mat.arr;
    return a.map((ar) => { return mapMulti(ar, argumanlar, fn); });
  }
  static aralikDegistir(mat: Mat, eskiler: [ Array<number>, Array<number>],
                        yeniler: [ Array<number>, Array<number>]): Mat {
    let mkp = mat.kopyala();
    let eskimin = eskiler[0];
    let eskimaks = eskiler[1];
    let yenimin = yeniler[0];
    let yenimaks = yeniler[1];
    let argumanlar = [ eskimin, eskimaks, yenimin, yenimaks ];
    var fn = function(karr: [ number, Array<number>]) {
      let k = karr[0];
      let arr = karr[1];
      return aralikDegistir(k, arr[0], arr[1], arr[2], arr[3]);
    };

    let narr = Mat.mapMulti(mkp, argumanlar, fn);
    mkp.arr = narr;
    return mkp;
  }
  mapfn(fn: (n: number) => number): void { this.arr = Mat.mapfn(this, fn); }
  aralikDegistir(eskiler: [ Array<number>, Array<number>],
                 yeniler: [ Array<number>, Array<number>]): void {
    this.arr = Mat.aralikDegistir(this, eskiler, yeniler).arr;
  }
  ic(el: Mat): void { this.arr = Mat.matmul(this, el); };
  ic_vektor(el: V): V {
    let v = el.kopyala();
    let arr = Mat.mat2vec(this, el);
    v.arr = arr;
    return v
  };
  topla(el: number): void { this.arr = Mat.toplaSayi(this, el).arr; };
  cikar(el: number): void { this.arr = Mat.cikarSayi(this, el).arr; };
  carp(el: number): void { this.arr = Mat.carpSayi(this, el).arr; };
  bol(el: number): void { this.arr = Mat.bolSayi(this, el).arr; };
  doldur(s: number): void { this.arr = Mat.doldur(this, s).arr; }
  caprazDoldur(s: number | Array<number>| V): void {
    this.arr = Mat.caprazDoldur(this, s);
  }
  static hucreKoy(mat: Mat, strNo: number, stnNo: number, v: number): Mat {
    let arr = mat.arr;
    arr[strNo][stnNo] = v;
    mat.arr = arr;
    return mat;
  }
  hucreKoy(strNo: number, stnNo: number, v: number) {
    this.arr = Mat.hucreKoy(this, strNo, stnNo, v).arr;
  }
  static satirKoy(mat: Mat, strNo: number, satir: V | Array<number>): Mat {
    return Mat.satirSutunKoy(mat, strNo, satir, true);
  };
  static sutunKoy(mat: Mat, stnNo: number, sutun: V | Array<number>): Mat {
    return Mat.satirSutunKoy(mat, stnNo, sutun, false);
  };
  sutunKoy(stnNo: number, sutun: V | Array<number>): void {
    this.satirSutunKoy(stnNo, sutun, false);
  };
  satirKoy(strNo: number, satir: V | Array<number>): void {
    this.satirSutunKoy(strNo, satir, true);
  };
  satirSutunKoy(elNo: number, el: V | Array<number>, satirMi: boolean): void {
    this.arr = Mat.satirSutunKoy(this, elNo, el, satirMi).arr;
  };
  static satirSutunKoy(mat: Mat, elNo: number, el: V | Array<number>,
                       satirMi: boolean): Mat {
    let vuzun: number;
    let msj: string;
    let icerik: Array<number>;
    let msjstr: string;
    let uzun: number;
    if (satirMi === true) {
      msjstr = "satir";
      uzun = mat.satir_sayisi;
    } else {
      msjstr = "sutun";
      uzun = mat.sutun_sayisi;
    }
    if ((elNo > uzun - 1) && (elNo < 0)) {
      msj = boyutKontrol(elNo, msjstr + " sayisi", 0, uzun);
      throw new Error(msj);
    }
    if (el instanceof V) {
      vuzun = el.uzunluk;
      icerik = el.arr;
    } else {
      vuzun = el.length;
      icerik = el;
    }
    if (vuzun !== uzun) {
      msj = boyutKontrol(vuzun, "vektor uzunlugu", uzun, uzun);
      throw new Error(msj);
    }
    let arr: Array<Array<number>> = mat.arr;
    if (satirMi === true) {
      arr[elNo] = icerik;
    } else {
      for (var i = 0; i < icerik.length; i++) {
        arr[i][elNo] = icerik[i];
      }
    }
    mat.arr = arr;
    return mat;
  }

  static devir(mat: Mat): Mat {
    if (mat.satir_sayisi !== mat.sutun_sayisi) {
      throw new Error("Matriksin satir ve sutun sayisi ayni olmali");
    }
    let m2 = mat.kopyala();
    let matarr = mat.arr;
    for (let i = 0; i < mat.satir_sayisi; i++) {
      for (let k = 0; k < mat.sutun_sayisi; k++) {
        m2.hucreKoy(k, i, matarr[i][k]);
      }
    }
    return m2;
  }
  devir(): void { this.arr = Mat.devir(this).arr; }
  static doldur(mat: Mat, s: number): Mat {
    let matarr = mat.arr;
    for (var i = 0; i < mat.satir_sayisi; i++) {
      for (var k = 0; k < mat.sutun_sayisi; k++) {
        matarr[i][k] = s;
      }
    }
    let kpy = mat.kopyala();
    kpy.arr = matarr;
    return kpy
  }
  static caprazDoldur(mat: Mat,
                      s: number | Array<number>| V): Array<Array<number>> {
    let matar = mat.arr;
    var fn = function(matarr: Array<Array<number>>, p: Array<number>| number,
                      i: number, k: number) {
      if (p instanceof Array) {
        matarr[i][k] = p[i];
      } else {
        matarr[i][k] = p;
      }
      return matarr;
    };
    if (s instanceof V) {
      s = s.arr;
    }
    if (s instanceof Array) {
      if (mat.satir_sayisi !== s.length) {
        throw new Error(
            boyutUyarisi(mat.satir_sayisi.toString(), s.length.toString(),
                         "doldurma listesinin boyu matriksin" + " satirlari"));
      }
    }
    for (var i = 0; i < mat.satir_sayisi; i++) {
      for (var k = 0; k < mat.sutun_sayisi; k++) {
        if (i == k) {
          matar = fn(matar, s, i, k);
        }
      }
    }
    return matar;
  }
  static matmul(matA: Mat, matB: Mat): Array<Array<number>> {
    if (matA.satir_sayisi !== matB.sutun_sayisi) {
      let uyari: string =
          boyutUyarisi(matA.satir_sayisi.toString(),
                       matB.sutun_sayisi.toString(), "matrix satir sutun");
      throw new Error(uyari);
    }
    var sonuc = new Array(matA.satir_sayisi);
    for (var saNo = 0; saNo < matA.satir_sayisi; saNo++) {
      sonuc[saNo] = new Array(matB.sutun_sayisi);
      for (var suNo = 0; suNo < matB.sutun_sayisi; suNo++) {
        var t = 0;
        for (var i = 0; i < matA.sutun_sayisi; i++) {
          let valA = matA.arr[saNo][i];
          let valB = matB.arr[i][suNo];
          let carpim = valA * valB;
          t += carpim;
        }
        sonuc[saNo][suNo] = t;
      }
    }
    return sonuc;
  }
  static mat2vec(mat: Mat, vec: V): Array<number> {
    // matriks vektor carpimi satira sutun ayni olmali
    let vecUzunluk = vec.uzunluk;
    if (mat.sutun_sayisi !== vecUzunluk) {
      var uyari =
          boyutUyarisi(mat.sutun_sayisi.toString(), vecUzunluk.toString(),
                       "matrix satir vector uzunluk");
      throw new Error(uyari);
    }
    var sonuc = new Array(mat.satir_sayisi);
    for (var saNo = 0; saNo < mat.satir_sayisi; saNo++) {
      var satirToplam = 0;
      for (var i = 0; i < mat.sutun_sayisi; i++) {
        var valA = mat.arr[saNo][i];
        var valB = vec.arr[i];
        var carpim = valA * valB;
        satirToplam += carpim;
      }
      sonuc[saNo] = satirToplam;
    }
    return sonuc;
  }
  static sayiIslemi(mat: Mat, s: number, islemTipi: "toplama" | "cikarma" |
                                             "carpma" | "bolme"): Mat {
    let matarr: Array<Array<number>> = mat.arr;
    let kpya = mat.kopyala();
    for (var i = 0; i < mat.satir_sayisi; i++) {
      for (var k = 0; k < mat.sutun_sayisi; k++) {
        switch (islemTipi) {
        case "toplama": {
          matarr[i][k] += s;
          break;
        }
        case "cikarma": {
          matarr[i][k] -= s;
          break;
        }
        case "carpma": {
          matarr[i][k] *= s;
          break;
        }
        case "bolme": {
          if (s == 0) {
            throw new Error("Verilen sayi ile bolumun paydasi 0 oluyor");
          }
          matarr[i][k] /= s;
          break;
        }
        }
      }
    }
    kpya.arr = matarr;
    return kpya;
  }
  static toplaSayi(mat: Mat, s: number): Mat {
    return Mat.sayiIslemi(mat, s, "toplama");
  }
  static cikarSayi(mat: Mat, s: number): Mat {
    return Mat.sayiIslemi(mat, s, "cikarma");
  }
  static carpSayi(mat: Mat, s: number): Mat {
    return Mat.sayiIslemi(mat, s, "carpma");
  }
  static bolSayi(mat: Mat, s: number): Mat {
    return Mat.sayiIslemi(mat, s, "bolme");
  }
  listeAl(): Array<number> {
    let vekliste = this.arr;
    var liste: Array<number> = [];
    for (var vekarr of vekliste) {
      for (var v of vekarr) {
        liste.push(v);
      }
    }
    return liste;
  }
}
export class Mat2 extends Mat {
  r1: V2;
  r2: V2;
  satir_sayisi = 2;
  sutun_sayisi = 2;
  constructor() {
    super();
    this.r1 = new V2(1, 0);
    this.r2 = new V2(0, 1);
  }
  get arr(): Array<Array<number>> { return [ this.r1.arr, this.r2.arr ]; }
  set arr(arr: Array<Array<number>>) {
    this.r1 = new V2(arr[0][0], arr[0][1]);
    this.r2 = new V2(arr[1][0], arr[1][1]);
  }
  kopyala(): Mat2 {
    let nmat = new Mat2();
    nmat.arr = this.arr;
    return nmat;
  }
  ic_vektor(el: V2): V2 {
    let arr = Mat.mat2vec(this, el);
    return new V2(arr[0], arr[1]);
  }
}
export class Mat3 extends Mat {
  r1: V3;
  r2: V3;
  r3: V3;
  satir_sayisi: number = 3;
  sutun_sayisi: number = 3;

  constructor() {
    super();
    this.r1 = new V3(1, 0, 0);
    this.r2 = new V3(0, 1, 0);
    this.r3 = new V3(0, 0, 1);
  }
  set arr(arr: Array<Array<number>>) {
    this.r1 = new V3(arr[0][0], arr[0][1], arr[0][2]);
    this.r2 = new V3(arr[1][0], arr[1][1], arr[1][2]);
    this.r3 = new V3(arr[2][0], arr[2][1], arr[2][2]);
  }
  get arr(): Array<Array<number>> {
    return [ this.r1.arr, this.r2.arr, this.r3.arr ];
  }
  kopyala(): Mat3 {
    let nmat = new Mat3();
    nmat.arr = this.arr;
    return nmat;
  }
}
export class Mat4 extends Mat {
  r1: V4;
  r2: V4;
  r3: V4;
  r4: V4;
  satir_sayisi: number = 4;
  sutun_sayisi: number = 4;
  constructor() {
    super();
    this.r1 = new V4(1, 0, 0, 0);
    this.r2 = new V4(0, 1, 0, 0);
    this.r3 = new V4(0, 0, 1, 0);
    this.r4 = new V4(0, 0, 0, 1);
  }
  get arr(): Array<Array<number>> {
    return [ this.r1.arr, this.r2.arr, this.r3.arr, this.r4.arr ];
  }
  set arr(arr: Array<Array<number>>) {
    this.r1 = new V4(arr[0][0], arr[0][1], arr[0][2], arr[0][3]);
    this.r2 = new V4(arr[1][0], arr[1][1], arr[1][2], arr[1][3]);
    this.r3 = new V4(arr[2][0], arr[2][1], arr[2][2], arr[2][3]);
    this.r4 = new V4(arr[3][0], arr[3][1], arr[3][2], arr[3][3]);
  }
  kopyala(): Mat4 {
    let nmat = new Mat4();
    nmat.arr = this.arr;
    return nmat;
  }
}
