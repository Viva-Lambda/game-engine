import { vecUyari, boyutKontrol, boyutUyarisi } from "./Hatalar.js";
export function derece2Radyan(aciDerece) {
    var pi = Math.PI;
    return aciDerece * pi / 180;
}
export function rad2derece(rad) {
    return rad * 180 / Math.PI;
}
function aralikMatriksi(eskiMin, eskiMaks, yeniMin, yeniMaks) {
    let yf = yeniMaks - yeniMin;
    let ef = eskiMaks - eskiMin;
    let arr = [];
    arr.push(yf / ef);
    arr.push(-1 * eskiMin * yf / ef);
    arr.push(yeniMin);
    arr.push(0);
    return arr;
}
function aralikDegistir(i, eskiMin, eskiMaks, yeniMin, yeniMaks) {
    if (i <= eskiMin || i >= eskiMaks) {
        throw new Error("Vektor verilen eski aralikta degil: " + i.toString() +
            " aralik min:" + eskiMin.toString() + " aralik maks:" +
            eskiMaks.toString());
    }
    let eski = (i - eskiMin) / (eskiMaks - eskiMin);
    let yeni = ((yeniMaks - yeniMin) * eski) + yeniMin;
    return yeni;
}
function mapMulti(arr, args, fn) {
    let anahtarlar = [...args[0].keys()];
    if (arr.length !== anahtarlar.length) {
        throw new Error("Uygulanacak arguman sayisi listenin eleman sayisindan" +
            "farkli: eleman sayisi: " + arr.length.toString() + " " +
            "arguman sayisi: " + anahtarlar.length.toString());
    }
    let argumanlar = [];
    for (var indeks of anahtarlar) {
        var asarr = [];
        for (var arguman of args) {
            asarr.push(arguman[indeks]);
        }
        argumanlar.push([arr[indeks], asarr]);
    }
    return argumanlar.map(fn);
}
class V {
    static genislet(v) {
        let liste = v.arr;
        liste.push(1.0);
        return liste;
    }
    static aralikDegistir(v, eskiler, yeniler) {
        let vkp = v.kopyala();
        let eskimin = eskiler[0];
        let eskimaks = eskiler[1];
        let yenimin = yeniler[0];
        let yenimaks = yeniler[1];
        let argumanlar = [eskimin, eskimaks, yenimin, yenimaks];
        var fn = function (karr) {
            let k = karr[0];
            let arr = karr[1];
            return aralikDegistir(k, arr[0], arr[1], arr[2], arr[3]);
        };
        let vkparr = vkp.arr;
        vkparr = mapMulti(vkparr, argumanlar, fn);
        vkp.arr = vkparr;
        return vkp;
    }
    aralikDegistir(eskiler, yeniler) {
        return V.aralikDegistir(this, eskiler, yeniler);
    }
    genislet() { return this; }
    static mapfn(v, fn) {
        let a = v.arr;
        return a.map(fn);
    }
    mapfn(fn) { this.arr = V.mapfn(this, fn); }
    static mapMulti(v, argumanlar, fn) {
        let varr = v.arr;
        return mapMulti(varr, argumanlar, fn);
    }
    mapMulti(argumanlar, fn) {
        this.arr = mapMulti(this.arr, argumanlar, fn);
    }
    static aralikMatriksi(eskiler, yeniler) {
        let eskimin = eskiler[0];
        let eskimaks = eskiler[1];
        let yenimin = yeniler[0];
        let yenimaks = yeniler[1];
        let anahtarlar = [...eskimin.keys()];
        let argumanlar = [eskimin, eskimaks, yenimin, yenimaks];
        let sonuc = [];
        for (var a of anahtarlar) {
            let emin = argumanlar[0][a];
            let emaks = argumanlar[1][a];
            let ymin = argumanlar[2][a];
            let ymaks = argumanlar[3][a];
            let arr = aralikMatriksi(emin, emaks, ymin, ymaks);
            sonuc.push(arr);
        }
        return sonuc;
    }
    aralikMatriksi(eskiler, yeniler) {
        return V.aralikMatriksi(eskiler, yeniler);
    }
    static nokta(v1, v2) { return V.ic(v1, v2); }
    nokta(v) { this.ic(v); }
    static skalerCarp(v1, v2) { return V.ic(v1, v2); }
    skalerCarp(v) { this.ic(v); }
    static ic(v1, v2) {
        let v1len = v1.uzunluk;
        let v2len = v2.uzunluk;
        vecUyari(v1len.toString(), v2len.toString(), "ic carpim boyutu");
        var sayac = 0;
        for (var i = 0; i < v1len; i++) {
            sayac += v1.arr[i] * v2.arr[i];
        }
        return sayac;
    }
    ;
    static negatif(v) {
        let varr = v.arr.map((a) => { return -1 * a; });
        v.arr = varr;
        return v;
    }
    negatif() { this.arr = V.negatif(this).arr; }
    static sayiIslemi(v, s, islem) {
        var fn = function (i) {
            let res;
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
                default: {
                    res = i + s;
                }
            }
            return res;
        };
        let v2 = v.kopyala();
        v2.mapfn(fn);
        return v2;
    }
    static vecIslemi(v1, v2, islem) {
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
    static topla(v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "toplama");
        }
        else {
            return V.sayiIslemi(v, el, "toplama");
        }
    }
    static cikar(v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "cikarma");
        }
        else {
            return V.sayiIslemi(v, el, "cikarma");
        }
    }
    static carp(v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "carpma");
        }
        else {
            return V.sayiIslemi(v, el, "carpma");
        }
    }
    static bol(v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "bolme");
        }
        else {
            return V.sayiIslemi(v, el, "bolme");
        }
    }
    ic(v) { return V.ic(this, v); }
    topla(el) { this.arr = V.topla(this, el).arr; }
    cikar(el) { this.arr = V.cikar(this, el).arr; }
    carp(el) { this.arr = V.carp(this, el).arr; }
    ;
    bol(el) { this.arr = V.bol(this, el).arr; }
    ;
}
export class V2 extends V {
    constructor(x, y) {
        super();
        this.uzunluk = 2;
        this._x = x;
        this._y = y;
    }
    kopyala() { return new V2(this._x, this._y); }
    get x() { return this._x; }
    get y() { return this._y; }
    genislet() {
        let arr = V.genislet(this);
        let v = new V3(0, 0, 0);
        v.arr = arr;
        return v;
    }
    get normalize() {
        var buyukluk = this.norm;
        return new V2(this.x / buyukluk, this.y / buyukluk);
    }
    get norm() {
        var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
        let buyukluk = Math.sqrt(toplam);
        if (buyukluk === 0) {
            buyukluk = 1;
        }
        return buyukluk;
    }
    set x(val) { this._x = val; }
    set y(val) { this._y = val; }
    get arr() { return [this.x, this.y]; }
    set arr(ar) {
        this.x = ar[0];
        this.y = ar[1];
    }
}
export class V3 extends V2 {
    constructor(x, y, z) {
        super(x, y);
        this.uzunluk = 3;
        this._z = z;
    }
    kopyala() { return new V3(this._x, this._y, this._z); }
    get z() { return this._z; }
    get norm() {
        var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
        toplam += Math.pow(this.z, 2);
        if (toplam === 0) {
            return 1;
        }
        var buyukluk = Math.sqrt(toplam);
        return buyukluk;
    }
    get normalize() {
        var buyukluk = this.norm;
        return new V3(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk);
    }
    set z(val) { this._z = val; }
    get arr() { return [this.x, this.y, this.z]; }
    set arr(ar) {
        this.x = ar[0];
        this.y = ar[1];
        this.z = ar[2];
    }
    genislet() {
        let arr = V.genislet(this);
        let v = new V4(0, 0, 0, 0);
        v.arr = arr;
        return v;
    }
    static caprazCarp(v1, v2) {
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
    caprazCarp(v) { this.arr = V3.caprazCarp(this, v).arr; }
}
export class V4 extends V3 {
    constructor(x, y, z, w) {
        super(x, y, z);
        this.uzunluk = 4;
        this._w = w;
    }
    kopyala() { return new V4(this._x, this._y, this._z, this._w); }
    set w(val) { this._w = val; }
    get w() { return this._w; }
    get normalize() {
        var buyukluk = this.norm;
        return new V4(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk, this.w / buyukluk);
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
    get arr() { return [this.x, this.y, this.z, this.w]; }
    set arr(ar) {
        this.x = ar[0];
        this.y = ar[1];
        this.z = ar[2];
        this.w = ar[3];
    }
    genislet() {
        let arr = V.genislet(this);
        let v = new V5(0, 0, 0, 0, 0);
        v.arr = arr;
        return v;
    }
}
export class V5 extends V4 {
    constructor(x, y, z, w, a) {
        super(x, y, z, w);
        this.uzunluk = 5;
        this._a = a;
    }
    kopyala() { return new V5(this._x, this._y, this._z, this._w, this._a); }
    set a(val) { this._a = val; }
    get a() { return this._a; }
    get normalize() {
        var buyukluk = this.norm;
        return new V5(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk, this.w / buyukluk, this.a / buyukluk);
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
    get arr() { return [this.x, this.y, this.z, this.w]; }
    set arr(ar) {
        this.x = ar[0];
        this.y = ar[1];
        this.z = ar[2];
        this.w = ar[3];
        this.a = ar[4];
    }
}
class Mat {
    static mapfn(mat, fn) {
        let a = mat.arr;
        return a.map((ar) => { return ar.map(fn); });
    }
    static mapMulti(mat, argumanlar, fn) {
        let a = mat.arr;
        return a.map((ar) => { return mapMulti(ar, argumanlar, fn); });
    }
    static aralikDegistir(mat, eskiler, yeniler) {
        let mkp = mat.kopyala();
        let eskimin = eskiler[0];
        let eskimaks = eskiler[1];
        let yenimin = yeniler[0];
        let yenimaks = yeniler[1];
        let argumanlar = [eskimin, eskimaks, yenimin, yenimaks];
        var fn = function (karr) {
            let k = karr[0];
            let arr = karr[1];
            return aralikDegistir(k, arr[0], arr[1], arr[2], arr[3]);
        };
        let narr = Mat.mapMulti(mkp, argumanlar, fn);
        mkp.arr = narr;
        return mkp;
    }
    mapfn(fn) { this.arr = Mat.mapfn(this, fn); }
    aralikDegistir(eskiler, yeniler) {
        this.arr = Mat.aralikDegistir(this, eskiler, yeniler).arr;
    }
    ic(el) { this.arr = Mat.matmul(this, el); }
    ;
    ic_vektor(el) {
        let v = el.kopyala();
        let arr = Mat.mat2vec(this, el);
        v.arr = arr;
        return v;
    }
    ;
    topla(el) { this.arr = Mat.toplaSayi(this, el).arr; }
    ;
    cikar(el) { this.arr = Mat.cikarSayi(this, el).arr; }
    ;
    carp(el) { this.arr = Mat.carpSayi(this, el).arr; }
    ;
    bol(el) { this.arr = Mat.bolSayi(this, el).arr; }
    ;
    doldur(s) { this.arr = Mat.doldur(this, s).arr; }
    caprazDoldur(s) {
        this.arr = Mat.caprazDoldur(this, s);
    }
    static hucreKoy(mat, strNo, stnNo, v) {
        let arr = mat.arr;
        arr[strNo][stnNo] = v;
        mat.arr = arr;
        return mat;
    }
    hucreKoy(strNo, stnNo, v) {
        this.arr = Mat.hucreKoy(this, strNo, stnNo, v).arr;
    }
    static satirKoy(mat, strNo, satir) {
        return Mat.satirSutunKoy(mat, strNo, satir, true);
    }
    ;
    static sutunKoy(mat, stnNo, sutun) {
        return Mat.satirSutunKoy(mat, stnNo, sutun, false);
    }
    ;
    sutunKoy(stnNo, sutun) {
        this.satirSutunKoy(stnNo, sutun, false);
    }
    ;
    satirKoy(strNo, satir) {
        this.satirSutunKoy(strNo, satir, true);
    }
    ;
    satirSutunKoy(elNo, el, satirMi) {
        this.arr = Mat.satirSutunKoy(this, elNo, el, satirMi).arr;
    }
    ;
    static satirSutunKoy(mat, elNo, el, satirMi) {
        let vuzun;
        let msj;
        let icerik;
        let msjstr;
        let uzun;
        if (satirMi === true) {
            msjstr = "satir";
            uzun = mat.satir_sayisi;
        }
        else {
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
        }
        else {
            vuzun = el.length;
            icerik = el;
        }
        if (vuzun !== uzun) {
            msj = boyutKontrol(vuzun, "vektor uzunlugu", uzun, uzun);
            throw new Error(msj);
        }
        let arr = mat.arr;
        if (satirMi === true) {
            arr[elNo] = icerik;
        }
        else {
            for (var i = 0; i < icerik.length; i++) {
                arr[i][elNo] = icerik[i];
            }
        }
        mat.arr = arr;
        return mat;
    }
    static devir(mat) {
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
    devir() { this.arr = Mat.devir(this).arr; }
    static doldur(mat, s) {
        let matarr = mat.arr;
        for (var i = 0; i < mat.satir_sayisi; i++) {
            for (var k = 0; k < mat.sutun_sayisi; k++) {
                matarr[i][k] = s;
            }
        }
        let kpy = mat.kopyala();
        kpy.arr = matarr;
        return kpy;
    }
    static caprazDoldur(mat, s) {
        let matar = mat.arr;
        var fn = function (matarr, p, i, k) {
            if (p instanceof Array) {
                matarr[i][k] = p[i];
            }
            else {
                matarr[i][k] = p;
            }
            return matarr;
        };
        if (s instanceof V) {
            s = s.arr;
        }
        if (s instanceof Array) {
            if (mat.satir_sayisi !== s.length) {
                throw new Error(boyutUyarisi(mat.satir_sayisi.toString(), s.length.toString(), "doldurma listesinin boyu matriksin" + " satirlari"));
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
    static matmul(matA, matB) {
        if (matA.satir_sayisi !== matB.sutun_sayisi) {
            let uyari = boyutUyarisi(matA.satir_sayisi.toString(), matB.sutun_sayisi.toString(), "matrix satir sutun");
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
    static mat2vec(mat, vec) {
        let vecUzunluk = vec.uzunluk;
        if (mat.sutun_sayisi !== vecUzunluk) {
            var uyari = boyutUyarisi(mat.sutun_sayisi.toString(), vecUzunluk.toString(), "matrix satir vector uzunluk");
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
    static sayiIslemi(mat, s, islemTipi) {
        let matarr = mat.arr;
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
    static toplaSayi(mat, s) {
        return Mat.sayiIslemi(mat, s, "toplama");
    }
    static cikarSayi(mat, s) {
        return Mat.sayiIslemi(mat, s, "cikarma");
    }
    static carpSayi(mat, s) {
        return Mat.sayiIslemi(mat, s, "carpma");
    }
    static bolSayi(mat, s) {
        return Mat.sayiIslemi(mat, s, "bolme");
    }
    listeAl() {
        let vekliste = this.arr;
        var liste = [];
        for (var vekarr of vekliste) {
            for (var v of vekarr) {
                liste.push(v);
            }
        }
        return liste;
    }
}
export class Mat2 extends Mat {
    constructor() {
        super();
        this.satir_sayisi = 2;
        this.sutun_sayisi = 2;
        this.r1 = new V2(1, 0);
        this.r2 = new V2(0, 1);
    }
    get arr() { return [this.r1.arr, this.r2.arr]; }
    set arr(arr) {
        this.r1 = new V2(arr[0][0], arr[0][1]);
        this.r2 = new V2(arr[1][0], arr[1][1]);
    }
    kopyala() {
        let nmat = new Mat2();
        nmat.arr = this.arr;
        return nmat;
    }
    ic_vektor(el) {
        let arr = Mat.mat2vec(this, el);
        return new V2(arr[0], arr[1]);
    }
}
export class Mat3 extends Mat {
    constructor() {
        super();
        this.satir_sayisi = 3;
        this.sutun_sayisi = 3;
        this.r1 = new V3(1, 0, 0);
        this.r2 = new V3(0, 1, 0);
        this.r3 = new V3(0, 0, 1);
    }
    set arr(arr) {
        this.r1 = new V3(arr[0][0], arr[0][1], arr[0][2]);
        this.r2 = new V3(arr[1][0], arr[1][1], arr[1][2]);
        this.r3 = new V3(arr[2][0], arr[2][1], arr[2][2]);
    }
    get arr() {
        return [this.r1.arr, this.r2.arr, this.r3.arr];
    }
    kopyala() {
        let nmat = new Mat3();
        nmat.arr = this.arr;
        return nmat;
    }
}
export class Mat4 extends Mat {
    constructor() {
        super();
        this.satir_sayisi = 4;
        this.sutun_sayisi = 4;
        this.r1 = new V4(1, 0, 0, 0);
        this.r2 = new V4(0, 1, 0, 0);
        this.r3 = new V4(0, 0, 1, 0);
        this.r4 = new V4(0, 0, 0, 1);
    }
    get arr() {
        return [this.r1.arr, this.r2.arr, this.r3.arr, this.r4.arr];
    }
    set arr(arr) {
        this.r1 = new V4(arr[0][0], arr[0][1], arr[0][2], arr[0][3]);
        this.r2 = new V4(arr[1][0], arr[1][1], arr[1][2], arr[1][3]);
        this.r3 = new V4(arr[2][0], arr[2][1], arr[2][2], arr[2][3]);
        this.r4 = new V4(arr[3][0], arr[3][1], arr[3][2], arr[3][3]);
    }
    kopyala() {
        let nmat = new Mat4();
        nmat.arr = this.arr;
        return nmat;
    }
}
//# sourceMappingURL=Matrix.js.map