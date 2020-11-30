// oyun dongusu objesi
import {gMotor} from "../Motor.js";
import {OyunArayuzu} from "../OyunArayuzu.js";

var FPS: number = 60;         // saniyede kaç kare
var MPF: number = 1000 / FPS; // bir kare kaç milisaniye.

var oncekiSure: number | null = null;
var gecikenSure: number | null = null;
var suankiSure: number | null = null;
var gecenSure: number | null = null;

var donguCalisiyorMu = false;

var oyunum: OyunArayuzu | null = null;

var _donguCalistir =
    function(this: OyunArayuzu | null) {
  if (donguCalisiyorMu) {
    // eger dongu çalisiyor ise
    requestAnimationFrame(function() { _donguCalistir.call(oyunum); });
    if (this === null) {
      throw new Error("Dongunun this'i oyunum degil");
    }

    suankiSure = Date.now();
    if (suankiSure === null || oncekiSure === null || gecikenSure === null) {
      throw new Error("suanki sure veya onceki sure null degerinde");
    }
    gecenSure = suankiSure - oncekiSure;
    oncekiSure = suankiSure;
    gecikenSure += gecenSure;

    while ((gecikenSure >= MPF) && donguCalisiyorMu) {
      this.guncelle(); // this oyunum yerini tutar
      gecikenSure -= MPF;
    }
    this.ciz();
  }
}

var baslat =
    function(oyun: OyunArayuzu) {
  oyunum = oyun;
  oncekiSure = Date.now();
  gecikenSure = 0.0;
  donguCalisiyorMu = true;
  requestAnimationFrame(() => { _donguCalistir.call(oyunum); });
}

export class OyunDongusu {
  baslat = baslat;
  constructor() {}
}
gMotor.OyunDongusu = new OyunDongusu();
