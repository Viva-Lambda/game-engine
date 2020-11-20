// oyun kodu
import {gMotor} from "../motor/Motor.js";
import {BasitCizer} from "../motor/BasitCizer.js";
import {Cizilebilir} from "../motor/Cizilebilir.js";
import {V4} from "../lib/Matrix.js";

export class Oyunum {
  cizer: BasitCizer;
  beyazKare: Cizilebilir;
  kirmiziKare: Cizilebilir;
  constructor(kanvasId: string) {
    gMotor.AnaMotor.glBaslat(kanvasId);
    this.cizer = new BasitCizer("./srcts/glsl/basitvs.vert",
                                "./srcts/glsl/degisikrenk.frag");

    // cizilebilirleri olustur
    this.beyazKare = new Cizilebilir(this.cizer);
    this.kirmiziKare = new Cizilebilir(this.cizer);

    // cizilebilirlere renk koyulur
    this.beyazKare.renk = new V4(1, 1, 1, 1);
    this.kirmiziKare.renk = new V4(1, 0, 0, 1);

    // kanvas temizleme rengi konar
    var temizlikRengi = new V4(0, 0.7, 0.3, 1);
    gMotor.AnaMotor.kanvasTemizle(temizlikRengi);

    // matrisler olusturulur

    // Beyaz Kare
    this.beyazKare.donustur.konumKoy(-0.25, 0.25);
    this.beyazKare.donustur.radyanKoy(0.2);
    this.beyazKare.donustur.boyutKoy(1.2, 1.2);

    // ciz
    this.beyazKare.ciz();

    // kirmizi kare
    this.kirmiziKare.donustur.konumKoy(0.25, -0.25);
    this.kirmiziKare.donustur.radyanKoy(-0.7);
    this.kirmiziKare.donustur.boyutKoy(0.4, 0.4);

    // ciz
    this.kirmiziKare.ciz();
  }
}
