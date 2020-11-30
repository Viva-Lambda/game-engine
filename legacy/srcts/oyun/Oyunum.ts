// oyun kodu
import {gMotor} from "../motor/Motor.js";
import {BasitCizer} from "../motor/BasitCizer.js";
import {Cizilebilir} from "../motor/Cizilebilir.js";
import {Kamera} from "../motor/Kamera.js";
import {OyunArayuzu} from "../motor/OyunArayuzu.js";
import {vec4, vec2} from "gl-matrix";

export class Oyunum extends OyunArayuzu {
  _cizer: BasitCizer | null = null;
  _beyazKare: Cizilebilir | null = null;
  _kirmiziKare: Cizilebilir | null = null;
  _kamera: Kamera | null = null;

  constructor(kanvasId: string) {
    super();
    gMotor.AnaMotor.glBaslat(kanvasId);

    this.oyunuBaslat();
  }
  set cizer(c: BasitCizer) { this._cizer = c; }
  get cizer(): BasitCizer {
    if (this._cizer === null) {
      throw new Error("Cizer null degerinde");
    }
    return this._cizer;
  }
  set kamera(k: Kamera) { this._kamera = k; }
  get kamera(): Kamera {
    if (this._kamera === null) {
      throw new Error("kamera null");
    }
    return this._kamera;
  }
  set kirmiziKare(k: Cizilebilir) { this._kirmiziKare = k; }
  get kirmiziKare(): Cizilebilir {
    if (this._kirmiziKare === null) {
      throw new Error("kirmizi kare null");
    }
    return this._kirmiziKare;
  }
  set beyazKare(k: Cizilebilir) { this._beyazKare = k; }
  get beyazKare(): Cizilebilir {
    if (this._beyazKare === null) {
      throw new Error("beyaz kare null");
    }
    return this._beyazKare;
  }
  oyunuBaslat() {
    let merkez = vec2.fromValues(20, 60);
    let pg = 20;
    let gliste = vec4.fromValues(20, 40, 600, 300);
    this.kamera = new Kamera(merkez, pg, gliste);
    this.kamera.arkaPlanRengi = vec4.fromValues(0.8, 0.8, 0.8, 1.0);

    // cizer olustur
    this.cizer = new BasitCizer("./srcts/glsl/basitvs.vert",
                                "./srcts/glsl/degisikrenk.frag");
    // cizilebilirleri olustur
    this.kirmiziKare = new Cizilebilir(this.cizer);
    this.kirmiziKare.renkKoy(vec4.fromValues(0.8, 0.1, 0.1, 1.0));

    this.beyazKare = new Cizilebilir(this.cizer);
    this.beyazKare.renkKoy(vec4.fromValues(0.8, 0.8, 0.7, 1.0));

    // bir yere koy objeleri
    this.beyazKare.donustur.konumKoy(20, 60);
    this.beyazKare.donustur.radyanKoy(0.2);
    this.beyazKare.donustur.boyutKoy(5, 5);

    //
    this.kirmiziKare.donustur.konumKoy(20, 60);
    this.kirmiziKare.donustur.radyanKoy(-0.2);
    this.kirmiziKare.donustur.boyutKoy(2, 2);

    gMotor.OyunDongusu.baslat(this);
  }
  guncelle() {
    //
    var beyazDonustur = this.beyazKare.donustur;
    var deltaX: number = 0.05;
    if (beyazDonustur.konumXAl() > 30) {
      beyazDonustur.konumKoy(10, 60);
    }
    beyazDonustur.konumXArti(deltaX);
    beyazDonustur.dereceArti(1);

    var kirmiziDonustur = this.kirmiziKare.donustur;
    if (kirmiziDonustur.boyutXAl() > 5) {
      kirmiziDonustur.boyutKoy(2, 2);
    }
    kirmiziDonustur.boyutArti(deltaX);
  }
  ciz() {
    //
    gMotor.AnaMotor.kanvasTemizle(vec4.fromValues(0.9, 0.9, 0.9, 1.0));
    this.kamera.bakmaProjMatKur();
    this.kirmiziKare.ciz(this.kamera.bakmaProjMat);
    this.beyazKare.ciz(this.kamera.bakmaProjMat);
  }
}
