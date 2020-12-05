"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mat4 = exports.Mat3 = exports.Mat2 = exports.V5 = exports.V4 = exports.V3 = exports.V2 = exports.rad2derece = exports.derece2Radyan = void 0;
var Hatalar_js_1 = require("./Hatalar.js");
function derece2Radyan(aciDerece) {
    var pi = Math.PI;
    return aciDerece * pi / 180;
}
exports.derece2Radyan = derece2Radyan;
function rad2derece(rad) {
    return rad * 180 / Math.PI;
}
exports.rad2derece = rad2derece;
function aralikMatriksi(eskiMin, eskiMaks, yeniMin, yeniMaks) {
    var yf = yeniMaks - yeniMin;
    var ef = eskiMaks - eskiMin;
    var arr = [];
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
    var eski = (i - eskiMin) / (eskiMaks - eskiMin);
    var yeni = ((yeniMaks - yeniMin) * eski) + yeniMin;
    return yeni;
}
function mapMulti(arr, args, fn) {
    var anahtarlar = __spreadArrays(args[0]);
    if (arr.length !== anahtarlar.length) {
        throw new Error("Uygulanacak arguman sayisi listenin eleman sayisindan" +
            "farkli: eleman sayisi: " + arr.length.toString() + " " +
            "arguman sayisi: " + anahtarlar.length.toString());
    }
    var argumanlar = [];
    for (var _i = 0, anahtarlar_1 = anahtarlar; _i < anahtarlar_1.length; _i++) {
        var indeks = anahtarlar_1[_i];
        var asarr = [];
        for (var _b = 0, args_1 = args; _b < args_1.length; _b++) {
            var arguman = args_1[_b];
            asarr.push(arguman[indeks]);
        }
        argumanlar.push([arr[indeks], asarr]);
    }
    return argumanlar.map(fn);
}
var V = (function () {
    function V() {
    }
    V.genislet = function (v) {
        var liste = v.arr;
        liste.push(1.0);
        return liste;
    };
    V.aralikDegistir = function (v, eskiler, yeniler) {
        var vkp = v.kopyala();
        var eskimin = eskiler[0];
        var eskimaks = eskiler[1];
        var yenimin = yeniler[0];
        var yenimaks = yeniler[1];
        var argumanlar = [eskimin, eskimaks, yenimin, yenimaks];
        var fn = function (karr) {
            var k = karr[0];
            var arr = karr[1];
            return aralikDegistir(k, arr[0], arr[1], arr[2], arr[3]);
        };
        var vkparr = vkp.arr;
        vkparr = mapMulti(vkparr, argumanlar, fn);
        vkp.arr = vkparr;
        return vkp;
    };
    V.prototype.aralikDegistir = function (eskiler, yeniler) {
        return V.aralikDegistir(this, eskiler, yeniler);
    };
    V.prototype.genislet = function () { return this; };
    V.mapfn = function (v, fn) {
        var a = v.arr;
        return a.map(fn);
    };
    V.prototype.mapfn = function (fn) { this.arr = V.mapfn(this, fn); };
    V.mapMulti = function (v, argumanlar, fn) {
        var varr = v.arr;
        return mapMulti(varr, argumanlar, fn);
    };
    V.prototype.mapMulti = function (argumanlar, fn) {
        this.arr = mapMulti(this.arr, argumanlar, fn);
    };
    V.aralikMatriksi = function (eskiler, yeniler) {
        var eskimin = eskiler[0];
        var eskimaks = eskiler[1];
        var yenimin = yeniler[0];
        var yenimaks = yeniler[1];
        var anahtarlar = __spreadArrays(eskimin);
        var argumanlar = [eskimin, eskimaks, yenimin, yenimaks];
        var sonuc = [];
        for (var _i = 0, anahtarlar_2 = anahtarlar; _i < anahtarlar_2.length; _i++) {
            var a = anahtarlar_2[_i];
            var emin = argumanlar[0][a];
            var emaks = argumanlar[1][a];
            var ymin = argumanlar[2][a];
            var ymaks = argumanlar[3][a];
            var arr = aralikMatriksi(emin, emaks, ymin, ymaks);
            sonuc.push(arr);
        }
        return sonuc;
    };
    V.prototype.aralikMatriksi = function (eskiler, yeniler) {
        return V.aralikMatriksi(eskiler, yeniler);
    };
    V.nokta = function (v1, v2) { return V.ic(v1, v2); };
    V.prototype.nokta = function (v) { this.ic(v); };
    V.skalerCarp = function (v1, v2) { return V.ic(v1, v2); };
    V.prototype.skalerCarp = function (v) { this.ic(v); };
    V.ic = function (v1, v2) {
        var v1len = v1.uzunluk;
        var v2len = v2.uzunluk;
        Hatalar_js_1.vecUyari(v1len.toString(), v2len.toString(), "ic carpim boyutu");
        var sayac = 0;
        for (var i = 0; i < v1len; i++) {
            sayac += v1.arr[i] * v2.arr[i];
        }
        return sayac;
    };
    ;
    V.negatif = function (v) {
        var varr = v.arr.map(function (a) { return -1 * a; });
        v.arr = varr;
        return v;
    };
    V.prototype.negatif = function () { this.arr = V.negatif(this).arr; };
    V.sayiIslemi = function (v, s, islem) {
        var fn = function (i) {
            var res;
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
        var v2 = v.kopyala();
        v2.mapfn(fn);
        return v2;
    };
    V.vecIslemi = function (v1, v2, islem) {
        var arr = new Array(v1.uzunluk);
        var v1len = v1.uzunluk;
        var v2len = v2.uzunluk;
        Hatalar_js_1.vecUyari(v1len.toString(), v2len.toString(), islem + " boyutu");
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
        var v3 = v1.kopyala();
        v3.arr = arr;
        return v3;
    };
    V.topla = function (v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "toplama");
        }
        else {
            return V.sayiIslemi(v, el, "toplama");
        }
    };
    V.cikar = function (v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "cikarma");
        }
        else {
            return V.sayiIslemi(v, el, "cikarma");
        }
    };
    V.carp = function (v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "carpma");
        }
        else {
            return V.sayiIslemi(v, el, "carpma");
        }
    };
    V.bol = function (v, el) {
        if (el instanceof V) {
            return V.vecIslemi(v, el, "bolme");
        }
        else {
            return V.sayiIslemi(v, el, "bolme");
        }
    };
    V.prototype.ic = function (v) { return V.ic(this, v); };
    V.prototype.topla = function (el) { this.arr = V.topla(this, el).arr; };
    V.prototype.cikar = function (el) { this.arr = V.cikar(this, el).arr; };
    V.prototype.carp = function (el) { this.arr = V.carp(this, el).arr; };
    ;
    V.prototype.bol = function (el) { this.arr = V.bol(this, el).arr; };
    ;
    return V;
}());
var V2 = (function (_super) {
    __extends(V2, _super);
    function V2(x, y) {
        var _this = _super.call(this) || this;
        _this.uzunluk = 2;
        _this._x = x;
        _this._y = y;
        return _this;
    }
    V2.prototype.kopyala = function () { return new V2(this._x, this._y); };
    Object.defineProperty(V2.prototype, "x", {
        get: function () { return this._x; },
        set: function (val) { this._x = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V2.prototype, "y", {
        get: function () { return this._y; },
        set: function (val) { this._y = val; },
        enumerable: false,
        configurable: true
    });
    V2.prototype.genislet = function () {
        var arr = V.genislet(this);
        var v = new V3(0, 0, 0);
        v.arr = arr;
        return v;
    };
    Object.defineProperty(V2.prototype, "normalize", {
        get: function () {
            var buyukluk = this.norm;
            return new V2(this.x / buyukluk, this.y / buyukluk);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V2.prototype, "norm", {
        get: function () {
            var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
            var buyukluk = Math.sqrt(toplam);
            if (buyukluk === 0) {
                buyukluk = 1;
            }
            return buyukluk;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V2.prototype, "arr", {
        get: function () { return [this.x, this.y]; },
        set: function (ar) {
            this.x = ar[0];
            this.y = ar[1];
        },
        enumerable: false,
        configurable: true
    });
    return V2;
}(V));
exports.V2 = V2;
var V3 = (function (_super) {
    __extends(V3, _super);
    function V3(x, y, z) {
        var _this = _super.call(this, x, y) || this;
        _this.uzunluk = 3;
        _this._z = z;
        return _this;
    }
    V3.prototype.kopyala = function () { return new V3(this._x, this._y, this._z); };
    Object.defineProperty(V3.prototype, "z", {
        get: function () { return this._z; },
        set: function (val) { this._z = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V3.prototype, "norm", {
        get: function () {
            var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
            toplam += Math.pow(this.z, 2);
            if (toplam === 0) {
                return 1;
            }
            var buyukluk = Math.sqrt(toplam);
            return buyukluk;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V3.prototype, "normalize", {
        get: function () {
            var buyukluk = this.norm;
            return new V3(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V3.prototype, "arr", {
        get: function () { return [this.x, this.y, this.z]; },
        set: function (ar) {
            this.x = ar[0];
            this.y = ar[1];
            this.z = ar[2];
        },
        enumerable: false,
        configurable: true
    });
    V3.prototype.genislet = function () {
        var arr = V.genislet(this);
        var v = new V4(0, 0, 0, 0);
        v.arr = arr;
        return v;
    };
    V3.caprazCarp = function (v1, v2) {
        var v1len = v1.uzunluk;
        if (v1len !== 3) {
            throw new Error("Capraz carpim için 3 boyut lazim: " + v1len.toString());
        }
        var v2len = v2.uzunluk;
        Hatalar_js_1.vecUyari(v1len.toString(), v2len.toString(), "capraz carpim boyutu");
        var x = v1.y * v2.z - v1.z * v2.y;
        var y = v1.z * v2.x - v1.x * v2.z;
        var z = v1.x * v2.y - v1.y * v2.x;
        return new V3(x, y, z);
    };
    V3.prototype.caprazCarp = function (v) { this.arr = V3.caprazCarp(this, v).arr; };
    return V3;
}(V2));
exports.V3 = V3;
var V4 = (function (_super) {
    __extends(V4, _super);
    function V4(x, y, z, w) {
        var _this = _super.call(this, x, y, z) || this;
        _this.uzunluk = 4;
        _this._w = w;
        return _this;
    }
    V4.prototype.kopyala = function () { return new V4(this._x, this._y, this._z, this._w); };
    Object.defineProperty(V4.prototype, "w", {
        get: function () { return this._w; },
        set: function (val) { this._w = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V4.prototype, "normalize", {
        get: function () {
            var buyukluk = this.norm;
            return new V4(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk, this.w / buyukluk);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V4.prototype, "norm", {
        get: function () {
            var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
            toplam += Math.pow(this.z, 2) + Math.pow(this.w, 2);
            var buyukluk = Math.sqrt(toplam);
            if (buyukluk === 0) {
                buyukluk = 1;
            }
            return buyukluk;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V4.prototype, "arr", {
        get: function () { return [this.x, this.y, this.z, this.w]; },
        set: function (ar) {
            this.x = ar[0];
            this.y = ar[1];
            this.z = ar[2];
            this.w = ar[3];
        },
        enumerable: false,
        configurable: true
    });
    V4.prototype.genislet = function () {
        var arr = V.genislet(this);
        var v = new V5(0, 0, 0, 0, 0);
        v.arr = arr;
        return v;
    };
    return V4;
}(V3));
exports.V4 = V4;
var V5 = (function (_super) {
    __extends(V5, _super);
    function V5(x, y, z, w, a) {
        var _this = _super.call(this, x, y, z, w) || this;
        _this.uzunluk = 5;
        _this._a = a;
        return _this;
    }
    V5.prototype.kopyala = function () { return new V5(this._x, this._y, this._z, this._w, this._a); };
    Object.defineProperty(V5.prototype, "a", {
        get: function () { return this._a; },
        set: function (val) { this._a = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V5.prototype, "normalize", {
        get: function () {
            var buyukluk = this.norm;
            return new V5(this.x / buyukluk, this.y / buyukluk, this.z / buyukluk, this.w / buyukluk, this.a / buyukluk);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V5.prototype, "norm", {
        get: function () {
            var toplam = Math.pow(this.x, 2) + Math.pow(this.y, 2);
            toplam += Math.pow(this.z, 2) + Math.pow(this.w, 2);
            toplam += Math.pow(this.a, 2);
            var buyukluk = Math.sqrt(toplam);
            if (buyukluk === 0) {
                buyukluk = 1;
            }
            return buyukluk;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(V5.prototype, "arr", {
        get: function () { return [this.x, this.y, this.z, this.w]; },
        set: function (ar) {
            this.x = ar[0];
            this.y = ar[1];
            this.z = ar[2];
            this.w = ar[3];
            this.a = ar[4];
        },
        enumerable: false,
        configurable: true
    });
    return V5;
}(V4));
exports.V5 = V5;
var Mat = (function () {
    function Mat() {
    }
    Mat.mapfn = function (mat, fn) {
        var a = mat.arr;
        return a.map(function (ar) { return ar.map(fn); });
    };
    Mat.mapMulti = function (mat, argumanlar, fn) {
        var a = mat.arr;
        return a.map(function (ar) { return mapMulti(ar, argumanlar, fn); });
    };
    Mat.aralikDegistir = function (mat, eskiler, yeniler) {
        var mkp = mat.kopyala();
        var eskimin = eskiler[0];
        var eskimaks = eskiler[1];
        var yenimin = yeniler[0];
        var yenimaks = yeniler[1];
        var argumanlar = [eskimin, eskimaks, yenimin, yenimaks];
        var fn = function (karr) {
            var k = karr[0];
            var arr = karr[1];
            return aralikDegistir(k, arr[0], arr[1], arr[2], arr[3]);
        };
        var narr = Mat.mapMulti(mkp, argumanlar, fn);
        mkp.arr = narr;
        return mkp;
    };
    Mat.prototype.mapfn = function (fn) { this.arr = Mat.mapfn(this, fn); };
    Mat.prototype.aralikDegistir = function (eskiler, yeniler) {
        this.arr = Mat.aralikDegistir(this, eskiler, yeniler).arr;
    };
    Mat.prototype.ic = function (el) { this.arr = Mat.matmul(this, el); };
    ;
    Mat.prototype.ic_vektor = function (el) {
        var v = el.kopyala();
        var arr = Mat.mat2vec(this, el);
        v.arr = arr;
        return v;
    };
    ;
    Mat.prototype.topla = function (el) { this.arr = Mat.toplaSayi(this, el).arr; };
    ;
    Mat.prototype.cikar = function (el) { this.arr = Mat.cikarSayi(this, el).arr; };
    ;
    Mat.prototype.carp = function (el) { this.arr = Mat.carpSayi(this, el).arr; };
    ;
    Mat.prototype.bol = function (el) { this.arr = Mat.bolSayi(this, el).arr; };
    ;
    Mat.prototype.doldur = function (s) { this.arr = Mat.doldur(this, s).arr; };
    Mat.prototype.caprazDoldur = function (s) {
        this.arr = Mat.caprazDoldur(this, s);
    };
    Mat.hucreKoy = function (mat, strNo, stnNo, v) {
        var arr = mat.arr;
        arr[strNo][stnNo] = v;
        mat.arr = arr;
        return mat;
    };
    Mat.prototype.hucreKoy = function (strNo, stnNo, v) {
        this.arr = Mat.hucreKoy(this, strNo, stnNo, v).arr;
    };
    Mat.satirKoy = function (mat, strNo, satir) {
        return Mat.satirSutunKoy(mat, strNo, satir, true);
    };
    ;
    Mat.sutunKoy = function (mat, stnNo, sutun) {
        return Mat.satirSutunKoy(mat, stnNo, sutun, false);
    };
    ;
    Mat.prototype.sutunKoy = function (stnNo, sutun) {
        this.satirSutunKoy(stnNo, sutun, false);
    };
    ;
    Mat.prototype.satirKoy = function (strNo, satir) {
        this.satirSutunKoy(strNo, satir, true);
    };
    ;
    Mat.prototype.satirSutunKoy = function (elNo, el, satirMi) {
        this.arr = Mat.satirSutunKoy(this, elNo, el, satirMi).arr;
    };
    ;
    Mat.satirSutunKoy = function (mat, elNo, el, satirMi) {
        var vuzun;
        var msj;
        var icerik;
        var msjstr;
        var uzun;
        if (satirMi === true) {
            msjstr = "satir";
            uzun = mat.satir_sayisi;
        }
        else {
            msjstr = "sutun";
            uzun = mat.sutun_sayisi;
        }
        if ((elNo > uzun - 1) && (elNo < 0)) {
            msj = Hatalar_js_1.boyutKontrol(elNo, msjstr + " sayisi", 0, uzun);
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
            msj = Hatalar_js_1.boyutKontrol(vuzun, "vektor uzunlugu", uzun, uzun);
            throw new Error(msj);
        }
        var arr = mat.arr;
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
    };
    Mat.devir = function (mat) {
        if (mat.satir_sayisi !== mat.sutun_sayisi) {
            throw new Error("Matriksin satir ve sutun sayisi ayni olmali");
        }
        var m2 = mat.kopyala();
        var matarr = mat.arr;
        for (var i = 0; i < mat.satir_sayisi; i++) {
            for (var k = 0; k < mat.sutun_sayisi; k++) {
                m2.hucreKoy(k, i, matarr[i][k]);
            }
        }
        return m2;
    };
    Mat.prototype.devir = function () { this.arr = Mat.devir(this).arr; };
    Mat.doldur = function (mat, s) {
        var matarr = mat.arr;
        for (var i = 0; i < mat.satir_sayisi; i++) {
            for (var k = 0; k < mat.sutun_sayisi; k++) {
                matarr[i][k] = s;
            }
        }
        var kpy = mat.kopyala();
        kpy.arr = matarr;
        return kpy;
    };
    Mat.caprazDoldur = function (mat, s) {
        var matar = mat.arr;
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
                throw new Error(Hatalar_js_1.boyutUyarisi(mat.satir_sayisi.toString(), s.length.toString(), "doldurma listesinin boyu matriksin" + " satirlari"));
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
    };
    Mat.matmul = function (matA, matB) {
        if (matA.satir_sayisi !== matB.sutun_sayisi) {
            var uyari = Hatalar_js_1.boyutUyarisi(matA.satir_sayisi.toString(), matB.sutun_sayisi.toString(), "matrix satir sutun");
            throw new Error(uyari);
        }
        var sonuc = new Array(matA.satir_sayisi);
        for (var saNo = 0; saNo < matA.satir_sayisi; saNo++) {
            sonuc[saNo] = new Array(matB.sutun_sayisi);
            for (var suNo = 0; suNo < matB.sutun_sayisi; suNo++) {
                var t = 0;
                for (var i = 0; i < matA.sutun_sayisi; i++) {
                    var valA = matA.arr[saNo][i];
                    var valB = matB.arr[i][suNo];
                    var carpim = valA * valB;
                    t += carpim;
                }
                sonuc[saNo][suNo] = t;
            }
        }
        return sonuc;
    };
    Mat.mat2vec = function (mat, vec) {
        var vecUzunluk = vec.uzunluk;
        if (mat.sutun_sayisi !== vecUzunluk) {
            var uyari = Hatalar_js_1.boyutUyarisi(mat.sutun_sayisi.toString(), vecUzunluk.toString(), "matrix satir vector uzunluk");
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
    };
    Mat.sayiIslemi = function (mat, s, islemTipi) {
        var matarr = mat.arr;
        var kpya = mat.kopyala();
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
    };
    Mat.toplaSayi = function (mat, s) {
        return Mat.sayiIslemi(mat, s, "toplama");
    };
    Mat.cikarSayi = function (mat, s) {
        return Mat.sayiIslemi(mat, s, "cikarma");
    };
    Mat.carpSayi = function (mat, s) {
        return Mat.sayiIslemi(mat, s, "carpma");
    };
    Mat.bolSayi = function (mat, s) {
        return Mat.sayiIslemi(mat, s, "bolme");
    };
    Mat.prototype.listeAl = function () {
        var vekliste = this.arr;
        var liste = [];
        for (var _i = 0, vekliste_1 = vekliste; _i < vekliste_1.length; _i++) {
            var vekarr = vekliste_1[_i];
            for (var _b = 0, vekarr_1 = vekarr; _b < vekarr_1.length; _b++) {
                var v = vekarr_1[_b];
                liste.push(v);
            }
        }
        return liste;
    };
    return Mat;
}());
var Mat2 = (function (_super) {
    __extends(Mat2, _super);
    function Mat2() {
        var _this = _super.call(this) || this;
        _this.satir_sayisi = 2;
        _this.sutun_sayisi = 2;
        _this.r1 = new V2(1, 0);
        _this.r2 = new V2(0, 1);
        return _this;
    }
    Object.defineProperty(Mat2.prototype, "arr", {
        get: function () { return [this.r1.arr, this.r2.arr]; },
        set: function (arr) {
            this.r1 = new V2(arr[0][0], arr[0][1]);
            this.r2 = new V2(arr[1][0], arr[1][1]);
        },
        enumerable: false,
        configurable: true
    });
    Mat2.prototype.kopyala = function () {
        var nmat = new Mat2();
        nmat.arr = this.arr;
        return nmat;
    };
    Mat2.prototype.ic_vektor = function (el) {
        var arr = Mat.mat2vec(this, el);
        return new V2(arr[0], arr[1]);
    };
    return Mat2;
}(Mat));
exports.Mat2 = Mat2;
var Mat3 = (function (_super) {
    __extends(Mat3, _super);
    function Mat3() {
        var _this = _super.call(this) || this;
        _this.satir_sayisi = 3;
        _this.sutun_sayisi = 3;
        _this.r1 = new V3(1, 0, 0);
        _this.r2 = new V3(0, 1, 0);
        _this.r3 = new V3(0, 0, 1);
        return _this;
    }
    Object.defineProperty(Mat3.prototype, "arr", {
        get: function () {
            return [this.r1.arr, this.r2.arr, this.r3.arr];
        },
        set: function (arr) {
            this.r1 = new V3(arr[0][0], arr[0][1], arr[0][2]);
            this.r2 = new V3(arr[1][0], arr[1][1], arr[1][2]);
            this.r3 = new V3(arr[2][0], arr[2][1], arr[2][2]);
        },
        enumerable: false,
        configurable: true
    });
    Mat3.prototype.kopyala = function () {
        var nmat = new Mat3();
        nmat.arr = this.arr;
        return nmat;
    };
    return Mat3;
}(Mat));
exports.Mat3 = Mat3;
var Mat4 = (function (_super) {
    __extends(Mat4, _super);
    function Mat4() {
        var _this = _super.call(this) || this;
        _this.satir_sayisi = 4;
        _this.sutun_sayisi = 4;
        _this.r1 = new V4(1, 0, 0, 0);
        _this.r2 = new V4(0, 1, 0, 0);
        _this.r3 = new V4(0, 0, 1, 0);
        _this.r4 = new V4(0, 0, 0, 1);
        return _this;
    }
    Object.defineProperty(Mat4.prototype, "arr", {
        get: function () {
            return [this.r1.arr, this.r2.arr, this.r3.arr, this.r4.arr];
        },
        set: function (arr) {
            this.r1 = new V4(arr[0][0], arr[0][1], arr[0][2], arr[0][3]);
            this.r2 = new V4(arr[1][0], arr[1][1], arr[1][2], arr[1][3]);
            this.r3 = new V4(arr[2][0], arr[2][1], arr[2][2], arr[2][3]);
            this.r4 = new V4(arr[3][0], arr[3][1], arr[3][2], arr[3][3]);
        },
        enumerable: false,
        configurable: true
    });
    Mat4.prototype.kopyala = function () {
        var nmat = new Mat4();
        nmat.arr = this.arr;
        return nmat;
    };
    return Mat4;
}(Mat));
exports.Mat4 = Mat4;
//# sourceMappingURL=Matrix.js.map