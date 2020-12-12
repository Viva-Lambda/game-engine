// oyun kodu
// import {vec4, vec3} from "../../../node_modules/gl-matrix/gl-matrix-min.js";

import {vec4} from "gl-matrix";
import {gMotor} from "../motor/MotorNesnesi";
import {BasitCizer} from "../motor/BasitCizer";
import {Cizilebilir} from "../motor/Cizilebilir";
import {Kamera} from "../motor/Kamera";
import {OyunArayuzu} from "../motor/OyunArayuzu";
export class Oyunum extends OyunArayuzu {
  _cizer: BasitCizer | null = null;
  _beyazKare: Cizilebilir | null = null;
  _kirmiziKare: Cizilebilir | null = null;
  _kamera: Kamera | null = null;

  constructor(kanvasId: string) {
    super();
    if (gMotor.AnaMotor === null || gMotor.AnaMotor === undefined) {
      throw new Error("ana motor null oyunum da");
    }

    gMotor.AnaMotor.anaUnsurlariBaslat(kanvasId);

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
    let merkez = [ 20, 60, 0 ];
    let pg = 20;
    let gliste = vec4.fromValues(20, 40, 600, 300);
    this.kamera = new Kamera(merkez, pg, gliste);
    this.kamera.arkaPlanRengi = [ 0.8, 0.8, 0.8, 1.0 ];

    // cizer olustur
    this.cizer = new BasitCizer("./srcts/glsl/basitvs.vert",
                                "./srcts/glsl/degisikrenk.frag");
    // cizilebilirleri olustur
    this.kirmiziKare = new Cizilebilir(this.cizer);
    this.kirmiziKare.renkKoy([ 0.8, 0.1, 0.1, 1.0 ]);

    this.beyazKare = new Cizilebilir(this.cizer);
    this.beyazKare.renkKoy([ 0.8, 0.8, 0.7, 1.0 ]);

    // bir yere koy objeleri
    this.beyazKare.donustur.konumKoy(20, 60);
    this.beyazKare.donustur.radyanKoy(0.2);
    this.beyazKare.donustur.boyutKoy(5, 5);

    //
    this.kirmiziKare.donustur.konumKoy(20, 60);
    this.kirmiziKare.donustur.radyanKoy(-0.2);
    this.kirmiziKare.donustur.boyutKoy(2, 2);

    if (gMotor.OyunDongusu === null || gMotor.OyunDongusu === undefined) {
      throw new Error("OyunDongusu null oyunum da");
    }

    gMotor.OyunDongusu.baslat(this);
  }
  guncelle() {
    //
    var beyazDonustur = this.beyazKare.donustur;
    var deltaX: number = 0.05;
    var sagTiklandiMi = gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Sag);
    console.log("sag tiklandi mi", sagTiklandiMi);
    if (sagTiklandiMi) {
      if (beyazDonustur.konumXAl() > 30) {
        beyazDonustur.konumKoy(10, 60);
      }
      beyazDonustur.konumXArti(deltaX);
    }
    var asagiTiklandiMi = gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Asagi);
    console.log("asagi tiklandi mi", asagiTiklandiMi);
    if (asagiTiklandiMi) {
      beyazDonustur.dereceArti(1);
    }

    var kirmiziDonustur = this.kirmiziKare.donustur;
    if (gMotor.Girdi.tusTiklandiMi(gMotor.Girdi.tuslar.Yukari)) {
      if (kirmiziDonustur.boyutXAl() > 5) {
        kirmiziDonustur.boyutKoy(2, 2);
      }
      kirmiziDonustur.boyutArti(deltaX);
    }
  }
  ciz() {
    //
    if (gMotor.AnaMotor === null || gMotor.AnaMotor === undefined) {
      throw new Error("AnaMotor null oyunum da");
    }

    gMotor.AnaMotor.kanvasTemizle([ 0.9, 0.9, 0.9, 1.0 ]);
    this.kamera.bakmaProjMatKur();
    this.kirmiziKare.ciz(this.kamera.bakmaProjMat);
    this.beyazKare.ciz(this.kamera.bakmaProjMat);
  }
}
